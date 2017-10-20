import React, {PropTypes, Component} from 'react'
import Select from 'react-select'
import autoBind from 'react-autobind'


export default class MultiSelectField extends Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {
      crazy: false
    };

  }

  static propTypes = {
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ])
  }

  render () {
    const fruits = this.props.data
        return (
            <div className="section w-100 mg-t-5">
                <h3 className="section-heading">{this.props.label}</h3>
                <Select className="w-100" 
                  multi 
                  joinValues 
                  value={this.props.value} 
                  placeholder="Pilih Komoditas" 
                  options={fruits} 
                  onChange={this.props.handleChange} 
                  labelKey="name"
                  valueKey="id_commodity"
                  />
            </div>
        );
    }
}