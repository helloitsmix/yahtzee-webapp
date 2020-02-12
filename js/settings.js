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
        SetSettingsItem('table-size', 'small');
    }
    else
    {
        SetGrigliaLarge();
        SetSettingsItem('table-size', 'large');
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
    SetSettingsItem('data', new Array(60));
};