var init = {

    initialStates: function(){
        $('#header').hide();
        $('.item').hide();
        $('#resultFrame').hide();
        $('#this-carousel-id').hide()
        $('a').hide();
        $('').hide();
    },

    onReady: function(){
        init.initialStates();
        $('#header').fadeIn(2000, function() {
            $('#this-carousel-id').fadeIn(2000);
            generateCarousel.generateItems();
            quizLogic.answers();
        });
    }

};

var generateCarousel = {

    item: " <div class='item'>" +
                    "<h1></h1>" +
                    "<h2></h2>" +
                    "<ul>" +
                        "<li><input type='radio' name='answer' value='0'/></li>" +
                        "<li><input type='radio' name='answer' value='1'/></li>" +
                        "<li><input type='radio' name='answer' value='2'/></li>" +
                    "</ul>" +
                "</div>",

    generateItems: function(){

        var itemClone;
        for(var i = 0; i < questions.length; i++){
            itemClone = $(generateCarousel.item).clone();
            itemClone.find('h1').text('Question ' + (i+1));
            itemClone.find('h2').text(questions[i].question);

            //should I do a nested for loop?
            itemClone.find('li:nth-child(1)').append(questions[i].choices[0]);
            itemClone.find('li:nth-child(2)').append(questions[i].choices[1]);
            itemClone.find('li:nth-child(3)').append(questions[i].choices[2]);

            $('.carousel-inner').append(itemClone);
        };

        $('.item:nth-child(1)').addClass('active');
    }
};

var quizLogic = {

    answerArray: new Array(),

    answers: function(){

        $('input[name=answer]', '.item').click(function(){
            $('a').fadeIn(1000);
        });

        function saveAnswerAndHideLeftRight(){
            quizLogic.saveSwitch($('.active').find('h1').text());
            $('a').hide();
        };

        $('a').click(function(){
            saveAnswerAndHideLeftRight();
        });
    },

    saveSwitch: function(quizNum){

        var checkedInput = $('input[name=answer]:checked', '.item').val();

        switch(quizNum){
            case "Question 1":
                quizLogic.answerArray[0] = checkedInput;
                quizLogic.checkCompletion();
                break;
            case "Question 2":
                quizLogic.answerArray[1] = checkedInput;
                quizLogic.checkCompletion();
                break;
            case "Question 3":
                quizLogic.answerArray[2] = checkedInput;
                quizLogic.checkCompletion();
                break;
            default:
                break;
        }
    },

    checkCompletion: function(){
        var correctCount = 0;

        if(quizLogic.answerArray.length == 3){
            $('#this-carousel-id').hide();

            for(var i = 0; i < 3; i++){
                var x;
                var y;

                x = quizLogic.answerArray[i];
                y = questions[i].correct;

                if(quizLogic.answerArray[i] == questions[i].correct){
                    correctCount++;
                }
            }

            $('#resultFrame').find('h1').text("Score: "+ correctCount + " / " + questions.length);
            $('#resultFrame').fadeIn(1000, function(){
                $('#retry').fadeIn(2000);
            });
        }
    }
};

$(document).ready(init.onReady);