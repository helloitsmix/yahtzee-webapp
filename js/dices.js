// document.body.onkeyup = function(e){
//     if(e.keyCode == 32)
//         $("#throw-dice").click();

//     if(e.keyCode == 49)
//         $(".dice").eq(0).click();

//     if(e.keyCode == 50)
//         $(".dice").eq(1).click();

//     if(e.keyCode == 51)
//         $(".dice").eq(2).click();

//     if(e.keyCode == 52)
//         $(".dice").eq(3).click();

//     if(e.keyCode == 53)
//         $(".dice").eq(4).click();
// }

dices = {
    launch : 0,

    dices: [
        {value: 0, kept: false},
        {value: 0, kept: false},
        {value: 0, kept: false},
        {value: 0, kept: false},
        {value: 0, kept: false}
    ],

    circle_style: [
        "#FFFFFF",
        "linear-gradient(90deg, #FFFFFF 50%, transparent 50%), linear-gradient(45deg, #FFFFFF 50%, #FFD700 50%)",
        "linear-gradient(-45deg, #FFD700 50%, transparent 50%), linear-gradient(90deg, #FFFFFF 50%, #FFD700 50%)",
        "#FFD700",
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

        if (dices.launch === 3)
            $("#throw-dice-bg img").attr("src", "./img/dices/throw-dice-retry.png");
        else
            $("#throw-dice-bg img").attr("src", "./img/dices/throw-dice.png");

        $("#throw-dice").css({background: dices.circle_style[dices.launch]});

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

let down = false;

$("#throw-dice").on("click", function(e) {
    if (!down)
        dices.shuffle();
    else
        down = false;
})

$(".dice").on("click", function() {
    let i = $(".dice").index(this);
    dices.dices[i].kept = !dices.dices[i].kept;
    dices.refresh();
})

let animateButton = function(e) {
    e.preventDefault;
    
    bubblyButtons.removeClass('animate');
    
    bubblyButtons.addClass('animate');
    setTimeout(function(){
        bubblyButtons.removeClass('animate');
    },700);
};
  
const bubblyButtons = $("#throw-dice");
  
for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);

    bubblyButtons[i].addEventListener('mousedown',function(e) {
        e.preventDefault();
        interval = setInterval(function() {
            dices.clear();
            dices.refresh();
            down = true;
            clearInterval(interval);
        }, 1000);
    });

    bubblyButtons[i].addEventListener('mouseup', function(e) {
        clearInterval(interval);
    });

    bubblyButtons[i].addEventListener('mouseout',function(e) {
        clearInterval(interval);
        down = false;
    });
}

var interval;