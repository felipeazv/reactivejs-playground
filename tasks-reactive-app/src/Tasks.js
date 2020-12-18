import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {tasks: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const url = '/api/tasks/'
        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                this.setState({
                    tasks: result,
                    isLoading: false
                })
            })
    }

    async remove(id) {
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedTasks = [...this.state.tasks].filter(i => i.id !== id);
            this.setState({tasks: updatedTasks});
        });
    }

    render() {
        const {tasks, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const list = tasks.map(task => {
            return <tr key={task.id}  className={task.id%2 === 0?'odd':'even'}>
                <td style={{whiteSpace: 'nowrap'}}>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                    <ButtonGroup>
                        <Button tag={Link} to={"/tasks/" + task.id}>Edit</Button>
                        <Button onClick={() => this.remove(task.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container>
                    <div className="btn btn-danger">
                        <Button color="success" tag={Link} to="/tasks/new">New Task</Button>
                    </div>
                    <h3>Task Manager</h3>
                    <Table className="table table-bordered">
                        <thead>
                        <tr>
                            <th width="50%">Description</th>
                            <th width="10%">Priority</th>
                            <th width="20%">Status</th>
                            <th width="20%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Tasks