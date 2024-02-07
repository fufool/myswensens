const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const conn = require('./database');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const userController = require('./users');
const productionController = require('./product');
const { MYSQL_PORT, SECRETKEY } = process.env;
require('dotenv').config();


//users controller
app.get('/users', async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        const usersData = await userController.getAllUsers(token);

        res.status(200).json({
            message: 'เรียกดูข้อมูลสำเร็จ',
            data: usersData,
        });
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error: error.message,
        });
    }
});

app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        const userData = await userController.getUserById(userId, token);

        res.status(200).json({
            message: 'เรียกดูข้อมูลสำเร็จ',
            data: userData,
        });
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error: error.message,
        });
    }
});

app.post('/users', async (req, res) => {
    await userController.registerUser(req, res);
})

app.post('/authenticate', async (req, res) => {
    await userController.authenticateUser(req, res);
});

app.put('/users/:id', async (req, res) => {
    await userController.updateUser(req, res);
});

app.delete('/users/:id', async (req, res) => {
    await userController.deleteUser(req, res);
});

// products controller

app.get('/products', async (req, res) => {
    try {
        const productsData = await productionController.getAllProducts();

        res.status(200).json({
            message: 'เรียกดูข้อมูลสำเร็จ',
            data: productsData,
        });
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error: error.message,
        });
    }
});

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        const signalData = await productionController.getProductById(id, token);

        res.status(200).json({
            message: 'เรียกดูข้อมูลสำเร็จ',
            data: signalData,
        });
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error: error.message,
        });
    }
});

app.post('/products', async (req, res) => {
    const newItemData = req.body;

    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        const products = await productionController.addProducts(newItemData, token);

        res.status(201).json({ message: 'Products added successfully', products });
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error: error.message,
        });
    }
});

app.put('/products/:id', async (req, res) => {
    const itemId = req.params.id;
    const newItemData = req.body;
    console.log("require from client", newItemData, "ID", itemId);
    const item = {
        name: newItemData.nameProducts,
        price: newItemData.priceProducts,
        images: newItemData.imageProducts,
        category: newItemData.category,
        description: newItemData.descriptionProducts
    }
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        const products = await productionController.updateProducts(itemId, item, token);
        res.status(200).json({ message: 'Products updated successfully',products });
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error: error.message,
        });
    }
});

app.delete('/products/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        const products = await productionController.deleteProducts(itemId, token);
        res.status(200).json({ message: 'Products deleted! successfully',products });
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
            error: error.message,
        });
    }
});

app.listen(MYSQL_PORT, () => {
    console.log(`App JS Listening at http://localhost:${MYSQL_PORT}`)
})