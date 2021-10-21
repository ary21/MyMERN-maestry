import axios from 'axios';

// Local Dev
const baseUrl = `http://localhost:5050`;

// Live
// const baseUrl = `https://api-maestry-mearn-ary.herokuapp.com`;

const url = `${baseUrl}/posts`;

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, postData) => axios.patch(`${url}/${id}`, postData);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);