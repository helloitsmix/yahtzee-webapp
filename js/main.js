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
let intervalloSalvataggioDati = null;
let arrayDaSalvare = new Array(60);

// TOGLIERE IL RELOAD PAGINA CON SWIPE UP?

$('#button-home').click( e => {
    e.preventDefault();
    if (localStorage.getItem('username') === null)
    {
        if ($('#input-home').val() !== "")
        {
            localStorage.setItem('username', $('#input-home').val())
            $('.homepage').addClass('swiped');
        }
    }
    else
    {
        $('.homepage').addClass('swiped');
    }
});

$('#hamburger-settings').click( function() {
    $('.icon').toggleClass('close');
    $('.settings-page').toggleClass('open');
    $('.tabellone').toggleClass('blurred');
    return false;
});

$('#riprendi').click(function(e) {
    e.preventDefault();
    chiudiSettings();
    return false;
});

$('#nuova-partita').click(function(e) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler cominciare una nuova partita?") == true) {
        NuovaPartita();
    }
    return false;
});

$('.slider').click(function(e) { 

    if($('#slider-griglia').prop('checked') === false)
    {
        SetGrigliaSmall();
        localStorage.setItem( 'table-size', 'small' );
    }
    else
    {
        SetGrigliaLarge();
        localStorage.setItem( 'table-size', 'large' );
    }

});

let chiudiSettings = () => {
    $('.icon').removeClass('close');
    $('.settings-page').removeClass('open');
    $('.tabellone').removeClass('blurred');
};

let SetGrigliaSmall = () => {
    $('table').addClass('small');
    $('.risultato-finale').addClass('small-btn');
};

let SetGrigliaLarge = () => {
    $('table').removeClass('small');
    $('.risultato-finale').removeClass('small-btn');
};

let NuovaPartita = () => {
    colori = [
        'yellow',
        'green',
        'blue',
        'pink',
        'red',
    ];

    arrayDaSalvare = new Array(60);

    $('.numeri input, .combo input').val(''); // TUTTE LE CASELLE TORNANO VUOTE
    $('.bonus input').val(0);
    $('.bonus input').attr('class', 'bonus-bg-sotto');
    
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

    chiudiSettings();
    localStorage.removeItem('data');
};

let CreaMessaggioRandom = () => {
    let messaggio = "";
    let numeroRandom = Math.floor(Math.random() * 10); // da 0 a 9;
    let username = localStorage.getItem('username');

    switch (numeroRandom)
    {
        case 0:
            messaggio = "Ciao " + username + ", giochiamo?";
            break;
        case 1:
            messaggio = "Bentornato " + username;
            break;
        case 2:
            messaggio = "Hey " + username + " ;)";
            break;
        case 3:
            messaggio = "Ancora qui?";
            break;
        case 4:
            messaggio = "Ti senti fortunato oggi?";
            break;
        case 5:
            messaggio = "Finalmente sei tornato ^.^";
            break;
        case 6:
            messaggio = username + ", bel nome";
            break;
        case 7:
            messaggio = username + ", che brutto nome";
            break;
        case 8:
            messaggio = "Ti sei seriamente chiamato " + username + "?";
            break;
        case 9:
            messaggio = "Oggi si fa il record!";
            break;
        default:
            messaggio = "Ciao!";
            break;
    }

    return messaggio;
};

let Setup = () => {
    
    $('.bonus input').val(0);

    $('.scendere input').on('input propertychange', () => { // CASELLE A SCENDERE
        DownUnlock();
    });
    $('.salire input').on('input propertychange', () => { // CASELLE A SALIRE
        UpUnlock();
    });
    $('.numeri input').on('input propertychange', e => { // TUTTE LE CASELLE NUMERI 1-6
        CalcoloBonus(e.target);
    });

    $('.scala input, .full input, .poker input, .yaz input').keyup( e => { // TUTTE LE CASELLE COMBO CON "+XX" PUNTI
        clearInterval(intervalloCalcoloAggiunto);
        intervalloCalcoloAggiunto = setInterval(function() {
            CalcoloAggiunto(e.target);
            clearInterval(intervalloCalcoloAggiunto);
        }, 1000);
    });
    
    $('.numeri input, .combo input').on('focusout propertychange', (e) => { // TUTTE LE CASELLE, NUMERI + COMBO
        TotaleCheck(e.target);
        RisultatoCheck();
        NumeroZeroCheck();

        clearInterval(intervalloSalvataggioDati);
        intervalloSalvataggioDati = setInterval(function() {
            SalvataggioDati();
            console.log('Saved');
            clearInterval(intervalloSalvataggioDati);
        }, 1100);

    });

};

let CheckIniziale = () => {

    if (localStorage.getItem('username') === null)
    {
        // fa vedere l'input
        $('#input-home').removeClass('hide');
        $('.message').addClass('hide');
    }
    else
    {
        // stampa messaggi random
        $('#input-home').addClass('hide');
        $('.message').removeClass('hide');
        $('.message').text(CreaMessaggioRandom());
    }

    if (localStorage.getItem('table-size') == 'small') {
        SetGrigliaSmall();
        $('#slider-griglia').prop('checked', true);
    } else {
        SetGrigliaLarge();
        $('#slider-griglia').prop('checked', false);
    }

    if (localStorage.getItem('high-score') === null)
    {
        $('#high-score span').text('0');
        localStorage.setItem('high-score', 0);
    }
    else
    {
        $('#high-score span').text(localStorage.getItem('high-score'))
    }

    if (localStorage.getItem('data') !== null)
    { 
        let arrayDaLocalStorage = JSON.parse(localStorage.getItem('data'));

        $('.numeri input, .combo input').each( (index) => {
            $('.numeri input, .combo input').eq(index).val(arrayDaLocalStorage[index]);
            arrayDaSalvare[index] = arrayDaLocalStorage[index];
        });
    }

    DisabledUpDownCheck();
    
    $(nomiColonne).each( (index, colonna) => {
        let bonusPoints = 0;
        
        $('.numeri .' + colonna + ' input').each( (index, item) => {
            if ( !isNaN( parseInt( $(item).val() )))
                bonusPoints += parseInt( $(item).val() );
        });

        if ( bonusPoints >= 60 ) {
            $('.bonus .' + colonna + '-bonus input').val(bonusPoints * 2);
            $('.bonus .' + colonna + '-bonus input').addClass('bonus-bg-sopra');
            $('.bonus .' + colonna + '-bonus input').removeClass('bonus-bg-sotto');
        } else {
            $('.bonus .' + colonna + '-bonus input').val(bonusPoints);
            $('.bonus .' + colonna + '-bonus input').addClass('bonus-bg-sotto');
            $('.bonus .' + colonna + '-bonus input').removeClass('bonus-bg-sopra');
        }
    });

    TriggerFocusOutColonne();

};

let DisabledUpDownCheck = () => {
    $('.scendere input').each( () => { DownUnlock(); });
    $('.salire input').each( () => { UpUnlock(); });
    $('.scendere input').eq(0).prop('disabled', false);
    $('.salire input').eq(11).prop('disabled', false);
};

let TriggerFocusOutColonne = () => {
    $(nomiColonne).each( (index, colonna) => {
        $('.' + colonna + ' input').eq(0).trigger( "focusout" )
    });
};

let SalvataggioDati = () => {
    $('.numeri input, .combo input').each( (index, item) => {
        arrayDaSalvare[index] = $(item).val();
    });
    localStorage.setItem( 'data', JSON.stringify(arrayDaSalvare) );
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
        if(totalPoints > parseInt(localStorage.getItem('high-score')))
        {
            localStorage.setItem('high-score', totalPoints);
            $('#high-score span').text(totalPoints);
        }
    });
    
});

Setup();
CheckIniziale();