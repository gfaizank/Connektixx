import https from 'https';
import http from 'http';

// The URL of your deployed Render app
const RENDER_URL = 'https://your-app-name.onrender.com/keep-alive';

console.log(`Pinging ${RENDER_URL} to keep it alive...`);

// Choose http or https depending on your URL
const requester = RENDER_URL.startsWith('https') ? https : http;

requester.get(RENDER_URL, (res) => {
  const { statusCode } = res;
  
  if (statusCode === 200) {
    console.log(`Successfully pinged at ${new Date().toISOString()}`);
  } else {
    console.error(`Failed with status code: ${statusCode}`);
  }
}).on('error', (err) => {
  console.error(`Error pinging the server: ${err.message}`);
});