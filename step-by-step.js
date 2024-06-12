let steps = currentLesson.querySelectorAll(".step")

console.log(steps)

let stepIndex = 0

let currentStep = steps[stepIndex]

currentStep.style.display = 'block'

nextStepButton = currentLesson.querySelector(".nextStep")

nextStepButton.addEventListener("click", function(){
    
    console.log(stepIndex)
    
    currentStep.style.display = "none"

    if (stepIndex + 1 <= steps.length){
        
        stepIndex += 1

        if (stepIndex == steps.length - 1) {
            nextStepButton.style.display = "none"
            currentLesson.querySelector(".answerContainer").style.display = "block";
        }
    }

    currentStep = steps[stepIndex]

    currentStep.style.display = "block"

})