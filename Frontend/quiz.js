

let shuffledQuestions = [] 

async function handleQuestions() {
    // console.log('Hello');
    while (shuffledQuestions.length <= 9) {
        // console.log("Hello from within while-loop");
        try {
            const response = await fetch("http://localhost:5000/");
            console.log(response);
            // const response = await fetch("https://math-quiz-api-v1.onrender.com/");
            // console.log(response);

            var data = await response.json();

            console.log(typeof(data));
        } catch (error) {
            console.log(error);
            console.log("There is some error");
        }

        console.log(data);
        
        if (!shuffledQuestions.includes(data)) {
            shuffledQuestions.push(data)
        }
    }

    console.log("Shuffled Questions: ");
    console.log(shuffledQuestions);

    console.log("shuffledQuestions[0] elsewhere: ");
    console.log(shuffledQuestions[0]);
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in array
async function NextQuestion(index) {
    await handleQuestions()
    console.log("index:" + index); 
    console.log("typeof(index):" + typeof(index)); 
    console.log("shuffledQuestions: "); 
    console.log(shuffledQuestions); 
    console.log("typeof(shuffledQuestions): ");
    console.log(typeof(shuffledQuestions)); 
    console.log("typeof(shuffledQuestions[0]): ");
    console.log(typeof(shuffledQuestions[0]));
    const currentQuestion = shuffledQuestions[index];
    console.log("currentQuestion: ");
    console.log(currentQuestion);
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = shuffledQuestions[index].question;
    document.getElementById("option-one-label").innerHTML = shuffledQuestions[index].optionA;
    document.getElementById("option-two-label").innerHTML = shuffledQuestions[index].optionB;
    document.getElementById("option-three-label").innerHTML = shuffledQuestions[index].optionC;
    document.getElementById("option-four-label").innerHTML = shuffledQuestions[index].optionD;

}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        Swal.fire(
            'Invalid',
            'Select an option',
            'error'
          )  
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 500);
}

//sets options background back to null after display the right/wrong
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades"
       
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades"
    }
    else if (playerScore >= 7) {
        remark = "Excellent"
       
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    // document.getElementById('score-modal').style.display = "flex"
    Swal.fire(
        `remark: ${remark}`,
        `playerGrade: ${playerGrade}<br> playerScore: ${playerScore}`,
        'success'
      ) .then(() => {
        document.location.href="/";
      });
      

}
// closes score modal and resets game
// function closeScoreModal() {
//     questionNumber = 1
//     playerScore = 0
//     wrongAttempt = 0
//     indexNumber = 0
//     shuffledQuestions = []
//     NextQuestion(indexNumber)
//     document.getElementById('score-modal').style.display = "none"
// }

// //function to close warning modal
// function closeOptionModal() {
//     document.getElementById('option-modal').style.display = "none"
// }