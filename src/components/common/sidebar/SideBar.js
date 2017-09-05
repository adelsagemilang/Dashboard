import React, { Component } from 'react'
import "../../../stylesheet/component/common/sidebar/_sidebar.scss"
import ListMenu from './ListMenu'
import ListMenuExpand from './ListMenuExpand'
import { Link } from 'react-router-dom'
import autoBind from 'react-autobind';

export default class SideBar extends Component {
    constructor(props){
        super(props)
        autoBind(this)
        this.state = {
            isExpandOnHome: false,

            isExpandOnA: false,
            isExpandOnB: false,
            isExpandOnC: false,
            isExpandOnD: false,
            isExpandOnE: false,
            isExpandonF: false,
            isExpandonG: false,
            isExpandonH: false,

            isExpandAdmin: '',

        }

    }
 
    render(){
        let isActive = ''

        const url = window.location.pathname;
        const urlsplit = url.split("/").slice(3)[0];
        
        if(url === '/home' ||  url === '/home/'){
            isActive = 'list-menu-active'
            this.state = {
                isExpandOnHome: true,
                isExpandOnA: false,
                isExpandOnB: false,
                isExpandOnC: false,
                isExpandOnD: false,
                isExpandOnE: false,
                isExpandonF: false,
                isExpandOnG: false,
                isExpandonH: false
            }

        }else if(url === '/admin/data-petani' || url === '/admin/data-petani/'){
            isActive = 'list-menu-active'
            this.state = {
                isExpandOnHome: false,
                isExpandOnA: true,
                isExpandOnB: false,
                isExpandOnC: false,
                isExpandOnD: false,
                isExpandOnE: false,
                isExpandonF: false,
                isExpandOnG: false,
                isExpandonH: false
            }
            
        }else  if(url === '/admin/data-kelompok-tani' || url === '/admin/data-kelompok-tani/'){
            isActive = 'list-menu-active'
            this.state = {
                isExpandOnHome: false,
                isExpandOnA: false,
                isExpandOnB: true,
                isExpandOnC: false,
                isExpandOnD: false,
                isExpandOnE: false,
                isExpandonF: false,
                isExpandOnG: false,
                isExpandonH: false
            }
            
        }else  if(url === '/admin/data-anggota-kelompok-tani' || url === '/admin/data-anggota-kelompok-tani/'){
            isActive = 'list-menu-active'
            this.state = {
                isExpandOnHome: false,
                isExpandOnA: false,
                isExpandOnB: false,
                isExpandOnC: true,
                isExpandOnD: false,
                isExpandOnE: false,
                isExpandonF: false,
                isExpandOnG: false,
                isExpandonH: false
            }
            
        }else  if(url === '/admin/data-lahan' || url === '/admin/data-lahan/'){
            isActive = 'list-menu-active'
            this.state = {
                isExpandOnHome: false,
                isExpandOnA: false,
                isExpandOnB: false,
                isExpandOnC: false,
                isExpandOnD: true,
                isExpandOnE: false,
                isExpandonF: false,
                isExpandOnG: false,
                isExpandonH: false
            }
            
        }else  if(url === '/admin/data-tiket-program' || url === '/admin/data-tiket-program/'){
            isActive = 'list-menu-active'
            this.state = {
                isExpandOnHome: false,
                isExpandOnA: false,
                isExpandOnB: false,
                isExpandOnC: false,
                isExpandOnD: false,
                isExpandOnE: true,
                isExpandonF: false,
                isExpandOnG: false,
                isExpandonH: false
            }
            
        }else  if(url === '/admin/program' || url === '/admin/program/'){
            isActive = 'list-menu-active'
            this.state = {
                isExpandOnHome: false,
                isExpandOnA: false,
                isExpandOnB: false,
                isExpandOnC: false,
                isExpandOnD: false,
                isExpandOnE: false,
                isExpandonF: true,
                isExpandOnG: false,
                isExpandonH: false
            }
            
        }else  if(url === '/admin/kegiatan-petani' || url === '/admin/kegiatan-petani/'){
            isActive = 'list-menu-active'
            this.state = {
                isExpandOnHome: false,
                isExpandOnA: false,
                isExpandOnB: false,
                isExpandOnC: false,
                isExpandOnD: false,
                isExpandOnE: false,
                isExpandonF: false,
                isExpandOnG: true,
                isExpandonH: false
            }
            
        }else  if(url === '/admin/rekap-kegiatan' || url === '/admin/rekap-kegiatan/'){
            isActive = 'list-menu-active'
            this.state = {
                isExpandOnHome: false,
                isExpandOnA: false,
                isExpandOnB: false,
                isExpandOnC: false,
                isExpandOnD: false,
                isExpandOnE: false,
                isExpandonF: false,
                isExpandOnG: false,
                isExpandonH: true
            }
            
        }else{
            return null
        }

        return(
            <div className="sidebar">
                <div className="container-sidebar">
                    <div className="box-image">
                        <img src="../images/typeface-aruni.svg" />
                    </div>
                    <div className="box-list">
                        <Link to="/home" replace>
                            <div >
                                <ListMenu text="Dashboard" icon="../images/menu_icon/menu_icon_1.svg" classActive={this.state.isExpandOnHome ? isActive : null}/>
                            </div>
                        </Link>
                        <Link to="/admin/data-petani">
                            <div>
                                <ListMenu text="Data Petani" icon="../images/menu_icon/menu_icon_2.svg" classActive={this.state.isExpandOnA ? isActive : null}/>
                            </div>
                        </Link>
                        <Link to="/admin/data-kelompok-tani">
                            <div>
                                <ListMenu text="Data Kelompok Tani" icon="../images/menu_icon/menu_icon_3.svg" classActive={this.state.isExpandOnB ? isActive : null}/>
                            </div>
                        </Link>
                        <Link to="/admin/data-anggota-kelompok-tani">
                            <div>
                                <ListMenu text="Data Anggota Kel. Tani" icon="../images/menu_icon/menu_icon_4.svg" classActive={this.state.isExpandOnC ? isActive : null}/>
                            </div>
                        </Link>
                        <Link to="/admin/data-lahan">
                            <div>
                                <ListMenu text="Data Lahan" icon="../images/menu_icon/menu_icon_5.svg" classActive={this.state.isExpandOnD ? isActive : null}/>
                            </div>
                        </Link>
                        <Link to="/admin/data-tiket-program">
                            <div>
                                <ListMenu text="Tiket Program" icon="../images/menu_icon/menu_icon_6.svg" classActive={this.state.isExpandOnE ? isActive : null}/>
                            </div>
                        </Link>
                        <Link to="/admin/program">
                            <div>
                                <ListMenu text="Program" icon="../images/menu_icon/menu_icon_7.svg" classActive={this.state.isExpandOnF ? isActive : null}/>
                            </div>
                        </Link>
                        <Link to="/admin/kegiatan-petani">
                            <div>
                                <ListMenu text="Kegiatan Petani" icon="../images/menu_icon/menu_icon_8.svg" classActive={this.state.isExpandOnG ? isActive : null}/>
                            </div>
                        </Link>
                        <Link to="/admin/rekap-kegiatan">
                            <div>
                                <ListMenu text="Rekap Kegiatan" icon="../images/menu_icon/menu_icon_9.svg" classActive={this.state.isExpandOnH ? isActive : null}/>
                            </div>
                        </Link>
                    </div>
                    <div className="bg-sidebar">
                        <img src="../images/bg_sidebar_expanded.png" />
                    </div>
                </div>
            </div>
        )
    }
}