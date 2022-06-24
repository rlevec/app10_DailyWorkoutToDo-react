import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({items, removeItem, editItem}) => {
  return (
    <div className='workout-list'>
        {
            items.map((item) => {
                const {id, title, sets, reps} = item
                return (
                    <article key={id} className='workout-item'>
                        <p className='title'>{title}</p>
                        <p className='title'>{sets}</p>
                        <p className='title'>{reps}</p>
                        <div className='btn-container'>
                            <button type='button' className='edit-btn' onClick={() => editItem(id)}>
                                <FaEdit />
                            </button>
                            <button type='button' className='delete-btn' onClick={() => removeItem(id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                )
            })
        }
    </div>
  )
}

export default List