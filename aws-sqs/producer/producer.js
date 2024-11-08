// const AWS = require('aws-sdk');

const { Producer } = require('sqs-producer');
const moment = require('moment');

const config = {
    ivs: {
        accessKeyId: '',
        secretAccessKey: '',
        region: 'us-west-2'
    },
    queueUrl: '',
    apiVersion: '2012-11-05'
};

// const sqs = new AWS.SQS({
//     apiVersion: '2012-11-05',
//     accessKeyId: config.ivs.accessKeyId,
//     secretAccessKey: config.ivs.secretAccessKey,
//     region: config.ivs.region
// });


const producer = Producer.create({
    queueUrl: config.queueUrl,
    region: config.ivs.region,
    accessKeyId: config.ivs.accessKeyId,
    secretAccessKey: config.ivs.secretAccessKey,
    apiVersion: config.apiVersion
});

const message = {
    id: `test-${moment().format('YYYY-MM-DD--HH-mm-ss')}`,
    body:`Hello@${moment().format('YYYY-MM-DD-HH:mm:ss')}`
};

console.log('message Sent: ', message.body);

producer.send([message]);