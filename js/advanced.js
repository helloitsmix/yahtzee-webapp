let DisabledUpDownCheck = () => {
    $('#tabellone-advanced .scendere input').each( () => { DownUnlock(); });
    $('#tabellone-advanced .salire input').each( () => { UpUnlock(); });
    $('#tabellone-advanced .scendere input').eq(0).prop('disabled', false);
    $('#tabellone-advanced .salire input').eq(11).prop('disabled', false);
};

let NumeroZeroCheck = () => {
    $('.numeri input, .combo input').each( (index, item) => {
        if (parseInt($(item).val()) === 0)
        {
            $(item).css('color', '#bd0000');
        }
        else
        {
            $(item).css('color', '#000000');
        }
    });
};

let CalcoloBonusAdvanced = item => {

    let bonusPoints = 0;
    $('#tabellone-advanced .numeri .' + $(item).parent().attr('class') + ' input').each( (index, item) => {
        if ( !isNaN( parseInt( $(item).val() )))
            bonusPoints += parseInt( $(item).val() );
    });
    if ( bonusPoints >= 60 ) {
        $('#tabellone-advanced .bonus .' + $(item).parent().attr('class') + '-bonus input').val(bonusPoints * 2);
        $('#tabellone-advanced .bonus .' + $(item).parent().attr('class') + '-bonus input').addClass('bonus-bg-sopra');
        $('#tabellone-advanced .bonus .' + $(item).parent().attr('class') + '-bonus input').removeClass('bonus-bg-sotto');
    } else {
        $('#tabellone-advanced .bonus .' + $(item).parent().attr('class') + '-bonus input').val(bonusPoints);
        $('#tabellone-advanced .bonus .' + $(item).parent().attr('class') + '-bonus input').addClass('bonus-bg-sotto');
        $('#tabellone-advanced .bonus .' + $(item).parent().attr('class') + '-bonus input').removeClass('bonus-bg-sopra');
    }

};

let DownUnlock = () => {

    $('.scendere input').each( (index, item) => {
        
        if ( $(item).prop('disabled') )
        {

            if ( parseInt( $('.scendere input').eq(index-1).val() ) >= 0 && !isNaN(parseInt( $('.scendere input').eq(index-1).val() )) )
            {
                $('.scendere input').eq(index).prop('disabled', false);
                return false;
            } else if ( isNaN(parseInt( $('.scendere input').eq(index-1).val() )) && isNaN(parseInt( $('.scendere input').eq(index-2).val() )) ) {
                $('.scendere input').eq(index-1).prop('disabled', true);
                return false;
            }

        }

    });

};

let UpUnlock = () => {

    $('.salire input').each( (index, item) => {
        
        if ( !$(item).prop('disabled') )
        {

            if ( parseInt( $('.salire input').eq(index).val() ) >= 0 && !isNaN(parseInt( $('.salire input').eq(index).val() )) )
            {
                $('.salire input').eq(index-1).prop('disabled', false);
                return false;
            } else if ( isNaN(parseInt( $('.salire input').eq(index).val())) && isNaN(parseInt( $('.salire input').eq(index+1).val())) ) {
                $('.salire input').eq(index).prop('disabled', true);
                return false;
            }
            
        }

    });

};

let CalcoloAggiunto = item => {

    let riga = $(item).parent().parent().attr('class').split(' ')[1];
    if(!isNaN( parseInt( $(item).val())) && parseInt( $(item).val()) > 0)
    {
        $(item).val(riga == 'scala' || riga == 'full' ? parseInt($(item).val()) + 30 : riga == 'poker' ? parseInt($(item).val()) + 20 : parseInt($(item).val()) + 50);

        $('.score-message .letters').text(riga === 'yaz' ? 'YAHTZEE!' : riga.toUpperCase() + '!');

        let randomAnimation = Math.floor((Math.random() * 3) + 1); // Da 1 a 3
        $('.score-message').children().attr('class','animated-text-'+randomAnimation);
        $('#score-message-div').removeClass('hide');

        TextAnimation(randomAnimation);
        
    }

};

let TotaleCheckAdvanced = item => {

    $('.' + $(item).parent().attr('class') + ' input').each( (index, item) => {

        if ( isNaN( parseInt( $(item).val() )) ) {
            return false;
        } else if( index == 11) {

            if (isNaN(parseInt($('.'+$(item).parent().attr('class')+'-totale input').val())))
            {
                let random = Math.floor(Math.random() * colori.length);
                Animate($(item).parent().attr('class'),'highlight-' + colori[random] + '');
                colori.splice(random, 1);
            }
            else
            {
                setTimeout(function() {
                    CalcoloTotale($(item).parent().attr('class'), '');
                }, 1200);
            }

        }
        
    });

};

let Animate = (nomeColonna, classe) => {

    $('.' + nomeColonna + ' input').each( (index, item) => {

        let delay = index * 100;
        $(item).delay(delay).addClass(classe,900).delay(100).removeClass(classe,900);
        
    });

    setTimeout(function() {
        CalcoloTotale(nomeColonna, classe);
    }, 2700);

};

let CalcoloTotale = (nomeColonna, classe) => {
    
    let totalPoints = parseInt( $('.bonus .' + nomeColonna + '-bonus input').val() );
    
    $('.combo .' + nomeColonna +' input').each( (index, item) => {
        if ( !isNaN( parseInt( $(item).val() )))
                totalPoints += parseInt( $(item).val() );
    });

    nomeColonna === 'secchi' ? totalPoints *= 2 : nomeColonna === 'annunciati' ? totalPoints *= 3 : '';
    
    $('.totale .' + nomeColonna + '-totale input').addClass(classe,1000);
    
    $({percentage: 0}).stop(true).animate({percentage: totalPoints}, {
        duration : 2700,
        easing: "easeOutExpo",
        step: function () {
            var percentageVal = Math.round(this.percentage);
            $('.totale .' + nomeColonna + '-totale input').val(percentageVal);
        }
    }).promise().done(function () {
        // hard set the value after animation is done to be sure the value is correct
        $('.totale .' + nomeColonna + '-totale input').val(totalPoints);
    });

};

let RisultatoCheck = () => {

    setTimeout(function() {
        $('.totale input').each( (index, item) => {
            if ( isNaN( parseInt( $(item).val() )) ) {
                return false;
            } else if( index == 4) {
                $('#tabellone-advanced .input-risultato-finale').prop('disabled', false);
                $('#tabellone-advanced .input-risultato-finale').addClass('active',1000)                
            }
        });
    }, 3000);
    
};

$('#tabellone-advanced .input-risultato-finale').click( () => { 
    
    let totalPoints = 0;
    
    $('.totale input').each( (index, item) => {
        if (!isNaN( parseInt( $(item).val() )))
            totalPoints += parseInt( $(item).val() );
    });

    $({percentage: 0}).stop(true).animate({percentage: totalPoints}, {
        duration : 2700,
        easing: "easeOutExpo",
        step: function () {
            var percentageVal = Math.round(this.percentage);
            $('#tabellone-advanced .input-risultato-finale').val(percentageVal);
        }
    }).promise().done(function () {
        // hard set the value after animation is done to be sure the value is correct
        $('#tabellone-advanced .input-risultato-finale').val(totalPoints);
        if(totalPoints > parseInt(GetSettingsItem('high-score-advanced')))
        {
            SetSettingsItem('high-score-advanced', totalPoints);
            $('#high-score-advanced span').text(totalPoints);
            $("#tabellone-advanced #nuovo-record").fadeIn( "fast", function() {
                $(this).delay(3000).fadeOut("fast");
            });
        }
    });
    
});