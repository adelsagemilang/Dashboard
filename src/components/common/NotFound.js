import React, {Component, PropTypes} from 'react'
import Header from '../common/Header'
import ResponsiveHeader from '../common/ResponsiveHeader'
import { Link } from 'react-router-dom'
import { ButtonPrimary } from '../common/ButtonPrimary'

export default class NotFound extends Component{
    constructor(props){
        super(props)

    }



    render(){

        return(
            <div id="outer-container">
                <ResponsiveHeader />
                <div id="page-wrap" className="main-content">
                    <div className="responsive-header">
                        <img src="../images/logo-white.svg" height="35"/>
                    </div>
                    <Header title="Page Not Found" />
                    <div className="user-access">
                        <div className="user-access-container text-center no-content">
                            <img src="../images/not_found.svg" alt="" height="180"/>
                            <h3 className="mg-t-20 normal">Halaman Tidak Ditemukan</h3>
                            <Link to="/dashboard" className="box-btn auto mg-t-40">
                                <ButtonPrimary name="Kembali Ke Beranda" />
                            </Link>
                         </div>
                    </div>
                </div>
            </div>
        )
    }
}