import { Routes, Route } from 'react-router-dom'
import TaskList from '../pages/Task.js'
import TaskCreate from '../pages/TaskCreate.js'
import 'bootstrap/dist/css/bootstrap.min.css'


function MyRouter() {
    return (
        <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/create" element={<TaskCreate />} />
        </Routes>
    )
}

export default MyRouter;