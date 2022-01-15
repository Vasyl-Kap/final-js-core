let rand;
let pics = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
let check = true;
let timeMinut = 60;
let intervalID;

function randomPic() {
    $('.blocks').each(function(ind, elem) {
        rand = Math.floor(Math.random()*16);
        $('.blocks').eq(ind).css('order', rand)
    })
};

$(function() {
    randomPic();
});

function timer() {
    clearInterval(intervalID);
    intervalID = setInterval(function() {
        let seconds = timeMinut%60;
        let minutes = timeMinut/60%60;
        if (timeMinut <= 0) {
            clearInterval(intervalID);
            $('.modal-fade').css('display', 'block');
            $('.modal-text').text("It's a pity, but you lost");
            $('.close').css('display', 'none');
            $('.check2').css('display', 'none');
            $('.close2').css('display', 'inline-block');
            $('h1').text('00:00')
        }
        else {
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            $('h1').text(`0${Math.trunc(minutes)}:${seconds}`);
            $('span').text(`0${Math.trunc(minutes)}:${seconds}`);
        }
        --timeMinut;
    }, 1000)
    $('.start').prop('disabled', true);
    $('.check').prop('disabled', false);
}

$('.start').on('click', timer)

$('.end-block').sortable()

$('.start-block').draggable({
    connectToSortable: ".end-block",
    stack: '.start-block',
    containment: '.main',
    stop: timer
}) 

$('.check').on('click', function(){
    $('.modal-fade').css('display', 'block')
})

$('.check2').on('click', function(){
    for (let i=0; i<$('.start-block').length; i++){
        if($('.start-block').eq(i).text() != pics[i]){
            check = false;
            break;
        }
    }
    if(check){
        $('.modal-text').text("Woohoo, well done, you did it!");
        $('.close').css('display', 'none');
        $('.check2').css('display', 'none');
        $('.close2').css('display', 'inline-block');
    }
    else{
        $('.modal-text').text("It's a pity, but you lost");
        $('.close').css('display', 'none');
        $('.check2').css('display', 'none');
        $('.close2').css('display', 'inline-block');
    }
    check = true;
})

$('.close').on('click', function(){
    $('.modal-fade').css('display', 'none')
})

$('.close2').on('click', function(){
    clearInterval(intervalID);
    $('.modal-fade').css('display', 'none')
    $('.check').prop('disabled', true);
})