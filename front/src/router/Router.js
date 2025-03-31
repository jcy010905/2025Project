import { Route, Routes } from 'react-router-dom';
import RouterPath from "./RouterPath";
import Signup from "../pages/Signup";
import Login from '../pages/Login';

function Router() {
    return (
        <Routes>
            <Route
                path={RouterPath.slash}
                element={<Login />}
            />
            <Route
                path={RouterPath.signup}
                element={<Signup />}
            />
        </Routes>
    );
}

export default Router;