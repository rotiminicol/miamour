const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// ...existing code...

// Define the login route
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    // Add your authentication logic here
    if (email === 'test@example.com' && password === 'password') {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Define the signup route
app.post('/api/auth/signup', (req, res) => {
    const { email, password } = req.body;
    // Add your signup logic here
    // For example, save the user to the database
    res.status(201).json({ message: 'Signup successful' });
});

// ...existing code...

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});