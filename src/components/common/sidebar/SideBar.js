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

            isExpendedA: false,
            isExpandAdmin: '',

        }

    }

    handleClickMenuA(props){
        console.log('clicked menu ' + this.state.isExpandOnA)
        this.setState( ({
            isExpandOnA: !this.state.isExpandOnA
        }))
    }

    handleClickMenuB(props){
        console.log('clicked menu ' + this.state.isExpandOnB)
        this.setState(prevState => ({
            isExpandOnB: !prevState.isExpandOnB
        }))
    }
 
    handleClickMenuC(props){
        console.log('clicked menu ' + this.state.isExpandOnC)
        this.setState(prevState => ({
            isExpandOnC: !prevState.isExpandOnC
        }))
    }
 
    handleClickMenuD(props){
        console.log('clicked menu ' + this.state.isExpandOnD)
        this.setState(prevState => ({
            isExpandOnD: !prevState.isExpandOnD
        }))
    }
 
    handleClickMenuE(props){
        console.log('clicked menu ' + this.state.isExpandOnE)
        this.setState(prevState => ({
            isExpandOnE: !prevState.isExpandOnE
        }))
    }
    

    renderExpandUserAccess(){
        let { isExpandOnA } = this.state

        if(isExpandOnA === true){
            return (
                <div className="box-expand-list">
                    <ListMenuExpand classActive={this.state.isExpandAdmin} text="Admin" link="admin"/>
                    <ListMenuExpand classActive={this.state.isExpandStatus} text="Admin Pemandu Rukman" link="admin-pemandu-rukman"/>
                    <ListMenuExpand classActive={this.state.isExpandStatus} text="Admin Rukman" link="admin-rukman"/>
                </div>
            )
        }else{
            return null
        }
    }
 
    renderExpandPemanduRukman(){
        let { isExpandOnB } = this.state

        if(isExpandOnB === true){
            return (
                <div className="box-expand-list">
                    <ListMenuExpand classActive={this.state.isExpandAdmin} text="Admin" link="admin"/>
                    <ListMenuExpand classActive={this.state.isExpandStatus} text="Admin Pemandu Rukman" link="admin-pemandu-rukman"/>
                    <ListMenuExpand classActive={this.state.isExpandStatus} text="Admin Rukman" link="admin-rukman"/>
                </div>
            )
        }else{
            return null
        }
    }
 
    render(){
        let isActive = ''

        const url = window.location.pathname;
        const urlsplit = url.split("/").slice(3)[0];
        
        if(url === '/home' ||  url === '/home/'){
            isActive = 'list-menu-active'

        }else if(url === '/admin/admin' || url === '/admin/admin/'){
            this.state = { 
                isExpandOnA: true,
                isExpendedA: true
            }
            isActive = 'list-menu-active'
            
            if(isActive){
                this.state.isExpandAdmin = 'expand-is-active'
            }else{
                return this.state.isExpendedA  === false
            }
        }else  if(url === '/pemandu-rukman/data-lokasi-petani' || url === '/pemandu-rukman/data-lokasi-petani/'){
            this.state = { 
                isExpandOnB: true,
                isExpendedB: true
            }
            
            if(this.state.isExpendedB  === true){
                this.state.isExpandAdmin = 'expand-is-active'
            }else{
                return this.state.isExpendedB  === false
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
                                <ListMenu text="Home" icon="" classActive={isActive}/>
                            </div>
                        </Link>
                        <div onClick={this.handleClickMenuA} >
                            <ListMenu text="Akses User" icon="" classActive={this.state.isExpandOnA ? isActive : null}/>
                            {this.renderExpandUserAccess()}
                        </div>
                        <div onClick={this.handleClickMenuB}>
                            <ListMenu text="Pemandu Rukman" icon="" classActive={this.state.isExpandOnB ? "list-menu-active" : null}/>
                            {this.renderExpandPemanduRukman()}
                        </div>
                        <div onClick={this.handleClickMenuC}>
                            <ListMenu text="Rukman" icon="" />
                        </div>
                        <div onClick={this.handleClickMenuD}>
                            <ListMenu text="Dompet" icon="" />
                        </div>
                        <div onClick={this.handleClickMenuE}>
                            <ListMenu text="Pusat Informasi" icon="" />
                        </div>
                    </div>
                    <div className="bg-sidebar">
                        <img src="../images/bg_sidebar_expanded.png" />
                    </div>
                </div>
            </div>
        )
    }
}