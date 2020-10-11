import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Calender from '../components/Calender';
import Login from '../components/Login';
import { getDataFromLocalStorage } from '../utility/utility';


class Router extends Component {

    render() { 
        return ( 
            <BrowserRouter>
                <Route path="/" exact strict component={Login} />
                <Route path="/dashboard" render={ () => (
                    getDataFromLocalStorage('loginStatus') ? (<Dashboard />) : ( <Redirect to="/" />)
                )} />
                <Route path="/calender" component={Calender} />
            </BrowserRouter>
        );
    }

}

export default Router;