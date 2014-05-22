/* @author      Lorenzo Cioni
 *
 * Functions for drawing tetris blocks
 * 
*/

//Block types: line is less probably to exit
var blockTypes = ['Line', 'Square', 'TBlock', 'L1Block', 'L2Block', 'Square', 'TBlock'];

function getRandomBlockName(precedent){
	var block = '';
	while(block == ''){
		var randomBlock = blockTypes[Math.floor(Math.random() * blockTypes.length)];
		if(randomBlock != precedent){
			var block = randomBlock;
		}
	}
	return block;
}

function drawBlockFromName(blockName, canvasName, x, y, w, h, r){
	switch (blockName) {
	case 'Line':
		drawLineV(canvasName, x, y, w, h, r);
		break;
	
	case 'Square':
		drawSquare(canvasName, x, y, w, h, r);
		break;
	
	case 'TBlock':
		drawTBlockUp(canvasName, x, y, w, h, r);
		break;
	
	case 'L1Block':
		drawL1BlockRight(canvasName, x, y, w, h, r);
		break;
	
	case 'L2Block':
		drawL2BlockRight(canvasName, x, y, w, h, r);
		break;

	default:
		drawTBlockUp(canvasName, x, y, w, h, r);
		break;
	}
}

//Draws horizontal line
function drawLineH(canvasName, x, y, w, h, r){
	for(var i = 0; i< 4; i++){
		$('#' + canvasName).drawRect({
						  layer: true,
  			  groups: ['lineV'],

			  strokeStyle: options.LINE_BLOCK_BORDER,
			  fillStyle: options.LINE_BLOCK_COLOR,
			  x: x + (w * i), 
			  y: y,
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
}

//Draw vertical line
function drawLineV(canvasName, x, y, w, h, r){
	for(var i = 0; i< 4; i++){
		$('#' + canvasName).drawRect({
			  layer: true,
  			  groups: ['lineH'],
			  strokeStyle: options.LINE_BLOCK_BORDER,
			  fillStyle: options.LINE_BLOCK_COLOR,
			  x: x, 
			  y: y  + (h * i),
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
}

//Draw square
function drawSquare(canvasName, x, y, w, h, r){
	for(var i = 0; i< 2; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.SQUARE_BLOCK_BORDER,
			  fillStyle: options.SQUARE_BLOCK_COLOR,
			  x: x, 
			  y: y  + (h * i),
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	for(var j = 0; j< 2; j++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.SQUARE_BLOCK_BORDER,
			  fillStyle: options.SQUARE_BLOCK_COLOR,
			  x: (x + w), 
			  y: y  + (h * j),
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
}

//Draw TBlocks
function drawTBlockDown(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.TBLOCK_BORDER,
			  fillStyle: options.TBLOCK_COLOR,
			  x: x + (w * i), 
			  y: y,
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.TBLOCK_BORDER,
		  fillStyle: options.TBLOCK_COLOR,
		  x: x + w, 
		  y: y + h,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

function drawTBlockUp(canvasName, x, y, w, h, r){
	$('#' + canvasName).drawRect({
		  strokeStyle: options.TBLOCK_BORDER,
		  fillStyle: options.TBLOCK_COLOR,
		  x: x + w, 
		  y: y,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.TBLOCK_BORDER,
			  fillStyle: options.TBLOCK_COLOR,
			  x: x + (w * i), 
			  y: y + h,
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
}

function drawTBlockRight(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.TBLOCK_BORDER,
			  fillStyle: options.TBLOCK_COLOR,
			  x: x, 
			  y: y + (h * i),
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.TBLOCK_BORDER,
		  fillStyle: options.TBLOCK_COLOR,
		  x: x + w, 
		  y: y + h,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

function drawTBlockLeft(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.TBLOCK_BORDER,
			  fillStyle: options.TBLOCK_COLOR,
			  x: x + w, 
			  y: y + (h * i),
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.TBLOCK_BORDER,
		  fillStyle: options.TBLOCK_COLOR,
		  x: x, 
		  y: y + h,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

//Draw L1Blocks

function drawL1BlockDown(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.L1BLOCK_BORDER,
			  fillStyle: options.L1BLOCK_COLOR,
			  x: x + (w * i), 
			  y: y,
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.L1BLOCK_BORDER,
		  fillStyle: options.L1BLOCK_COLOR,
		  x: x + 2*w, 
		  y: y + h,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

function drawL1BlockUp(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.L1BLOCK_BORDER,
			  fillStyle: options.L1BLOCK_COLOR,
			  x: x + (w * i), 
			  y: y + h,
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.L1BLOCK_BORDER,
		  fillStyle: options.L1BLOCK_COLOR,
		  x: x, 
		  y: y,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

function drawL1BlockLeft(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.L1BLOCK_BORDER,
			  fillStyle: options.L1BLOCK_COLOR,
			  x: x + w, 
			  y: y + (h * i),
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.L1BLOCK_BORDER,
		  fillStyle: options.L1BLOCK_COLOR,
		  x: x, 
		  y: y + 2*h,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

function drawL1BlockRight(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.L1BLOCK_BORDER,
			  fillStyle: options.L1BLOCK_COLOR,
			  x: x, 
			  y: y + (h * i),
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.L1BLOCK_BORDER,
		  fillStyle: options.L1BLOCK_COLOR,
		  x: x + w, 
		  y: y,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

//Draw L2 Blocks

function drawL2BlockUp(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.L2BLOCK_BORDER,
			  fillStyle: options.L2BLOCK_COLOR,
			  x: x + (w * i), 
			  y: y + h,
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.L1BLOCK_BORDER,
		  fillStyle: options.L2BLOCK_COLOR,
		  x: x + 2*w, 
		  y: y,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

function drawL2BlockDown(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.L2BLOCK_BORDER,
			  fillStyle: options.L2BLOCK_COLOR,
			  x: x + (w * i), 
			  y: y,
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.L1BLOCK_BORDER,
		  fillStyle: options.L2BLOCK_COLOR,
		  x: x, 
		  y: y + h,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

function drawL2BlockLeft(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.L2BLOCK_BORDER,
			  fillStyle: options.L2BLOCK_COLOR,
			  x: x + w, 
			  y: y + (h * i),
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.L1BLOCK_BORDER,
		  fillStyle: options.L2BLOCK_COLOR,
		  x: x, 
		  y: y,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}

function drawL2BlockRight(canvasName, x, y, w, h, r){
	for(var i = 0; i< 3; i++){
		$('#' + canvasName).drawRect({
			  strokeStyle: options.L2BLOCK_BORDER,
			  fillStyle: options.L2BLOCK_COLOR,
			  x: x, 
			  y: y + (h * i),
			  width: w,
			  height: h,
			  cornerRadius: r
			});
	}
	$('#' + canvasName).drawRect({
		  strokeStyle: options.L1BLOCK_BORDER,
		  fillStyle: options.L2BLOCK_COLOR,
		  x: x + w, 
		  y: y + 2*h,
		  width: w,
		  height: h,
		  cornerRadius: r
		});
}