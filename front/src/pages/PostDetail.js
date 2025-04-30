import React, { useCallback, useEffect, useState } from 'react';
import "../css/Post.css";
import {  useLocation, useNavigate } from 'react-router-dom';
import MainTitle from '../components/MainTitle';
import { getPostDetail } from '../api/RestApi';


const PostDetail = () => {
    const location = useLocation(); 
    const id = location.state ? location.state.id : 1;
    const navigate = useNavigate();

    const [postList, setPostList] = useState([]);

    // ***********************************************************
    // [ Util ]
    // ***********************************************************
    const formatDate = (dateTime) => {
        const date = new Date(dateTime);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
    
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${second}초`;
    }

    // ***********************************************************
    // [ API ]
    // ***********************************************************
    const getPostDetailApi = useCallback(() => {
        getPostDetail(id)
            .then(res => setPostList(res.data))
            .catch(error => {});
    }, [id]);

    // ***********************************************************
    // [ useEffect ]
    // ***********************************************************
    useEffect(() => {
        getPostDetailApi();
    }, [getPostDetailApi]);

    useEffect(() => {
        console.log(postList);
    }, [postList]);

    // ***********************************************************
    // [ return ]
    // ***********************************************************
    return (
        <main>
            <div className="main-component">
                <MainTitle title="게시글 보기" />
                <br />
                <table className="edit-table">
                    <tbody>
                        <tr className="title-table">
                            <th>제목</th>
                            <td>{postList.title || '-'}</td>
                        </tr>
                        <tr className="content-table">
                            <th>내용</th>
                            <td>{postList.content || '-'}</td>
                        </tr>
                        <tr className="title-table">
                            <th>작성자</th>
                            <td>{postList.authorUsername || '-'}</td>
                        </tr>
                        <tr className="title-table">
                            <th>작성시간</th>
                            <td>{formatDate(postList.createdAt) || '-'}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <button className="logout" onClick={() => navigate(-1)}>뒤로가기</button>
            </div>
        </main>
    );
};

export default PostDetail;
