
var MongoClient = require('mongodb').MongoClient;

module.exports = async function (context, req) {
    const response = (client, context) => (status, body) => {
        context.res = {
            status: status,
            body: body
        };
        client.close();
        context.done();
    }
    MongoClient.connect(process.env.CosmosDBConnectionString, {useNewUrlParser: true}, (err, client) => {
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
                console.log('items', items);
                send(200, item);
            }
        );
    })
};
