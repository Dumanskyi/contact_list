import React from 'react';
import './Button.scss'

const Button = props => {
    const clsArr = [
         'Button',
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