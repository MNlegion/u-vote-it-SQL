const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// Get test route
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

// Default response for any other NOT FOUND requests
app.use((req, res) => {
    res.status(404).end();
});


// function to start Express server on PORT 3001

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})