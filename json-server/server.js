const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8002;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const dblow = low(adapter);

server.use(middlewares);

server.get('/api/sample', (req, res) => {
    let result = dblow.get('sample');
    res.status(200).json(result);
});

server.use(jsonServer.bodyParser);
server.post('/api/rapatory/login', (req, res) => {
        let typeLogin = req.body['type_login'];
        let username = req.body['username'];
        if (typeLogin != null && username != null) {
            res.status(200).json({
                message: 'Login Success'
            });
        } else {
            res.status(400).json({
                message: 'Bad Request'
            });
        }
});


server.use(router);
server.listen(port);
