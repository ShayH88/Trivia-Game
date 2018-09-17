$(document).ready(function () {
    var options = [
        {
            question: "What is Earth's largest continent?", 
            choice: ["Africa", "Europe", "Asia", "Antartica"],
            answer: 3,
            
         },
         {
            question: "In what country can you visit Machu Picchu?", 
            choice: ["Bolivia", "Columbia", "Chile", "Peru"],
            answer: 3,
            
         }, 
         {
            question: "Which U.S. state has the most active volcanoes?", 
            choice: ["Hawaii", "California", "Alaska", "Washington"],
            answer: 2,
            
        }, 
        {
            question: "What country is home to Kangaroo Island?", 
            choice: ["US", "France", "China", "Australia"],
            answer: 3,
          
        }, 
        {
            question: "What is the largest country in South America?", 
            choice: ["Columbia", "Argentina", "Peru", "Brazil"],
            answer: 3,
           
        }, 
        {
            question: "What is the tallest mountain in the world?", 
            choice: ["Mount Everest", "Mount Kilamanjaro", "Aconcagua", "Qogir" ],
            answer: 0,
            
        }, 
        {
            question: "Jerusalem is the capital of what Middle-Eastern country?", 
            choice: ["Syria", "Iraq", "Israel", "Eygpet" ],
            answer: 2,
            
        }, 
        {
            question: "What is the smallest independent country on Earth?", 
            choice: ["Vatican City", "Grenada", "Monaco", "Nauru"],
            answer: 0,
            
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 25;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
   
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
  
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
       
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    
    function displayQuestion() {
        
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answeroption");
                userChoice.html(pick.choice[i]);
                
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    
    }
    
    
    
    
    $(".answeroption").on("click", function () {
        
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
      
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
    