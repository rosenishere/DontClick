window.onload = () => {
    const gameField = document.querySelector('#gameField');
	
    var osuClick = new Audio('https://github.com/rosenishere/personal-stuff/raw/main/count1s.wav')
    var osuComboBreak = new Audio('https://github.com/rosenishere/personal-stuff/raw/main/combobreak.wav')
    
    var activeSquares = [];
    var clicked;
    var closest;
    var misses = 0;
    var hits = 0;
    var accuracy = 0;
    const playClick = () => {
    	osuClick.currentTime = 0;
	    osuClick.play();
    }
    const playComboBreak = () => {
    	osuComboBreak.currentTime = 0;
	    osuComboBreak.play();
    }
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 16) + 1;
    }

    const removeItemOnce = (value) => {
        const index = activeSquares.indexOf(value);
        if (index > -1) {
            activeSquares.splice(index, 1);
        }
    }

    const createActiveSquares = () => {
        for (var i = 0; activeSquares.length < 3; i++) {
            const number = getRandomNumber();
            if (!activeSquares.includes(number) && number !== clicked) {
                activeSquares.push(number);
                document.getElementById(`square-${number}`).classList.add('active');
            } else {
                createActiveSquares();
            }
        }
    }
    const setAllInactive = () => {
        for (let i of activeSquares)
        {
            document.getElementById(`square-${i}`).classList.remove('active');
        }
        activeSquares = [];
    }
    const setClosest = (event) => {
        closest = document.elementFromPoint(event.pageX, event.pageY);
    }

    const updateScores = () => {
        document.getElementById('hitScore').innerHTML = hits;
        document.getElementById('missScore').innerHTML = misses;
        //accuracy = hits * 100 / misses;
        //document.getElementById('accuracy').innerHTML = accuracy;
    }
    const resetHitMiss = () => {
        hits = 0;
        misses = 0;
        updateScores();
    }

    const handleClick = () => {
        const children = gameField.children;
        for (let child of children) {
            child.classList.remove('miss');
        }
        if (closest && gameField.contains(closest)) {
            const idName = closest.id;
            const id = idName.replace('square-', '');
            if (closest.classList.contains('active')) {
                hits += 1;
		        playClick();
                closest.classList.remove('active');
                clicked = Number(id);
                removeItemOnce(Number(id));
                createActiveSquares();
            } else {
                misses += 1;
                if(misses >= 11)
                {
                    setAllInactive();
                    resetHitMiss();
                    createActiveSquares();
                    alert("Game over!");
                } else {
                    playComboBreak();
                    closest.classList.add('miss');
                }
		        
            }
        }
        updateScores();
    }

    createActiveSquares();
    document.onkeydown = handleClick;
    document.onclick = handleClick;
    document.addEventListener('mousemove', setClosest);
}
