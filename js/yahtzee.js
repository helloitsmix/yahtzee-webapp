let DisabledUpDownCheck = () => {
    $('.scendere input').each( () => { DownUnlock(); });
    $('.salire input').each( () => { UpUnlock(); });
    $('.scendere input').eq(0).prop('disabled', false);
    $('.salire input').eq(11).prop('disabled', false);
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

let CalcoloBonus = item => {

    let bonusPoints = 0;
    $('.numeri .' + $(item).parent().attr('class') + ' input').each( (index, item) => {
        if ( !isNaN( parseInt( $(item).val() )))
            bonusPoints += parseInt( $(item).val() );
    });
    if ( bonusPoints >= 60 ) {
        $('.bonus .' + $(item).parent().attr('class') + '-bonus input').val(bonusPoints * 2);
        $('.bonus .' + $(item).parent().attr('class') + '-bonus input').addClass('bonus-bg-sopra');
        $('.bonus .' + $(item).parent().attr('class') + '-bonus input').removeClass('bonus-bg-sotto');
    } else {
        $('.bonus .' + $(item).parent().attr('class') + '-bonus input').val(bonusPoints);
        $('.bonus .' + $(item).parent().attr('class') + '-bonus input').addClass('bonus-bg-sotto');
        $('.bonus .' + $(item).parent().attr('class') + '-bonus input').removeClass('bonus-bg-sopra');
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

        // riga = scala, full, poker, yaz
        $('.score-message').css('background-image','url(img/'+riga+'-message.png)');

        let randomAnimation = 0;// Math.floor((Math.random() * 3) + 1); // Da 1 a 3
        
        switch (randomAnimation) {
            case 1:
                $('.score-message').switchClass('hide','left');
                $('.score-message').removeClass('left',200).delay(1500).addClass('right',200).delay(1000).switchClass('right','hide');
                break;

            case 2:
                $('.score-message').switchClass('hide','small');
                $('.score-message').switchClass('small','big',500).delay(1600).switchClass('big','small',500).delay(1200).switchClass('small','hide',100);
                break;
        
            case 3:
                break;

            default:
                $('.score-message').attr('class','score-message hide');
                break;
        }

        console.log('finita');
        $('.score-message').attr('class','score-message hide');

    }

};

let TotaleCheck = item => {

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
        $(item).delay(delay).addClass(classe,900).delay( 100 ).removeClass(classe,900);
        
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
                $('.input-risultato-finale').prop('disabled', false);
                $('.input-risultato-finale').addClass('active',1000)                
            }
        });
    }, 3000);
    
};

$('.input-risultato-finale').click( () => { 
    
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
            $('.input-risultato-finale').val(percentageVal);
        }
    }).promise().done(function () {
        // hard set the value after animation is done to be sure the value is correct
        $('.input-risultato-finale').val(totalPoints);
        if(totalPoints > parseInt(GetSettingsItem('high-score')))
        {
            SetSettingsItem('high-score', totalPoints);
            $('#high-score span').text(totalPoints);
        }
    });
    
});