const forge = require('node-forge');
const crypto = require('crypto');

// local:
// privateKeyInBase64='LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb1FJQkFBS0NBUUJVdWo5a2JJNWtMa3Y2RFh2M1NEcE9sWmNtM1FrUnRsT0lkZFc3T2xpUGx4Y1d1T1E3CnhQblpGbXFVV1ZiRmtlbThnakFhMGpEY0tscVVDVHRWSWNOZjY3d3FBbDhHeHdLWnJyV0NoR01sVzdEdklkczEKc1ZBek5oOXdFemd5NUFWbkVMNEY1Yi9KT01IVjlONUVsdktXcDJEQ2xNYVdoTU5kT3M1SEkvWlFnMzFPWEJDZApjQmpoMzl5NzBVZS9kQTFMTVhnVU5FU1Z5UjhnaGo3QmRHSEpBSVJ2QXFvYVJNRjhqdWJYREFOTWtYMGYzakNSCmNJcy9xVENoOVU4ZHZaeFdmK3BQNCtJejVYV0JmbEt2OHpnc3orMlNuUnN1TlRjSTIralBzWHVNSTV6RUZyUnMKUEZrUWNDc2tqdzlWQXd5U3l6Ny9FNmkrZG5OQyszS3BaVDlSQWdNQkFBRUNnZ0VBRlpsaFBiV2EyeGtlVDBHTwp2NnhQQ09lRG4rbXJQVE93dWRIb1NaR0hNQnZCVEE2WVNGQmZyU0xVeXJxM3J5Z1NZUGNEVW1NUkI1OVlkZktnCmlJUlI3U3NJVGVGSzNreHZja1FpaTRJNlVEUyt0MGQzUFluVk95anAvTVU1aDJldnBPV1V1NllsTFNQbDdpZzkKWFZqcHdOUXNpNDRuemdsTVVJRUVRd2g4NjJzK3Jhb3V2R3pjRURSK0RreURVMDZucGFpWXJ3aUVmK1BabHZEUQpTbUVDTGc5bU4xc2pDdFh0ckNKWmEvUXlzYVBhUUpuZjdXTE1pTVVYcGhoT281UTBuaTdRaGo5L2lLME9BTmRFCnoyS2ZwWWNGVDc3eU1OU2VISEllcE40a05BcWhQSlkzdTBBWW0vVTE5V2hmRytOU3ZvNGVQWTlKcmZnODR0algKMUU0bjBRS0JnUUNZUzlWVlkwaFNjSFRHc2lFdFBLb2JvNTlNdDR2SWUwRW4zMzJKaXlaWkdQV1ZqSExFc3k0TwpvK3NYbCttNE1CdHh6dzZTcUVMc3JBZzlGSHByZHFsYUxZWFdVeFZ0YTAxbUxsbW5BSktVSllZbTRIVFFWanpxCnlQRE1YWVhBdXAvUGV1R0lDYlpOVWZqY3dKT3FzcmdCYXRWelArQmZ5WW14bHFwUWMveGQxUUtCZ1FDT2ErT0oKUC9RaEkyNTBBRTB6S3hEQWVvQ21hU0MvQnlScnVneFo1bUE2bjc3ZHJsM29HWlgyaHRDdWp1VkVnbTFBSUhjYQpnMGowN1l5Z2RCOE1Pcitja3h5eWNOeW1CMXpyRm5Ick9CelNMY1RsOVZCVkJYOUxMUlUvYmF0T3Fwek4vTXo0Ci8vd013U1o2cGlRc3YwN2hROTJESHdXU3M3WTFpekZqdGpyTmpRS0JnRHdtVjArdU1yWThyQ0o5NEJTWnpTVzEKYmdsQ3hQYWRsNUpEOXJVSVBGRWNSb0tXUWczbUp0NnBad1NlZnpTNzYxcjd5R21zQXlLdW4ySmdZQ2xwYUdHeApjUmJCSWNsaGcrUkRraTBmVU1VcVBOM0Y4TjBIOG05WWhhSnhuWTROSjJrdXd6eVRlV2o0WXkzczhXV055SmJtCnR2OFp6MmlGbE5pTEJTRlpiZWN4QW9HQWJtbkdKUW1ud21rdG9GRDdpTWZDWFBhYjltZGFNNzdkeFlhZlBMTVYKdDExUkk1dWl3ZVhVRlNPL2RSVGpPWkhFRVFzYVN6dXN1L1hPS0RiZU95VHdsL3FWTE9IQ3JoVFhQSXBTRndHUgpsb0JWUGRKSlRTRE41d0kwanMvL0Z5VytHeFA1OUxEQVAwTWZDY2IwRkp6Y0VsZ0N5enlwbldvbHdLMEF4VVRwCm9hRUNnWUFyVnJuRmZVKzE2WjFxaTRraFNDbVd4c25FWjB4QjhZOFZFWkhKNjFLQjdNUy9qV0xqbU80NlRRMHkKZmcxMkx0MjVJWWIrUnllK0ZsSWt4ZXgvRkF1WmNkVC9WeHNjejg5WCtEemREUzJ4eUJSNnJUK2tJNXVYbUZFTQpvK1drSGc2YmJhTytWSnlrMWE1TjJJN0N3elAyeU9mZEl6VVJmeXpIK2krMHNoTE9rQT09Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t'
// publicKeyInBase64='LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklUQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FRNEFNSUlCQ1FLQ0FRQlV1ajlrYkk1a0xrdjZEWHYzU0RwTwpsWmNtM1FrUnRsT0lkZFc3T2xpUGx4Y1d1T1E3eFBuWkZtcVVXVmJGa2VtOGdqQWEwakRjS2xxVUNUdFZJY05mCjY3d3FBbDhHeHdLWnJyV0NoR01sVzdEdklkczFzVkF6Tmg5d0V6Z3k1QVZuRUw0RjViL0pPTUhWOU41RWx2S1cKcDJEQ2xNYVdoTU5kT3M1SEkvWlFnMzFPWEJDZGNCamgzOXk3MFVlL2RBMUxNWGdVTkVTVnlSOGdoajdCZEdISgpBSVJ2QXFvYVJNRjhqdWJYREFOTWtYMGYzakNSY0lzL3FUQ2g5VThkdlp4V2YrcFA0K0l6NVhXQmZsS3Y4emdzCnorMlNuUnN1TlRjSTIralBzWHVNSTV6RUZyUnNQRmtRY0Nza2p3OVZBd3lTeXo3L0U2aStkbk5DKzNLcFpUOVIKQWdNQkFBRT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t'


// Function to get the RSA key pair
const getKeyPair = async () => {
  const publicKey = forge.pki.publicKeyFromPem(forge.util.decode64(publicKeyInBase64));
  const privateKeyInPem = forge.util.decode64(privateKeyInBase64);

  const privateKey = passphrase
    ? forge.pki.decryptRsaPrivateKey(privateKeyInPem, passphrase)
    : forge.pki.privateKeyFromPem(privateKeyInPem);

  return { publicKey, privateKey };
};

// Function to encrypt a user object
const encrypt = async (user) => {
  const { publicKey } = await getKeyPair();
  const data = publicKey.encrypt(JSON.stringify(user));
  return forge.util.encode64(data);
};

(async () => {
    console.log('Kris encrypt', await encrypt('123456'))
})();


// Function to decrypt a payload into a string
const decryptToString = (payload) => {
  const data = crypto
    .privateDecrypt(
      {
        key: Buffer.from(privateKeyInBase64, 'base64'),
        passphrase,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha1',
      },
      Buffer.from(payload, 'base64')
    )
    .toString('utf8');
  return data;
};

console.log('Kris decrypt', decryptToString('I2l1D+MeNiz1LyFChv/hTSuyELHcgTZXdFc+F4yj+WqRgL5UMiMDW5io3bOVmpnC2nv9BaJKy+J3j60E/tzBNIz3EpM8Tf8rtsRHPmY8wQWpVq30eTcIQ6JkSg5g/rFw+Gc/AgwTjlzgCZ7FaBv6fmi+VhHlaOAc3vluJ4EgyBuuc04L8IBgVTHMOlOcGKaEiQHTGM4e/ttrW3R1WnqtM0Uy7Ld5rgZiVkf0kFJImIxqJvpYakOXNuGB2S4ekn/VWRUdZd0V0UFyfXyYgzXsTluyFbEbEOFLTwy8nUwaNgQGmXTm68NJl8IbTxBe5J+FD+dwoGiDV5cxMO7iHHnFQw=='))

// Function to decrypt a user password payload
const decryptPassword = async (payload) => {
  const { privateKey } = await getKeyPair();
  const data = privateKey.decrypt(forge.util.decode64(payload));
  const { username, password } = JSON.parse(data);

  return { username, password };
};

// Function to encrypt a string payload
const encryptString = async (payload) => {
  const { publicKey } = await getKeyPair();
  const data = publicKey.encrypt(payload, 'RSA-OAEP');
  return forge.util.encode64(data);
};

// Function to encrypt a PIN object
const encryptPIN = async (payload) => {
  return await encryptString(JSON.stringify(payload));
};
