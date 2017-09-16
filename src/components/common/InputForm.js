import React, { Component } from 'react'
import autoBind from 'react-autobind'
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import "../../stylesheet/component/common/_input_form.scss"

export default class InputForm extends Component {
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            title: '',
            startDate: moment()
        }
    }


    handleChange(date) {
        this.setState({
          startDate: date
        })

        this.props.getValueDatePicker(date) 

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
                    <DatePicker 
                        dateFormat="YYYY-MM-DD"
                        showYearDropdown
                        selected={this.state.startDate} 
                        onChange={this.handleChange} 
                        className={this.props.class}
                        placeholderText={this.props.placeholder}
                        yearDropdownItemNumber={15}
                        />
                ) : (
                    <input
                    defaultValue={this.props.defaultValue}
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