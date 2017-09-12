import React, { Component, PropTypes } from 'react';

class Success extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="add-popup">
	           	<div className="popup-container sm">
					<div className="box-content">
						<div className="content">
							<p className="title warning text-center">Tiket Program berhasil ditambahkan</p>
							<p className="sub-title"></p>
							<div className="box-btn auto" onClick={this.props.toggleDeletePopup}>
	                        <ButtonPrimary
                                class="button-primary"
                                type="button"
                                name="Tidak" />
                            </div>
                            <div className="box-btn auto">
                                <ButtonPrimary
                                class="button-secondary"
                                type="submit"
                                name="Ya" />
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
