var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // if (req.query.name || (req.body && req.body.name)) {
    //     context.res = {
    //         // status: 200, /* Defaults to 200 */
    //         body: "Hello " + (req.query.name || req.body.name)
    //     };
    // }
    // else {
    //     context.res = {
    //         status: 400,
    //         body: "Please pass a name on the query string or in the request body"
    //     };
    // }
    MongoClient.connect(process.env.CosmosDBConnectionString, {useNewUrlParser: true}, (err, client) => {
        assert.equal(null, err);
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