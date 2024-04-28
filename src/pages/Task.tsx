import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../App.css"
import { Todo } from "../../types/todo";

function Task() {

    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Todo[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasks').then(res => {
            setTasks(res.data.tasks);
            setLoading(false);
        });
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    const deleteTask = async (id: number) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/delete_task/${id}`);
            if (response.data.code === 200) {
                alert(response.data.message);
                setTasks(tasks.filter((task) => task.id !== id));
            }
        } catch (error) {
            console.log(error);
        };
    };

    let taskDetails: JSX.Element[] = [];
    taskDetails = tasks.map((item, index) => {
        return (
            <tr key={index} className="align-middle">
                <td className="checkTd text-center">
                    <span className="check">
                        {Number(item.completed) === 1 && (
                        <FontAwesomeIcon icon={faCheck} className="text-primary" />
                        )}
                    </span>
                </td>
                <td className="nameTd">{item.name}</td>
                <td className="urlTd"><Link to={item.url} target="_blank">{item.url}</Link></td>
                <td className="text-center">
                    <Link to={`/tasks/${item.id}/edit`}><FontAwesomeIcon icon={faPenToSquare} className="text-success" /></Link>
                </td>
                <td className="text-center">
                    <button type="submit" className="border-0 bg-transparent" onClick={() => deleteTask(item.id)}><FontAwesomeIcon icon={faTrash} className="text-danger" data-testid="delete-button-28" /></button>
                </td>
            </tr>
        )
    })

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="d-flex align-items-center justify-content-between m-0">Task
                                <Link to="/tasks/create" className="btn btn-primary">
                                    Add Task
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr className="align-middle text-center">
                                        <th></th>
                                        <th>Task Name</th>
                                        <th>Task URL</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taskDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task;
