answers = currentLesson.querySelectorAll('.answers')
answerContainer = currentLesson.querySelector(".answerContainer")
console.log(answerContainer)

answers.forEach(answer => {
    answer.addEventListener("click", function(){
        console.log(answerContainer.getAttribute("data-answer"))
        console.log(answer.textContent)
        if (answer.textContent == answerContainer.getAttribute("data-answer")) {

            // Generate a random integer between 1 and 5
            randomNumber =  Math.floor(Math.random() * 5) + 1;

            answerContainer.innerHTML = `<button onclick="nextButtonClicked()" class="next">Next</button>`

            // Create the full filename by concatenating the base name, random number, and extension
            var audio = new Audio(baseName + randomNumber + extension);
            audio.play();

            //Remove the script from the body since the quiz is over.
            let scriptToRemove = document.querySelector('body > script:last-of-type')
            scriptToRemove.parentNode.removeChild(scriptToRemove)
        }
    })
})