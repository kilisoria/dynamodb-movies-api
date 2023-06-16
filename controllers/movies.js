const { DynamoDBClient, ScanCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const config = require('./../config.js');

const { v1: uuidv1 } = require('uuid');

const getMovies = async (req, res) => {
    try {
        const client = new DynamoDBClient(config.aws_remote_config);
    
        const input = {
            TableName: config.aws_table_name,
        };

        const command = new ScanCommand(input);
        const response = await client.send(command);

        const { Items: movies } = response;

        res.send({
            success: true,
            message: 'Movies',
            movies
        });

    } catch (err) {
        res.send({
            success: false,
            message: err
        });
    }
}

const addMovie = async (req, res) => {
    try {
        const client = new DynamoDBClient(config.aws_remote_config);

        const Item = { ...req.body, id: { S: uuidv1()} };

        const input = {
            TableName: config.aws_table_name,
            Item: Item
        };
    
        const command = new PutItemCommand(input);
        await client.send(command);

        res.send({
            success: true,
            message: 'Added movie',
        });
    } catch (err) {
          res.send({
            success: false,
            message: err
        });
    }
}

module.exports = {
    getMovies,
    addMovie
}