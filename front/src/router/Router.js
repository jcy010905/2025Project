import { Route, Routes } from 'react-router-dom';
import RouterPath from "./RouterPath";
import Signup from "../pages/Signup";
import Login from '../pages/Login';
import PostList from '../pages/PostList';
import PostEdit from '../pages/PostEdit';
import PostDetail from '../pages/PostDetail';
import PostModify from '../pages/PostModify';

function Router({ token, setToken }) {
    return (
        <Routes>
            {token ? (
                <>
                    <Route path={RouterPath.slash} element={<PostList setToken={setToken} />} />
                    <Route path={RouterPath.postedit} element={<PostEdit />} />
                    <Route path={RouterPath.postdetail} element={<PostDetail />} />
                    <Route path={RouterPath.postmodify} element={<PostModify />} />
                </>
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
