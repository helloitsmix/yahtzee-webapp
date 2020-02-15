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
    'high-score': 0,
    'username': null,
    'data': new Array(60),
};

let intervalloCalcoloAggiunto = null;
let intervalloSalvataggioDati = null;
let arrayDaSalvare = new Array(60);

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

        if (GetSettingsItem('high-score') !== 0)
        {
            $('#high-score span').text(GetSettingsItem('high-score'))
        }

        let arrayDaLocalStorage = GetSettingsItem('data');

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

let SalvataggioDati = () => {
    $('.numeri input, .combo input').each( (index, item) => {
        arrayDaSalvare[index] = $(item).val();
    });
    SetSettingsItem('data', arrayDaSalvare);
};

let TriggerFocusOutColonne = () => {
    $(nomiColonne).each( (index, colonna) => {
        $('.' + colonna + ' input').eq(0).trigger("focusout");
    });
};

Setup();
CheckIniziale();