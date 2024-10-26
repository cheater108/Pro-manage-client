import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import {
    AnalyticsPage,
    Board,
    Dashboard,
    HomePage,
    SettingsPage,
    SharedTask,
} from "./pages";
import LoginForm from "./components/HomePage/LoginForm";
import RegisterForm from "./components/HomePage/RegisterForm";
import BoardProvider from "./components/common/BoardProvider";

function IsLoggedIn({ children }) {
    if (localStorage.getItem("token")) {
        return children;
    }
    return <Navigate to={"/user"} />;
}

function NotLoggedIn({ children }) {
    if (localStorage.getItem("token")) {
        return <Navigate to={"/dashboard"} />;
    }
    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <IsLoggedIn>
                            <BoardProvider>
                                <Dashboard />
                            </BoardProvider>
                        </IsLoggedIn>
                    }
                >
                    <Route index element={<Navigate to={"/dashboard"} />} />
                    <Route path="dashboard" element={<Board />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
                <Route
                    path="/user"
                    element={
                        <NotLoggedIn>
                            <HomePage />
                        </NotLoggedIn>
                    }
                >
                    <Route index element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                </Route>
                <Route path="/shared/:id" element={<SharedTask />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
