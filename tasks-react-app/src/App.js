import React, {Component} from 'react';
import './App.css';
import TaskMenu from './TaskMenu';
import Tasks from "./Tasks";
import TaskEdit from "./TaskEdit";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import {retrieveToken} from './TokenRetriever';

class App extends Component {
    render() {
        retrieveToken()

        return (
            <CookiesProvider>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={TaskMenu}/>
                        <Route path='/tasks' exact={true} component={Tasks}/>
                        <Route path='/tasks/:id' component={TaskEdit}/>
                    </Switch>
                </Router>
            </CookiesProvider>
        )
    }
}

export default App;