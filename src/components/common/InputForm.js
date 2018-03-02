import React, { Component } from 'react'
import autoBind from 'react-autobind'
import DatePicker from 'react-datepicker';
import moment from 'moment';

//import 'react-datepicker/dist/react-datepicker.css';
import "../../stylesheet/component/common/_input_form.scss"

export default class InputForm extends Component {
    constructor(props){
        super(props)
        autoBind(this)

        this.state = {
            valueInput: this.props.defaultValue ? this.props.defaultValue : '',
            title: '',
            startDate: moment(),
            dbDate: this.props.startdate ? moment(this.props.startdate) : null,
        }
    }


    handleChange(date) {
        this.setState({
          dbDate: date,
          startDate: date,
        })
         console.log(date)
        this.props.getValueDatePicker(date) 

    }

    handleInput(evt) {
        const valueInput = (evt.target.validity.valid) ? evt.target.value : this.state.valueInput;
        
        this.setState({ valueInput });
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
            <div className={ this.props.classError ? this.props.classError : "input-form" }>
                {
                    this.props.errorMessage ?
                    <span className="error-message"> {this.props.errorMessage}</span>
                    : null
                }
                {this.props.type === "date" ? (
                    <DatePicker 
                        dateFormat="YYYY-MM-DD"
                        showYearDropdown
                        scrollableYearDropdown
                        readOnly={true}
                        selected={this.state.dbDate ? this.state.dbDate : ""}
                        openToDate={this.state.dbDate ? this.state.dbDate : moment("1960-01-01")}
                        onChange={this.handleChange} 
                        className={this.props.class}
                        placeholderText={this.props.placeholder}
                        yearDropdownItemNumber={50}
                        />
                ) : (
                    <input
                    defaultValue={this.props.defaultValue}
                    id={this.props.inputId}
                    maxLength={(() => {
                        switch (this.props.inputId) {
                          case "no_ktp":   return "16";
                          case "no_hp":   return "13";
                          case "postcode": return "5"
                          default:      return null;
                        }
                    })()}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    onChange={this._onChange}
                    className={this.props.class}
                    pattern={(() => {
                        switch (this.props.inputId) {
                          case "no_ktp":   return "[0-9]*"
                          case "no_rek":   return "[0-9]*"
                          case "no_hp":   return "[0-9]*"
                          case "postcode": return "[0-9]*"
                          case "biaya": return "[0-9]*"
                          case "nama-petani": return "[a-zA-Z0-9 ]*"
                          case "tempat_lahir": return "[a-zA-Z ]*"
                          case "nama-ibu": return "[a-zA-Z ]*"
                          case "bank-owner-name": return "[a-zA-Z ]*"
                          case "name": return "[a-zA-Z0-9 ]*"
                          case "birth_place": return "[a-zA-Z ]*"
                          case "nama-rukman": return "[a-zA-Z0-9 ]*"
                          case "nama-lahan": return "[a-zA-Z0-9 ]*"
                          case "large": return "[0-9]+([.][0-9]{0,2})?"
                          case "height": return "[0-9]+([.][0-9]{0,2})?"
                          case "irigation": return "[a-zA-Z ]*"
                          case "rel_status": return "[a-zA-Z ]*"
                          case "title": return "[a-zA-Z ]*"
                          case "search_admin": return "[a-zA-Z0-9 ]*"
                          case "item": return "[a-zA-Z0-9 ]*"
                          case "satuan": return "[a-zA-Z0-9.^%$#,-]+"
                          default:      return null
                        }
                    })()}
                    onInput={(() => {
                        switch (this.props.inputId) {
                          case "no_ktp":   return this.handleInput.bind(this)
                          case "no_rek":   return this.handleInput.bind(this)
                          case "no_hp":   return this.handleInput.bind(this)
                          case "postcode": return this.handleInput.bind(this)
                          case "nama-petani": return this.handleInput.bind(this) 
                          case "tempat_lahir": return this.handleInput.bind(this)
                          case "nama-ibu": return this.handleInput.bind(this)
                          case "bank-owner-name": return this.handleInput.bind(this)
                          case "name": return this.handleInput.bind(this)
                          case "birth_place": return this.handleInput.bind(this)
                          case "nama-rukman": return this.handleInput.bind(this) 
                          case "nama-lahan": return this.handleInput.bind(this) 
                          case "large": return this.handleInput.bind(this)
                          case "height": return this.handleInput.bind(this)
                          case "irigation": return this.handleInput.bind(this)
                          case "rel_status": return this.handleInput.bind(this)
                          case "title": return this.handleInput.bind(this)
                          case "search_admin": return this.handleInput.bind(this)
                          case "code": return this.handleInput.bind(this)
                          case "link": return this.handleInput.bind(this)
                          case "biaya": return this.handleInput.bind(this)
                          case "qty":   return this.handleInput.bind(this)
                          case "item":   return this.handleInput.bind(this)
                          case "satuan":   return this.handleInput.bind(this)
                          default:      return null
                        }
                    })()}
                    value={(() => {
                        switch (this.props.inputId) {
                          case "no_ktp":   return this.state.valueInput
                          case "no_rek":   return this.state.valueInput
                          case "no_hp":   return this.state.valueInput
                          case "postcode": return this.state.valueInput
                          case "nama-petani": return this.state.valueInput 
                          case "tempat_lahir": return this.state.valueInput
                          case "nama-ibu": return this.state.valueInput
                          case "bank-owner-name": return this.state.valueInput
                          case "name": return this.state.valueInput
                          case "birth_place": return this.state.valueInput
                          case "email": return this.state.valueInput
                          case "nama-rukman": return this.state.valueInput 
                          case "nama-lahan": return this.state.valueInput 
                          case "large": return this.state.valueInput 
                          case "height": return this.state.valueInput 
                          case "irigation": return this.state.valueInput 
                          case "rel_status": return this.state.valueInput 
                          case "title": return this.state.valueInput 
                          case "search_admin": return this.state.valueInput 
                          case "code": return this.state.valueInput 
                          case "link": return this.state.valueInput
                          case "biaya": return this.state.valueInput
                          case "qty": return this.state.valueInput
                          case "item": return this.state.valueInput
                          case "satuan": return this.state.valueInput
                          default:      return ''
                        }
                    })()}
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