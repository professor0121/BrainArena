
import Layout from './Layout'
import Home from './Pages/Home'
import {  Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Exams from './Pages/Exams'
import Activity from './Pages/Activity'
import Users from './Pages/Users'
import Settings from './Pages/Settings'
import Login from './Pages/Login'

const App = props => {
   return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

App.propTypes = {}

export default App