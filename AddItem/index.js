
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

module.exports = function (context, req) {
    const response = (client, context) => (status, body) => {
        context.res = {
            status: status,
            body: body
        };
        client.close();
        context.done();
    }
    MongoClient.connect(process.env.CosmosDBConnectionString, {useNewUrlParser: true}, (err, client) => {
        assert.equal(null, err);
        let send = response(client, context);
        if (err) send(500, err.message);
        let db = client.db('dazzledb');
        let item = ({ id, name, team, phone } = req.body);

        db.collection('items').insertOne(
            {
                id: item.id,
                name: item.name,
                team: item.team,
                phone: item.phone
            },
            (err, items) => {
                if (err) send(500, err.message);
                send(200, item);
            }
        );
    })
};
