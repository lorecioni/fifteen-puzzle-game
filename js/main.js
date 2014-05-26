var positions = [];
var tiles = [];
var time = 0;
var moves = 0;
var counter = null;
var paused = true;
var optionsOpened = false;
var won = false;

$(document).on('click', '.tile', function(){
	if(!paused){
		var num = $(this).attr('num');
		var tile = getTile(num);
		tile.move();
	}
});

$(document).on('click', '#start-button', function(){
	if(paused){
		startGame();
	} else {		
		pauseGame();
	}	
});

$(document).on('click', '#reset-button', function(){
	resetGame();
});

$(document).on('click', '#overlay-play', function(){
	startGame();
});

$(document).on('click', '#overlay-paused', function(){
	startGame();
});

$(document).on('click', '#menu img', function(){
	if(!optionsOpened){
		pauseGame();
		$('#overlay-play').hide();
		$('#overlay-paused').hide();
		$('#overlay-options').show();
		$(this).css('opacity', '0.8');
		optionsOpened = true;
	}
});


function startGame(){
	paused = false;
	$('#start-button').html('PAUSE');
	$('#overlay').fadeOut('fast');
	$('#overlay-play').hide();
	$('#overlay-message').hide();
	$('#overlay-submessage').hide();
	$(this).css('opacity', '1');
	if(tiles.length == 0){
		resetContents();
	}
	counter = setInterval(function(){
		time++;
		displayCurrentTime();
	}, 1000);
}

function pauseGame(){
	paused = true;
	$('#start-button').html('START');
	$('#overlay-paused').show();
	$('#overlay').fadeIn('fast');
	clearInterval(counter);
}

function resetGame(){
	pauseGame();
	resetContents();
	$('#overlay-paused').hide();
	$('#overlay-play').show();
	$('#overlay-message').hide();
	$('#overlay-submessage').hide();
}

function resetContents(){
	tiles = [];
	positions = loadPositions();
	generateTiles(positions);
	time = 0;
	moves = 0;
	$('#score-point .num').html('0');
	$('#timepoint .num').html('00:00');
}

function generateTiles(positions){
	console.log('Generating tiles');
	var position = null;
	var tile = null;
	for(var i = 1; i < 16; i ++){
		position = getRandomFreePosition(positions);
		tile = new Tile(position.x, position.y, i);
		tiles.push(tile);
		tile.insertTile();
		position.free = false;
		position = null;
		tile = null;
	}
}

function addMove(){
	moves++;
	$('#score-point .num').html(moves);
}

function displayCurrentTime(){
	var minutes = Math.floor(time / 60);
	var seconds = time - minutes * 60;
	
	$('#timepoint .num').html(convert(minutes) + ':' + convert(seconds));
}

function convert(n){
    return n > 9 ? "" + n: "0" + n;
}

function win(){
	pauseGame();
	$('#overlay-paused').hide();
	$('#overlay-inner').show();
	$('#overlay-inner #overlay-message').html('YOU WIN!').show();
	var finalTime = $('#timepoint .num').html();
	var finalMoves = $('#score-point .num').html();
	$('#overlay-inner #overlay-submessage').html('<b>Time</b>: ' + finalTime +'  <b>Moves</b>: ' + finalMoves).show();
	tiles = [];
	won = true;
}

$(document).keydown(function(e) {
	e.preventDefault(); 
	var tile = null;
	var position = getFreePosition();
	if(!paused){
    	switch(e.which) {
       		case 37: // left
				console.log('left');
					if(position.y < 4){
						tile = getTileInPosition(position.x, position.y + 1);
						tile.move();
					}
        	break;
        	case 38: // up
				console.log('up');
				if(position.x < 4){
					tile = getTileInPosition(position.x + 1, position.y);
					tile.move();
				}
        	break;
        	case 39: // right
				console.log('right');
				if(position.y > 1){
					tile = getTileInPosition(position.x, position.y - 1);
					tile.move();
				}
        	break;
        	case 40: // down
				console.log('down');
				if(position.x > 1){
					tile = getTileInPosition(position.x - 1, position.y);
					tile.move();
				}
        	break;	
			case 27: // esc
				console.log('esc');
				pauseGame();
        	break;
        	default: return;
    	}
	} else {
		switch(e.which) {
		 case 27: 	// esc
			console.log('esc');
			if(paused && $('#timepoint .num').html() != '00:00' && !won){
				startGame();
			}
        break;
		case 13: 	// enter
			console.log('enter');
			if(paused  && !won){
				startGame();
			}
			if(won && !$('#overlay-play').is(":visible")){
				resetGame();
			}
        break;


        default: return;
    	}
	}
});