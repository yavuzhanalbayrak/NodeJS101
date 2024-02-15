const bodyParser = require('body-parser');
const socketio = require('socket.io');
const express = require('express');
const http = require('http');
const cors = require('cors');

const server = express();
const httpServer = http.createServer(server);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());

const port = 5000;
const appServer = httpServer.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});

// Socket.IO sunucusunu başlat
const io = socketio(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    },
});

// Socket.IO olaylarını tanımla
io.on('connection', (socket) => {
    console.log(socket.id);
    
    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });
});

//Entities
var categories;
var products;

const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', // MySQL kullanıcı adınızı buraya girin
  password: '1234', // MySQL şifrenizi buraya girin
  database: 'nodejs', // Bağlanmak istediğiniz veritabanının adını buraya girin
  port: '3306'
});

conn.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = conn;

//Http methods
server.get('/api/categories', (req, res) => {
    
    res.status(200).json(categories);
});

server.get('/api/products', (req, res) => {
    conn.query('SELECT * FROM products', function (error, results, fields) {
        if (error) {
          console.error('Sorgu hatası: ' + error);
          return;
        }
        res.status(200).json(results);
        // Sonuçları istemciye gönderme veya başka bir işlem yapma
      });
});

// server.get('/products/:id', (req, res) => {
//     const itemId = parseInt(req.params.id);
//     conn.connect().then((result) => {
//         if (result.connected) {
//             result.request().query("select * from dbo.Products where id ="+itemId, (err, result) => {
//                 if (err) {
//                     console.log("Error", err)
//                 }
//                 products = result.recordset;
//                 res.status(200).json(products);
//                 conn.close();
//             })
//         }   
//     }) 
// });

server.post('/api/categories/new', (req, res) => {
    let newCategory = req.body;
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

server.post('/api/products/new', (req, res) => {
    let newProduct = req.body;
    newProduct.id = parseInt(newProduct.id);

    conn.query("INSERT INTO nodejs.products (name,category,price) VALUES ('"+newProduct.name+"','"+newProduct.category+"','"+newProduct.price+"')", (err, result) => {
        if (err) {
            console.log("Error", err)
        }
        products = result.recordset;
        res.status(201).json(newProduct);
        
    })
});

server.delete('/api/categories/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === itemId);

    if (index !== -1) {
        categories.splice(index, 1);
        res.status(200).json({ message: 'Category deleted' });
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});

server.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    conn.query("DELETE FROM nodejs.products WHERE id="+productId, (err, result) => {
        if (err) {
            console.log("Error", err)
        }
        res.status(200).json({ message: 'Product deleted' });
        
    })
});

server.put('/api/categories/:id' , (req, res) => {
    const itemId = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === itemId);
    const updatedCategory = req.body;

    if (index !== -1) {
        categories[index].name = updatedCategory.name;
        res.status(200).json({ message: 'Category updated', updatedCategory });
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
});

server.put('/api/products/:id' , (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;

    conn.query("UPDATE nodejs.products SET name = '"+updatedProduct.name+"',category = '"+updatedProduct.category+"', price = '"+updatedProduct.price+"' WHERE id="+productId, (err, result) => {
        if (err) {
            console.log("Error", err)
        }
        res.status(200).json({ message: 'Product updated' });
    })
});

