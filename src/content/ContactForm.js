import React, { useEffect, useState } from 'react'
import './ContactForm.css'
import axios from 'axios'
import bookicon from './addrbookicon.png'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ContactForm() {

    const params = useParams()
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: '',
        mail: ''
    })

    const onInputChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    };
    useEffect(()=>{
        if (params.id) {
            console.log(params.id)
            getContact()
        }

    },[])

    const handle = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:9090/addressbook/create',contact).then((res)=>{console.log(res);},
        (error) => {console.log(error);} );
    }


    const getContact =async()=>{
        // e.preventDefault();
        console.log(params.id)

        axios.get(`http://localhost:9090/addressbook/readbyid/${params.id}`).then((response)=>{
        console.log(response)  
        const d =response.data
        setContact(d)
    })}

    const update = e=>{
        e.preventDefault();
    axios.put(`http://localhost:9090/addressbook/update/${params.id}`,contact)

    .then( (response) =>{setContact(response.data)},
    (error) => {console.log(error);} );
        

        // axios.post('/form',{name,photo,gender,dept,day,month,year,note})
        // .then(response =>{console.log(response)})
    };

    const submitContact = e => {

        if (params.id) {update(e) } else {handle(e)}
        }


    return (
        <div>
            <header className='header-content header'>
                <div className='logo-content'>
                <Link to={'/'}><img className='logo' src={bookicon} alt='abc' /></Link>

                    {/* <img className='icon' src={bookicon} alt='photo' /> */}
                    <div>
                        <span className='emp-text'>ADDRESS</span>
                        <span className='emp-text emp-payroll'>BOOK</span>
                    </div>
                </div>
            </header>
            <div className='form-content' >
                <form className='form' method='post' onSubmit={submitContact} >
                    <div className='form-head'>Address Book Form</div>
                    <div className='row-content'>
                        <label className='label text' for='firstName'>First Name</label>
                        <input className='input' type='text' id='firstName' name='firstName' value={contact.firstName} onChange={(e) => onInputChange(e)} placeholder='First Name' />
                    </div>
                    <div className='row-content'>
                        <label className='label text' for='lastName'>Last Name</label>
                        <input className='input' type='text' id='lastName' name='lastName' value={contact.lastName} onChange={(e) => onInputChange(e)} placeholder='Last Name' />
                    </div>
                    <div className='row-content'>
                        <label className='label text' for='address'>Address</label>
                        <input className='input' type='text' id='address' name='address' value={contact.address} onChange={(e) => onInputChange(e)} placeholder='address' />
                    </div>
                    <div className='row-content'>
                        <label className='label text' for='city' >City</label>
                        <input className='input' type='text' id='city' name='city' value={contact.city} onChange={(e) => onInputChange(e)} placeholder='city' />
                    </div>
                    <div className='row-content'>
                        <label className='label text' for='state'>State</label>
                        <input className='input' type='text' id='state' name='state' value={contact.state} onChange={(e) => onInputChange(e)} placeholder='state' />
                    </div>
                    <div className='row-content'>
                        <label className='label text' for='zip'>Zip</label>
                        <input className='input' type='number' id='zip' name='zip' value={contact.zip} onChange={(e) => onInputChange(e)} placeholder='zip' />
                    </div>
                    <div className='row-content'>
                        <label className='label text' for='phoneNumber'>Phone Number</label>
                        <input className='input' type='number' id='phoneNumber' name='phoneNumber'  value={contact.phoneNumber} onChange={(e) => onInputChange(e)} placeholder='Phone Number' />
                    </div>
                    <div className='row-content'>
                        <label className='label text' for='mail'>Mail</label>
                        <input className='input' type='text' id='mail' name='mail' value={contact.mail} onChange={(e) => onInputChange(e)} placeholder='mail' />
                    </div>
                    <div className='buttonParent'>
                        <a href='abcd.com' className='resetButton button cancelButton'>Cancel</a>
                        <div className='submit-reset'>
                            <button type='submit' className='button submitButton' id='submitButton' >Submit</button>
                            <button type='reset' className='resetButton button'>Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactForm