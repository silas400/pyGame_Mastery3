//Most variables that we use here are already defined in the other script! :D

// Add Event Listeners For all drag elements
function initializeDragAndDrop() {

    draggables = currentLesson.querySelectorAll('.answers')
    box = currentLesson.querySelector('.emptyBox') || currentLesson.querySelector('.emptyBox2');
    answerContainer = currentLesson.querySelector(".answerContainer")

    originalPositions = Array.from(draggables).map(elem => elem.getBoundingClientRect()); //Useful for creating the illusion of button animation.

    // Event listeners for draggables
    draggables.forEach(draggable => {

        draggable.addEventListener('dragstart', (e) => {

            draggableClone = draggable.cloneNode(true);

            currentDraggableText = draggable.textContent;

            setTimeout(() => {
                draggable.remove();
                buttonTransition();
            }, 0);
        });

        draggable.addEventListener('dragend', () => {
            answerContainer.append(draggableClone);
            addDragListeners(draggableClone)
            draggables = document.querySelectorAll('.answers');
            originalPositions = Array.from(draggables).map(elem => elem.getBoundingClientRect());
        });

        draggable.addEventListener("click", () => {
            box.style.width = 'fit-content';
            box.style.height = 'fit-content';
            box.value = draggable.textContent;
            checkButton.disabled = false
            checkButton.style.backgroundColor = "#1976D2"
            resizeInput()
        })
    });

    // Event listener for the container to allow dragover
    container.addEventListener("dragover", function(e){
        e.preventDefault();
    });

    // Event listeners for the drop area
    box.addEventListener("dragover", function(e){
        e.preventDefault();

        if (box.value == ''){
            measureDiv.textContent = currentDraggableText
            var textWidth = measureDiv.offsetWidth;
            box.style.width = textWidth + 'px';
        }
        
        
    });

    box.addEventListener("drop", function(e){
        box.style.width = 'fit-content';
        box.style.height = 'fit-content';
        box.value = currentDraggableText;
        checkButton.disabled = false
        checkButton.style.backgroundColor = "#1976D2"
        resizeInput()
    });

    box.addEventListener('dragleave', function(){
        box.style.width = originalBoxWidth;
    })
}

//Add drag Listeners to a singular element.
function addDragListeners(draggable){
    draggable.addEventListener('dragstart', (e) => {
      draggableClone = draggable.cloneNode(true);
      draggable.classList.add('dragging');
      currentDraggableText = draggable.textContent;
      setTimeout(() => {
          draggable.remove();
          buttonTransition();
      }, 0);
  });
  
  draggable.addEventListener('dragend', () => {
      answerContainer.append(draggableClone);
      addDragListeners(draggableClone)
      draggables = document.querySelectorAll('.answers');
      originalPositions = Array.from(draggables).map(elem => elem.getBoundingClientRect());
  });
  
  draggable.addEventListener("click", () => {
    box.style.width = 'fit-content';
    box.style.height = 'fit-content';
    box.value = draggable.textContent;
    checkButton.disabled = false
    checkButton.style.backgroundColor = "#1976D2"
    checkButton.classList.remove('disabled')
    resizeInput()
  })
  }

function resizeInput() {
    if (box.value == "") {
      box.style.width = originalBoxWidth;
      checkButton.disabled = true
      checkButton.style.backgroundColor = "#d3d9de"
      checkButton.classList.add('disabled')
      
    }
    else{
  
      checkButton.classList.add('disabled')
      checkButton.disabled = false
      checkButton.style.backgroundColor = "#1976D2"
    }
    measureDiv.style.fontSize = getComputedStyle(box).fontSize;
    measureDiv.style.fontFamily = getComputedStyle(box).fontFamily;
    // Now set the text content for measurement
    measureDiv.textContent = box.value;
    
    var textWidth = measureDiv.offsetWidth;
    box.style.width = textWidth + 'px';
  }
  
function buttonTransition(){
  
    // Apply transition to each element
    draggables.forEach((elem, index) => {
      
      // Step 2: Get the new position for this element
      const newPosition = elem.getBoundingClientRect();
  
      // Step 3: Calculate the difference for this element
      const deltaX = originalPositions[index].left - newPosition.left;
      const deltaY = originalPositions[index].top - newPosition.top;
  
  
      // Step 4: Apply a transition to move the element smoothly
      // Reset any existing transitions
      elem.style.transition = 'transform 0s'; 
      // Translate the element back to its original position
      elem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  
      // Force a reflow to ensure the transform applies before we set the transition
      // This is done by accessing a property that requires the browser to calculate layout, such as offsetWidth
      elem.offsetWidth; 
  
      
  
      // Now set the transition and move the element back to its new position
      elem.style.transition = 'transform 0.5s ease';
      elem.style.transform = '';
    });
    
    originalPositions = Array.from(draggables).map(elem => elem.getBoundingClientRect());
  }
  
function checkButtonClicked(){

  if (currentLesson.querySelector(".emptyBox")){
    if (box.value == currentLesson.querySelector(".emptyBox").getAttribute('data-answer')){
      box.style.border = "2px green solid"
      // Play the Silas audio here
      // Generate a random integer between 1 and 3
      randomNumber =  Math.floor(Math.random() * 5) + 1;

      box.disabled = true; // Make it so that the user cant modify the box.

      //Clever way to remove event listeners from the box lmao.
      const clonedBox = box.cloneNode(true);
      box.parentNode.replaceChild(clonedBox, box);

      //Turn the CHECK button into a NEXT button.
      checkButton.onclick = nextButtonClicked;
      checkButton.textContent = "NEXT"
  
      // Create the full filename by concatenating the base name, random number, and extension
      var audio = new Audio(baseName + randomNumber + extension);
      audio.play();
      
      //Remove the script from the body since the quiz is over.
      let scriptToRemove = document.querySelector('body > script:last-of-type')
      scriptToRemove.parentNode.removeChild(scriptToRemove) 

      document.body.removeChild(measureDiv) //Remove the invisible div since we no longer need it to do the resize input box trick.
    }
  
    else{
      box.style.border = "2px red solid"
    }
  }

  else if (currentLesson.querySelector(".emptyBox2")) {

    if (box.value == currentLesson.querySelector(".emptyBox2").getAttribute('data-answer')){
    box.style.border = "2px green solid"
    // Play the Silas audio here
    // Generate a random integer between 1 and 3
    randomNumber =  Math.floor(Math.random() * 5) + 1;

    box.disabled = true; // Make it so that the user cant modify the box.

    //Clever way to remove event listeners from the box lmao.
    const clonedBox = box.cloneNode(true);
    box.parentNode.replaceChild(clonedBox, box);

    //Turn the CHECK button into a NEXT button.
    checkButton.onclick = nextButtonClicked;
    checkButton.textContent = "NEXT"

    // Create the full filename by concatenating the base name, random number, and extension
    var audio = new Audio(baseName + randomNumber + extension);
    audio.play();
    
    //Remove the script from the body since the quiz is over.
    let scriptToRemove = document.querySelector('body > script:last-of-type')
    scriptToRemove.parentNode.removeChild(scriptToRemove) 

    document.body.removeChild(measureDiv) //Remove the invisible div since we no longer need it to do the resize input box trick.
    }

    else{
      box.style.border = "2px red solid"
    }

  }

 

  }
 
  


function eraseBoxContent(){
if (box.value != ''){
    box.value = ''
    box.style.width = originalBoxWidth
    checkButton.disabled = true
    checkButton.style.backgroundColor = "#d3d9de"
    checkButton.classList.add('disabled')
}
}

//Access the check button, but disable since we want to find the correct answer first.
checkButton = currentLesson.querySelector(".check-button")
checkButton.classList.add('disabled')

//Access the empty box where we will put in our answers, and add some event listeners to create the resizing animations.
box = currentLesson.querySelector('.emptyBox') || currentLesson.querySelector('.emptyBox2');
box.addEventListener('input', resizeInput);
box.addEventListener('click', eraseBoxContent)


originalBoxWidth = box.style.width //Stores the original box width so that we can always resize it back to its original position.

//Dynamic Resizing InputBox Stuff
measureDiv = document.createElement('div');
measureDiv.classList.add('hidden-measure');
measureDiv.style.fontSize = getComputedStyle(box).fontSize;
measureDiv.style.fontFamily = getComputedStyle(box).fontFamily;
document.body.appendChild(measureDiv);

// Call the function to initialize drag and drop functionality for all current answers/draggables.
initializeDragAndDrop();
