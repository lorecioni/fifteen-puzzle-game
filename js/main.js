$(document).ready(function(){
	
	var blockW = options.BLOCK_WIDTH;
	var blockH = options.BLOCK_HEIGHT;
	var blockR = options.BLOCK_RADIUS;

	var defaultOffsetX = blockW * 6;
	var defaultOffsetY = -(blockH);
	
	console.log(defaultOffsetY);
	//startGame(defaultOffsetX, defaultOffsetY, blockW, blockH, blockR);
	
	
	//var x = blockW/2;
	//var y = blockH/2;
	
	//Test row numbers
	//for(var i = 0; i < 15; i++){
	//	drawLineV('main-canvas', x + blockW * i, y, blockW, blockH, blockR);
	//}
	//drawL1BlockRight('main-canvas', blockW/2, -10, blockW, blockH, blockR);
    drawLineH('main-canvas', 100, 100, blockW, blockH, blockR);
	drawLineV('main-canvas', blockW/2, blockH/2, blockW, blockH, blockR);
//	drawSquare('main-canvas', blockW/2, blockH/2, blockW, blockH, blockR);
//	drawTBlockLeft('main-canvas', blockW/2, blockH/2, blockW, blockH, blockR);
//	drawL1BlockDown('main-canvas', blockW/2, blockH/2, blockW, blockH, blockR);
//	drawL1BlockRight('main-canvas', blockW/2, blockH/2, blockW, blockH, blockR);
	

	// Animate all layers in the group 'circles'
$('#main-canvas').animateLayerGroup('lineH', {
  y: '+=50'
}, 500);
});


function startGame(x, y, w, h, r){
	var initialBlock = '';
	initialBlock = getRandomBlockName(initialBlock);
	drawBlockFromName(initialBlock, 'main-canvas', x, y, w, h, r);
	collideTest(x, y, w, h);
//	setInterval(function() { 
//		initialBlock = getRandomBlockName(initialBlock);
//		drawBlockFromName(initialBlock, 'main-canvas', x/2, y/2, blockW, blockH, blockR);
////		initialBlock = getRandomBlockName(initialBlock);
////		console.log('returned ' + initialBlock);
//		}, 3000);
}

function collideTest(x, y, w, h) {
	var canvasHeight = $('#main-canvas').height();
	var canvasWidth = $('#main-canvas').width();

	
  }