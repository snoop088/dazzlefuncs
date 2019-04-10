var MongoClient = require('mongodb').MongoClient;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    MongoClient.connect(process.env.CosmosDBConnectionString, { useNewUrlParser: true }, (err, client) => {

        const send = (status, body) => {
            context.res = {
                status: status,
                body: body
            };
            context.done();
        }
        if (err) {
            context.log('err:' + err);
            send(500, err.message);
        } else {
            let db = client.db('dazzledb');
            context.log(db);
            db
                .collection('items')
                .find({})
                .toArray((err, result) => {
                    if (err) {
                        send(500, err.message);
                    } else {
                        send(200, JSON.parse(JSON.stringify(result)));
                    }
                });
        }

    });
};