let nomiColonne = [
    'scendere',
    'salire',
    'liberi',
    'secchi',
    'annunciati'
];

let colori = [
    'yellow',
    'green',
    'blue',
    'pink',
    'red',
];

let intervalloCalcoloAggiunto = null;

// CONFERMA IL RELOAD PAGINA
// window.addEventListener('beforeunload', (event) => {
//     event.preventDefault();
//     event.returnValue = '';
// });

// DISABLE RELOAD
// swiperefreshLayout.setRefreshing(false);
// swiperefreshLayout.setEnabled(false);

$('#settings-link').click(function(e) { 
    $('.settings-page').addClass('open');
    return false;
});

$('#settings-closebtn').click(function(e) { 
    $('.settings-page').removeClass('open');
    return false;
});

$('#riprendi').click(function(e) {
    $('.settings-page').removeClass('open');
    return false;
});

$('#nuova-partita').click(function(e) {
    if (confirm("Sei sicuro di voler cominciare una nuova partita?") == true) {
        NuovaPartita();
    }
    return false;
});


$('#grandezza-griglia').click(function(e) {
    if ( $('#grandezza-griglia').text() == 'Griglia Large' )
    {
        $('#grandezza-griglia').text('Griglia Small');
        $('table').addClass('small');
        $('.risultato-finale').addClass('small-btn');
    }
    else
    {
        $('#grandezza-griglia').text('Griglia Large');
        $('table').removeClass('small');
        $('.risultato-finale').removeClass('small-btn');
    }
});

let NuovaPartita = () => {
    colori = [
        'yellow',
        'green',
        'blue',
        'pink',
        'red',
    ];

    $('.numeri input, .combo input').val(''); // TUTTE LE CASELLE TORNANO VUOTE
    $('.bonus input').val(0);
    $('.bonus input').attr('class', 'bonus-bg-sopra');
    
    $('.scendere input').prop('disabled', true);
    $('.scendere input').eq(0).prop('disabled', false);
    
    $('.salire input').prop('disabled', true);
    $('.salire input').eq(11).prop('disabled', false);
    
    $('.totale input').val('');
    $('.totale input').removeClass('highlight-yellow');
    $('.totale input').removeClass('highlight-green');
    $('.totale input').removeClass('highlight-blue');
    $('.totale input').removeClass('highlight-pink');
    $('.totale input').removeClass('highlight-red');

    $('.input-risultato-finale').val('RISULTATO');
    $('.input-risultato-finale').removeClass('active');
    $('.input-risultato-finale').prop('disabled', true);

    $('.settings-page').removeClass('open');
};

let Setup = () => {
    
    $('.bonus input').val(0);

    $('.scendere input').on('input propertychange', () => { // CASELLE A SCENDERE
        UpDownUnlock();
    });
    $('.salire input').on('input propertychange', () => { // CASELLE A SALIRE
        UpDownUnlock();
    });
    $('.numeri input').on('input propertychange', e => { // TUTTE LE CASELLE NUMERI 1-6
        CalcoloBonus(e.target);
    });

    $('.scala input, .full input, .poker input, .yaz input').keyup( e => { // TUTTE LE CASELLE COMBO CON "+XX" PUNTI
        clearInterval(intervalloCalcoloAggiunto)
        intervalloCalcoloAggiunto = setInterval(function() {
            CalcoloAggiunto(e.target);
            clearInterval(intervalloCalcoloAggiunto)
        }, 1000);
    });
    
    $('.numeri input, .combo input').on('focusout propertychange', (e) => { // TUTTE LE CASELLE, NUMERI + COMBO
        TotaleCheck(e.target);
    });

    $('.numeri input, .combo input').on('focusout propertychange', () => { // TUTTE LE CASELLE, NUMERI + COMBO
        RisultatoCheck();
    });

};

let CalcoloBonus = item => {

    console.log($(item).parent().attr('class'));
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

let UpDownUnlock = () => {

    $('.scendere input').each( (index, item) => {

        if ( $(item).prop('disabled') && parseInt( $('.scendere input').eq(index-1).val() ) >= 0 && !isNaN(parseInt( $('.scendere input').eq(index-1).val() )) )
        {
            $('.scendere input').eq(index).prop('disabled', false);
            return false;
        }

    });

    $('.salire input').each( (index, item) => {
        
        if ( !$(item).prop('disabled') && parseInt( $('.salire input').eq(index).val() ) >= 0 && !isNaN(parseInt( $('.salire input').eq(index).val() )) )
        {
            $('.salire input').eq(index-1).prop('disabled', false);
            return false;
        }

    });

};

let CalcoloAggiunto = item => {

    let riga = $(item).parent().parent().attr('class');
    if(!isNaN( parseInt( $(item).val())) && parseInt( $(item).val()) > 0)
        $(item).val(riga == 'combo scala' || riga == 'combo full' ? parseInt($(item).val()) + 30 : riga == 'combo poker' ? parseInt($(item).val()) + 20 : parseInt($(item).val()) + 50);

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
        if ( !isNaN( parseInt( $(item).val() )))
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
    });

});

Setup();