const es = new EventSource('quiz');

let username;

es.addEventListener('username', e => {
  console.log('I am user number: ' + e.data);
  username = e.data;
});

es.addEventListener('question', e => {
  console.log('Question: ' + e.data);
});

es.addEventListener('winner', e => {
  console.log('Winner: ' + e.data);
});

function answer (answerText) {
  const toSend = {
    answer: answerText,
    username: username
  }
  fetch('/quiz', {
    method: 'POST',
    body: JSON.stringify(toSend)
  }).catch(e => console.error);
}