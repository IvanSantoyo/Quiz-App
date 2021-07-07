/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Experiment 626, later known as "Stitch", was created by whom?',
      answers: [
        'Dr.Jumba',
        'Dr. Doom',
        'Dr. Shah',
        'Dr. Lector'
      ],
      correctAnswer: 'Dr.Jumba'
    },
    {
      question: 'What does Lilo put in Stitch\'s bottle?',
      answers: [
        'Twisted Tea',
        'Coffee',
        'Orange Juice',
        'Lean'
      ],
      correctAnswer: 'Coffee'
    },
    {
      question: 'What type of dog did Lilo say Stitch was before he got run over?',
      answers: [
        'Chihuahua',
        'Boxer',
        'Lab',
        'Collie'
      ],
      correctAnswer: 'Collie'
    },
    {
      question: 'How much money did Lilo pay for Stitch?',
      answers: [
        'FREE',
        '$100',
        '$2',
        '$10'
      ],
      correctAnswer: '$2'
    },
    {
      question: 'What planet is Stitch from?',
      answers: [
        'Uranas',
        'Mars',
        'Pluto',
        'Turo'
      ],
      correctAnswer: 'Turo'
    },
    {
      question: 'Who or what did Lilo say controls the weather?',
      answers: [
        'Pudge',
        'God',
        'Nani',
        'Lilo'
      ],
      correctAnswer: 'Coffee'
    },
    {
      question: 'What does Nani tell the people on the phone that she thinks Stitch is?',
      answers: [
        'Monkey',
        'Baby Adrianita',
        'Koala',
        'Overgrown Ferret'
      ],
      correctAnswer: 'Koala'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  incorrect: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

function generateQuestionPage() {
  //storing question number  and questions in "question" variable
  let question = store.questions[store.questionNumber];
  //storing the a answer choices by looping through them with map
  let answers = question.answers.map((answer, idx) =>{
  //rendering html for the answer choices in radio buttons
    return `<input type="radio" id="answer${idx}" name="answer" value='${answer}' required>
    <label for='answer${idx}'>${answer}</label><br>`;
  });
//main page container. has div for current question and one for score.
  return `<div class='mainPage'>
  <div class='status'>Current Question: ${store.questionNumber + 1} out of 5</div>
  <div class='score'>Current Score: ${store.score}</div>
  <form id='question'>
    <h2>${question.question}</h2>
    ${answers.join(' ')}
    <button class='submit'>Submit Answer.</button>
    </form>
  </div>`;
}
//
function generateMainPage() {
   return `<div class='mainPage'>
  <h2>How well do you know stitch?</h2>
  <p>TEST YOUR KNOWLEDGE!<P>
  <button id='startQuiz' type="button">Start</button>
  </div>
  `;
}

function generateCorrectPage() {
   return `
  <div class='correctPage'>
  <h2>Correct!</h2>
  <p>Current Score: ${store.score}</p>
  <button id='nextQuestion' type="button">Next</button>
  </div>
  `;
  

}
function generateIncorrectPage() {
   return `
  <div class='incorrectPage'>
  <h2>Incorrect!</h2>
  <p>The correct is answer ${store.questions[store.questionNumber].correctAnswer}</p>
  <p>Current Score: ${store.score}</p>
  <button id='nextQuestion' type="button">Next</button>
  </div>
  `;
}

function generateEndOfGamePage() {
  return `
  <div class='finalPage'>
  <h2>How well did you know Arizona?</h2>
  <p>Your Score is ${store.score} out of ${store.incorrect}! </p>
  <button id='startOver' type="button">Try again?</button>
  </div>
  `;
}
/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  //accessing html dom
  let html = '';
  //if quiz has not started yet
  if (store.quizStarted === false) {
  //if quiz is on last question
    if(store.questionNumber === store.questions.length) {
  //render the end game page
      html = generateEndOfGamePage();
  //if quiz is not on the last question
    } else {
  //render main page
      html = generateMainPage();
    }
  //if quiz has been started and quiz is on last question
  } else if (store.questionNumber === store.questions.length){
  //render end game page
    html = generateEndOfGamePage();
  //if quiz has been started and your not on lasr question
  } else {
 //render question
    html= generateQuestionPage();
  }
  //assign to html
  $('main').html(html);
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function handleStartQuiz() {
  //event handler click on start quiz id from html button
  $('main').on('click', '#startQuiz', function() {
  //quiz has started
    store.quizStarted = true;
    //render to appropriate page
    render();
  });
}

function handleAnswerSubmit() {
  //evnet listner handling #question
  $('main').on('submit', '#question', function(event){
    event.preventDefault();
  //we will save the answer choseen by the user
    let chosenAnswer = $("input[name='answer']:checked").val();
  //the correct answe will be stroed 
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    //compare against correct answer
    if (chosenAnswer === correctAnswer) {
    //adding one point to the score
      store.score++;
      $('main').html(generateCorrectPage());
    } else {
      store.incorrect++;
      //adding one point to the incorrect object
      $('main').html(generateIncorrectPage());
    }
  });
  
}
//this resets the key values that keep track of the quiz status then renders the approproate page
function handleResetSubmit() {
//click event handler listening for #startover
  $('main').on('click', '#startOver', function(){
    store.quizStarted = false;
    store.score =0;
    store.questionNumber=0;
    render();
   });
}
//using an event handler to listen for the next question button which is id="#nextQuestion"
function handleNextQuestion() {
  $('main').on('click', '#nextQuestion', function(){
    //question number is added then cycled through to generate each question
    store.questionNumber++;
    //once the event is handeled the poage will render the appropriate page
    render();
  });
}

// ************* main function ****************//

function main() {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  generateQuestionPage();
  generateMainPage();
  generateCorrectPage();
  generateIncorrectPage();
  generateEndOfGamePage();
  handleResetSubmit();
  handleNextQuestion();
}

$(main);