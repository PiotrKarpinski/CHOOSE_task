const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const port = 3000;
const db = require('./trips.json');


const paginate = (arr, size) => {
    return arr.reduce((acc, val, i) => {
        let idx = Math.floor(i / size)
        let page = acc[idx] || (acc[idx] = [])
        page.push(val)

        return acc
    }, [])
}

server.get('/trip', (req, res) => {
    let tripId = req.query['id'];
    if (tripId != null && tripId >= 0) {
        let result = db.trips.find(trip => {
            return trip.id == tripId;
        })

        console.log(tripId)
        if (result) {
            let {id, ...trip} = result;
            res.status(200).jsonp(trip);
        } else {
            res.status(400).jsonp({
                error: "Bad tripId"
            });
        }
    } else {
        res.status(400).jsonp({
            error: "No valid tripId"
        });
    }
});


server.use(middlewares);
server.use(router);
server.listen(port);
