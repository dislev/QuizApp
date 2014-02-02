$(document).ready(function(){
    
    $('#questionFrame').hide();
    $('#resultFrame').hide();
    $('h1').hide();
    
    $('h1').fadeIn(3000, function() {
        populateQuestion();
        $('#questionFrame').show('slide', {direction: 'right'}, 1000);
    });
    
    $('#questionFrame').on('submit',function(e){
        e.preventDefault();
        
        $(this).hide('slide', {direction: 'left'}, 1000, function(){
            populateQuestion();
        });
        
        $(this).show('slide', {direction: 'right'}, 1000);
    }); 
        
});

var count = 1;
var correctAnswers = 0;
var totalQuestions = 3;

function populateQuestion(){
    
    if(count <= totalQuestions){
        $('#count').html('Question '+ count + ' of ' + totalQuestions);
        $('#question').html('ass ' + count + '/' + totalQuestions);
        
        for(var i = 1; i <=3; i++){
            $('label[for="radio'+ i +'"]').text('Answer '+ i);
        }
        
        count++;
    }
    else{
        $('#questionFrame').html('<h2>END</h2>');
        $('#questionFrame').hide('slide', {direction: 'down'}, 2000, function(){
            populateResults();
        });
        
    }
}

function populateResults(){
    $('#resultFrame h2').html('SCORE ' +correctAnswers + '/' + totalQuestions);
    $('#resultFrame').show('slide', {direction: 'down'}, 1000);
}
