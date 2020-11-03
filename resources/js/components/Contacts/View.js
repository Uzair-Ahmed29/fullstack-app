import React from 'react';
import axios from 'axios';
import { Table, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './contact.scss';
import Loader from '../Loader/Loader';
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";  
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class View extends React.Component{

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        // this.handlePageChange = this.handlePageChange.bind(this);
        toast.configure();
        this.state = {
            contacts: [],
            loader: false,
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
        }
    }


    notify() {
        toast.info("🦄 Contact Deleted Successfully!",{
            transition: "slide",
        });
    }

    getContacts = async () => {
        this.setState({loader: true});
        const res = await axios.get('/contact');
        this.setState({ 
            contacts: res.data.contacts.data,
            itemsCountPerPage: res.data.contacts.per_page,
            totalItemsCount: res.data.contacts.total,
            activePage: res.data.contacts.current_page,
        });
        this.setState({loader: false});
    }
   
    componentWillMount() {
        this.getContacts();
    }

    handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Contact!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                axios.delete("/contact/"+id);
                Swal.fire(
                    'Deleted!',
                    'Your Contact file has been deleted.',
                    'success'
                )
                this.notify();
                this.getContacts();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Your Contact file is safe :)',
                'error'
              )
            }
          }) 
    }

    async handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        const res = await axios.get(`/contact?page=${pageNumber}`);
        console.log(res.data.contacts);
        this.setState({ 
            contacts: res.data.contacts.data,
            itemsCountPerPage: res.data.contacts.per_page,
            totalItemsCount: res.data.contacts.total,
            activePage: res.data.contacts.current_page,
        });
      }

    renderContacts() {
        return this.state.contacts.map((contact, index) => {
            return(
                <tr key={contact.id}>
                    <td>{index+1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>
                        <Link className="btn btn-primary" to={`/edit/${contact.id}`}>Edit</Link>
                        <Button onClick={() => this.handleDelete(contact.id)} className="ml-5 btn btn-danger">Delete</Button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        if(this.state.loader == true){
            return (
                <React.Fragment>
                    <Loader />
                </React.Fragment>
            );
        } else {
            return(
                <React.Fragment>
                    <Card>
                        <Card.Header>Contacts</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Username</th>
                                    <th width="25%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderContacts()}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={this.state.itemsCountPerPage}
                                    totalItemsCount={this.state.totalItemsCount}
                                    pageRangeDisplayed={this.state.pageRangeDisplayed}
                                    onChange={this.handlePageChange.bind(this)}
                                    itemClass='page-item'
                                    linkClass='page-link'
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </React.Fragment>
            );
        }
    }
}

export default View;