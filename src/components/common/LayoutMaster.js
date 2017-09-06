import React, { Component } from 'react'
import Header from '../common/Header'
import SideBar from '../common/sidebar/SideBar'
import autoBind from 'react-autobind'

export default class LayoutMaster extends Component{
	constructor(props){
        super(props)
        autoBind(this)
        this.state = {   
        	title: '',
        	header: false
        }
    }

    checkSetHeader(){
    	const url = window.location.pathname;

    	if(url === '/dashboard' ||  url === '/dashboard/'){
            this.state = {
            	title: 'Dashboard',
            	header: true
            }
        }else if(url === '/admin/data-petani' || url === '/admin/data-petani/'){
            this.state = {
            	title: 'Data Petani',
            	header: true
            }
        }else  if(url === '/admin/data-kelompok-tani' || url === '/admin/data-kelompok-tani/'){
            this.state = {
            	title: 'Data Kelompok Tani',
            	header: true
            }
        }else  if(url === '/admin/data-anggota-kelompok-tani' || url === '/admin/data-anggota-kelompok-tani/'){
            this.state = {
            	title: 'Data Anggota Kelompok Tani',
            	header: true
            }
        }else  if(url === '/admin/data-lahan' || url === '/admin/data-lahan/'){
            this.state = {
            	title: 'Data Lahan',
            	header: true
            }
        }else  if(url === '/admin/data-tiket-program' || url === '/admin/data-tiket-program/'){
            this.state = {
            	title: 'Data Tiket Program',
            	header: true
            }
        }else  if(url === '/admin/program' || url === '/admin/program/'){
            this.state = {
            	title: 'Program',
            	header: true
            }
        }else  if(url === '/admin/kegiatan-petani' || url === '/admin/kegiatan-petani/'){
            this.state = {
            	title: 'Kegiatan Petani',
            	header: true
            }
        }else  if(url === '/admin/rekap-kegiatan' || url === '/admin/rekap-kegiatan/'){
            this.state = {
            	title: 'Rekap Kegiatan',
            	header: true
            }
        }else{
        	this.state = {
        		header: false
        	}
        }
    }

    setHeader(){
    	this.checkSetHeader()
    	if (this.state.header){
			return(
				<Header title={this.state.title} />
			)
		}else{
			return null
		}
    }

    render(){
    	
        return(
            <div>
            	{ this.setHeader() }
                <SideBar />
                {this.props.children}
            </div>
        )
    }
}