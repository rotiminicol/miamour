import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiService = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to add the auth token
apiService.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
apiService.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Handle different error codes
            if (error.response.status === 401) {
                // Handle unauthorized access
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

// User endpoints
export const userService = {
    getCurrentUser: () => apiService.get('/api/users/me'),
    updateUser: (userId, data) => apiService.put(`/api/users/${userId}`, data),
    getUserMatches: (userId) => apiService.get(`/api/users/${userId}/matches`),
    getUserEvents: (userId) => apiService.get(`/api/users/${userId}/events`)
};

// Match endpoints
export const matchService = {
    createMatch: (userId1, userId2) => apiService.post('/api/matches', { userId1, userId2 }),
    getMatches: () => apiService.get('/api/matches'),
    updateMatchStatus: (matchId, status) => apiService.put(`/api/matches/${matchId}/status`, { status })
};

// Event endpoints
export const eventService = {
    createEvent: (data) => apiService.post('/api/events', data),
    getEvents: () => apiService.get('/api/events'),
    updateEvent: (eventId, data) => apiService.put(`/api/events/${eventId}`, data)
};

// Message endpoints
export const messageService = {
    sendMessage: (data) => apiService.post('/api/messages', data),
    getMessages: (userId) => apiService.get(`/api/messages/user/${userId}`)
};

// Admin endpoints
export const adminService = {
    getUsers: () => apiService.get('/api/admin/users'),
    getUserDetails: (userId) => apiService.get(`/api/admin/users/${userId}`),
    getAnalytics: () => apiService.get('/api/admin/analytics'),
    getEvents: () => apiService.get('/api/admin/events'),
    getMatches: () => apiService.get('/api/admin/matches')
};

export default apiService;
