var init = (function() {

    var initialStates = function(){
        $('#header').hide();
        $('#resultFrame').hide();
        $('#this-carousel-id').hide();

        $('#retry').click(function(){
            $('body').fadeOut(1000, function(){
                location.reload();
            });
        });
    };
    
    var onReady = function(){
        initialStates();
        $('#header').fadeIn(1500, function() {
            $('#this-carousel-id').fadeIn(1000);
            generateCarousel.generateItems();

            $('.item').on( 'click', 'input[name=answer]', function(){
                $('a').fadeIn(1000);
            });
        });

        $('a').click(function(){
            quizLogic.saveAnswerAndHideLeftRight();
        });
    };

    return {
        onReady: onReady
    };

})();

var generateCarousel = (function() {

    var itemDivString =  " <div class='item'>" +
                    "<h1></h1>" +
                    "<h2></h2>" +
                    "<ul>" +
                        "<li><input type='radio' name='answer' value='0'/></li>" +
                        "<li><input type='radio' name='answer' value='1'/></li>" +
                        "<li><input type='radio' name='answer' value='2'/></li>" +
                    "</ul>" +
                    "<h4></h4>"+
                "</div>";

    var generateItems = function(){
        var itemClone;

        for(var i = 0; i < questions.length; i++){
            itemClone = $(itemDivString).clone();
            itemClone.attr('id', i);
            itemClone.find('h1').text('Question ' + (i+1) + ' of ' + questions.length);
            itemClone.find('h2').text(questions[i].question);

            for(var j = 1; j <= questions[i].choices.length; j++){
                itemClone.find('li:nth-child('+ j +')').append(questions[i].choices[j-1]);
            }

            $('.carousel-inner').append(itemClone);
        }

        $('.item:nth-child(1)').addClass('active');
    };

    return {
        generateItems: generateItems
    };

})();

var quizLogic = (function() {

    var answerArray = new Array();

    var saveAnswerAndHideLeftRight = function(){
        saveAnswer($('.active').attr('id'));
    };

    var saveAnswer =  function(quizNum){

        var input = undefined;

        input = $('input[name=answer]:checked', '#' + quizNum).val();

        if(typeof input !== 'undefined'){
            answerArray[quizNum] = input;
            $('#' + quizNum).find('h4').text('Answered');
        }

        if(answerArray.length == questions.length){
            checkAnswers(nullValueInArray());
        }
    };

    var nullValueInArray = function () {

        var hasNoUndefined = 0;

        for (var i = 0; i < answerArray.length; i++) {
            if (typeof answerArray[i] == 'undefined') {
                hasNoUndefined++;
            }
        }

        return hasNoUndefined;
    };

    var checkAnswers = function(nullCount){
        var correctCount = 0;

        if(nullCount == 0){

            $('#this-carousel-id').hide();

            for(var i = 0; i < questions.length; i++){
                if(answerArray[i] == questions[i].correct){
                    correctCount++;
                }
            }

            $('#resultFrame').find('h1').text("Score: "+ correctCount + " / " + questions.length);
            $('#resultFrame').fadeIn(1000, function(){
                $('#retry').fadeIn(2000);
            });
        }
    };

    return {
        answerArray:answerArray,
        saveAnswerAndHideLeftRight: saveAnswerAndHideLeftRight
    };

})();

$(document).ready(init.onReady);