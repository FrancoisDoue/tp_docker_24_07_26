import { createBrowserRouter } from "react-router-dom";
import HomeView from "../views/HomeView";
import Layout from "../shared/Layout";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import ProtectedRoute from "./ProtectedRoute";
import TaskListView from "../views/TaskListView";

export default createBrowserRouter([
    {path: "/", element: <Layout/>, children: [
        {path: "/", element: <HomeView/> },
        {path: "/login", element: <LoginView/>},
        {path: "/register", element: <RegisterView/>},
        {path: "/tasks", element: <ProtectedRoute/>, children: [
            {path: "/tasks", element: <TaskListView/>},
        ]}
    ]}
])