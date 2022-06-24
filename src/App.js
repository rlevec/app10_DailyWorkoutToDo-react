import React, {useState, useEffect} from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

const App = () => {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [setsList, setSetsList] = useState('')
  const [repsList, setRepsList] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    msg: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name) {
      showAlert(true, 'danger', 'empty value')
    }
    else if(name && setsList && repsList && isEditing) {
      const newList = list.map((item) => {
        if(item.id === editID) {
          return {...item, title: name, sets: setsList, reps: repsList}
        }
        return item
      })
      setList(newList)
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'values changed')
    }
    else {
      const newName = {id: new Date().getTime().toString(), title: name, sets: setsList, reps: repsList}
      setList([...list, newName])
      setName('')
      setSetsList('')
      setRepsList('')
      showAlert(true, 'success', 'item added')
    }
  }

  const showAlert = (show='false', type='', msg='') => {
    setAlert({show, type, msg})
  }



  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    console.log(specificItem)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  const clearAll = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className='section-center'>
      <form className='workout-form' onSubmit={handleSubmit}>
        {alert.show && 
          <Alert {...alert}
          removeAlert={showAlert} 
          list={list}
        />}
        <h3>daily workout</h3>
        <div className='underline'></div>
        <div className='header-container'>
          <img src="https://i.imgur.com/HuxXSuz.jpg" className='header-img'/>
        </div>
        <div className='form-control'>
          <input 
            type='text'
            className='workout paragraph1'
            placeholder='e.g. pull ups'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type='number'
            className='workout workout-1'
            placeholder='e.g. 3'
            value={setsList}
            onChange={(e) => setSetsList(e.target.value)}
          />
          <input 
            type='number'
            className='workout workout-1'
            placeholder='e.g. 12'
            value={repsList}
            onChange={(e) => setRepsList(e.target.value)}
          />
        </div>
        <button type='submit' className='submit-btn'>
          {isEditing ? 'edit' : 'add'}
        </button>
      </form>
      {
        list.length > 0 &&
          <div className='workout-container'>
            <List
             items={list} 
             removeItem={removeItem}
             editItem={editItem}
            />
            <button className='clear-btn' onClick={clearAll}>clear all</button>
          </div>
      }
    </section>
  )
}

export default App