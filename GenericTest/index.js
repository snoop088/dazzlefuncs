var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    MongoClient.connect(process.env.CosmosDBConnectionString, (err, client) => {
        // assert.equal(null, err);
        // context.res = {
        //     status: 200,
        //     body: 'WTF'
        // }
        // context.done();
        context.log('here');
        // assert.equal(null, err);
        if (err) {
            context.log('err:' + err);
            send(500, err.message);
        }
        const send = (status, body) => {
            context.log('success result: ' + body);
            context.res = {
                status: status,
                body: body
            };
            context.done();
        }
        // const response = (client, context) => (status, body) => {
        //     context.log('success result: ' + body);
        //     context.res = {
        //         status: status,
        //         body: body
        //     };
        //     client.close();
        //     context.done();
        // }
        // let send = response(client, context);
        // context.log('err: ' + err);
        // if (err) send(500, err.message);

        let db = client.db('dazzledb');
        context.log(db);
        db
            .collection('items')
            .find({})
            .toArray((err, result) => {
                if (err) send(500, err.message);
                send(200, JSON.parse(JSON.stringify(result)));
            });
        
    });
};