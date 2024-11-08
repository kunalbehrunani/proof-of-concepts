const crypto = require('crypto');
const fs = require('fs');

// Generate a key pair
crypto.generateKeyPair('rsa', {
  modulusLength: 2048,  // Key size in bits
  publicKeyEncoding: {
    type: 'spki',       // Recommended to use 'spki' for public key
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',      // Recommended to use 'pkcs8' for private key
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'SOME_PRIVATE_MESSAGE',  // Protect the private key with a passphrase
  },
}, (err, publicKey, privateKey) => {
  if (err) {
    console.error('Error generating key pair:', err);
    return;
  }

  // Save the public key to a file
  fs.writeFileSync('./public_key.pem', publicKey);

  // Save the private key to a file
  fs.writeFileSync('./private_key.pem', privateKey);

  console.log('Public and private keys generated and saved to files.');
});


const privateKey = '';
const publicKey = '';


const data = {
  "userId": 2012705394,
  "type": "debit",
  "component": "credit",
  "amount": 5,
  "currency": "inr",
  "customId": "TEST_TRANSACTION",
  "description": "Test Transaction"
};

const stringifiedPayload = JSON.stringify(data);
console.log({stringifiedPayload})



// Create a signature (signing the data)
const sign = crypto.createSign('SHA256').update(stringifiedPayload).end();

const signature = sign.sign({
  key: privateKey,
  passphrase: 'ROOTER_TECH_BACKEND_PAYMENTS_WRAPPER_2024_07_08',
}, 'base64');

console.log("Signature:", signature);




// Verify the signature
const verify = crypto.createVerify('SHA256').update(stringifiedPayload).end();

const isVerified = verify.verify(publicKey, signature, 'base64');
console.log("Signature is valid:", isVerified);



