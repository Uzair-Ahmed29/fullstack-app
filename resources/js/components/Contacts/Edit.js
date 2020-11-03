import Axios from 'axios';
import React from 'react';
import './contact.scss';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Edit extends React.Component {

    constructor() {
        super();
        toast.configure();
        this.state = {
            name: '',
            email: '',
            phone: ''
        }
    }

        notify() {
            toast("🎁 Contact updated Successfully!",{
                transition: "zoom",
            });
        }

        handleInput = (e) =>  {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

        checkForValidation() {
            if(this.state.name == '' || this.state.email == '' || this.state.phone == ''){
                return toast.error('Please fill the required fields!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } return true;
        }

        updateContact = async (e) => {
            e.preventDefault();
            if(this.checkForValidation() == true)
            {
                const id = this.props.match.params.id;
                const res = await Axios.put(`/contact/${id}`, this.state);
                this.props.history.push("/");
                this.notify();
            }
        }

        async componentDidMount() {
            const id = this.props.match.params.id;
            const res = await Axios.get(`/contact/${id}/edit`);
            
            this.setState({name: res.data.contact.name});
            this.setState({email: res.data.contact.email});
            this.setState({phone: res.data.contact.phone});
        }

        render() {
        return (
            <div>
                <Card>
                    <Card.Header>Edit Contact</Card.Header>
                    <Card.Body>
                        <div className="col-8 form">
                            <form onSubmit={this.updateContact}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control" type="text" placeholder="John Doe" name="name" onChange={this.handleInput} value={this.state.name}/>
                                </div>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input className="form-control" type="email" placeholder="john@doe.com" name="email"  onChange={this.handleInput} value={this.state.email}/>
                                </div>
                                <div className="form-group">
                                    <label>Phone No</label>
                                    <input className="form-control" type="phone" placeholder="0313 2365440" name="phone"  onChange={this.handleInput} value={this.state.phone}/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">Update</button>
                                </div>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default Edit;