var positions = [];
var tiles = [];
var time = 0;
var moves = 0;
var counter = null;
var paused = true;

$(document).ready(function(){

});

$(document).on('click', '.tile', function(){
	if(!paused){
		var num = $(this).attr('num');
		var tile = getTile(num);
		tile.move();
		addMove();
		checkGoal();
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
	resetContents();
});

$(document).on('click', '#overlay-play', function(){
	startGame();
});

$(document).on('click', '#overlay-paused', function(){
	startGame();
});

$(document).on('click', '#menu', function(){
	pauseGame();
	$('#overlay-paused').hide();
	$(this).css('opacity', '0.8');
});


function startGame(){
	paused = false;
	$('#start-button').html('PAUSE');
	$('#overlay').fadeOut('fast');
	$('#overlay-play').hide();
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
	tiles = [];
}