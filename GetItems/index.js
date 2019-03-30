const MongoClient = require('mongodb').MongoClient;


// using funcpack now

module.exports = function (context, req) {
    console.log(MongoClient);
    MongoClient.connect(process.env.CosmosDBConnectionString, {useNewUrlParser: true}, (err, client) => {
        const response = (client, context) => (status, body) => {
            context.res = {
                status: status,
                body: body
            };
            client.close();
            context.done();
        }
        let send = response(client, context);
        if (err) send(500, err.message);

        let db = client.db('dazzledb');

        db
            .collection('items')
            .find({})
            .toArray((err, result) => {
                if (err) send(500, err.message);
                send(200, JSON.parse(JSON.stringify(result)));
            });
    });
};