import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import App from '../components/App'
import HomeComp from '../components/admin/HomeComp'
import Admin from '../components/admin/Admin'
import DataPetani from '../components/admin/DataPetani'
import DataKelompokTani from '../components/admin/DataKelompokTani'
import EditAkun from '../components/admin/EditAkun'
import LoginComp from '../components/LoginComp'
import { requireAuth } from './requireAuth'
import LayoutMaster from '../components/common/LayoutMaster'
import NotFound from '../components/common/NotFound'

export default class Routes extends Component {
    render(){
        return(
            <div>
                <LayoutMaster>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/dashboard" component={HomeComp} onEnter={requireAuth} />
                        <Route path="/admin/data-petani" component={DataPetani} onEnter={requireAuth} />
                        <Route path="/admin/data-kelompok-tani" component={DataKelompokTani} onEnter={requireAuth} />
                        <Route path="/admin/edit-akun" component={EditAkun} onEnter={requireAuth} />
                        <Route path="/about" component={App} onEnter={requireAuth} />
                        <Route path="/login" component={LoginComp} onEnter={requireAuth} />
                        <Route path='/404' component={NotFound} />
                        <Redirect from='*' to='/404' />
                    </Switch>
                </LayoutMaster>
            </div>
        )
    }
}