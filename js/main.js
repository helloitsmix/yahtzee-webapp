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

let defaultSettings = {
    'table-size': 'large',
    'virtual-dices': 'true',
    'high-score-classic': 0,
    'high-score-advanced': 0,
    'username': null,
    'data-classic': new Array(14).fill(''),
    'data-advanced': new Array(60).fill(''),
};

let intervalloCalcoloAggiunto = null;
let intervalloSalvataggioDati = null;
let arrayDaSalvareClassic = new Array(14).fill('');
let arrayDaSalvareAdvanced = new Array(60).fill('');

let Setup = () => {
    
    $('.bonus input').val(0);

    $('#tabellone-advanced .scendere input').on('input propertychange', () => { // CASELLE A SCENDERE
        DownUnlock();
    });
    $('#tabellone-advanced .salire input').on('input propertychange', () => { // CASELLE A SALIRE
        UpUnlock();
    });
    $('#tabellone-classic .numeri input').on('input propertychange', e => { // TUTTE LE CASELLE NUMERI 1-6 CLASSIC
        CalcoloBonusClassic();
    });
    $('#tabellone-advanced .numeri input').on('input propertychange', e => { // TUTTE LE CASELLE NUMERI 1-6 ADVANCED
        CalcoloBonusAdvanced(e.target);
    });

    $('.scala input, .full input, .poker input, .yaz input').keyup( e => { // TUTTE LE CASELLE COMBO CON '+XX' PUNTI
        clearInterval(intervalloCalcoloAggiunto);
        intervalloCalcoloAggiunto = setInterval(function() {
            CalcoloAggiunto(e.target);
            clearInterval(intervalloCalcoloAggiunto);
        }, 1000);
    });

    $('.numeri input, .combo input').on('focusout propertychange', e => { // TUTTE LE CASELLE, NUMERI + COMBO
        NumeroZeroCheck();
        
        clearInterval(intervalloSalvataggioDati);
        intervalloSalvataggioDati = setInterval(function() {
            if(SalvataggioDati())
            {
                $('.check-icon').show('fast').delay(600).fadeOut('fast');
            }
            clearInterval(intervalloSalvataggioDati);
        }, 1100);
    });
    
    $('#tabellone-classic .numeri input, #tabellone-classic .combo input').on('focusout propertychange', e => { // TUTTE LE CASELLE, NUMERI + COMBO CLASSIC
        TotaleCheckClassic(e.target);        
    });

    $('#tabellone-advanced .numeri input, #tabellone-advanced .combo input').on('focusout propertychange', e => { // TUTTE LE CASELLE, NUMERI + COMBO ADVANCED
        TotaleCheckAdvanced(e.target);
        RisultatoCheck();
    });

    $('.check-icon').hide();
    $('#tabellone-classic').hide();
    $('#tabellone-advanced').hide();

};

let GetSettings = () => {
    return JSON.parse(localStorage.getItem('settings'));
};

let GetSettingsItem = value => {
    return JSON.parse(localStorage.getItem('settings'))[value];
};

let SetSettingsItem = (key, value) => {
    let retrieved = JSON.parse(localStorage.getItem('settings'));
    retrieved[key] = value;
    localStorage.setItem('settings', JSON.stringify(retrieved));
};

let CheckIniziale = () => {

    if (GetSettings() === null)
    {
        localStorage.setItem( 'settings', JSON.stringify(defaultSettings) );
        $('#slider-dadi').prop('checked', true);
    }
    else
    {
        if (GetSettingsItem('username') !== null)
        {
            // stampa messaggi random
            $('#input-home').addClass('hide');
            $('.message').removeClass('hide');
            $('.message').text(CreaMessaggioRandom());
            UpdateSettingsName(GetSettingsItem('username'));
        }

        if (GetSettingsItem('table-size') === 'small')
        {
            SetGrigliaSmall();
            $('#slider-griglia').prop('checked', true);
        }

        if (GetSettingsItem('virtual-dices') === 'true') {
            $('#slider-dadi').prop('checked', true);
            $('#dices-container').show();
        } else {
            $('#slider-dadi').prop('checked', false);
            $('#dices-container').hide();
        }

        if (GetSettingsItem('high-score-classic') !== 0)
        {
            $('#high-score-classic span').text(GetSettingsItem('high-score-classic'))
        }

        if (GetSettingsItem('high-score-advanced') !== 0)
        {
            $('#high-score-advanced span').text(GetSettingsItem('high-score-advanced'))
        }

        let arrayDaLocalStorageClassic = GetSettingsItem('data-classic');
        let arrayDaLocalStorageAdvanced = GetSettingsItem('data-advanced');

        $('#tabellone-advanced .numeri input, #tabellone-advanced .combo input').each( (index) => {
            $('#tabellone-advanced .numeri input, #tabellone-advanced .combo input').eq(index).val(arrayDaLocalStorageAdvanced[index]);
            arrayDaSalvareAdvanced[index] = arrayDaLocalStorageAdvanced[index];
        });

        $('#tabellone-classic .classic input').each( (index) => {
            $('#tabellone-classic .classic input').eq(index).val(arrayDaLocalStorageClassic[index]);
            arrayDaSalvareClassic[index] = arrayDaLocalStorageClassic[index];
        });
    }

    DisabledUpDownCheck();

    CalcoloBonusClassic();
    
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

let SalvataggioDati = () => {
    $('#tabellone-advanced .numeri input, #tabellone-advanced .combo input').each( (index, item) => {
        arrayDaSalvareAdvanced[index] = $(item).val();
    });
    $('#tabellone-classic .numeri input, #tabellone-classic .combo input').each( (index, item) => {
        arrayDaSalvareClassic[index] = $(item).val();
    });
    SetSettingsItem('data-advanced', arrayDaSalvareAdvanced);
    SetSettingsItem('data-classic', arrayDaSalvareClassic);
    return true;
};

let TriggerFocusOutColonne = () => {
    $(nomiColonne).each( (index, colonna) => {
        $('.' + colonna + ' input').eq(0).trigger('focusout');
    });
    $('.classic input').eq(0).trigger('focusout');
};

Setup();
CheckIniziale();