//import express module
import express from 'express';

//create an instance of express application
const app = express();

//define a port number
const PORT = 3000;

//enable static file serving
app.use(express.static('public'));

//set ejs as view engine
app.set('view engine', 'ejs');


//add middleware - allow express to read the data thats in the form
//form data and store it in req.body
app.use(express.urlencoded({extended: true}));


//create a temporary array to store orders
const orders =[]; 

//define our main route ('/')
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//contact route
app.get('/contact-us', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

//confirmation route
app.get('/thank-you', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

//admin route that displays order arrays
app.get('/admin', (req, res) => {
    res.send(orders);
});

//submit order route
//"fname":"a","lname":"s","email":"nadiaivanishchuk@yahoo.com","method":"pickup","topping":["pepperoni"],"size":"medium","comments":"","discounts":"on"}
app.post('/submit-order', (req, res) => {


    //create a json object to store the order data
    const order={
       fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings ? req.body.toppings : "none",
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    };

    //add order object to orders array
    orders.push(order);
   
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`)

    });
 
    //start the serve and listen on the defined port
    app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });