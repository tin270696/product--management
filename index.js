const express = require('express');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const database = require("./config/database");
const systemConfig = require("./config/system");

dotenv.config();
database.connect();

const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const app = express();
const port = process.env.PORT;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(methodOverride('_method'));

// Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// App local varialbes
app.locals.prefixAdmin = systemConfig.prefixAdmin;


// Routes
routeClient(app);
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
