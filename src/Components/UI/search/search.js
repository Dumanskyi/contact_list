import React, { useState } from 'react'
import './search.scss'

const Search = props => {

    const [text, setText] = useState('')

    const onSearchChange = (event) => {
        const text = event.target.value
        setText(text)
        props.onSearchChange(text)
    }
    
    return (
        <div className='searchBlock'>
            <span><i className="fas fa-search"></i></span>
            <input 
                type="text"
                className='form'
                placeholder='Type to search'
                value={text}
                onChange={onSearchChange}
            />
        </div> 
    )
}

export default Search