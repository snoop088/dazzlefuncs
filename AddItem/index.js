
var MongoClient = require('mongodb').MongoClient;

module.exports = function (context, req) {

    MongoClient.connect(process.env.CosmosDBConnectionString, { useNewUrlParser: true }, (err, client) => {
        const send = (status, body) => {
            context.res = {
                status: status,
                body: body
            };
            context.done();
        }
        if (err) {
            send(500, err.message);
        } else {
            let db = client.db('dazzledb');
            let item = ({ id, name, team, phone } = req.body);

            db.collection('items').insertOne({
                id: item.id,
                name: item.name,
                team: item.team,
                phone: item.phone
            }, (err, items) => {
                if (err) {
                    send(500, err.message);
                } else {
                    send(200, item);
                }
            });
        }
    });
};
