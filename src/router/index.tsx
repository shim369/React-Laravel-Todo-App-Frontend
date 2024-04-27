import { Routes, Route } from 'react-router-dom'
import TaskList from '../pages/Task'
import TaskCreate from '../pages/TaskCreate'
import TaskEdit from '../pages/TaskEdit'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'


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