const express = require('express')
const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const moment = require('moment');


const app = express();

const config = {
    ivs: {
        accessKeyId: '',
        secretAccessKey: '',
        region: 'us-west-2'
    },
    queueUrl: '',
    apiVersion: '2012-11-05',
    setTimeoutInterval: 15
};

const sqs = new AWS.SQS({
    apiVersion: config.apiVersion,
    accessKeyId: config.ivs.accessKeyId,
    secretAccessKey: config.ivs.secretAccessKey,
    region: config.ivs.region
});

const consumer = Consumer.create({
    queueUrl: config.queueUrl,
    // heartbeatInterval: 15,
    visibilityTimeout: 30,
    handleMessage: async (message) => {
        try {
            console.log('message received @', moment().format('YYYY-MM-DD-HH:mm:ss'), ', info: ', message.Body);

            const data = message.Body;

            const response = await processEvents(data);

            await Promise.all([response]);

            console.log('method handleMessage completed successfully');
            
            return;
        } catch (err) {
            console.log('Error in handling message: ', err);
            // throw err;
        }
        
    }
}, sqs);

async function processEvents(data) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('message handled @', moment().format('YYYY-MM-DD-HH:mm:ss'));
            resolve(); 
        }, config.setTimeoutInterval*1000);
    });
};

consumer.start();

const PORT = 4321;

app.listen(PORT, ()=> console.log('sqs-consumer listening on port: ', PORT));


