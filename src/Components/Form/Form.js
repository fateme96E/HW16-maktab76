import React from "react";
import './Form.css';
import Error from '../Error';


class Form extends React.Component {

    handleChange = (e) => {
        this.props.handleChange(e);
    }

    addPeople = (e) => {
        this.props.addPeople(e);
    }

    handleEdit = (e) => {
        e.target.value = '';
    }

    render() { 
        let firstName, lastName, phone, relationShip, email, errorFirstName, errorLastName, errorPhone, errorRelation, errorEmail, isValid, defaultError, btnVal;
        let className = this.props.mustEdit ? 'btn-edit': 'btn-add';

        if (this.props.mustEdit) {
            firstName = this.props.contactToEdit.firstName;
            lastName = this.props.contactToEdit.lastName;
            phone = this.props.contactToEdit.phone;
            relationShip = this.props.contactToEdit.relationShip;
            email = this.props.contactToEdit.email;
            errorFirstName = this.props.errorFirstName;
            errorLastName = this.props.errorLastName;
            errorPhone = this.props.errorPhone;
            errorRelation = this.props.errorRelation;
            errorEmail = this.props.errorEmail;
            isValid = this.props.isValid;
            defaultError = this.props.defaultError;
            btnVal = 'ویرایش';
        } else {
            firstName = this.props.firstName;
            lastName = this.props.lastName;
            phone = this.props.phone;
            relationShip = this.props.relationShip;
            email = this.props.email;
            errorFirstName = this.props.errorFirstName;
            errorLastName = this.props.errorLastName;
            errorPhone = this.props.errorPhone;
            errorRelation = this.props.errorRelation;
            errorEmail = this.props.errorEmail;
            isValid = this.props.isValid;
            defaultError = this.props.defaultError;
            btnVal = 'اضافه کردن';
        }


        return (
            <React.Fragment>
                <h2>وب اپلیکیشن مدیریت مخاطبین</h2>
                <form onSubmit={(e) => this.addPeople(e)}>

                    <input type="text" name="fname" value={firstName} placeholder="نام ..." dir="rtl" required onChange={(e)=>this.handleChange(e)}></input>
                    <Error>{errorFirstName}</Error>

                    <input type="text" name="lname" value={lastName} placeholder="نام خانوادگی ..." dir="rtl" required onChange={(e)=>this.handleChange(e)}></input>
                    <Error>{errorLastName}</Error>

                    <input type="tel" name="phone" value={phone} placeholder="شماره تماس ..." dir="rtl"  required onChange={(e)=>this.handleChange(e)}></input>
                    <Error>{errorPhone}</Error>

                    <select name="relationship" value={relationShip} dir="rtl"  required  onChange={(e)=>this.handleChange(e)}>
                        <option className="optionss" hidden> نسبت</option>
                        <option className="options" value="اعضای خانواده">اعضای خانواده</option>
                        <option className="options" value="دوست">دوست</option>
                        <option className="options" value="همکار">همکار</option>
                        <option className="options" value="فامیل">فامیل</option>
                    </select>
                    <Error>{errorRelation}</Error>

                    <input type="email" name="email" value={email} placeholder=" ایمیل ..." dir="rtl" required onChange={(e)=>this.handleChange(e)}></input>
                    <Error>{errorEmail}</Error>

                    <input className={`${className}`} type="submit" value={btnVal} disabled={(!isValid || defaultError) && !this.props.mustEdit}></input>
                </form>
            </React.Fragment>
        )
    }
}
 
export default Form;