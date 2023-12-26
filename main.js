const questions = [
  'When is my birthday?',
  'Am I right-handed or left-handed?',
  'How tall am I?',
  'What is my favorite video game?',
  'What is my favorite color?',
  'Write down below, what one of your most memorable moments with me has been.',
];

const answers = [
  '03-04-2001',
  'right-handed',
  '5ft-11in',
  'League-of-Legends',
  'Green',
  '',
];
function parseDate(dateString) {
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    // Validate year, month, and day
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1000) {
      return new Date(year, month - 1, day);
    }
  }

  return null; // Return null for invalid date
}

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

  localStorage.setItem('userAnswers', JSON.stringify(userProvidedAnswers));
  // Verify user answers
  const verificationResults = verifyAnswers(userProvidedAnswers);

  // Check if all answers are correct
  const allCorrect = verificationResults.every((result) => result);

  // Display results
  for (let i = 0; i < verificationResults.length; i++) {
    const resultElement = document.getElementById(`result${i + 1}`);
    const correctnessText = verificationResults[i] ? 'Correct' : 'Incorrect';
    resultElement.innerHTML = `<strong style="color: ${
      verificationResults[i] ? 'green' : 'red'
    }">${correctnessText}</strong>`;
  }

  // Inside the submitAnswers function
  console.log('Verification results:', verificationResults);

  // If all answers are correct, navigate to the reward page
  if (allCorrect) {
    console.log('All answers are correct. Redirecting to reward.html');
    window.location.href = 'reward.html';
  }
}
function verifyAnswers(userAnswers) {
  const results = [];

  for (let i = 0; i < answers.length; i++) {
    const userAnswer = userAnswers[i];
    const correctAnswer = answers[i];

    // Special handling for the date question (index 0)
    if (i === 0) {
      const userDate = parseDate(userAnswer);
      const correctDate = parseDate(correctAnswer);

      // Compare dates only (not the time)
      results.push(
        userDate && correctDate && userDate.getTime() === correctDate.getTime()
      );
    } else {
      // For other questions, compare as usual
      results.push(userAnswer === correctAnswer || correctAnswer === '');
    }
  }

  return results;
}
