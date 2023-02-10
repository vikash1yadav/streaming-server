const express = require('express')
const http = require('http');
const app = express()
const path = require('path')
const stream = require("./src/stream-file")
const reactViews = require('express-react-views');
const router = require('./src/routes');

app.use(express.static(path.join(__dirname, "./public")));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', reactViews.createEngine());


app.use('/', router);
app.get('/app/', (req, res) => {
  console.log("res")
  res.render('index', { name: 'John' });
})
app.use("/stream", stream)

const server = http.createServer(app);
server.listen((3000),() =>{ console.log("server is running")})
// app.listen(() => console.log("server is running"))
