import { Routes, Route } from 'react-router-dom'
import TaskList from '../pages/Task.js'
import TaskCreate from '../pages/TaskCreate.js'
import TaskEdit from '../pages/TaskEdit.js'
import 'bootstrap/dist/css/bootstrap.min.css'


function MyRouter() {
    return (
        <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks/create" element={<TaskCreate />} />
            <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        </Routes>
    )
}

export default MyRouter;