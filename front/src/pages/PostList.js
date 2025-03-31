import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/posts')
            .then(response => {
                setPosts(response.data);
            })
    }, []);
    
    useEffect(() => {
        console.log("posts:::", posts);
    }, [posts]);

    return (
        <div>
            <h2>게시물 목록</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
