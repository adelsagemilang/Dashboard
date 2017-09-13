import React, { Component } from 'react'
import {
    Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import App from '../components/App'
import HomeComp from '../components/admin/HomeComp'
import Admin from '../components/admin/Admin'
import DataPetani from '../components/admin/DataPetani'
import DataKelompokTani from '../components/admin/DataKelompokTani'
import DataAnggotaKelompokTani from'../components/admin/DataAnggotaKelompokTani'
import DataLahan from'../components/admin/DataLahan'
import EditAkun from '../components/admin/EditAkun'
import TiketProgram from '../components/admin/TiketProgram'
import Program from '../components/admin/Program'
import AjukanProgram from '../components/admin/AjukanProgram'
import PesertaProgram from '../components/admin/PesertaProgram'
import RekapKegiatan from '../components/admin/RekapKegiatan'
import KegiatanPetani from '../components/admin/KegiatanPetani'
import DataOrderOut from '../components/admin/DataOrderOut'
import DataPanen from '../components/admin/DataPanen'
import LoginComp from '../components/LoginComp'
import { Authenticated } from './Auth'
import LayoutMaster from '../components/common/LayoutMaster'
import NotFound from '../components/common/NotFound'

export default class Routes extends Component {
    render(){
        return(
            <div>
                <LayoutMaster>
                    <Switch>
                        <Authenticated exact path="/" component={App} />
                        <Authenticated exact path="/dashboard" component={HomeComp}/>
                        <Authenticated exact path="/admin/data-petani" component={DataPetani}/>
                        <Authenticated exact path="/admin/data-kelompok-tani" component={DataKelompokTani}/>
                        <Authenticated exact path="/admin/order-out" component={DataOrderOut}/>
                        <Authenticated exact path="/admin/data-panen" component={DataPanen}/>
                        <Authenticated exact path="/admin/data-anggota-kelompok-tani" component={DataAnggotaKelompokTani}/>
                        <Authenticated exact path="/admin/data-lahan" component={DataLahan}/>
                        <Authenticated exact path="/admin/data-tiket-program" component={TiketProgram}/>
                        <Authenticated exact path="/admin/program" component={Program}/>
                        <Authenticated exact path="/admin/ajukan-program" component={AjukanProgram}/>
                        <Authenticated exact path="/admin/peserta-program" component={PesertaProgram}/>
                        <Authenticated exact path="/admin/kegiatan-petani" component={KegiatanPetani}/>
                        <Authenticated exact path="/admin/edit-akun" component={EditAkun}/>
                        <Authenticated exact path="/admin/rekap-kegiatan" component={RekapKegiatan}/>
                        <Authenticated exact path="/about" component={App}/>
                        <Authenticated exact path="/login" component={LoginComp}/>
                        <Route path='/404' component={NotFound} />
                        <Redirect from='*' to='/404' />
                    </Switch>
                </LayoutMaster>
            </div>
        )
    }
}