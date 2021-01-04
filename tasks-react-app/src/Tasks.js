import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Home from "./Home";

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {tasks: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const url = '/api/tasks/'
        fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.$token
                }
            }
        )
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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.$token
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
            return <tr key={task.id} className={task.id % 2 === 0 ? 'odd' : 'even'}>
                <td style={{whiteSpace: 'nowrap'}}>{task.description}</td>
                <td align={"center"}>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                    <Button color="warning" tag={Link} to={"/tasks/" + task.id}>Edit</Button>
                    &nbsp;
                    <Button color="danger" onClick={() => this.remove(task.id)}>Delete</Button>
                </td>
            </tr>

        });

        return (
            <div className="table-responsive">
                <Home />
                <h3>Task Manager</h3>
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th width="50%">Description</th>
                        <th width="5%" align={"center"}>Priority</th>
                        <th width="5%">Status</th>
                        <th width="7%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Tasks