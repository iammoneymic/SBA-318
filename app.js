const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const musicRouter = require('./routes/music');
const customMiddleware1 = require('./middleware/customMiddleware1');
const customMiddleware2 = require('./middleware/customMiddleware2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


app.use(customMiddleware1);
app.use(customMiddleware2);


app.use('/music', musicRouter);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Music App' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
