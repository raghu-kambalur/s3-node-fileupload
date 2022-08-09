const express =  require('express')
const AWS = require('aws-sdk');
const app = express()
const fs = require('fs');

require('dotenv').config();

// Enter copied or downloaded access ID and secret key here
const ID = process.env.S3_ACCESS_KEY_ID;
const SECRET = process.env.S3_SECRET_ACCESS_KEY;

// The name of the bucket that you have created
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

app.get('/',(req,res) => {
    
    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
    });

    const fileContent = fs.readFileSync('node_logo.png');

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME+'/blogs',
        Key: 'node_logo.png', // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        res.send(`File uploaded successfully. ${data.Location}`);
    });
})

app.listen(3001,() => {
    console.log('SERVER RUNNING ON PORT 3001');
})