import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

//load environment variables from .env file
dotenv.config();
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
//console.log(process.env.DB_HOST);

const app = express();
const PORT = 3000;
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// "Middleware" that allows express to read
// form data and store it in req.body
app.use(express.urlencoded({ extended: true }));


//create a pool bucket of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
    
}).promise();


// database test route
//async function tells js to wait for the database query to finish before moving on
app.get('/db-test', async(req, res) => {
    try {
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    } catch(err) {
        console.error('Database error: ', err);
        res.status(500).send(err.message);
     }

});


// Default route
app.get('/', (req, res) => {
    res.render('home');
});

// Contact route
app.get('/contact-us', (req, res) => {
    res.render('contact');
});

// Confirmation route
app.get('/thank-you', (req, res) => {
    res.render('confirmation');
});

// Admin route
app.get('/admin', async(req, res) => {

    //read all orders from the database
    //read newest first
    let sql = 'SELECT * FROM orders ORDER BY timestamp DESC';
    const orders = await pool.query(sql);
    console.log(orders);

    res.render('admin', { orders: orders[0] });
});

// Submit order route
// {"fname":"a","lname":"aa","email":"a",
// "method":"delivery","toppings":["artichokes"],
// "size":"small","comment":"","discount":"on"}
app.post('/submit-order', async(req, res) => {

    const order = req.body;
    
    // Create an array of order data
    const params = [
       req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.size,
        req.body.method,
        Array.isArray(req.body.toppings) ? req.body.toppings.join(", ") : "none"
];


    // insert new order to the database
      const sql = `INSERT INTO orders (fname,       lname, email, size, method, toppings)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await pool.execute(sql,params);
    console.log("Order inserted with ID: ", result[0].insertId);


    res.render('confirmation', { order });
});

// Listen on the designated port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});