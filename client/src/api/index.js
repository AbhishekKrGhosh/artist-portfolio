import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getArtworks = (params) => api.get('/artworks', { params });
export const getArtworkById = (id) => api.get(`/artworks/${id}`);

export const getCollections = () => api.get('/collections');

export const getExhibitions = () => api.get('/exhibitions');

export const getBlogPosts = () => api.get('/blog');
export const getBlogPostById = (id) => api.get(`/blog/${id}`);

export const getSettings = () => api.get('/settings');

export default api;
