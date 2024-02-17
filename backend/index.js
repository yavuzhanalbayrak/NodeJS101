const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketHandler = require('./socketHandler');
const connect = require('./data');

const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


socketHandler(httpServer);
const conn = connect();


//Http methods
app.get('/api/categories', (req, res) => {
    conn.query('SELECT * FROM categories', function (error, results, fields) {
        if (error) {
          console.error('Sorgu hatası: ' + error);
          return;
        }
        res.status(200).json(results);
        // Sonuçları istemciye gönderme veya başka bir işlem yapma
      });
});

app.get('/api/products', (req, res) => {
    conn.query('SELECT * FROM products', function (error, results, fields) {
        if (error) {
          console.error('Sorgu hatası: ' + error);
          return;
        }
        res.status(200).json(results);
        // Sonuçları istemciye gönderme veya başka bir işlem yapma
      });
});

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    conn.query('SELECT * FROM nodejs.products WHERE Id = '+productId , function (error, results, fields) {
        if (error) {
          console.error('Sorgu hatası: ' + error);
          return;
        }
        res.status(200).json(results);
      });
});

app.get('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    conn.query('SELECT * FROM nodejs.categories WHERE Id = '+categoryId , function (error, results, fields) {
        if (error) {
          console.error('Sorgu hatası: ' + error);
          return;
        }
        res.status(200).json(results);
      });
});

app.post('/api/categories/new', (req, res) => {
    let newCategory = req.body;
    newCategory.id = parseInt(newCategory.id);

    conn.query("INSERT INTO nodejs.categories (name) VALUES ('"+newCategory.name+"')", (err, result) => {
        if (err) {
            console.log("Error", err)
        }
        res.status(201).json(newCategory);
        
    })
});

app.post('/api/products/new', (req, res) => {
    let newProduct = req.body;
    newProduct.id = parseInt(newProduct.id);

    conn.query("INSERT INTO nodejs.products (name,category,price) VALUES ('"+newProduct.name+"','"+newProduct.category+"','"+newProduct.price+"')", (err, result) => {
        if (err) {
            console.log("Error", err)
        }
        res.status(201).json(newProduct);
        
    })
});

app.delete('/api/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);

    conn.query("DELETE FROM nodejs.categories WHERE id="+categoryId, (err, result) => {
        if (err) {
            console.log("Error", err)
        }
        res.status(200).json({ message: 'Category deleted' });
        
    })
});

app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    conn.query("DELETE FROM nodejs.products WHERE id="+productId, (err, result) => {
        if (err) {
            console.log("Error", err)
        }
        res.status(200).json({ message: 'Product deleted' });
        
    })
});

app.put('/api/categories/:id' , (req, res) => {
    const categoryId = parseInt(req.params.id);
    const updatedCategory = req.body;

    conn.query("UPDATE nodejs.categories SET name = '"+updatedCategory.name+"' WHERE id="+categoryId, (err, result) => {
        if (err) {
            console.log("Error", err)
        }
        res.status(200).json({ message: 'Category updated' });
    })
});

app.put('/api/products/:id' , (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    conn.query("UPDATE nodejs.products SET name = '"+updatedProduct.name+"',category = '"+updatedProduct.category+"', price = '"+updatedProduct.price+"' WHERE id="+productId, (err, result) => {
        if (err) {
            console.log("Error", err)
        }
        res.status(200).json({ message: 'Product updated' });
    })
});

const port = 5000;
const server = httpServer.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});

