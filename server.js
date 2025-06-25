const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const usersFile = path.join(__dirname, 'users.json');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'MATA')));

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'MATA', 'index.html'));
});

// Helper: Detect group from email
function detectGroup(email) {
    if (email.includes('.tekno')) return 'TEKNO';
    if (email.includes('.neuro')) return 'NEURO';
    if (email.includes('.inviso')) return 'INVISO';
    if (email.includes('.kombat')) return 'KOMBAT';
    return 'UNKNOWN';
}

// Register
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    let users = [];
    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile));
    }

    const emailExists = users.some(user => user.email === email);
    const usernameExists = users.some(user => user.username === username);

    if (emailExists || usernameExists) {
        return res.status(409).send(
            emailExists
                ? 'Email already registered'
                : 'Username already taken'
        );
    }

    const group = detectGroup(email);

    users.push({ username, email, password, group });
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.send('✅ Registration successful!');
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    let users = [];
    if (fs.existsSync(usersFile)) {
        users = JSON.parse(fs.readFileSync(usersFile));
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).send('❌ Invalid email or password');
    }

    // Group-based background image
    let backgroundImage = '';
    switch (user.group) {
        case 'TEKNO':
            backgroundImage = 'url("/images/tekno-bg.jpg")';
            break;
        case 'NEURO':
            backgroundImage = 'url("/images/neuro-bg.jpg")';
            break;
        case 'INVISO':
            backgroundImage = 'url("/images/inviso-bg.jpg")';
            break;
        case 'KOMBAT':
            backgroundImage = 'url("/images/kombat-bg.jpg")';
            break;
        default:
            backgroundImage = 'url("/images/default-bg.jpg")';
    }

    // Respond with a custom dashboard
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome ${user.username}</title>
            <style>
                body {
                    background-image: ${backgroundImage};
                    background-size: cover;
                    background-position: center;
                    font-family: sans-serif;
                    text-align: center;
                    padding: 100px;
                    color: white;
                }
                h1 {
                    font-size: 3em;
                }
                p {
                    font-size: 1.5em;
                }
            </style>
        </head>
        <body>
            <h1>Welcome, ${user.username}!</h1>
            <p>You are in the <strong>${user.group}</strong> group.</p>
        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
