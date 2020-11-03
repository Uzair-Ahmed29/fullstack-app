import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import './Nav.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Header extends React.Component {

    constructor() {
        super();
        toast.configure();
        this.state = {
            showLogin: false,
            showRegister: false,
            username: '',
            email: '',
            password: '',
            remember: null,
            validated: false,
            isLoggedIn: null,
        }
        this.handleRegisterInput = this.handleRegisterInput.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

    }

    async componentDidMount() {
        const res = await axios.get('/isLoggedIn');
        if(res.data === false){
            this.setState({isLoggedIn: false});
        } else {
            this.setState({isLoggedIn: true, username: res.data.username });
        }
    }

    handleCloseLogin = () => {
        this.setState({
            showLogin: false
        });
    };

    handleShowLogin = () => {
      this.setState({
        showLogin: true
      });
    }

    handleCloseRegister = () => {
        this.setState({
            showRegister: false
        });
    };

    handleShowRegister = () => {
      this.setState({
        showRegister: true
      });
    }

    handleRegisterInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleRegister = async event => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() !== false) {
            const res = await axios.post("/register", this.state);
            if(res.data.status == 200) {
                this.setState({
                    showRegister: false,
                    username: '',
                    email: '',
                    password: '',
                    validated: false,
                });
            toast.success("Registered Successfully!");
        } else {
            toast.error(`${res.data.error}`);
            }
        } else {
            this.setState({validated: true});
        }
    }

    handleLogin = async event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() !== false) {
            const res = await axios.post("/login", this.state);
            if(res.data.status == 200) {
                this.setState({
                    showLogin: false,
                    username: '',
                    email: '',
                    password: '',
                    validated: false,
                });
            toast.success(res.data.message);
            this.setState({isLoggedIn: true, username: res.data.username});
        } else {
            toast.error(`${res.data.error}`);
            }
        } else {
            this.setState({validated: true});
        }
    }

    handleLogout = async ()  => {
        const res = await axios.post('/logout');
        this.setState({isLoggedIn: false, username: ''});
        toast.success(res.data.message);
    } 

    auth() {
        if(this.state.isLoggedIn === false){
            return (
                <Fragment>
                    <li className="push-right"><a href="#" onClick={this.handleShowLogin}> Login</a></li>
                    <li className=""><a href="#" onClick={this.handleShowRegister}>Register</a></li>
                </Fragment>
            );
        } else {
            return (
            <Fragment>
                <li className="push-right"><a href="#">{this.state.username}</a></li>
                <li className=""><a href="#" onClick={this.handleLogout}>Logout</a></li>
            </Fragment>
            );
        }
    }

    render() {
        return (
            <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/" >Laravel - React</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <nav>
                        <ul className="menu">
                            <li><Link to="/">Home </Link></li>
                            <li><Link to="/add-contact">Add Contact</Link></li>
                            {this.auth()}
                        </ul>
                        </nav>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={this.state.showLogin} onHide={this.HeaderhandleClose}>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleLogin}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                                <Form.Control required type="email" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleRegisterInput}/>
                                <Form.Control.Feedback type="invalid">
                                Username is required
                                </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleRegisterInput}/>
                            <Form.Control.Feedback type="invalid">
                                Password is required
                                </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check name="remember" type="checkbox" label="Remember Me" onChange={this.handleRegisterInput}/>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseLogin}>Close</Button>
                    <Button type="submit" variant="primary">Login</Button>
                </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={this.state.showRegister} onHide={this.HeaderhandleClose}>
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleRegister}>
                <Modal.Header>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group controlId="validationCustom01">
                            <Form.Label>Username</Form.Label>
                                <Form.Control value={this.state.username} required name="username" onChange={this.handleRegisterInput} type="text" placeholder="Enter username" />
                                <Form.Control.Feedback type="invalid">
                                Username is required
                                </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="validationCustom02">
                            <Form.Label>Email address</Form.Label>
                                <Form.Control value={this.state.email} required name="email" onChange={this.handleRegisterInput} type="email" placeholder="Enter email" />
                                <Form.Control.Feedback type="invalid">
                                Incorrect Email address
                                </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} minLength="8" onChange={this.handleRegisterInput} type="password" required name="password" placeholder="Password" />
                            <Form.Control.Feedback type="invalid">
                                Password Must be atleast 8 characters
                            </Form.Control.Feedback>
                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseRegister}>Close</Button>
                    <Button variant="primary" type="submit">Register</Button>
                </Modal.Footer>
                    </Form>
            </Modal>

            </>
        );
    }
}