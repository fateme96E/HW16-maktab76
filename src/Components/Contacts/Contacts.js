import React from "react";
import './Contacts.css';
import {FaRegTrashAlt} from 'react-icons/fa';
import {BiEdit} from 'react-icons/bi'



class Contacts extends React.Component {
    delete = (id) => {
        this.props.deleteContact(id);
    }

    edit = (id) => {
        this.props.editContact(id);
    }

    render() { 
        return (
            <div className="contact-container">
            {this.props.contacts.map((item, ind) => (
            <ul key={ind}>
                <div className="action-container">
                    <button><FaRegTrashAlt onClick={()=>this.delete(ind)}/></button>
                    <button><BiEdit onClick={()=>this.edit(ind)}/></button>
                </div>
                <li> {item.firstName} </li>
                <li> {item.lastName} </li>
                <li> {item.phone} </li>
                <li> {item.relationShip} </li>
                <li> {item.email} </li>
            </ul>
            ))}
        </div>
    ) 
    }
}
 
export default Contacts;