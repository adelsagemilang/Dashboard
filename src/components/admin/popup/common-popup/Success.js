import React, { Component, PropTypes } from 'react';
import { ButtonPrimary } from '../../../common/ButtonPrimary'

class Success extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="add-popup">
	           	<div className="popup-container sm">
					<div className="box-content">
						<div className="content text-center">
							<img src="../images/icon/icon_success.svg" height="100" className="mg-b-10 icon-success"/>
							<p className="sub-title">{ this.props.message ? this.props.message : 'Berhasil' }</p>
							<div className="box-btn auto" onClick={this.props.toggleSuccessPopup}>
	                        <ButtonPrimary
                                class="button-primary"
                                type="button"
                                name="Selesai" />
                            </div>
						</div>
						<div className="footer-content"></div>
					</div>
				</div>
           </div> 
        );
    }
}

export default Success;
