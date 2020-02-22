import React, { Component } from 'react'
import './search.scss'

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        }
    }

    onSearchChange = (event) => {
        const text = event.target.value
        this.setState({ text })
        this.props.onSearchChange(text)
    }
    
    render () {
        return (
            <div className='searchBlock'>
                <span><i className="fas fa-search"></i></span>
                <input 
                    type="text"
                    className='form'
                    placeholder='Type to search'
                    value={this.state.text}
                    onChange={this.onSearchChange}
                />
            </div>
            
            
            
        )
    }
}