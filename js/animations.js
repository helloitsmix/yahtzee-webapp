function TextAnimation (numero)
{

    // https://tobiasahlin.com/moving-letters/
    
    let textWrapper = document.querySelector('.animated-text-'+numero+' .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    switch(numero)
    {
        case 1:
            anime
            .timeline({
                loop: false,
            })
            .add({
                targets: '.animated-text-1 .letter',
                translateY: ["1.1em", 0],
                translateZ: 0,
                duration: 750,
                delay: (el, i) => 50 * i
            }).add({
                targets: '.animated-text-1 .letter',
                translateY: 0,
                duration: 100,
                delay: 900
            }).add({
                targets: '.animated-text-1 .letter',
                translateY: [0, "1.2em"],
                translateZ: 0,
                duration: 750,
                delay: (el, i) => 50 * i
            });
            break;

        case 2:
            anime
            .timeline({
                loop: false,
            })
            .add({
                targets: '.animated-text-2 .letter',
                translateY: ["1.1em", 0],
                translateX: ["0.55em", 0],
                translateZ: 0,
                rotateZ: [180, 0],
                duration: 750,
                easing: "easeOutExpo",
                delay: (el, i) => 50 * i
            }).add({
                targets: '.animated-text-2 .letter',
                translateY: 0,
                duration: 100,
                delay: 900
            }).add({
                targets: '.animated-text-2 .letter',
                translateY: [0, "1.1em"],
                translateZ: 0,
                rotateZ: [0, 90],
                duration: 750,
                easing: "easeOutExpo",
                delay: (el, i) => 50 * i
            });
            break;

        case 3:
            anime
            .timeline({
                loop: false,
            })
            .add({
                targets: '.animated-text-3 .letter',
                scale: [0, 1],
                duration: 750,
                elasticity: 600,
                delay: (el, i) => 45 * (i+1)
            }).add({
                targets: '.animated-text-3 .letter',
                translateY: 0,
                duration: 100,
                delay: 900
            }).add({
                targets: '.animated-text-3 .letter',
                scale: [1, 0],
                duration: 250,
                elasticity: 0,
                delay: (el, i) => 45 * (i+1)
            });
            break;
    }

    return true;
}