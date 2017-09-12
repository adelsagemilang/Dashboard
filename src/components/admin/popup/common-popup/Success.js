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
							<img src="../images/icon/icon_success.svg" />
							<p className="sub-title">Tiket Program berhasil ditambahkan</p>
							<div className="box-btn auto" onClick={this.props.toggleDeletePopup}>
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
