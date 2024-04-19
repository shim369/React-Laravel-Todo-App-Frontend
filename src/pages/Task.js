import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function Task() {

    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/tasks').then(res => {
        console.log(res)
        setTasks(res.data.tasks);
        setLoading(false);
      });
    }, [])

    if(loading) {
        return (
            <Loading />
        )
    }
    
    let taskDetails = "";
    taskDetails = tasks.map((item, index) => {
        return (
            <tr key={index} className="align-middle">
                <td>{item.name}</td>
                <td><Link to={item.url} target="_blank">{item.url}</Link></td>
                <td>
                    <Link to={`/tasks/${item.id}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button className="btn btn-danger">Delete</button>
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
                                    <tr className="align-middle">
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
