
import './App.css'
import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Login from './pages/auth/Login'

import Register from "./pages/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Categories from "./pages/admin/Categories";
import Courses from './pages/admin/Courses';
import Lessons from "./pages/admin/Lessons";
import Enrollments from './pages/admin/Enrollments';
import CourseLessons from "./pages/admin/CourseLessons";

function App() {

 return (

 <BrowserRouter>
  <Routes> 
    <Route path="/" element={<Login />} /> 
    <Route path="/register" element={<Register />} /> 
    <Route path="/student/dashboard" element={ <ProtectedRoute> 
    <StudentDashboard /> </ProtectedRoute> } /> 
    <Route
  path="/admin/dashboard"
  element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> }
  
/>
<Route
  path="/admin/courses"
  element={<Courses />}
/>
  <Route
    path="/admin/courses/:id"
    element={<CourseLessons />}
  />
<Route
    path="/admin/categories"
    element={<Categories />}
/>
<Route
  path="/admin/lessons"
  element={<Lessons />}
/>

<Route
  path="/admin/enrollments"
  element={<Enrollments />}
/>
  </Routes> 
</BrowserRouter>
 );
}

export default App;
