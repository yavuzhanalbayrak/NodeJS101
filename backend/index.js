const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const cors = require('cors');
server.use(cors());

//express server starts 
const port = 5000;
const appServer = server.listen(port, () => {
    console.log('Server is running on port 5000');
});

//Websocket server starts
const socket = require('socket.io'); 
const io = socket(appServer);

//Socket.io events
io.on('connection', (socket) =>{
    console.log(socket.id);
    
    socket.on('chat', data =>{
        io.sockets.emit('chat', data);
    })
})

//Entities
var categories;
var products;

//mssql database connection
const sql = require("mssql/msnodesqlv8")

const conn = new sql.ConnectionPool({
    database: "deneme",
    server: "(localdb)\\MSSQLLocalDB",
    driver: "msnodesqlv8",
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
})

//Http methods
server.get('/api/categories', (req, res) => {
    
    res.status(200).json(categories);
});

server.get('/products', (req, res) => {
    conn.connect().then((result) => {
        if (result.connected) {
            result.request().query("select * from dbo.Products", (err, result) => {
                if (err) {
                    console.log("Error", err)
                }
                products = result.recordset;
                res.status(200).json(products);
                conn.close();
            })
        }   
    }) 
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

server.post('/products/new', (req, res) => {
    let newProduct = req.body;
    newProduct.id = parseInt(newProduct.id);

    conn.connect().then((result) => {
        if (result.connected) {
            result.request().query("INSERT INTO deneme.dbo.Products (name,category,price) VALUES ('"+newProduct.name+"','"+newProduct.category+"','"+newProduct.price+"')", (err, result) => {
                if (err) {
                    console.log("Error", err)
                }
                products = result.recordset;
                res.status(201).json(newProduct);
                conn.close();
            })
        }   
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

server.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    conn.connect().then((result) => {
        if (result.connected) {
            if(product){
                result.request().query("DELETE FROM deneme.dbo.Products WHERE id="+product.id, (err, result) => {
                    if (err) {
                        console.log("Error", err)
                    }
                    res.status(200).json({ message: 'Product deleted' });
                    conn.close();
                })
            }
            else{
                res.status(404).json({ message: 'Product not found' });
            }
            
        }   
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

server.put('/products/:id' , (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    const updatedProduct = req.body;

    conn.connect().then((result) => {
        if (result.connected) {
            if(product){
                result.request().query("UPDATE deneme.dbo.Products SET name = '"+updatedProduct.name+"',category = '"+updatedProduct.category+"', price = '"+updatedProduct.price+"' WHERE id="+productId, (err, result) => {
                    if (err) {
                        console.log("Error", err)
                    }
                    res.status(200).json({ message: 'Product updated' });
                    conn.close();
                })
            }
            else{
                res.status(404).json({ message: 'Product not found' });
            }
        }   
    })
});

