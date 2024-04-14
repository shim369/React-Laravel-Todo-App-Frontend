import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TaskCreate() {
    const [inputErrorList, setInputErrorList] = useState({})
    const [task, setTask] = useState({
        name: '',
        url: '',
    })

    const hadleInput = (e) => {
        e.persist();
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const saveTask = async (e) => {
        e.preventDefault();

        const data = {
            name: task.name,
            url: task.url,
        }

        let isEmpty = false;
        let errors = {};

        if (data.name.trim() === '') {
            isEmpty = true;
            errors.name = 'Name is required';
        }

        if (data.url.trim() === '') {
            isEmpty = true;
            errors.url = 'URL is required';
        }

        if (isEmpty) {
            setInputErrorList(errors);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/save_task', data);
            alert(response.data.message);
        } catch (error) {
            setInputErrorList(error.response.data.errors || {});
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Task
                                <Link to="/tasks" className="btn btn-primary float-end">
                                    Back
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveTask}>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" value={task.name} onChange={hadleInput} className="form-control" />
                                    <span className="text-danger">{inputErrorList.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label>URL</label>
                                    <input type="text" name="url" value={task.url} onChange={hadleInput} className="form-control" />
                                    <span className="text-danger">{inputErrorList.url}</span>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Save Task</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCreate;