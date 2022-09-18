import React, { Component } from 'react'
import './ContactList.css'
import axios from 'axios'
import bookicon from './addrbookicon.png'
import addicon from './add.png'
import edit from './edit.png'
import delete1 from './delete.png'
import { Link } from 'react-router-dom';


class ContactListClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            content: ''
        }
    }


    getData() {
        axios.get('http://localhost:9090/addressbook/readList').then((response) => {
            console.log(response.data);
            var data = response.data
            this.setState({ data: data })
        })
    }

    componentDidMount() {
        this.getData()
    }

    handleDelete = (id) => {
        axios.delete('http://localhost:9090/addressbook/delete/' + id).then(res => {
            this.setState({ data: this.state.data.filter(c => c.contactId !== c.contactId) })
            this.getData();
        });

    }

    onInputChange = (c) => {
        this.setState({ [c.target.name] : c.target.value });
    }

    handleSearch = () => {
        this.setState({data:[]})
        axios.get('http://localhost:9090/addressbook/getbycitybycontent/' + this.state.content)
            .then(result => result.data)
            .then((data) => {
            this.setState({ data: data })
            })
    };

    render() {
        return (
            <body>
                <header class="header-content header">
                    <div className='logo-content'>
                        <div className='left'>
                            <img className='logo' src={bookicon} alt='abc' />
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
                        <div className='searchdiv'>
                            <input className='input' type='text' id='content' name='content' placeholder='Search by name' onChange={this.onInputChange} />
                            <button className='searchbtn' onClick={this.handleSearch}> Search </button> 
                        </div>
                        <a href='/form' className='add-button'>
                            <img class='add-img' src={addicon} alt='icon' /> Add Contact
                        </a>
                    </div>
                </div>
                <table id='display' className='table'>
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
                        <th>Actions</th>
                    </tr>
                    {this.state.data.map(data => (
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
                            <td>

                                <img src={delete1} onClick={() => this.handleDelete(data.contactId)} alt='delete' />
                                {/* <img src={edit} alt='edit' /> */}
                                <Link to={`/form/${data.contactId}`}><img src={edit} onClick={() => console.log(data.contactId)} alt='edit' /></Link>
                            </td>

                        </tr>
                    ))}
                </table>
            </body>

        )
    }
}

export default ContactListClass