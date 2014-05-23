/*
 * Tiles class definition
 * 
 * @author Lorenzo Cioni
 * 
 */

function Tile(x, y, num) {
	this.x = x;
	this.y = y;
	this.num = num;
	this.offset = null;
	this.current = null;

	this.insertTile = function() {
		var box = '<div class="tile position-' + this.x + '-' + this.y
				+ '" num="' + this.num + '"id="tile-' + this.num + '" >';
		box += num + '</div>';
		$('#tiles-container').append(box);
		var position = getGridOffset(this.x, this.y);
		position.left += 6;
		position.top += 6;
		this.offset = position;
		$('#tile-' + this.num).css({
			'left' : position.left,
			'top' : position.top
		});
		$('#tile-' + this.num).fadeIn('slow');
		this.current = getPositionInNumber(this.x, this.y);
	};

	this.move = function() {
		var position = getFreePositionNearTile(this);
		if (position != null) {
			var offsetEnd = getGridOffset(position.x, position.y);
			offsetEnd.left += 6;
			offsetEnd.top += 6;
			console.log('from ' + this.offset.top + ' to ' + offsetEnd.top);
			console.log('from ' + this.offset.left + ' to ' + offsetEnd.left);
			var incrementTop = this.offset.top - offsetEnd.top;
			var incrementLeft = this.offset.left - offsetEnd.left;

			if (incrementTop != 0) {
				if (incrementTop > 0) {
					incrementTop = '-=' + (incrementTop) + 'px';
				} else {
					incrementTop = '+=' + (incrementTop * -1) + 'px';
				}
			} else {
				incrementTop = '+=0px';
			}

			if (incrementLeft != 0) {
				if (incrementLeft > 0) {
					incrementLeft = '-=' + (incrementLeft) + 'px';
				} else {
					incrementLeft = '+=' + (incrementLeft * -1) + 'px';
				}
			} else {
				incrementLeft = '+=0px';
			}
			

			$('#tile-' + this.num).animate({
				'top' : incrementTop,
				'left' : incrementLeft,
			}, 300);

			position.free = false;
			var oldPosition = getPosition(this.x, this.y);
			oldPosition.free = true;
			this.x = position.x;
			this.y = position.y;
			this.offset = offsetEnd;
			this.current = getPositionInNumber(this.x, this.y);
		}

	};
};

function getTile(num) {
	for ( var i = 0; i < tiles.length; i++) {
		if (tiles[i].num == num) {
			return tiles[i];
		}
	}
}

function getGridOffset(x, y) {
	var selectedCell = 'position-' + x + '-' + y;
	return $('#' + selectedCell).position();
}

// Return the empty position near tile selected, if exists
function getFreePositionNearTile(tile) {
	var positionTmp = null;
	if (tile.y > 1) {
		positionTmp = getPosition(tile.x, tile.y - 1);
		if (positionTmp.free == true) {
			return positionTmp;
		}
	}
	if (tile.y < 4) {
		positionTmp = getPosition(tile.x, tile.y + 1);
		if (positionTmp.free == true) {
			return positionTmp;
		}
	}
	if (tile.x > 1) {
		positionTmp = getPosition(tile.x - 1, tile.y);
		if (positionTmp.free == true) {
			return positionTmp;
		}
	}
	if (tile.x < 4) {
		positionTmp = getPosition(tile.x + 1, tile.y);
		if (positionTmp.free == true) {
			return positionTmp;
		}
	}
	return null;
}

/*
 * Define position class
 */

function Position(x, y, free) {
	this.x = x;
	this.y = y;
	this.free = free;
}

function loadPositions() {
	var positions = [];
	for ( var i = 1; i < 5; i++) {
		for ( var j = 1; j < 5; j++) {
			positions.push(new Position(i, j, true));
		}
	}
	return positions;
}

function getRandomFreePosition(positions) {
	var position = null;
	while (position == null) {
		position = positions[Math.floor(Math.random() * positions.length)];
		if (position.free == true) {
			return position;
		} else {
			position = null;
		}
	}
}

function getPosition(x, y) {
	for ( var i = 0; i < positions.length; i++) {
		if (positions[i].x == x && positions[i].y == y) {
			return positions[i];
		}
	}
}

function getPositionInNumber(x, y){
	return 4 * (x - 1) + y;
}

function checkGoal(){
	console.log(tiles);
	for(var i = 0; i < tiles.length; i++){
		if(tiles[i].current != tiles[i].num){
			console.log('NOT WIN');
			return false;
		}
	}
	console.log('WIN!');
	return true;
}