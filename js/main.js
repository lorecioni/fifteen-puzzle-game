var positions = [];
var tiles = [];
var time = 0;
var moves = 0;
var counter = null;
var paused = true;

$(document).ready(function(){
//	setTimeout(function() {
	//	startGame();
	//}, 300);
	
});

$(document).on('click', '.tile', function(){
	var num = $(this).attr('num');
	var tile = getTile(num);
	tile.move();
	addMove();
	checkGoal();
});

$(document).on('click', '#start-button', function(){
	if(paused){
		$('#start-button').html('PAUSE');
		paused = false;
		startGame();
	} else {
		$('#start-button').html('START');
		paused = true;
		pauseGame();
	}
	
});

$(document).on('click', '#reset-button', function(){
	resetContents();
});

function startGame(){
	if(tiles.length == 0){
		resetContents();
	}
	counter = setInterval(function(){
		time++;
		displayCurrentTime();
	}, 1000);
}

function pauseGame(){
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
