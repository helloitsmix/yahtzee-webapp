$('#hamburger-settings').click( function() {
    $('.icon').toggleClass('close');
    $('.settings-page').toggleClass('open');
    $('.tabellone').toggleClass('blurred');
    return false;
});

$('#torna-menu').click(function(e) {
    e.preventDefault();
    chiudiSettings();
    $('.homepage').removeClass('swiped');
    return false;
});

$('#nuova-partita').click(function(e) {
    e.preventDefault();
    if (confirm("Sei sicuro di voler cominciare una nuova partita?") == true) {
        NuovaPartita();
    }
    return false;
});



$('.grandezza-griglia .slider').click(function(e) { 

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

$('.on-off-dadi .slider').click(function(e) { 

    if($('#slider-dadi').prop('checked') === false)
    {
        $('#dices-container').show();
        SetSettingsItem('virtual-dices', 'true');
    }
    else
    {
        $('#dices-container').hide();
        SetSettingsItem('virtual-dices', 'false');
    }

});

$('#settings-name').click(function(e){
    let nuovoNome = prompt("Inserisci un nuovo nome:");

    if (nuovoNome !== null && nuovoNome !== "" && nuovoNome.length <= 15) {
        SetSettingsItem('username', nuovoNome);
        UpdateSettingsName(nuovoNome);
    }
});

let chiudiSettings = () => {
    $('.icon').removeClass('close');
    $('.settings-page').removeClass('open');
    $('.tabellone').removeClass('blurred');
};

let UpdateSettingsName = (nome) => {
    $('#settings-name .name').text('Ciao ' + nome + '!')
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

    if ($('#tabellone-advanced').is(":visible"))
    {
        arrayDaSalvareAdvanced = new Array(60).fill('');
        $('#tabellone-advanced .numeri input, #tabellone-advanced .combo input').val(''); // TUTTE LE CASELLE TORNANO VUOTE
        $('#tabellone-advanced .bonus input').val(0);
        $('#tabellone-advanced .bonus input').attr('class', 'bonus-bg-sotto');

        $('#tabellone-advanced .scendere input').prop('disabled', true);
        $('#tabellone-advanced .scendere input').eq(0).prop('disabled', false);
        
        $('#tabellone-advanced .salire input').prop('disabled', true);
        $('#tabellone-advanced .salire input').eq(11).prop('disabled', false);
        
        $('#tabellone-advanced .totale input').val('');
        $('#tabellone-advanced .totale input').removeClass('highlight-yellow');
        $('#tabellone-advanced .totale input').removeClass('highlight-green');
        $('#tabellone-advanced .totale input').removeClass('highlight-blue');
        $('#tabellone-advanced .totale input').removeClass('highlight-pink');
        $('#tabellone-advanced .totale input').removeClass('highlight-red');
    
        $('#tabellone-advanced .input-risultato-finale').val('RISULTATO');
        $('#tabellone-advanced .input-risultato-finale').removeClass('active');
        $('#tabellone-advanced .input-risultato-finale').prop('disabled', true);

        SetSettingsItem('data-advanced', new Array(60).fill(''));
    } 
    else if ($('#tabellone-classic').is(":visible")) 
    {
        arrayDaSalvareClassic = new Array(14).fill('');
        $('#tabellone-classic .numeri input, #tabellone-classic .combo input').val(''); // TUTTE LE CASELLE TORNANO VUOTE
        $('#tabellone-classic .bonus input').val(0);
        $('#tabellone-classic .bonus input').attr('class', 'bonus-bg-sotto');

        $('#tabellone-classic .input-risultato-finale').val('RISULTATO');
        $('#tabellone-classic .input-risultato-finale').removeClass('active');
        $('#tabellone-classic .input-risultato-finale').prop('disabled', true);

        SetSettingsItem('data-classic', new Array(14).fill(''));
    }

    chiudiSettings();
};