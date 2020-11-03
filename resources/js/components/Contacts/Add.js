import axios from 'axios';
import React, { Fragment } from 'react';
import './contact.scss';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Add extends React.Component {

    constructor() {
        super();
        toast.configure();
        this.state = {
            loader: false,
            name: '',
            email: '',
            phone: '',
            file: null,
        }
        this.onChange = this.onChange.bind(this);
        this.resetFile = this.resetFile.bind(this);
    }

        notify() {
            toast.success("🦄 Contact Created Successfully!");
        }

        handleInput = (e) =>  {
            this.setState({[e.target.name]: e.target.value});
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

        saveContact = async (e) => {
            e.preventDefault();
            if(this.checkForValidation() == true)
            {
                const res = await axios.post('/contact', this.state);
                this.setState({name: '', email:'', phone:''});
                if(res.status === 200){
                    this.notify();
                    this.props.history.push("/");
                }
            }
        }

        resetFile(event) {
            event.preventDefault();
            this.setState({ file: null });
        }

        onChange(event) {
            this.setState({
              file: URL.createObjectURL(event.target.files[0])
            });
          }

        render() {
        return (
            <Fragment>
                <Card>
                    <Card.Body>
                    <Card.Header>Edit Contact</Card.Header>
                        <div className="col-8 form">
                            <form onSubmit={this.saveContact}>

                                <div className="form-group">
                                <label className="custom-file-upload">
                                    <input type="file" name="image"  onChange={this.onChange} />
                                    <i className="fa fa-cloud-upload"></i> Upload Image
                                </label>
                                    {this.state.file && (
                                    <div style={{ textAlign: "center" }}>
                                        <button className="remove-image" onClick={this.resetFile}>Remove</button>
                                    </div>
                                    )}
                                    <img className="image-preview" src={this.state.file} />
                                </div>  

                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control" type="text" placeholder="John Doe" name="name" onChange={this.handleInput} />
                                </div>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input className="form-control" type="email" placeholder="john@doe.com" name="email"  onChange={this.handleInput} />
                                </div>
                                <div className="form-group">
                                    <label>Phone No</label>
                                    <input className="form-control" type="phone" placeholder="0313 2365440" name="phone"  onChange={this.handleInput} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </Fragment>
        );
    }
}
export default Add;