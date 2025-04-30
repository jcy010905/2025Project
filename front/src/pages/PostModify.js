import React, { useCallback, useEffect, useState } from 'react';
import "../css/Post.css";
import {  useLocation, useNavigate } from 'react-router-dom';
import MainTitle from '../components/MainTitle';
import { deletePost, getPostDetail, modifyPost } from '../api/RestApi';
import RouterPath from '../router/RouterPath';

const PostModify = () => {
    const location = useLocation(); 
    const id = location.state ? location.state.id : 1;
    const navigate = useNavigate();

    const [postList, setPostList] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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

    const clickList = () => {
        navigate(RouterPath.slash, { state: { refreshed: true } });
    }

    // ***********************************************************
    // [ API ]
    // ***********************************************************
    const getPostDetailApi = useCallback(() => {
        getPostDetail(id)
            .then(res => setPostList(res.data))
            .catch(error => {});
    }, [id]);
    
    const modifyPostApi = () => {
        const data = {
            title,
            content
        }
        if (title === '') 
            alert('제목을 입력하세요.');
        else if (content === '') 
            alert('내용을 입력하세요.');
        else{
            modifyPost(id, data).then(
                alert('수정 되었습니다.')
            );
            clickList();
        }
    };

    const deletePostApi = () => {
        deletePost(id).then(
                alert('삭제 되었습니다.')
        );
        clickList();
        
    };

    // ***********************************************************
    // [ useEffect ]
    // ***********************************************************
    useEffect(() => {
        getPostDetailApi();
    }, [getPostDetailApi]);

    useEffect(() => {
        setTitle(postList.title);
        setContent(postList.content);
    }, [postList]);

    // ***********************************************************
    // [ return ]
    // ***********************************************************
    return (
        <main>
            <div className="main-component">
                <MainTitle
                    title="게시글 수정"
                    right={
                        <>
                            <div className="btn" onClick={() => deletePostApi()}>삭제</div>
                            <div className="btn" onClick={() => modifyPostApi()}>수정</div>
                        </>
                    }
                />
                <br />
                <table className="edit-table">
                    <tbody>
                        <tr className="title-table">
                            <th>제목</th>
                            <td>
                                <input
                                    className="title-input"
                                    placeholder="제목을 입력하세요."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr className="content-table">
                            <th>내용</th>
                            <td>
                                <textarea
                                    className="content-input"
                                    placeholder="내용을 입력하세요."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </td>
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

export default PostModify;
