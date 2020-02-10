import React from 'react';
import './input.scss'

const Input = props => {

    return (
        <div className='info-line'>
            <label htmlFor="name">{props.parameter}</label><br />
            <input 
              type={props.type} 
              id={props.parameter} 
              name={props.parameter} 
              placeholder={`Type ${props.parameter}`} 
              value={props.value}
              onChange={props.onChange}
              rows={props.rows}
            />
        </div>
    )
}

export default Input;