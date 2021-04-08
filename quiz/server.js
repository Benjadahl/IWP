const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('index.html');
const js = fs.readFileSync('index.js');

let clients = [];
let currentQuestion = -1;
let answered = false;

let questions = JSON.parse(fs.readFileSync('questions.json'));
console.log(questions);

http.createServer((req, res) => {
  console.log(req.url);
  switch (req.url) {
    case '/':
      res.writeHeader(200, {"Content-Type": "text/html"});  
      res.write(html);  
      res.end();  
      break;
    case '/index.js':
      res.writeHeader(200, {"Content-Type": "text/javascript"});  
      res.write(js);  
      res.end();  
      break;
  
    case '/quiz':
      if (req.method === 'GET') {
        let username = clients.push(res); //Number of user
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Connectionc': 'keep-alive',
          'Cache-Control': 'no-cache'
        });
        writeToOpenClient(res, 'username', username);
      } else if (req.method === 'POST') {
        getAnswer(req, res);
      }
  }
}).listen(8000);

setInterval(() => {
  currentQuestion++;
  clients.forEach(client => {
    writeToOpenClient(client, 'question', questions[currentQuestion].question);
  });
  answered = false;
}, 15000);


function writeToOpenClient (client, event, data) {
  client.write(`event: ${event}\ndata: ${data}\n\n`);
}

async function getAnswer (req, res) {
  req.setEncoding('utf8');
  let body = '';
  for await (let chunck of req) {
    body += chunck;
  }

  res.writeHead(200).end();

  let data = JSON.parse(body);

  const correctAnswer = questions[currentQuestion].answer;
  console.log(correctAnswer)
  console.log(data.answer);

  if (data.answer === correctAnswer && !answered) {
    answered = true;
    clients.forEach(client => {
      writeToOpenClient(client, 'winner', data.username);
    });
  }
}