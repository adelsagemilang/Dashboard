import React from 'react'
import BurgerMenu from 'react-burger-menu'
import ListMenu from './sidebar/ListMenu'
import axios from 'axios'
import Cookie from 'react-cookie';
import Crypto from 'crypto-js';
import Base64 from 'base-64';
import autoBind from 'react-autobind';
import { API_URL, TK_KEY } from '../../containers/RootUrl'
import { Link } from 'react-router-dom'

import "../../stylesheet/component/common/_header.scss"
import "../../stylesheet/component/common/sidebar/_sidebar.scss" 

const MenuWrap = React.createClass({

    getInitialState() {
        return {hidden : false};
    },

    toggle() {
        this.setState({hidden: !this.state.hidden});
    },

    render() {

        let style;

        if (this.state.hidden) {
            style = {display: 'none'};
        }

        return (
            <div style={style} className={this.props.side}>
                {this.props.children}
            </div>
        );
    }
});

export default class ResponsiveHeader extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
            currentMenu: 'push',
            side: 'right',
            hidden: true,
        }

        this.authToken = Crypto.AES.decrypt(Base64.decode(Cookie.load('TK')), TK_KEY).toString(Crypto.enc.Utf8)
        this.userLevel = Crypto.AES.decrypt(Base64.decode(Cookie.load('user_level_name')), TK_KEY).toString(Crypto.enc.Utf8)
    }

    handleLogout(){
        Cookie.remove('TK', { path: '/' });
        Cookie.remove('user_level_name', { path: '/' });
        Cookie.remove('username', { path: '/' });
        window.location.reload(true)
    }

    componentDidMount(){
        const url = window.location.pathname;
        const urlsplit = url.split('/').slice(3)[0];
    }

    componentDidMount(){
        axios.get(API_URL + 'users',{
            headers:{ 
                'X-AUTH-TOKEN' : this.authToken
            }
        })
        .then(res => {
            const {
                image = res.data.image,
                name = res.data.name
                
                
            } = this.state

            this.setState({
                image,
                name
            })

        })
        .catch((error) => {
            console.log('err: '+ error)
        })
    }

  render() {
        const isMenuOpen = function(state){
          let burger = document.getElementsByClassName("bm-burger-button")
          let pagewrap = document.getElementById("page-wrap")

          if (state.isOpen){
            return (
              state.isOpen,
              burger[0].style.right='270px',
              burger[0].classList.toggle('open'),
              pagewrap.style.transform='none' ,
              pagewrap.style.right='250px'       
            )
          }
          else {
            return (
               burger[0].style.right='36px',
               burger[0].classList.toggle('open'),
               pagewrap.style.right='0px' 
            )
          }

          
        }

        const Menu = BurgerMenu[this.state.currentMenu];
        let styles = {
            bmBurgerButton: {
                position: 'fixed',
                width: '24px',
                height: '18px',
                right: '36px',
                top: '24px',
                zIndex: '2',
                transition: '.5s all ease'
            },
            bmMenuWrap: {
              height: 'calc(100% + 30px)',
              top: '-15px'
            },
            bmItemList: {
              marginTop: '20px'
            },
            bmBurgerBars: {
                background: '#ffffff',
                height: '4px',
                borderRadius: '3px'
            },
            bmMorphShape: {
                fill: '#373a47'
            },
            bmItemList: {
                color: '#b8b7ad',
                padding: '0.8em'
            },
            bmOverlay: {
                background: 'rgba(0, 0, 0, 0.3)'
            }
        };

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


        return (
             <MenuWrap wait={20}>
              <div id="push-wrapper">
                <Menu
                    styles={styles}
                    noOverlay id={this.state.currentMenu}
                    pageWrapId={'page-wrap'}
                    outerContainerId={'outer-container'}
                    onStateChange={ isMenuOpen }
                    crossButtonClassName= {'hidden'}
                    right
                >
                    <div className="box-user">
                        <div className="box-img-user">
                            <img src={ this.state.image ? this.state.image : "../images/user-img.png"} />
                        </div>
                        <div className="box-user-text">
                            <a href="/admin/edit-akun/" className="username">{this.state.name}</a>
                            <p className="status">{this.userLevel}</p>
                        </div>
                    </div>
                    <Link to="/dashboard">
                        <div >
                            <ListMenu text="Dashboard" icon="../images/icon/menu_icon/menu_icon_1.svg" classActive={dashboard}/>
   
                        </div>
                    </Link>
                    <Link to="/admin/data-petani">
                        <div>
                            <ListMenu text="Data Petani" icon="../images/icon/menu_icon/menu_icon_2.svg" classActive={dataPetani}/>
                        </div>
                    </Link>
                    <Link to="/admin/data-kelompok-tani">
                        <div>
                            <ListMenu text="Data Kelompok Tani" icon="../images/icon/menu_icon/menu_icon_3.svg" classActive={dataKelTani}/>
                        </div>
                    </Link>
                    <Link to="/admin/order-out">
                        <div>
                            <ListMenu text="Data Order Keluar" icon="../images/icon/menu_icon/order-icon.svg" classActive={OrderOut}/>
                        </div>
                    </Link>
                    <Link to="/admin/data-panen">
                        <div>
                            <ListMenu text="Data Panen" icon="../images/icon/menu_icon/panen-icon.svg" classActive={dataPanen}/>
                        </div>
                    </Link>
                    <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/data-anggota-kelompok-tani">
                        <div>
                            <ListMenu text="Data Anggota Kel. Tani" icon="../images/icon/menu_icon/menu_icon_4.svg" classActive={dataAnggota}/>
                             <span className="not-available">coming soon</span>
                        </div>
                    </Link>
                    <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/data-lahan">
                        <div>
                            <ListMenu text="Data Lahan" icon="../images/icon/menu_icon/menu_icon_5.svg" classActive={dataLahan}/>
                             <span className="not-available">coming soon</span>
                        </div>
                    </Link>
                    <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/data-tiket-program">
                        <div>
                            <ListMenu text="Tiket Program" icon="../images/icon/menu_icon/menu_icon_6.svg" classActive={dataTiket}/>
                             <span className="not-available">coming soon</span>
                        </div>
                    </Link>
                    <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/program">
                        <div>
                            <ListMenu text="Program" icon="../images/icon/menu_icon/menu_icon_7.svg" classActive={program}/>
                             <span className="not-available">coming soon</span>
                        </div>
                    </Link>
                    <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/kegiatan-petani">
                        <div>
                            <ListMenu text="Kegiatan Petani" icon="../images/icon/menu_icon/menu_icon_8.svg" classActive={kegPetani}/>
                             <span className="not-available">coming soon</span>
                        </div>
                    </Link>
                    <Link className="disabled-link" onClick={e => e.preventDefault()} to="/admin/rekap-kegiatan">
                        <div>
                            <ListMenu text="Rekap Kegiatan" icon="../images/icon/menu_icon/menu_icon_9.svg" classActive={rekapKegiatan}/>
                             <span className="not-available">coming soon</span>
                        </div>
                    </Link>
                    <div className="bg-sidebar">
                      <img src="../images/bg_sidebar_expanded.png" />
                    </div>
                </Menu>
              </div>
            </MenuWrap>
        );
    }
}