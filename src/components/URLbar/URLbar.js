import React from 'react';
import './URLbar.css'

const URLbar = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className='center f3'>
                {'This smart brain will detect faces in your given images, Give it a try!'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default URLbar;