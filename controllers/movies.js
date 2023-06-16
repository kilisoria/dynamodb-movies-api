const AWS = require('aws-sdk');
const config = require('./../config.js');
// const uuidv1 = require('uuid/v1');

const { v1: uuidv1 } = require('uuid');

const getMovies = function (req, res) {
    AWS.config.update(config.aws_remote_config);

    // Create the DynamoDB service object
    const ddb = new AWS.DynamoDB({ apiVersion: config.apiVersion });
    
    var params = {
        TableName: config.aws_table_name,
    };

    ddb.scan(params, function (err, data) {
        if (err) {
             res.send({
                success: false,
                message: err
             });
            return;
        }

        res.send({
            success: true,
            message: 'movies',
            movies: data
        });
    });
}

const addMovie = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    Item.id = uuidv1();
    
    var params = {
        TableName: config.aws_table_name,
        Item: Item
    };

    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            res.send({
                success: true,
                message: 'Added movie',
                movie: data
            });
        }
    });
}

module.exports = {
    getMovies,
    addMovie
}