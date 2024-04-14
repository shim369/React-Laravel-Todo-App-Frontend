import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.js'
import About from '../pages/About.js'
import Contact from '../pages/Contact.js'
import TaskList from '../pages/Task.js'
import TaskCreate from '../pages/TaskCreate.js'
import 'bootstrap/dist/css/bootstrap.min.css'


function MyRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/create" element={<TaskCreate />} />
        </Routes>
    )
}

export default MyRouter;