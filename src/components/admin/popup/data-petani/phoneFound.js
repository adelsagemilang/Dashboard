import React, { Component, PropTypes } from 'react';
import { ButtonPrimary } from '../../../common/ButtonPrimary'

class PhoneFound extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="add-popup">
	           	<div className="popup-container sm">
					<div className="box-content">
						<div className="content">
							<p className="title warning">Petani Sudah Terdaftar</p>
							<p className="sub-title">Data petani sudah terdaftar dalam database</p>
	                        <div className="box-btn" onClick={this.props.togglePhoneFound}>
	                            <ButtonPrimary
	                            class="button-secondary"
	                            type="button"
	                            name="OK" />
	                        </div>
						</div>
						<div className="footer-content warning"></div>
					</div>
				</div>
           </div> 
        );
    }
}

export default PhoneFound;
