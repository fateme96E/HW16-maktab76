import React from 'react';
import Contacts from '../Contacts/Contacts';
import Form from '../Form/Form';
import './Container.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';


let defaultError = true;
let mustEdit = false;

class Container extends React.Component {
    state = { 
        firstName: '',
        lastName: '',
        phone: '',
        relationShip: '',
        email: '',

        errorFirstName: '',
        errorLastName: '',
        errorPhone: '',
        errorRelation: '',
        errorEmail: '',

        personInfo: [],
        showModal: false,
        idToDelete: '',
        idToEdit: '',
        contactToEdit: {},
     } 

    componentDidMount() {
        defaultError = false;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'fname') {
            this.setState({ firstName: value}, this.validateFirstName);
        }else if (name === 'lname') {
            this.setState({lastName: value}, this.validateLastName);
        }else if (name === 'phone') {
            this.setState({phone: value}, this.validatePhone);
        }else if (name === 'relationship') {
            this.setState({relationShip: value}, this.validateRelation);
        }else if(name === 'email') {
            this.setState({email: value}, this.validateEmail);
        }
    }

    validateFirstName = () => {
        const { firstName } = this.state;
        if (firstName === '') {
            this.setState({errorFirstName: 'نام الزامی است*'});
        } else if (firstName.length < 3) {
            this.setState({errorFirstName: 'نام باید حداقل 3 کاراکتر باشد*'});
        } else if (!new RegExp('[a-zA-Z]').test(firstName)  && !new RegExp('[آ-ی]').test(firstName)) {
            this.setState({errorFirstName: 'نام باید شامل حروف باشد*'});
        }else {
            this.setState({errorFirstName: ''});
        }
    }

    validateLastName = () => {
        const { lastName } = this.state;
        if (lastName === '') {
            this.setState({errorLastName: 'نام خانوادگی الزامی است*'});
        } else if (lastName.length < 3) {
            this.setState({errorLastName: 'نام خانوادگی باید حداقل 3 کاراکتر باشد*'});
        } else if (!new RegExp('[a-zA-Z]').test(lastName) && !new RegExp('[آ-ی]').test(lastName)) {
            this.setState({errorLastName: 'نام خانوادگی باید شامل حروف باشد*'});
        }  else {
            this.setState({errorLastName: ''});
        }
    }

    validatePhone = () => {
        const { phone } = this.state;
        if (phone === '') {
            this.setState({errorPhone: 'شماره تماس الزامی است*'});
        } else if (phone.length < 11) {
            this.setState({errorPhone: 'شماره تماس باید حداقل 11 رقم باشد*'});
        } else {
            this.setState({errorPhone: ''});
        }
    }

    validateRelation = () => {
        const { relationShip } = this.state;
        if (relationShip === '') {
            this.setState({errorRelation: 'نسبت الزامی است*'});
        } else {
            this.setState({errorRelation: ''});
        }
    }

    validateEmail = () => {
        const { email } = this.state;
        if (email === '') {
            this.setState({errorEmail: 'ایمیل الزامی است*'});
        } else if (!email.includes('@')) {
            this.setState({errorEmail: 'ایمیل صحیح نیست*'});
        } else {
            this.setState({errorEmail: ''});
        }
    }

    addPeople = (e) => {
        e.preventDefault();
        const { fname, lname, phone, relationship, email } = e.target.elements;
        const contact = {
            firstName: fname.value,
            lastName: lname.value,
            phone: phone.value,
            relationShip: relationship.value,
            email: email.value
        }

        if (!mustEdit) {
            this.setState({personInfo: [...this.state.personInfo, contact]});
            this.notify('Contact added successfully');
        }
        else {
            this.setState({personInfo: this.state.personInfo.map(person => person.id === this.state.idToEdit ? contact : person)});
            mustEdit = false;
            this.notify('Contact edited successfully');
        }
        
    }

    notify = (message) => {
        toast.success(message);
    }

    openModal = (id) => {
        this.setState({showModal: true});
        this.setState({idToDelete: id});
    }

    closeModal = () => {
        this.setState({showModal: false});
        this.setState({idToDelete: ''});
    }

    modalDelete = (id) => {
        this.setState({delete: true});
        const newContacts = this.state.personInfo.filter((contact, ind) => ind !== id);
        this.setState({personInfo: newContacts});
        this.closeModal();
        this.notify('Contact deleted successfully');
    }

    deleteContact = (id) => {
        this.openModal(id);
    }

    editContact = (id) => {
        const contact = this.state.personInfo[id];
        this.setState({idToEdit: id});
        this.setState({contactToEdit: contact});
        mustEdit = true;
    }


    render() { 
        const { 
            firstName,
            lastName, 
            phone, 
            relationShip,
            email,
            errorFirstName, 
            errorLastName, 
            errorPhone,
            errorRelation,
            errorEmail,
            personInfo} = this.state;

        const isValid = errorFirstName === '' && errorLastName === '' && errorPhone === '' && errorRelation === '' && errorEmail === '';

        return (
            <>
                <Form addPeople={this.addPeople} handleChange={this.handleChange} firstName={firstName} lastName={lastName} phone={phone} relationShip={relationShip} email={email}
                errorFirstName={errorFirstName} errorLastName={errorLastName} errorPhone={errorPhone} errorRelation={errorRelation} errorEmail={errorEmail}
                isValid={isValid} defaultError={defaultError} idToEdit={this.state.idToEdit} contactToEdit={this.state.contactToEdit} mustEdit={mustEdit}/>

                <Contacts contacts={personInfo} deleteContact={this.deleteContact} editContact={this.editContact} />

                <Modal isOpen={this.state.showModal} onRequestClose={this.closeModal} ariaHideApp={false}>
                    <h2>آیا مطمئن هستید؟</h2>
                    <button className="btn" onClick={() => this.modalDelete(this.state.idToDelete)}>بله</button>  
                    <button className="btn" onClick={this.closeModal}>خیر</button>
                </Modal>

                <ToastContainer />
                
            </>
        );
    }
}
 
export default Container;