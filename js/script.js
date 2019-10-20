/////////////////////////////////////
///////////////Service///////////////
/////////////////////////////////////

//Message//

$('.service__close').on('click', function () {
    $('.service__message').slideUp(500);
});

//Calculator//

var hardcorePrice = 10.99;
var nightmarePrice = 5.55;
var price = hardcorePrice;
var number = $('.calc__number input').val();
var permission = false;

$('.calc__items [type=radio]').on('change', function () {
    permission = true;
    if ( $(this).next().text() == 'Nightmare' ) {
        price = nightmarePrice;
        $('.calc__summ input').val('$' + (price * number).toFixed(2) );
    } else {
        price = hardcorePrice;
        $('.calc__summ input').val('$' + (price * number).toFixed(2) );
    }
});

$('.calc__button_plus').on('click', function () {
    if ( permission ) {
        ++number;
        $('.calc__number input').val(number);
        $('.calc__summ input').val('$' + (price * number).toFixed(2) );
    } else {
        $('.calc__error').addClass('active');
    }
});

$('.calc__button_minus').on('click', function () {
    if ( $('.calc__number input').val() > 1 && permission ) {
        --number;
        $('.calc__number input').val(number);
        $('.calc__summ input').val('$' + (price * number).toFixed(2) );
    } else {
        $('.calc__error').addClass('active');
    }
});

$('.calc__select').on('click', function () {
    $('.calc__error').remove();
});

//Pop Up//

$('.calc__popup').click(function() {
    $('.popup').fadeToggle(500);
});

$('.popup__close, .popup__wrapper').click(function() {
    $('.popup').fadeOut(0);
});

//Validator//

$('.popup__form').on('submit', function (e) {
    e.preventDefault();

    var popupName = $('#popup__name');
    var regexName = /\S{3,}/;
    var resultName = regexName.test( popupName.val() );
    var permissionName = false;
    console.log(resultName);

    if (resultName) {
        permissionName = true;
        $(popupName).removeClass('error-border');
        $(popupName).siblings('.info_error').hide();
    } else {
        $(popupName).addClass('error-border');
        $(popupName).siblings('.info_error').show();
    }

    var popupEmail = $('#popup__email');
    var regexEmail = /\S+@\S+\.\S+/;
    var resultEmail = regexEmail.test( popupEmail.val() );
    var permissionEmail = false;
    console.log(resultEmail);

    if (resultEmail) {
        permissionEmail = true;
        $(popupEmail).removeClass('error-border');
        $(popupEmail).siblings('.info_error').hide();
    } else {
        $(popupEmail).addClass('error-border');
        $(popupEmail).siblings('.info_error').show();
    }

    var popupPhone = $('#popup__phone');
    var regexPhone = /\S{11,}/;
    var resultPhone = regexPhone.test( popupPhone.val() );
    var permissionPhone = false;
    console.log(resultPhone);

    if (resultPhone) {
        permissionPhone = true;
        $(popupPhone).removeClass('error-border');
        $(popupPhone).siblings('.info_error').hide();
    } else {
        $(popupPhone).addClass('error-border');
        $(popupPhone).siblings('.info_error').show();
    }

    if (permissionName && permissionEmail && permissionPhone) {
        $('.popup').hide();
        $('.popup-tnx').delay(1000).fadeIn(500);
        console.log('Submit!!!');
    } else {
        console.log('False!!!');
    }
});

$('#popup__name')
    .on('focus', function () {
        $(this).siblings('.info_help').show();
    })
    .on('focusout', function () {
        $(this).siblings('.info_help').hide();
    });

//Mask//

$('#popup__name').mask('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', {
    translation: {
        'Z': {
            pattern: /[а-яА-ЯёЁґҐєЄіІїЇ`~!@#$%^&*()/\-_=+\[{\]};:'"\\|,<.>?]+/
        }
    }
});

//Country//

function phoneUA() {
    $('#popup__phone').unmask();

    $('#popup__phone').off();

    $('#popup__phone').val('');

    $('#popup__phone').mask("+3800000000000000", {placeholder: "+380"});

    $('#popup__phone').on('focus', function () {
        if ( $(this).val() == '') {
            $(this).val('+380');
        } else {
            var currentPhone = $(this).val();
            $(this).val(currentPhone);
        }
    });

    $('#popup__phone').on('input', function () {
        console.log( $(this).val().length );
        if ( $(this).val().length <= '4' ) {
            $(this).val('+380');
        }
    });
}

function phoneRU() {
    $('#popup__phone').unmask();

    $('#popup__phone').off();

    $('#popup__phone').val('');

    $('#popup__phone').mask("+70000000000000", {placeholder: "+7"});

    $('#popup__phone').on('focus', function () {
        if ( $(this).val() == '') {
            $(this).val('+7');
        } else {
            var currentPhone = $(this).val();
            $(this).val(currentPhone);
        }
    });

    $('#popup__phone').on('input', function () {
        console.log( $(this).val().length );
        if ( $(this).val().length <= '2' ) {
            $(this).val('+7');
        }
    });
}

function phoneBY() {
    $('#popup__phone').unmask();

    $('#popup__phone').off();

    $('#popup__phone').val('');

    $('#popup__phone').mask("+3750000000000000", {placeholder: "+375"});

    $('#popup__phone').on('focus', function () {
        if ( $(this).val() == '') {
            $(this).val('+375');
        } else {
            var currentPhone = $(this).val();
            $(this).val(currentPhone);
        }
    });

    $('#popup__phone').on('input', function () {
        console.log( $(this).val().length );
        if ( $(this).val().length <= '4' ) {
            $(this).val('+375');
        }
    });
}

phoneUA();

$('.country__item').on('click', function () {
    $(this).parent().toggleClass('active');
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    if ( $(this).hasClass('country__item_ua') ) {
        phoneUA();
    } else if ( $(this).hasClass('country__item_ru') ) {
        phoneRU();
    } else {
        phoneBY();
    }
});

//Thank you!//

$('.popup-tnx__close, .popup-tnx__button, .popup-tnx__wrapper').click(function() {
    $('.popup, .popup-tnx').remove();
});