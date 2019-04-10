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
            const db = client.db('dazzledb');
            const item = ({ id, name, team, phone } = req.body);
            item.id = req.query.id;
            db
                .collection('items')
                .updateOne(
                    { id: item.id },
                    {
                        $set: {
                            name: item.name,
                            team: item.team,
                            phone: item.phone
                        }
                    },
                    (err, items) => {
                        if (err) {
                            send(500, err.message);
                        } else {
                            send(200, item);
                        }

                        
                    }
                );
        }
    });
};
