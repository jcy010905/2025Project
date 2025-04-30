import React, { useState } from 'react';
import "../css/Post.css";
import {  useNavigate } from 'react-router-dom';
import MainTitle from '../components/MainTitle';
import { editPost } from '../api/RestApi';
import RouterPath from '../router/RouterPath';

const PostEdit = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // ***********************************************************
    // [ Util ]
    // ***********************************************************
    const clickList = () => {
        navigate(RouterPath.slash, { state: { refreshed: true } });
    }

    // ***********************************************************
    // [ API ]
    // ***********************************************************
    const editPostApi = () => {
        const data = {
            title,
            content
        }
        if (title === '') 
            alert('제목을 입력하세요.');
        else if (content === '') 
            alert('내용을 입력하세요.');
        else{
            editPost(data).then(
                alert('등록 되었습니다.')
            );
            clickList();
        }
    };
    

    // ***********************************************************
    // [ useEffect ]
    // ***********************************************************

    // ***********************************************************
    // [ return ]
    // ***********************************************************
    return (
        <main>
            <div className="main-component">
                <MainTitle
                    title="게시글 등록"
                    right={<div className="btn" onClick={() => editPostApi()}>등록</div>}
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
                    </tbody>
                </table>
                <br />
                <button className="logout" onClick={() => navigate(-1)}>뒤로가기</button>
            </div>
        </main>
    );
};

export default PostEdit;
