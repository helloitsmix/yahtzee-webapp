$('.changeable').click( function() {

    switch(parseInt($(this).val()))
    {
        case 0:
            $(this).val('');
            break;
            
        case $(this).data('value'):
            $(this).val(0).css('color', '#bd0000');
            break;
            
        default:
            $(this).val($(this).data('value')).css('color', '#000000');
            break;

    }

});

let CalcoloBonusClassic = () => {

    let bonusPoints = 0;

    $('#tabellone-classic .numeri input').each( (index, item) => {
        if ( !isNaN( parseInt( $(item).val() )))
            bonusPoints += parseInt( $(item).val() );
    });

    if ( bonusPoints >= 63 ) {
        $('#tabellone-classic .classic-bonus input').val(bonusPoints + 35);
        $('#tabellone-classic .classic-bonus input').addClass('bonus-bg-sopra');
        $('#tabellone-classic .classic-bonus input').removeClass('bonus-bg-sotto');
    } else {
        $('#tabellone-classic .classic-bonus input').val(bonusPoints);
        $('#tabellone-classic .classic-bonus input').addClass('bonus-bg-sotto');
        $('#tabellone-classic .classic-bonus input').removeClass('bonus-bg-sopra');
    }

};

let TotaleCheckClassic = item => {

    $('.' + $(item).parent().attr('class') + ' input').each( (index, item) => {

        if ( isNaN( parseInt( $(item).val() ))) {
            return false;
        } else if( index == 13) {

            $('.classic input').each( (index, item) => {

                let delay = index * 100;
                $(item).delay(delay).addClass('highlight-classic', 900).delay(100).removeClass('highlight-classic', 900);
                
            });

            setTimeout(function() {
                $('#tabellone-classic .input-risultato-finale').prop('disabled', false);
                $('#tabellone-classic .input-risultato-finale').addClass('active',1000);
            }, 2700);

        }
        
    });

};

$('#tabellone-classic .input-risultato-finale').click( () => { 
    
    let totalPoints = 0;
    
    totalPoints +=  parseInt($('.classic-bonus input').val());

    $('.combo .classic input').each( (index, item) => {
        if (!isNaN( parseInt( $(item).val() )))
            totalPoints += parseInt( $(item).val() );
    });

    $({percentage: 0}).stop(true).animate({percentage: totalPoints}, {
        duration : 2700,
        easing: "easeOutExpo",
        step: function () {
            var percentageVal = Math.round(this.percentage);
            $('#tabellone-classic .input-risultato-finale').val(percentageVal);
        }
    }).promise().done(function () {
        // hard set the value after animation is done to be sure the value is correct
        $('#tabellone-classic .input-risultato-finale').val(totalPoints);
        if(totalPoints > parseInt(GetSettingsItem('high-score-classic')))
        {
            SetSettingsItem('high-score-classic', totalPoints);
            $('#high-score-classic span').text(totalPoints);
            $("#tabellone-classic #nuovo-record").fadeIn( "fast", function() {
                $(this).delay(3000).fadeOut("fast");
            });
        }
    });
    
});