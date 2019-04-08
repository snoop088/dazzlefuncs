var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    MongoClient.connect(process.env.CosmosDBConnectionString, (err, client) => {
        // assert.equal(null, err);
        context.res = {
            status: 200,
            body: 'WTF'
        }
        context.done();
        // const response = (client, context) => (status, body) => {
        //     context.res = {
        //         status: status,
        //         body: body
        //     };
        //     client.close();
        //     context.done();
        // }
        // let send = response(client, context);
        // if (err) send(500, err.message);

        // let db = client.db('dazzledb');

        // db
        //     .collection('items')
        //     .find({})
        //     .toArray((err, result) => {
        //         if (err) send(500, err.message);
        //         send(200, JSON.parse(JSON.stringify(result)));
        //     });
    });
};