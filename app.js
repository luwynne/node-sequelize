const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")

const db = require('./config/database') 

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();

// middleware for Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// body parser
app.use(bodyParser.urlencoded({
  extended:false
}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// initializing routes
app.get('/', (req,res) => res.render('index', { layout: 'landing' }));  
// gig routes
app.use('/gigs', require('./routes/gigs'))

// port
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server listening to post ${PORT}`));