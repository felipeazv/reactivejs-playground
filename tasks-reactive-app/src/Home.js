import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {Container} from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <Container fluid>
                    <Link to="/tasks">Task Manager</Link>
                </Container>
            </div>
        );
    }
}

export default Home;