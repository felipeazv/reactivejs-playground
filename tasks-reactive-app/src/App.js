import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Tasks from "./Tasks";
import TaskEdit from "./TaskEdit";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/tasks' exact={true} component={Tasks}/>
                        <Route path='/tasks/:id' component={TaskEdit}/>
                    </Switch>
                </Router>
            </CookiesProvider>
        )
    }
}

export default App;