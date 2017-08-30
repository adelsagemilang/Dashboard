import React, { Component } from 'react'
import "../../stylesheet/component/common/_header.scss"

export default class Header extends Component{
    render(){
        return(
            <div className="header-comp">
                <div className="header-container">
                    <div className="box-logout header-icon">
                        <img src="../images/icon/logout-icon.svg" />
                    </div>
                    <div className="box-setting header-icon">
                        <img src="../images/icon/setting-icon.svg" />
                    </div>
                    <div className="box-user">
                        <div className="box-img-user">
                            <img src="../images/user-img.jpeg" />
                        </div>
                        <div className="box-user-text">
                            <p className="username">Rendyansyah Syabany</p>
                            <p className="status">Admin</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}