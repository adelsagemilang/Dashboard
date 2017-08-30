import React, { Component } from 'react'
import "../../../stylesheet/component/common/sidebar/_sidebar.scss"
import ListMenu from './ListMenu'
import ExpandMenuExpand from './ListMenuExpand'
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
            isExpandOnE: false
        }

    }

    handleClickMenuA(props){
        console.log('clicked menu ' + this.state.isExpandOnA)
        this.setState(prevState => ({
            isExpandOnA: !prevState.isExpandOnA
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

    renderExpand(){
        let {
            isExpandOnA, isExpandOnB, isExpandOnC,
            isExpandOnD, isExpandOnE
        } = this.state

        if(isExpandOnA === true){
            return (
                <div className="box-expand-list">
                    <ExpandMenuExpand class="expand-animate" text="Admin" link="admin"/>
                    <ExpandMenuExpand class="expand-animate" text="Admin Pemandu Rukman" link="admin-pemandu-rukman"/>
                    <ExpandMenuExpand class="expand-animate" text="Admin Rukman" link="admin-rukman"/>
                </div>
            )
        }else if(!isExpandOnB){
            return null
        }
        else
        {
            return null
        }
    }
 
    render(){
        let isActive = ''
        const url = window.location.pathname;
        if(url === '/home' ||  url === '/home/'){
            isActive = 'list-menu-active'
        }else if(url === '/admin/admin' || url === '/admin/admin/'){
            this.state.isExpandOnA = true
        }

        return(
            <div className="sidebar">
                <div className="container-sidebar">
                    <div className="box-image">
                        <img src="../images/typeface-aruni.svg" />
                    </div>
                    <div className="box-list">
                        <Link to="/home">
                            <div onClick={this.handleClickMenuHome} >
                                <ListMenu text="Home" icon="" classActive={isActive}/>
                            </div>
                        </Link>
                        <div onClick={this.handleClickMenuA} >
                            <ListMenu text="Akses User" icon="" classActive={this.state.isExpandOnA ? "list-menu-active" : null}/>
                            {this.renderExpand()}
                        </div>
                        <div onClick={this.handleClickMenuB}>
                            <ListMenu text="Pemandu Rukman" icon="" />
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