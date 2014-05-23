/*
 * Tiles class definition
 * 
 * @author Lorenzo Cioni
 * 
 */

function Tile (x, y, num){
	this.x = x;
	this.y = y;
	this.num = num;
	this.position = null;

	this.insertTile = function(){
		console.log('Insert tile at ' + this.x + ' - ' + this.y);
		var box = '<div class="tile position-' + this.x + '-' + this.y + '" num="' + this.num + '"id="tile-' + this.num + '" >';
		box += num + '</div>';
		$('#tiles-container').append(box);
		var position = getGridOffset(this.x, this.y);
		this.position = position;
		$('#tile-' + this.num).css({
			'left': position.left + 6,
			'top' : position.top + 6
		});
		$('#tile-' + this.num).fadeIn('slow');
	};
	
	this.move = function(){
		console.log('Moving tile from ' + this.x + '-' + this.y);
		var position = getFreePositionNearTile(this);
		if(position != null){
			console.log(position);
			var offsetEnd = getGridOffset(position.x, position.y);
			console.log(offsetEnd);
			offsetEnd.left += 6;
			offsetEnd.top += 6;
			console.log('from ' + this.y + ' to ' + offset.top);
			$('#tile-' + this.num).animate({
				'top' : (this.y - offset.top) + 'px'
				
			  }, 1500 );
		}

	};
};

function getTile(num){
	for(var i = 0; i < tiles.length; i++){
		if(tiles[i].num == num){
			return tiles[i];
		}
	}
}

function getGridOffset(x, y){
	var selectedCell = 'position-' + x +'-' + y;
	return $('#' + selectedCell).position();
}

//Return the empty position near tile selected, if exists
function getFreePositionNearTile(tile){
	var positionTmp = null;
	if(tile.y > 1){
		positionTmp = getPosition(tile.x, tile.y - 1);
		if(positionTmp.free == true){
			return positionTmp;
		}
	}
	if(tile.y < 4){
		positionTmp = getPosition(tile.x, tile.y + 1);
		if(positionTmp.free == true){
			return positionTmp;
		}
	}
	if(tile.x > 1){
		positionTmp = getPosition(tile.x - 1, tile.y);
		if(positionTmp.free == true){
			return positionTmp;
		}
	}
	if(tile.x < 4){
		positionTmp = getPosition(tile.x + 1, tile.y);
		if(positionTmp.free == true){
			return positionTmp;
		}
	}
	return null;
}

/*
 * Define position class
 */

function Position(x, y, free){
	this.x = x;
	this.y = y;
	this.free = free;
}

function loadPositions(){
	var positions = [];
	for(var i = 1; i < 5; i++){
		for(var j = 1; j < 5; j++){
			positions.push(new Position(i, j, true));
		}
	}
	return positions;
}

function getRandomFreePosition(positions){
	var position = null;
	while(position == null){
		position = positions[Math.floor(Math.random()*positions.length)];
		if(position.free == true){
			return position;
		} else {
			position = null;
		}
	}
}

function getPosition(x, y){
	for(var i = 0; i < positions.length; i++){
		if(positions[i].x == x && positions[i].y == y){
			return positions[i];
		}
	}
	
}