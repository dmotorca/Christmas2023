const questions = [
  'When is my birthday?',
  'Am I right-handed or left-handed?',
  'How tall am I? (Select a range)',
  'What is my favorite video game? (Select a range)',
  'What is my favorite color?',
  'Write down below, what one of your most memorable moments with me has been.',
];

function createQuestionElement(question, index) {
  const questionElement = document.createElement('div');
  questionElement.innerHTML = `
        <label>${question}</label><br>
        <input type="text" id="answer${index + 1}" required><br><br>
    `;
  return questionElement;
}

function submitAnswers() {
  const answers = [];
  for (let i = 0; i < questions.length; i++) {
    const answerElement = document.getElementById(`answer${i + 1}`);
    const answer = answerElement.value.trim();
    answers.push(answer);
  }

  // You can now do something with the user's answers
  console.log("User's answers:", answers);

  // For demonstration purposes, let's display the answers in an alert
  alert("User's answers:\n" + answers.join('\n'));
}

// Dynamically create question elements
const questionsContainer = document.getElementById('questions-container');
questions.forEach((question, index) => {
  const questionElement = createQuestionElement(question, index);
  questionsContainer.appendChild(questionElement);
});
