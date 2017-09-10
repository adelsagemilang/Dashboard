import React, { Component } from 'react'
import autoBind from 'react-autobind'
import "../../stylesheet/component/common/_input_form.scss"

export default class InputForm extends Component {
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
            <div className="input-form">
                {this.props.type === "date" ? (
                    <input
                    id={this.props.inputId}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.title}
                    onChange={this._onChange}
                    className={this.props.class}
                    />
                ) : (
                    <input
                    id={this.props.inputId}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.title}
                    onChange={this._onChange}
                    className={this.props.class}
                    />
                )
                }
                { this.props.icon ? 
                    <img src={this.props.src} className="icon-form"/>
                    : null
                }
            </div>
        )
    }
}