import React, { Component, PropTypes } from 'react';
import { ButtonPrimary } from '../../../common/ButtonPrimary'

class HapusData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="add-popup">
	           	<div className="popup-container md">
					<div className="box-content">
						<div className="content">
							<p className="title warning">Hapus Tiket Program</p>
							<p className="sub-title">Apakah anda yakin akan menghapus Tiket
							Penanaman Cabai 1 Hektar (020671)?</p>
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
						<div className="footer-content warning"></div>
					</div>
				</div>
           </div> 
        );
    }
}

export default HapusData;
