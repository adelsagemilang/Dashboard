import React, {Component, PropTypes} from 'react'
import Cookie from 'react-cookie'
import { actionAuth } from '../../actions/actionAuth'


export default class HomeComp extends Component{
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
     
    }

    render(){
        return(
            <div>
                <div className="dashboard">
                    <div className="dashboard-top">
                        <div className="box-stat">
                            <div className="box text-center">
                                <h3>12</h3>
                                <p>Jumlah Petani</p>
                            </div>
                            <div className="box text-center">
                                <h3>10</h3>
                                <p>Jumlah Kelompok Petani</p>
                            </div>
                            <div className="box text-center">
                                <h3>7 <span className="text-muted">/ 12</span></h3>
                                <p>Keikutsertaan Petani pada Program</p>
                            </div>
                        </div>
                        <div className="box-tiket">
                            <p className="strong">Tiket Program</p>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}