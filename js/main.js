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

let Setup = () => {
    
    // $('.numeri input, .combo input').val(''); TUTTE LE CASELLE TORNANO VUOTE
    $('.bonus input').val(0);

    $('.scendere input').on('input propertychange', () => { // CASELLE A SCENDERE
        UpDownUnlock();
    });
    $('.salire input').on('input propertychange', () => { // CASELLE A SALIRE
        UpDownUnlock();
    });
    $('.numeri input').on('input propertychange', () => { // TUTTE LE CASELLE NUMERI 1-6
        CalcoloBonus();
    });

    $('.scala input, .full input, .poker input, .yaz input').keyup( e => { // TUTTE LE CASELLE COMBO CON "+XX" PUNTI
        clearInterval(intervalloCalcoloAggiunto)
        intervalloCalcoloAggiunto = setInterval(function() {
            CalcoloAggiunto(e.target);
            clearInterval(intervalloCalcoloAggiunto)
        }, 500);
    });
    
    $('.numeri input, .combo input').on('focusout propertychange', (e) => { // TUTTE LE CASELLE, NUMERI + COMBO
        TotaleCheck(e.target);
    });

};

let CalcoloBonus = () => {
    
    nomiColonne.forEach(nomeColonna => { 

        let bonusPoints = 0;
        $('.numeri .' + nomeColonna + ' input').each( (index, item) => {
            if ( !isNaN( parseInt( $(item).val() )))
                bonusPoints += parseInt( $(item).val() );
        });
        $('.bonus .' + nomeColonna + '-bonus input').val(bonusPoints >= 60 ? bonusPoints * 2 : bonusPoints);

    });

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
                CalcoloTotale($(item).parent().attr('class'), '');
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

Setup();