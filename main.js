const mysql = require('mysql2');
const express = require('express')
const fs = require('fs');
const app = express();
const cors = require("cors")

const port = 3000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Buster42Kuller",
    database: 'portefoelje5'
});

app.get('/cafes', (req, res) => {
    let query = 'SELECT * FROM cafes';
    const queryParams = [];

    if (req.query.city) {
        query += ' WHERE city = ?';
        queryParams.push(req.query.city);
    }

    connection.query(query, queryParams, (error, results, fields) => {
        if (error) {
            res.status(500).send('Error fetching cafes');
            return;
        }
        res.json(results);
    });
});

app.use(express.json());

app.post('/cafes', (req, res) => {
    const name = req.body.name;
    const location = req.body.location;
    const wifi = req.body.wifi;
    const music = req.body.music;
    const priceRange = req.body.priceRange
    const coffeeQuality = req.body.coffeeQuality;
    const foodQuality = req.body.foodQuality;

    connection.query('INSERT INTO cafes (name, location, wifi, music, coffeeQuality, foodQuality, priceRange) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, location, wifi, music, coffeeQuality, foodQuality, priceRange], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error adding cafe');
                return; // Add return here to prevent further execution
            }
            res.send('Cafe added');
        });
});

app.get('/cafes/:id', (req, res) => {
    const cafeId = req.params.id; // Retrieve the cafe ID from the request parameters
    connection.query('SELECT * FROM cafes WHERE id = ?', [cafeId], (error, results, fields) => {
        if (error) {
            res.status(500).send('Error fetching cafe');
            return;
        }
        if (results.length > 0) {
            res.json(results[0]); // Send the first (and presumably only) result
        } else {
            res.status(404).send('Cafe not found'); // Send a 404 status if no cafe is found
        }
    });
});

app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password])
        res.send(`User added`);
});

app.get('/favorites', (req, res) => {
    const userId = req.query.userId;
    connection.query('SELECT * FROM favorites WHERE userId = ?', [userId], (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send(`Error fetching favorites`);
            return;
        }
        res.json(results);
    });
});

app.post('/favorites', (req, res) => {
    const userId = req.body.userId;
    const cafeId = req.body.cafeId;


    connection.query('INSERT INTO favorites (user_id, cafe_id) VALUES (?, ?)', [userId, cafeId]);


    res.send(`Favorite added`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});