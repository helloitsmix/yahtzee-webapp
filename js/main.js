let nomiColonne = [
    'scendere',
    'salire',
    'liberi',
    'secchi',
    'annunciati'
];

let Setup = () => {
    
    // $('.numeri input, .combo input').val(''); TUTTE LE CASELLE TORNANO VUOTE
    $('.bonus input').val(0);
    
    nomiColonne.forEach(nomeColonna => { 
        $('.numeri .' + nomeColonna + ' input').on('input propertychange', () => {
            CalcoloBonus();
        });
    });

    $("input[name='salire-input']").on('input propertychange', () => {
        UpDownUnlock();
    });
    $("input[name='scendere-input']").on('input propertychange', () => {
        UpDownUnlock();
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


// TODO
// function ControlloColonnaCompletata
// if (colonna completata) {
// Animate('liberi', 'highlight-yellow'); }