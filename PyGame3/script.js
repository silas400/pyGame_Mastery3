let box;
let boxes;
let originalBoxWidth;
let measureDiv;
let draggables;
let checkButton;
let currentDraggableText = ''
let originalPositions; //Useful for creating the illusion of button animation.
let nextButton;

let next; //this will be the "Next" Button.
let lessonIndex = 0 //Initial Content Page

let lessonPages = document.querySelectorAll(".lessonChunk")

currentLesson = lessonPages[lessonIndex]

currentLesson.style.position = 'relative'
currentLesson.style.top = '0'
currentLesson.style.left = '0'
currentLesson.style.visibility = "visible"

console.log(lessonPages)

nextButton = document.querySelector(".next")

let container = document.querySelector(".container")
let explainButton = document.querySelector(".explain-button")
let aiContent = document.querySelector("#contentExplained");
let answerContainer = document.querySelector(".answerContainer")
let index = 0

//Get the Arrows for navigating explanations
let rightArrow = document.querySelector(".rightArrow")
let leftArrow = document.querySelector(".leftArrow")

// Define the base name and extension of your audio files
var baseName = 'correct_';
var extension = '.mp3';
let randomNumber; //Prepare the variable that will hold the random number.

/*Ai Explanation Stuff*/
function postToServer(data, endpoint = 'data.php') {
  return fetch(endpoint, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.text(); // Change to response.json() if server responds with JSON
  })
  .then(text => {
      return JSON.parse(text); // Parses the text as JSON
  });
}


//To switch to next or previous explanation!
rightArrow.addEventListener("click", function(){
  if (index + 1 < explanationCount){
    index += 1
    aiContent.innerHTML = explanations[index]
  } 
})

leftArrow.addEventListener("click", function(){
  if (index - 1 > -1){
    index -= 1
    aiContent.innerHTML = explanations[index]
  } 
})


function nextButtonClicked(){
  lessonIndex += 1

  //Moves the element out of view. We avoid display none for SEO purposes.
  currentLesson.style.top = '-1000px'
  currentLesson.style.left = '-1000px'
  currentLesson.style.position = 'fixed'

  let newWidth = (lessonIndex / lessonPages.length) * 100;

  document.getElementById('progressBar').style.width = newWidth + '%'

  currentLesson = lessonPages[lessonIndex]

  //Moves the new element into view
  currentLesson.style.visibility = "visible"
  currentLesson.style.top = '0'
  currentLesson.style.left = '0'
  currentLesson.style.position = 'relative'
  currentLesson.style.display = "block"

  




  //Apply the correct script for the lesson chunk.
  if (currentLesson.classList.contains("4_drags_1_answer")){

    console.log("hmm")

    var script = document.createElement('script');
    script.src = '4_Drags_1_Answer.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);

  }

  if (currentLesson.classList.contains("1_answer")){
    var script = document.createElement('script');
    script.src = '1_answer.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);
  }

  if (currentLesson.classList.contains("multi_drags_multi_answer")){
    var script = document.createElement('script');
    script.src = 'multi_drags_multi_answers.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);
  }

  if (currentLesson.classList.contains("codeRun")){
    var script = document.createElement('script');
    script.src = 'codeRun.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);
  }

  if (currentLesson.classList.contains("step-by-step")){
    var script = document.createElement('script');
    script.src = 'step-by-step.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);
  }
}

function backButtonClicked(){
  lessonIndex -= 1

  //Moves the element out of view. We avoid display none for SEO purposes.
  currentLesson.style.top = '-1000px'
  currentLesson.style.left = '-1000px'
  currentLesson.style.position = 'fixed'

  let newWidth = (lessonIndex / lessonPages.length) * 100;

  document.getElementById('progressBar').style.width = newWidth + '%'

  currentLesson = lessonPages[lessonIndex]

  //Moves the new element into view
  currentLesson.style.visibility = "visible"
  currentLesson.style.top = '0'
  currentLesson.style.left = '0'
  currentLesson.style.position = 'relative'
  currentLesson.style.display = "block"

  




  //Apply the correct script for the lesson chunk.
  if (currentLesson.classList.contains("4_drags_1_answer")){

    console.log("hmm")

    var script = document.createElement('script');
    script.src = '4_Drags_1_Answer.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);

  }

  if (currentLesson.classList.contains("1_answer")){
    var script = document.createElement('script');
    script.src = '1_answer.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);
  }

  if (currentLesson.classList.contains("multi_drags_multi_answer")){
    var script = document.createElement('script');
    script.src = 'multi_drags_multi_answers.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);
  }

  if (currentLesson.classList.contains("codeRun")){
    var script = document.createElement('script');
    script.src = 'codeRun.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);
  }

  if (currentLesson.classList.contains("step-by-step")){
    var script = document.createElement('script');
    script.src = 'step-by-step.js'; // Replace 'your-script.js' with the URL or path to your script file
    // Append the script element to the document body
    document.body.appendChild(script);
  }
}



//Apply the correct script for the lesson chunk.
if (currentLesson.classList.contains("4_drags_1_answer")){

  console.log("hmm")

  var script = document.createElement('script');
  script.src = '4_Drags_1_Answer.js'; // Replace 'your-script.js' with the URL or path to your script file
  // Append the script element to the document body
  document.body.appendChild(script);

}

if (currentLesson.classList.contains("1_answer")){
  var script = document.createElement('script');
  script.src = '1_answer.js'; // Replace 'your-script.js' with the URL or path to your script file
  // Append the script element to the document body
  document.body.appendChild(script);
}

if (currentLesson.classList.contains("multi_drags_multi_answer")){
  var script = document.createElement('script');
  script.src = 'multi_drags_multi_answers.js'; // Replace 'your-script.js' with the URL or path to your script file
  // Append the script element to the document body
  document.body.appendChild(script);
}

if (currentLesson.classList.contains("codeRun")){
  var script = document.createElement('script');
  script.src = 'codeRun.js'; // Replace 'your-script.js' with the URL or path to your script file
  // Append the script element to the document body
  document.body.appendChild(script);
}

if (currentLesson.classList.contains("step-by-step")){
  var script = document.createElement('script');
  script.src = 'step-by-step.js'; // Replace 'your-script.js' with the URL or path to your script file
  // Append the script element to the document body
  document.body.appendChild(script);
}



/*AI Content Stuff*/
function postToServer(data, endpoint = 'data.php') {
  return fetch(endpoint, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.text(); // Change to response.json() if server responds with JSON
  })
  .then(text => {
      return JSON.parse(text); // Parses the text as JSON
  });
}

function handleClickOnDiv(div) {
  const data = { prompt: div.querySelector("code").textContent};

  console.log(data)
  postToServer(data)
      .then(data => {
          console.log('Success:', data); // Handle the success case
          aiContent.innerHTML = data; // Assuming 'data' is HTML or text content
          addClickEventToDivs();
      })
      .catch(error => {
          console.error('Error:', error); // Handle errors
      });
}

function addClickEventToDivs() {
  const divsInsideAiContent = aiContent.querySelectorAll('div');
  divsInsideAiContent.forEach(div => {
      div.addEventListener('click', function() {
          handleClickOnDiv(this);
      });
  });
}

function getExplanation(){
    console.log(currentSection)
    const data = {prompt: currentSection};
    postToServer(data)
        .then(jsonData => {
            console.log(jsonData); // Log the parsed data
            aiContent.innerHTML = jsonData; // Assume jsonData is the markup to be inserted
            addClickEventToDivs();
        })
        .catch(error => {
            console.error('Fetch error:', error); // Log any fetch errors
        });
}

