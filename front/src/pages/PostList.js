import React, { useState, useEffect } from 'react';
import "../css/Post.css";
import { useLocation, useNavigate } from 'react-router-dom';
import MainTitle from '../components/MainTitle';
import RouterPath from '../router/RouterPath';
import { getName, getPostList } from '../api/RestApi';

const PostList = ({setToken}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [postList, setPostList] = useState([]);
    const [name, setName] = useState('');

    // ***********************************************************
    // [ Util ]
    // ***********************************************************
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setToken(null);
    };

    const navigateDetail = (id, userName) => {
        if (!name) return;
        if (!userName) return;

        if (userName === name){
            navigate(RouterPath.postmodify, { state: { id } });
        }
        else{
            navigate(RouterPath.postdetail, { state: { id } });
        }
    };

    // ***********************************************************
    // [ API ]
    // ***********************************************************
    const getPostListApi = () => {
        getPostList()
        .then(res => {
            setPostList(res.data);
        })
        .catch(error => {
            // console.error("게시물 불러오기 실패:", error);
        });
    };

    const getNameApi = () => {
        getName()
        .then(res => {
            setName(res.data);
        })
        .catch(error => {
            // console.error("게시물 불러오기 실패:", error);
        });
    };

    // ***********************************************************
    // [ useEffect ]
    // ***********************************************************
    useEffect(() => {
        if (location.state?.refreshed) {
            getPostListApi();
            getNameApi();
    
            navigate(location.pathname, { replace: true, state: {} });
        } else {
            getPostListApi();
            getNameApi();
        }
    }, [location, navigate]);

    // ***********************************************************
    // [ return ]
    // ***********************************************************
    return (
        <main>
            <div className="main-component">
                <MainTitle title="게시글 목록" right={
                    <div className="btn" onClick={()=>navigate(RouterPath.postedit)}>등록</div>
                } />
                <br />
                <table className="list-table">
                    <thead>
                        <tr className="text-nowrap">
                            <th className="center col-1">제목</th>
                            <th className="center col-1">작성자</th>
                            <th className="center col-1">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postList?.length > 0 ? (
                            postList.map((item, index) => (
                                <tr key={index} className="pointer">
                                    <td
                                        onClick={() => navigateDetail(item.id, item.authorUsername)}
                                        className="center"
                                    >
                                        {item.title || '-'}
                                    </td>
                                    <td
                                        onClick={() => navigateDetail(item.id)}
                                        className="center"
                                    >
                                        {item.authorUsername || '-'}
                                    </td>
                                    <td
                                        onClick={() => navigateDetail(item.id)}
                                        className="center"
                                    >
                                        {item.createdAt.split('T')[0] || '-'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>
                                    <div className="cneter">
                                        검색 결과가 없습니다.
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br />
                <button className="logout" onClick={()=>handleLogout()} >로그아웃</button>
            </div>
        </main>
    );
};

export default PostList;
