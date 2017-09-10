import React, { Component, PropTypes } from 'react';
import { ButtonPrimary } from '../../../common/ButtonPrimary'

class PhoneNotFound extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="add-popup">
	           	<div className="popup-container sm">
					<div className="box-content">
						<div className="content">
							<p className="title">Data Petani</p>
                            <p className="sub-title">Petani Belum Terdaftar</p>
                            <div className="box-btn auto" onClick={this.props.handleDaftar}>
                            <ButtonPrimary
                                class="button-primary"
                                type="submit"
                                name="Daftarkan Petani" />
                            </div>
                            <div className="box-btn auto" onClick={this.props.togglePhoneNotFound}>
                                <ButtonPrimary
                                class="button-secondary"
                                type="button"
                                name="Batal" />
                            </div>
						</div>
						<div className="footer-content"></div>
					</div>
				</div>
           </div> 
        );
    }
}

export default PhoneNotFound;
