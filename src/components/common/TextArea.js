import React, { Component } from 'react'
import autoBind from 'react-autobind'

export default class TextArea extends Component {
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            title: '',

        }
    }

    _onChange(e){
        this.props.handleChange(
            e.target.id,
            e.target.value
        )
        console.log('ini: ' + e.target.value)
    }

    render(){
        return(
            <div className="text-area">
                <textarea
                className={ this.props.class }
                value={this.props.title}
                onChange={this._onChange}>
                </textarea>
            </div>
        )
    }
}