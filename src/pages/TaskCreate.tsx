import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { Todo } from "../../types/todo";

function TaskCreate() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState<string[]>([])
    const [task, setTask] = useState<Todo>({
        id: 0,
        name: '',
        url: '',
        completed: false
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

        let errors: string[] = [];

        if (!data.name) {
            errors.push("Task name is required!")
        }

        if (!data.url) {
            errors.push("Task url is required!")
        }

        setErrors(errors);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/save_task', data);
            alert(response.data.message);
            navigate('/')
        } catch (error) {
            errors.push(error.response);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="d-flex align-items-center justify-content-between m-0">Add Task
                                <Link to="/" className="btn btn-primary float-end">
                                    Back
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveTask}>
                                <div className="mb-3">
                                    <label>Task Name</label>
                                    <input type="text" name="name" value={task.name} onChange={hadleInput} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label>Task URL</label>
                                    <input type="text" name="url" value={task.url} onChange={hadleInput} className="form-control" />
                                </div>
                                <div>
                                    <ul className="text-danger">
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
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