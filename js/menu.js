$(window).on('load', function () {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");;
});


$('#button-play-classic').click( e => {
    e.preventDefault();
    if (GetSettingsItem('username') === null)
    {
        if ($('#input-home').val() !== "")
        {
            SetSettingsItem('username', $('#input-home').val());
            UpdateSettingsName($('#input-home').val());
            $('#tabellone-classic').show();
            $('#tabellone-advanced').hide();
            $('.homepage').addClass('swiped');

            setTimeout(function() {
                $('#input-home').addClass('hide');
                $('.message').removeClass('hide');
                $('.message').text(CreaMessaggioRandom());
            }, 300);
        }
        else
        {
            $('#input-home').addClass('empty');
        }
    }
    else
    {
        $('#tabellone-classic').show();
        $('#tabellone-advanced').hide();
        $('.homepage').addClass('swiped');
    }
});

$('#button-play-advanced').click( e => {
    e.preventDefault();
    if (GetSettingsItem('username') === null)
    {
        if ($('#input-home').val() !== "")
        {
            SetSettingsItem('username', $('#input-home').val());
            UpdateSettingsName($('#input-home').val());
            $('#tabellone-classic').hide();
            $('#tabellone-advanced').show();
            $('.homepage').addClass('swiped');

            setTimeout(function() {
                $('#input-home').addClass('hide');
                $('.message').removeClass('hide');
                $('.message').text(CreaMessaggioRandom());
            }, 300);
        }
        else
        {
            $('#input-home').addClass('empty');
        }
    }
    else
    {
        $('#tabellone-classic').hide();
        $('#tabellone-advanced').show();
        $('.homepage').addClass('swiped');
    }
});

let CreaMessaggioRandom = () => {
    let messaggio = "";
    let numeroRandom = Math.floor(Math.random() * 10); // da 0 a 9;
    let username = GetSettingsItem('username');

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
            messaggio = "Finalmente sei qui ^.^";
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