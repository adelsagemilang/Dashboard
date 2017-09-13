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

    render(){
        return(
            <div className="text-area">
                <textarea
                id={this.props.idtextarea}
                className={ this.props.class }
                placeholder={this.props.title}>
                </textarea>
            </div>
        )
    }
}