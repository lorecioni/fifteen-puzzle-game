var positions = [];
var tiles = [];

$(document).ready(function(){
	positions = loadPositions();
	startGame(positions);
});

$(document).on('click', '.tile', function(){
	var num = $(this).attr('num');
	var tile = getTile(num);
	tile.move();
});

function startGame(positions){
	generateTiles(positions);
}

function generateTiles(positions){
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


