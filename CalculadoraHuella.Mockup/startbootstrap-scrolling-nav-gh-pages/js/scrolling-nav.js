var sticky = document.querySelector('.sticky');

var container = document.querySelector('#container');

$('.sticky').scrollTop(120);

var origOffsetY = $('.sticky').offset().top - $(window).scrollTop();

//var previous = $('.previous')

$(document).ready(function() {

    $("#container").scroll(function() {

        if ($(this).scrollTop() > origOffsetY) {

            sticky.classList.add('fixed');

            $('.sticky').css({

                top: $(this).scrollTop() + 'px'

            });;

            $('.sticky-pusher').css({

                'height': $('.sticky').outerHeight() + 'px'

            });

        } else {

            $('.sticky-pusher').css({

                'height': '0px'

            });

            sticky.classList.remove('fixed');

        }

        console.log($(this).scrollTop());
    });

});