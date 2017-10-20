import React, { Component } from 'react'
import ListMenu from './ListMenu'
import { Link } from 'react-router-dom'
import autoBind from 'react-autobind';
import "../../../stylesheet/component/common/sidebar/_sidebar.scss" 

export default class SideBar extends Component {
    constructor(props){
        super(props)
        autoBind(this)
        this.state = {

            isExpandAdmin: '',
            isActive: ''

        }

    }

    componentDidMount(){
        const url = window.location.pathname;
        const urlsplit = url.split('/').slice(3)[0];
    }
 
    render(){
        let isActive = this.state.isActive
        const url = window.location.pathname;

        if(url === '/' || url === '/login' ||  url === '/login/' || url === '/404' ||  url === '/404/'){
            return null;
        }

        const dashboard = url === '/dashboard' ||  url === '/dashboard/' ? 'list-menu-active' : isActive = ''
        const dataPetani = url === '/admin/data-petani' || url === '/admin/data-petani/' ? 'list-menu-active' : isActive = ''
        const dataKelTani = url === '/admin/data-kelompok-tani' || url === '/admin/data-kelompok-tani/' ? 'list-menu-active' : isActive = ''
        const OrderOut = url === '/admin/order-out' ||  url === '/admin/order-out/' ? 'list-menu-active' : isActive = ''
        const dataPanen = url === '/admin/data-panen' ||  url === '/admin/data-panen/' ? 'list-menu-active' : isActive = ''
        const dataAnggota = url === '/admin/data-anggota-kelompok-tani' || url === '/admin/data-anggota-kelompok-tani/' ? 'list-menu-active' : isActive = ''
        const dataLahan = url === '/admin/data-lahan' || url === '/admin/data-lahan/' ? 'list-menu-active' : isActive = ''
        const dataTiket = url === '/admin/data-tiket-program' || url === '/admin/data-tiket-program/' ? 'list-menu-active' : isActive = ''
        const program = url === '/admin/program' || url === '/admin/program/' || url === '/admin/ajukan-program' || url === '/admin/ajukan-program/' || url === '/admin/peserta-program' || url === '/admin/peserta-program/' ? 'list-menu-active' : isActive = ''
        const kegPetani = url === '/admin/kegiatan-petani' || url === '/admin/kegiatan-petani/' ? 'list-menu-active' : isActive = ''
        const rekapKegiatan = url === '/admin/rekap-kegiatan' || url === '/admin/rekap-kegiatan/' ? 'list-menu-active' : isActive = ''
        

        return(
            <div className="sidebar">
                <div className="container-sidebar">
                    <div className="box-image">
                        <img src="../images/typeface-aruni.svg" />
                    </div>
                    <div className="box-list">
                        <Link to="/dashboard">
                            <div >
                                <ListMenu padding="no-pad" text="Dashboard" icon="../images/icon/menu_icon/menu_icon_1.svg" classActive={dashboard}/>
       
                            </div>
                        </Link>
                        <Link to="/admin/data-petani">
                            <div>
                                <ListMenu padding="no-pad" text="Data Petani" icon="../images/icon/menu_icon/menu_icon_2.svg" classActive={dataPetani}/>
                            </div>
                        </Link>
                        <Link to="/admin/data-kelompok-tani">
                            <div>
                                <ListMenu padding="no-pad" text="Data Kelompok Tani" icon="../images/icon/menu_icon/menu_icon_3.svg" classActive={dataKelTani}/>
                            </div>
                        </Link>
                        <Link to="/admin/order-out">
                            <div>
                                <ListMenu padding="no-pad" text="Data Order Keluar" icon="../images/icon/menu_icon/order-icon.svg" classActive={OrderOut}/>
                            </div>
                        </Link>
                        <Link to="/admin/data-panen">
                            <div>
                                <ListMenu padding="no-pad" text="Data Panen" icon="../images/icon/menu_icon/panen-icon.svg" classActive={dataPanen}/>
                            </div>
                        </Link>
                        <Link to="/admin/data-lahan">
                            <div>
                                <ListMenu padding="no-pad" text="Data Lahan" icon="../images/icon/menu_icon/menu_icon_5.svg" classActive={dataLahan}/>
                            </div>
                        </Link>
                        <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/data-anggota-kelompok-tani">
                            <div>
                                <ListMenu padding="no-pad" text="Data Anggota Kel. Tani" icon="../images/icon/menu_icon/menu_icon_4.svg" classActive={dataAnggota}/>
                                 <span className="not-available">coming soon</span>
                            </div>
                        </Link>
                        <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/data-tiket-program">
                            <div>
                                <ListMenu padding="no-pad" text="Tiket Program" icon="../images/icon/menu_icon/menu_icon_6.svg" classActive={dataTiket}/>
                                 <span className="not-available">coming soon</span>
                            </div>
                        </Link>
                        <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/program">
                            <div>
                                <ListMenu padding="no-pad" text="Program" icon="../images/icon/menu_icon/menu_icon_7.svg" classActive={program}/>
                                 <span className="not-available">coming soon</span>
                            </div>
                        </Link>
                        <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/kegiatan-petani">
                            <div>
                                <ListMenu padding="no-pad" text="Kegiatan Petani" icon="../images/icon/menu_icon/menu_icon_8.svg" classActive={kegPetani}/>
                                 <span className="not-available">coming soon</span>
                            </div>
                        </Link>
                        <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/rekap-kegiatan">
                            <div>
                                <ListMenu padding="pd-b-100" text="Rekap Kegiatan" icon="../images/icon/menu_icon/menu_icon_9.svg" classActive={rekapKegiatan}/>
                                 <span className="not-available">coming soon</span>
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