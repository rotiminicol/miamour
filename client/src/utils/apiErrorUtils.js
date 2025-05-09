export const handleApiError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('API Error:', error.response.data);
        return {
            success: false,
            error: error.response.data.message || 'An error occurred',
            status: error.response.status
        };
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        return {
            success: false,
            error: 'No response from server',
            status: 504
        };
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        return {
            success: false,
            error: error.message || 'An error occurred',
            status: 500
        };
    }
};

export const formatErrorMessage = (error) => {
    if (typeof error === 'string') {
        return error;
    }
    if (error.message) {
        return error.message;
    }
    if (error.error) {
        return error.error;
    }
    return 'An unexpected error occurred';
};

export const isUnauthorizedError = (error) => {
    return error.response?.status === 401;
};

export const isNotFoundError = (error) => {
    return error.response?.status === 404;
};

export const isValidationError = (error) => {
    return error.response?.status === 422;
};
