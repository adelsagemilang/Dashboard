import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom'

class DropdownMenu extends Component {
     constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={this.props.id} className="dropdown-collapse" >
                <ul className="list-unstyled">
                    <li>Edit</li>
                    <li>
                    	<Link to="/admin/peserta-program">Peserta Program</Link>
                    </li>
                    <li>
                    	<Link to="/admin/ajukan-program">Ajukan Kembali</Link>
                    </li>
                    <li onClick={this.props.toggleHapusProgram}>Hapus</li>
                </ul>
            </div>
        );
    }
}

export default DropdownMenu;
