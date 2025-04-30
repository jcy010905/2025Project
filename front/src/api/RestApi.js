import http from "./Http";

export const getPostList = () => {
    return http.get('posts');
};

export const getName = () => {
    return http.get('users/me');
};

export const editPost = data => {
    return http.post('posts', data);
};

export const getPostDetail = id => {
    return http.get(`posts/${id}`);
};

export const modifyPost = (id, data) => {
    return http.put(`posts/${id}`, data);
};

export const deletePost = id => {
    return http.delete(`posts/${id}`);
};