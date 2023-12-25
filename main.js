const questions = [
  'When is my birthday?',
  'Am I right-handed or left-handed?',
  'How tall am I?',
  'What is my favorite video game?',
  'What is my favorite color?',
  'Write down below, what one of your most memorable moments with me has been.',
];

const answers = [
  '03/04/2001',
  'right-handed',
  '5ft 11in',
  'League of Legends',
  'Green',
  '',
];

function createQuestionElement(question, index) {
  const questionElement = document.createElement('div');
  questionElement.innerHTML = `
        <label>${question}</label>
        <input type="text" id="answer${index + 1}" required>
        <span id="result${index + 1}"></span><br><br>
    `;
  return questionElement;
}

function submitAnswers() {
  const userProvidedAnswers = [];
  for (let i = 0; i < questions.length; i++) {
    const answerElement = document.getElementById(`answer${i + 1}`);
    const answer = answerElement.value.trim();
    userProvidedAnswers.push(answer);
  }

  // Verify user answers
  const verificationResults = verifyAnswers(userProvidedAnswers);

  // Display results
  for (let i = 0; i < verificationResults.length; i++) {
    const resultElement = document.getElementById(`result${i + 1}`);
    const correctnessText = verificationResults[i] ? 'Correct' : 'Incorrect';
    resultElement.innerHTML = `<strong style="color: ${
      verificationResults[i] ? 'green' : 'red'
    }">${correctnessText}</strong>`;
  }
}

// Dynamically create question elements
const questionsContainer = document.getElementById('questions-container');
questions.forEach((question, index) => {
  const questionElement = createQuestionElement(question, index);
  questionsContainer.appendChild(questionElement);
});

function verifyAnswers(userAnswers) {
  const results = [];

  for (let i = 0; i < answers.length - 1; i++) {
    const userAnswer = userAnswers[i];
    const correctAnswer = answers[i];

    if (userAnswer === correctAnswer || correctAnswer === '') {
      results.push(true);
    } else {
      results.push(false);
    }
  }

  return results;
}
