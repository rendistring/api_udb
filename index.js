const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const UserRoute = require('./routes/user.route.js');
const ProductRoute = require('./routes/product.route.js');
const CategoryRoute = require('./routes/category.route.js');
const OrderRoute = require('./routes/order.route.js');
const TransactionRoute = require('./routes/transaction.route.js');
const env = require('./services/environment.js');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: env.session_secret,
    resave: false,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(UserRoute);
app.use(ProductRoute);
app.use(CategoryRoute);
app.use(OrderRoute);
app.use(TransactionRoute);


app.listen(env.port, () => {
  console.log(`server started on port ${env.port}`);
})