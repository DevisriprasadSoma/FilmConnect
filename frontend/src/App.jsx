import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import Users from "./components/Users";
import UserDetail from "./components/UserDetail";
import AddProject from "./components/AddProject";
import Projects from "./components/Projects";
import ProjectDetail from "./components/ProjectDetail";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/" className="logo">🎬 FilmConnect</Link>
        <Link to="/users">Filmmakers</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/add-user">Add User</Link>
        <Link to="/add-project">Add Project</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}
