import axios from 'axios'
import React , { useEffect,  useState } from 'react'
import bookicon from './addrbookicon.png'
import addicon from './add.png'

function ContactList() {
    
    // const [userLoaded, setUserLoaded] = useState(false);

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

    useEffect(() => {
    //     (async () => {
        //   setUserLoaded(false);
         getContacts();
        //   console.log(res);
        //   setContact(res);
        //   if (res.success) {
            // console.log(res.data);
            // setUserLoaded(true);
        //   }
        // })();
      } , []);
    
    // const onInputChange = e => {
    //     setContact({ ...contact, [e.target.name]: e.target.value })
    // }
    const getContacts = () => {
        console.log("hello");
        axios.get('http://localhost:9090/addressbook/readList').then((response) => {
            
            setContact(response.data)})
            return contact;
            // console.log(contact);
            
        }
        // const d = contact.map(item => item)
        // console.log(contact);
        
        return (

        <>
            <header className="header-content header">
                <div className='logo-content'>
                    <div className='left'>
                        <img className='logo' src={bookicon} alt='bookicon' />
                        <span className='emp-text'>ADDRESS</ span>
                        <span className='emp-text emp-payroll'>BOOK</span>
                    </div>
                </div>
            </header>
            <div className='main-content'>
                <div className='header-content'>
                    <div className='emp-detail-text'>
                        Contact Details <div className='emp-count'>10</div>
                    </div>

                    <a href='/form' className='add-button'>
                        <img className='add-img' src={addicon} alt='icon' /> &nbsp;&nbsp;Add Contact
                    </a>
                </div>
            </div>
            <table id='display' className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Phone</th>
                    <th>Mail</th>
                </tr>
                </thead>
                <tbody>
   
                 {Object.values(contact).map((data) => (
                    <tr>
                        <td key={data.contactId}>{data.contactId}</td>
                        <td key={data.contactId}> {data.firstName}</td>
                        <td key={data.contactId}> {data.lastName}</td>
                        <td key={data.contactId}>{data.address}</td>
                        <td key={data.contactId}>{data.city}</td>
                        <td key={data.contactId}>{data.state}</td>
                        <td key={data.contactId}>{data.zip}</td>
                        <td key={data.contactId}>{data.phoneNumber}</td>
                        <td key={data.contactId}>{data.mail}</td>
                    </tr>
                    
                ) ) } 
                </tbody>
            </table>
        </>

    )
}
    

export default ContactList
