import { Route, Routes } from 'react-router-dom';
import RouterPath from "./RouterPath";
import Signup from "../pages/Signup";
import Login from '../pages/Login';
import PostList from '../pages/PostList';

function Router({ token, setToken }) {
    return (
        <Routes>
            {token ? (
                <Route path={RouterPath.slash} element={<PostList setToken={setToken} />} />
            ) : (
                <>
                    <Route path={RouterPath.slash} element={<Login setToken={setToken} />} />
                    <Route path={RouterPath.signup} element={<Signup />} />
                </>
            )}
        </Routes>
    );
}

export default Router;
