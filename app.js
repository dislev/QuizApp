$(document).ready(function(){
    
    $('#questionFrame').hide();
    $('#resultFrame').hide();
    $('#header').hide();
    $('#retry').hide();
    
    $('#header').fadeIn(2000, function() {
        populateQuestion();
        $('#questionFrame').show('slide', {direction: 'right'}, 1000);
    });
    
    $('#questionFrame').on('submit',function(e){
        e.preventDefault();

        var answer = $('#answerSelection input:checked').val();
        checkAnswer(answer);
        
        $(this).hide('slide', {direction: 'left'}, 1000, function(){
            populateQuestion();
        });
        
        $(this).show('slide', {direction: 'right'}, 1000);
    }); 
        
    $('#retry').click(function(){
        $('body').fadeOut(2000, function(){
            location.reload();
        })

    });

});

var count = 0;
var correctAnswers = 0;
var totalQuestions = 3;

function populateQuestion(){
    
    count++;
    
    var qaSet = getQuestions();
    
    if(count <= totalQuestions){
        $('#count').html('Question '+ count + ' of ' + totalQuestions);
        $('#question').html(qaSet.question);
        $('#answerSelection input:nth-child(1)').prop('checked', true);
        
        for(var i = 1; i <= 3; i++){
            var a;
            a = qaSet.choices[i];
            $('label[for="radio'+ i +'"]').text(qaSet.choices[i-1]);
        }
    }
    else{
        $('#questionFrame').html('<h2>END</h2>');
        $('#questionFrame').hide('slide', {direction: 'down'}, 2000, function(){
            populateResults();
        });
        
    }
}

function populateResults(){
    $('#resultFrame h2').html('SCORE ' + correctAnswers + '/' + totalQuestions);
    $('#resultFrame h3').html(finalQuote(correctAnswers));
    
    $('#resultFrame').show('slide', {direction: 'down'}, 1000, function(){
        $('#retry').fadeIn(2000);
    });

}

function getQuestions(){
    
    var qAndAset;
    
    switch(count){
        case 1:
            qAndAset = questions[0];
            break;
        case 2:
            qAndAset = questions[1];
            break;
        case 3:
            qAndAset = questions[2];
            break;
       default:
            break;
    }
    
    return qAndAset;
}

function checkAnswer(answer){
    
    if(answer == null){
        alert('Please enter valid answer');
    }
    else{
        if(answer == questions[count-1].correct){
            correctAnswers++;
        }
    }
}

function finalQuote(correctAnswers){
    var finalStatement;
    
    switch(correctAnswers){
        case 0:
            finalStatement = "tough luck...";
            break;
        case 1:
            finalStatement = "maybe next time...";
            break;
        case 2:
            finalStatement = "so close!";
            break;;
        case 3:
            finalStatement = "ALL CORRECT!!!";
            break;
        default:
            break;
    }
    
    return finalStatement;
}
