import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div className="btn">
                <Button tag={Link} to="/">Home</Button>
                &nbsp;
                <Button tag={Link} to="/tasks">Task Manager</Button>
                &nbsp;
                <Button color="success" tag={Link} to="/tasks/new">New Task</Button>
            </div>
        );
    }
}

export default Home;