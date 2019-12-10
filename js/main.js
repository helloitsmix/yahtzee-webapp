let nomiColonne = [
    'scendere',
    'salire',
    'liberi',
    'secchi',
    'annunciati'
];


let CalcoloBonus = () => {
    
    nomiColonne.forEach(nomeColonna => { 

        let totalPoints = 0;
        $("input[name='" + nomeColonna + "-input']").each( (index, item) => {
            if ( !isNaN( parseInt( $(item).val() )))
                totalPoints += parseInt( $(item).val() );
        });
        $("input[name='" + nomeColonna + "-bonus']").val(totalPoints >= 60 ? totalPoints * 2 : totalPoints);

    });

};

let UpDownUnlock = () => {

    $("input[name='scendere-input']").each( (index, item) => {

        if ( $(item).prop('disabled') && parseInt( $("input[name='scendere-input']").eq(index-1).val() ) >= 0 && !isNaN(parseInt( $("input[name='scendere-input']").eq(index-1).val() )) )
        {
            $("input[name='scendere-input']").eq(index).prop('disabled', false);
            return false;
        }

    });

};

nomiColonne.forEach(nomeColonna => { 
    $("input[name='" + nomeColonna + "-input']").on('input propertychange', () => {
        CalcoloBonus();
        UpDownUnlock();
    });
});