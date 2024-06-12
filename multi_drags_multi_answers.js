//Most variables that we use here are already defined in the other script! :D

boxes = currentLesson.querySelectorAll('.emptyBox2') // Get all the boxes

currentBox = null
touch = null

boxIndex = 0

currentlySelectedBox = boxes[boxIndex]

currentlySelectedBox.focus()

originalBoxWidth = currentlySelectedBox.style.width //Stores the original box width so that we can always resize it back to its original position.

//Dynamic Resizing InputBox Stuff
measureDiv = document.createElement('div');
measureDiv.classList.add('hidden-measure');
measureDiv.style.fontSize = getComputedStyle(currentlySelectedBox).fontSize;
measureDiv.style.fontFamily = getComputedStyle(currentlySelectedBox).fontFamily;
document.body.appendChild(measureDiv);

// Function to focus on the next box/element
function moveToNextElement() {
    // Check if the next index is within the list bounds
    if (boxIndex + 1 < boxes.length) {
      boxIndex++; // Move to the next index
      boxes[boxIndex].focus(); // Get the next element
      currentlySelectedBox = boxes[boxIndex]
      
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function checkOverlap(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    if (rect1.left < rect2.right && rect1.right > rect2.left &&
        rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
        return true;
    }
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
  
  draggable.addEventListener("click", function() {
        measureDiv.textContent = this.textContent
        var textWidth = measureDiv.offsetWidth;
        currentlySelectedBox.style.width = textWidth + 'px';
        currentlySelectedBox.style.maxWidth = textWidth + 'px';
        currentlySelectedBox.value = this.textContent
        resizeInput()
        moveToNextElement()
    
  })
}

function resizeInput() {
    console.log('hmm')
    if (currentlySelectedBox.value == "") {
        console.log("ahh?")
        currentlySelectedBox.style.width = originalBoxWidth;
    }
    else{
  
      checkButton.classList.add('disabled')
      checkButton.disabled = false
      checkButton.style.backgroundColor = "#1976D2"
    }
    // Now set the text content for measurement
    measureDiv.textContent = currentlySelectedBox.value;
    
    var textWidth = measureDiv.offsetWidth;
    currentlySelectedBox.style.maxWidth = textWidth + 'px'
    currentlySelectedBox.style.width = textWidth + 'px';
  }

function eraseBoxContent(){
    if (this.value != ''){
        this.value = ''
        this.style.width = originalBoxWidth
        checkButton.disabled = true
        checkButton.style.backgroundColor = "#d3d9de"
        checkButton.classList.add('disabled')
    }
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

// Add Event Listeners For all drag elements
function initializeDragAndDrop() {

    draggables = currentLesson.querySelectorAll('.answers')
   

    boxes[boxIndex].focus()

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

        draggable.addEventListener("click", function (){
            measureDiv.textContent = this.textContent
            var textWidth = measureDiv.offsetWidth;
            currentlySelectedBox.style.width = textWidth + 'px';
            currentlySelectedBox.style.maxWidth = textWidth + 'px';
            currentlySelectedBox.value = this.textContent
            resizeInput()
            moveToNextElement()
        })


    let active = false;
    let currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;

    draggable.addEventListener('touchstart', (e) => {
        e.preventDefault();

        touch = event.touches[0]

        currentDraggableText = draggable.textContent

        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;

        if (e.target === draggable) {
            active = true;
        }
    });

    draggable.addEventListener('touchend', (e) => {
        e.preventDefault()
        const touch = e.changedTouches[0]
        const endX = touch.clientX;
        const endY = touch.clientY;

         // Check if the touch point has not moved much and the event is quick. Clever way to detect taps.
        if (Math.abs(endX - initialX) < 3 && Math.abs(endY - initialY) < 3) {
            console.log('Tap detected!');
            currentlySelectedBox.value = currentDraggableText
            resizeInput()
            moveToNextElement()

         }
        else if (checkOverlap(draggable, currentlySelectedBox)){
            currentlySelectedBox.value = draggable.textContent
            resizeInput()
            moveToNextElement()
        }
        draggable.style.transform = "none"
        active = false; // Reset active status

        
    });

    draggable.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (active) {
            
            currentDraggableText = draggable.textContent

            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;

            boxes.forEach((box, index) =>{
                console.log("Yea")
                if (checkOverlap(draggable, box)){

                    if (box != currentlySelectedBox) {

                        if (currentlySelectedBox.value == ''){

                            currentlySelectedBox.style.width = originalBoxWidth

                            }

                        currentlySelectedBox = box
                        currentlySelectedBox.focus()
                        boxIndex = index
                      
                    }

                    if (box.value == ''){
                        console.log("Yea2")
                        measureDiv.textContent = currentDraggableText
                        var textWidth = measureDiv.offsetWidth;
                        box.style.maxWidth = box.style.width = textWidth + 'px'
                        box.style.width = textWidth + 'px';
                    }
                }

                else{
                    if (box.value == ''){
                         box.style.width = originalBoxWidth
                    }
                }

            })

            setTranslate(currentX, currentY, draggable);
        }
    });


    });
    

    // Event listener for the container to allow dragover
    container.addEventListener("dragover", function(e){
        e.preventDefault();
    });

    boxes.forEach((box, index) =>{
        box.addEventListener('input', resizeInput);
        box.addEventListener('click', eraseBoxContent)

        box.addEventListener("focus", function(){
            boxIndex = index
            currentlySelectedBox = this;
        })

        // Event listeners for the drop area
        box.addEventListener("dragover", function(e){
            e.preventDefault();

            if (this.value.trim() == ''){
                measureDiv.textContent = currentDraggableText
                var textWidth = measureDiv.offsetWidth;
                box.style.maxWidth = box.style.width = textWidth + 'px'
                box.style.width = textWidth + 'px';
                box.focus()
            }
            
            
        });
        

        box.addEventListener("drop", function(e){
            measureDiv.textContent = currentDraggableText
            var textWidth = measureDiv.offsetWidth;
            this.style.width = textWidth + 'px';
            this.style.maxWidth = textWidth + 'px';
            this.value = currentDraggableText
            boxIndex = index
            resizeInput()
            moveToNextElement()
        });

        box.addEventListener('dragleave', function(){
            if (box.value == ""){
                this.style.width = originalBoxWidth;
            }
            
        })
    })

    
}


// Function to check if all box values are unique
function checkUniqueValues() {
    // Convert NodeList to Array and map it to their values
    const values = Array.from(boxes).map(box => box.value);
    
    // Create a new Set from the values array (Set objects store unique values)
    const uniqueValues = new Set(values);
    
    // Check if the size of the Set is equal to the length of the values array
    if (uniqueValues.size === boxes.length) {
        return true
    } else {
        return false
    }
}

  

  
function checkButtonClicked(){

    let allCorrect = true
    
    
    if (boxes[0].getAttribute('data-answer').includes("--")){
         boxes.forEach(box => {
        

            if (box.getAttribute('data-answer').split("--").includes(box.value) && checkUniqueValues()) {
                box.style.border = "2px green solid"
                box.disabled = true; // Make it so that the user cant modify the box.
            }
    
            else{
                box.style.border = "2px red solid"
                allCorrect = false
            }
        })
    }
    
    else {
         boxes.forEach(box => {
        

            if (box.getAttribute('data-answer') == box.value) {
                box.style.border = "2px green solid"
                box.disabled = true; // Make it so that the user cant modify the box.
            }
    
            else{
                box.style.border = "2px red solid"
                allCorrect = false
            }
        })
    }


   

    if (allCorrect){

      console.log("um?")

      // Play the Silas audio here
      // Generate a random integer between 1 and 3
      randomNumber =  Math.floor(Math.random() * 5) + 1;

      // Create the full filename by concatenating the base name, random number, and extension
      var audio = new Audio(baseName + randomNumber + extension);
      audio.play();

      //Turn the CHECK button into a NEXT button.
      checkButton.onclick = nextButtonClicked;
      checkButton.textContent = "NEXT"

    //Remove the script from the body since the quiz is over.
    let scriptToRemove = document.querySelector('body > script:last-of-type')
    scriptToRemove.parentNode.removeChild(scriptToRemove) 

    document.body.removeChild(measureDiv) //Remove the invisible div since we no longer need it to do the resize input box trick.
    }

}
  



//Access the check button, but disable since we want to find the correct answer first.
checkButton = currentLesson.querySelector(".check-button")
checkButton.classList.add('disabled')

// Call the function to initialize drag and drop functionality for all current answers/draggables.
initializeDragAndDrop();




