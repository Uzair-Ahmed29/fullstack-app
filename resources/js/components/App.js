import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header/Nav';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Add from './Contacts/Add';
import View from './Contacts/View';
import Edit from './Contacts/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {

    render() {
        return (
            <div className="container">
                <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={View} />
                    <Route path="/add-contact" exact component={Add} />
                    <Route path="/edit/:id" exact component={Edit} />
                </Switch>
                </Router>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
