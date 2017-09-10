import React, { Component, PropTypes } from 'react';
import Cookie from 'react-cookie'
import Crypto from 'crypto-js'
import Base64 from 'base-64'
import axios from 'axios'
import autoBind from 'react-autobind'
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { ButtonPrimary } from '../common/ButtonPrimary'
import { ButtonIcon } from '../common/ButtonIcon'
import TambahPetani from './popup/data-petani/TambahPetani'
import Header from '../common/Header'
import ReactPaginate from 'react-paginate'

class DataKelompokTani extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-content">
            	<p>TEST</p>
            </div>
        );
    }
}

export default DataKelompokTani;
