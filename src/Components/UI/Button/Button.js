import React from 'react';
import './button.scss'

const Button = props => {
    const clsArr = [
         'button',
         props.purpose
    ]

    return (
        <button
            onClick={props.onClick}
            className={clsArr.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;