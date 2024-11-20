const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'recipe_sharing'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Models
const getRecipes = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM recipes', (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const addRecipe = (recipe) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO recipes SET ?', recipe, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
}; 

// Controllers
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await getRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addNewRecipe = async (req, res) => {
    try {
        const newRecipe = req.body;
        await addRecipe(newRecipe);
        res.status(201).send('Recipe added');
    } catch (error) {
        res.status(500).send(error);
    }
};

// Routes
app.get('/api/recipes', getAllRecipes);
app.post('/api/recipes', addNewRecipe);

// Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
