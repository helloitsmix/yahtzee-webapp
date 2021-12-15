dices = {
    launch : 0,
    // dices : [0, 0, 0, 0, 0],
    // kept: [false, false, false, false, false],
    dices: [
        {value: 0, kept: false},
        {value: 0, kept: false},
        {value: 0, kept: false},
        {value: 0, kept: false},
        {value: 0, kept: false}
    ],

    clear: function() {
        dices.launch = 0;

        for (let i = 0; i < 5; i++) {
            dices.dices[i] = {value: 0, kept: false};
        }
    },

    refresh: function(newthrow) {

        if (dices.launch > 0)
            $(".dice").show();
        else
            $(".dice").hide();

        for (let i = 0; i < 5; i++) {
            if (dices.dices[i].kept) 
                $(".dice img").eq(i).attr("src", "./img/dices/dice-" + dices.dices[i].value + "-gold.png");
            else {
                $(".dice img").eq(i).attr("src", "./img/dices/dice-" + dices.dices[i].value + ".png");
                if (newthrow)
                    $(".dice").eq(i).effect("bounce", {}, i * 120, function() { dices.refresh(false) });
            }
        }
    },

    shuffle: function() {
        
        if (dices.launch === 3) {
            dices.clear();
        } else {

            for (let i = 0; i < 5; i++) {
                if (!dices.dices[i].kept)
                    dices.dices[i].value = Math.floor(Math.random() * 6) + 1;
            }

            dices.launch++;
        }

        dices.dices.sort( function(x, y) {
            return (x.kept - y.kept) === 0 ? (x.value - y.value) : (x.kept - y.kept);
        })

        dices.refresh(true);
    }
}

$("#throw-dice").on("click", function() {
    dices.shuffle();
    console.log(dices.dices)
})

$(".dice").on("click", function() {
    let i = $(".dice").index(this);
    dices.dices[i].kept = !dices.dices[i].kept;
    dices.refresh();
})