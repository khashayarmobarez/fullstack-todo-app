"use client"

import { grAddCircle } from 'react-icons/gr';
import { BsAlignStart } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { MdDoneAll } from 'react-icons/md';

import { useState } from 'react';
import RadioButton from '../elements/RadioButton';

function AddToDo() {

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('todo');

  return (
    <div className="add-form">
        <h2>
            <grAddCircle />
            Add New Todo
        </h2>
        <div className="add-form__input">
            <div className='add-form__input--first'>
                <label htmlFor='title'>Title:</label>
                <input 
                id='title' 
                type='text' 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='add-form__input--second'>
                
                <RadioButton 
                    title={'todo'}
                    value={'todo'}
                    status={status}
                    setStatus={setStatus}
                >
                    <BsAlignStart />
                </RadioButton> 
                
                <RadioButton 
                    title={'In progress'}
                    value={'inProgress'}
                    status={status}
                    setStatus={setStatus}
                >
                    <FiSettings />
                </RadioButton> 
                
                <RadioButton 
                    title={'Review'}
                    value={'review'}
                    status={status}
                    setStatus={setStatus}
                >
                    <AiOutlineFileSearch />
                </RadioButton> 
                
                <RadioButton 
                    title={'Done'}
                    value={'done'}
                    status={status}
                    setStatus={setStatus}
                >
                    <MdDoneAll />
                </RadioButton> 
            </div>
        </div>
    </div>
  )
}

export default AddToDo
