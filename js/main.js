$(function() {
    FastClick.attach(document.body);
});

var positions = [];
var tiles = [];
var time = 0;
var moves = 0;
var counter = null;
var paused = true;
var optionsOpened = false;
var won = false;
var challenge = false;

$(document).ready(function() {
	if($(window).width() < 630){
		resizeWindowMobile();
	}
    loadScores();
    loadChallenges();
    
    //Check game mode
    if(localStorage.getItem("challenge_code")!= null){
    	$('#reset-button').addClass('disabled');
    	$('#start-button').addClass('disabled');
    	$('#game-mode').html('CHALLENGE MODE - CODE: <b>' + localStorage.getItem("challenge_code") + '</b>');
    	loadChallengeInfo(localStorage.getItem("challenge_code"));
    }
    
    $("#grid").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount) {
        	if(!paused){
        		console.log("You swiped " + direction );  
        		moveSwipedTile(direction);
        	}        
        },
        threshold:20
      });
});

$(document).on('click', '.tile', function(){
	if(!paused){
		var num = $(this).attr('num');
		var tile = getTile(num);
		tile.move();
	}
});

$(document).on('click', '#start-button', function(){
	if(!$(this).hasClass('disabled')){
		if(paused){
			startGame();
		} else {		
			pauseGame();
		}	
	} else {
		showBtnErrorMessage();
	}
});

$(document).on('click', '#reset-button', function(){
	if(!$(this).hasClass('disabled')){
		resetGame();
	} else {
		showBtnErrorMessage();
	}
});

$(document).on('click', '#overlay-play', function(){
	if(!$('#start-button').hasClass('disabled')){
		startGame();
	} else {
		showBtnErrorMessage();
	}
});

$(document).on('click', '#overlay-paused', function(){
	startGame();
});

$(document).on('click', '#overlay-buttons #submit-button', function(){
	if($(this).hasClass('enabled')){
		$('#name-input-field').val('');
		$('#overlay-layer').fadeIn('fast');
		$('#name-input-box').fadeIn('fast');
	}
});

$(document).on('click', '#name-submit-button', function(){
	if($('#name-input-field').val() != ''){
		insertScore($('#name-input-field').val());
		$('#overlay-layer').fadeOut('fast');
		$(this).parent().fadeOut('fast');
		$('#overlay-buttons #submit-button').removeClass('enabled');
		$('#overlay-buttons #submit-button').css('opacity', '0.5');
	}
});

$(document).on('click', '#name-cancel-button', function(){
	$('#overlay-layer').fadeOut('fast');
	$(this).parent().fadeOut('fast');
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

$(document).on('click', '#overlay-buttons #share-button', function(){
	window.open('https://www.facebook.com/sharer/sharer.php?u='
			+ encodeURIComponent(location.href),
			'facebook-share-dialog', 'width=626,height=436');
	return false;
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
	$('#overlay-buttons').hide();
}

function resetContents(){
	tiles = [];
	positions = loadPositions();
	generateTiles(positions);
	time = 0;
	moves = 0;
	$('#score-point .num').html('0');
	$('#timepoint .num').html('00:00');
	won = false;
}

function generateTiles(positions){
	console.log('Generating tiles');
	var position = null;
	var tile = null;
	for(var i = 1; i < 5; i ++){
		for(var j = 1; j < 5; j++){
			if(((i -1)* 4 + j) < 16){
				tile = new Tile(i, j, ((i -1)* 4 + j));
				tiles.push(tile);
				tile.insertTile();
				position = getPosition(i,j);
				position.free = false;
				position = null;
				tile = null;
			}
		}
	}
	setTimeout( function(){
		shuffle();}
		,1000 );
	
}

function shuffle(){
	var current = null;
	var directions = ['left', 'right', 'up', 'down'];
	for(var i = 0; i < 200; i++){
		current = directions[Math.floor(Math.random() * directions.length)];
		console.log(current)
		moveSwipedTile(current);
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
	$('#overlay-buttons').show();
	$('#overlay-inner #overlay-submessage').html('<b>Time</b>: ' + finalTime +'&nbsp&nbsp&nbsp<b>Moves</b>: ' + finalMoves).show();
	$('#overlay-buttons #submit-button').addClass('enabled');
	$('#overlay-buttons #submit-button').css(
			'opacity', '1'
		  );
	tiles = [];
	won = true;
    if(localStorage.getItem("challenge_code")!= null){
    	$('#start-button').addClass('disabled');
    	$('#submit-button').click();
    }
}

$(document).keydown(function(e) {
	var tile = null;
	var position = getFreePosition();
	if(!paused){
		e.preventDefault(); 
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
			console.log(won);
			if($('#options-inner').is(":visible")){
				$("#options-inner" ).slideUp("slow");
			}
			if($('#new-challenge-box').is(":visible") || $("#challenge-details" ).is(":visible")){
				$("#challenge-button" ).click();
			}
			if($('#challenge-code-input').is(":visible")){
//				$('#challenge-code-input').hide();
//				$('#challenge-button').fadeIn('fast');
			}
			if(paused && $('#timepoint .num').html() != '00:00' && !won){
				startGame();
			}
        break;
		case 13: 	// enter
			console.log('enter');
			if(paused  && !won && !$('#start-button').hasClass('disabled')){
				startGame();
			}
			if(won && !$('#overlay-play').is(":visible")){
				//resetGame();
			}
        break;

        default: return;
    	}
	}
});

function loadScores(){
	$('#loader').show();
	$('#best-scores-box .scrollable').html('');
	$.ajax({
		url : "http://www.bastapuntoesclamativo.it/private/15puzzle/best-scores.php",
		method : "GET",
		dataType : "html",
		success : function(data) {
			$('#loader').hide();
			$('#best-scores-box .scrollable').html(data);
		},
		error : function(err) {
			console.log("Error: " + err);
		}
	});
}

function loadAllScores(){
	$('#loader').show();
	$('#best-scores-box .scrollable').html('');
	$.ajax({
		url : "http://www.bastapuntoesclamativo.it/private/15puzzle/all-best-scores.php",
		method : "GET",
		dataType : "html",
		success : function(data) {
			$('#loader').hide();
			$('#best-scores-box .scrollable').html(data);
		},
		error : function(err) {
			console.log("Error: " + err);
		}
	});
}

function insertScore(name){
	name = mysql_real_escape_string(name);
	$.ajax({
		url : "http://www.bastapuntoesclamativo.it/private/15puzzle/insert-score.php?name=" + name + "&moves=" + moves + "&time=" + $('#timepoint .num').html(),
		method : "GET",
		dataType : "html",
		success : function(data) {
			if(data == 'success'){
				console.log('added score row');
				loadScores();
			}
		},
		error : function(err) {
			console.log("Error: " + err);
		}
	});
	
	if(localStorage.getItem("challenge_code")!= null){
		//Store challenge result
		var code = localStorage.getItem("challenge_code");
		var player_number = localStorage.getItem("player_number");
		$.ajax({
			url : "http://www.bastapuntoesclamativo.it/private/15puzzle/update-challenge.php?name=" + name + "&moves=" + moves + "&code=" + code + "&time=" + $('#timepoint .num').html() + "&player=" + player_number,
			method : "GET",
			dataType : "html",
			success : function(data) {
				if(data == 'success'){
					console.log('updated challenge ' + code + ' row');
				}
			},
			error : function(err) {
				console.log("Error: " + err);
			}
		});
	}
}
	
	
function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; 
        }
    });
}

$(document).on('keypress', '#name-input-field', function(e){
	if(e.keyCode == 13){
		e.preventDefault();
		if($('#name-input-field').val() != ''){
			insertScore($('#name-input-field').val());
			$('#overlay-layer').fadeOut('fast');
			$(this).parent().fadeOut('fast');
			$('#overlay-buttons #submit-button').removeClass('enabled');
			$('#overlay-buttons #submit-button').css('opacity', '0.5');
		}
	}
});

$(document).on('click', '#view-all-scores', function(){
	if($(this).html() == 'View all'){
		loadAllScores();
		$(this).html('Back');
	} else {
		loadScores();
		$(this).html('View all');
	}
});

$(document).on('click', '#view-all-challenges', function(){
	if($(this).html() == 'View all'){
		loadAllChallenges();
		$(this).html('Back');
	} else {
		loadChallenges();
		$(this).html('View all');
	}
});

$(document).on('click', '#options-img', function(){
	if(!$('#challenge-button').css('opacity') == '1'){
		$("#new-challenge-box" ).slideUp('slow');
		$("#challenge-details" ).slideUp('slow');
	}
	if(!$("#options-inner").is(":visible")){
		$(this).css('opacity', '0.3');
	} else {
		$(this).css('opacity', '1');
	}
	$("#options-inner" ).slideToggle("slow");
});

$(document).on('click', '#challenge-button', function(){
		
		if($("#options-inner" ).is(":visible")){
			$("#options-inner" ).slideUp('slow');
		}
		if(localStorage.getItem("challenge_code")==null){
			$("#new-challenge-box" ).slideToggle("slow");
		} else {
			loadChallengeInfo(localStorage.getItem("challenge_code"));
			$("#challenge-details" ).slideToggle("slow");
		}
		
		if($('#challenge-arrow').attr('src')== 'img/arrow-down.png'){
			$('#challenge-arrow').attr('src', 'img/arrow-up.png');
		} else {
			$('#challenge-arrow').attr('src', 'img/arrow-down.png');
		}

});


function moveSwipedTile(direction){
	var pos = getFreePosition();
	var tile = null;
	switch(direction){
		case 'left':
			if(pos.y < 4){
				tile = getTileInPosition(pos.x, pos.y + 1);
				tile.move();
			}
			break;
		case 'right':
			if(pos.y > 1){
				tile = getTileInPosition(pos.x, pos.y - 1);
				tile.move();
			}
			break;
		case 'up':
			if(pos.x < 4){
				tile = getTileInPosition(pos.x + 1, pos.y);
				tile.move();
			}
			break;
		case 'down':
			if(pos.x > 1){
				tile = getTileInPosition(pos.x - 1, pos.y);	
				tile.move();
			}
			break;
		default:
			break;
	}
	
}

function resizeWindowMobile(){
	$('#timepoint').insertAfter('#play-box');
	$('#score-point').insertAfter('#play-box');
}

function resizeWindowDesktop(){
	$('#info-box').prepend($('#timepoint'));
	$('#info-box').prepend($('#score-point'));
}

$( window ).resize(function() {
	setTimeout(function(){
		if($(window).width() < 630){
			resizeWindowMobile();
		} else {
			resizeWindowDesktop();
		}
	}, 500);
});

//Challenges
$(document).on('click', '#new-challenge', function(){
	var on_challenge = localStorage.getItem("challenge_code");
	if(on_challenge==null){
		$.ajax({
			url : "http://www.bastapuntoesclamativo.it/private/15puzzle/insert-new-challenge.php",
			method : "GET",
			dataType : "html",
			success : function(data) {
				var challenge_code = data;
				localStorage.setItem("challenge_code", challenge_code);
				localStorage.setItem("player_number", 1);
				$('#game-mode').html('CHALLENGE MODE - CODE: <b>' + challenge_code + '</b>');
				$('#new-challenge-box').slideUp("slow");
				$('#reset-button').addClass('disabled');
				resetGame();
			},
			error : function(err) {
				console.log("Error: " + err);
			}
		});
	} else {
		alert('another challenge!');
	}
});

function showBtnErrorMessage(){
	$('#buttons-error-message').fadeIn('slow').delay(500).fadeOut('slow');
}

$(document).on('click', '#cancel-challenge', function(){
	localStorage.clear();
	$('#challenge-details').slideUp("slow");
	$('#game-mode').html('NORMAL MODE');
	$('#reset-button').removeClass('disabled');
	$('#start-button').removeClass('disabled');
});

$(document).on('click', '#refresh-icon', function(){
	loadChallengeInfo(localStorage.getItem('challenge_code'));
});

$(document).on('click', '#resume-challenge-button', function(){
	if($('#challenge-code-input').val() != ''){
		console.log($('#challenge-code-input').val().length);
		if($('#challenge-code-input').val().length == 4){
			var code = $('#challenge-code-input').val();
			$.ajax({
				url : "http://www.bastapuntoesclamativo.it/private/15puzzle/check-challenge-code.php?code=" + code,
				method : "GET",
				dataType : "html",
				success : function(data) {
					if(data == 'success'){
						localStorage.setItem("challenge_code", code);
						localStorage.setItem("player_number", 2);
						$('#game-mode').html('CHALLENGE MODE - CODE: <b>' + code + '</b>');
						$('#new-challenge-box').slideUp("slow");
						$('#reset-button').addClass('disabled');
					} else {
						console.log('invalid code');
					}
				},
				error : function(err) {
					console.log("Error: " + err);
				}
			});
		} else {
			console.log('lenght invalid code');
		}
	}
});

function loadChallengeInfo(code){
	$('#challenge-loader').show();
	$('#match-row').html('');
	$.ajax({
		url : "http://www.bastapuntoesclamativo.it/private/15puzzle/get-challenge-info.php?code=" + code,
		method : "GET",
		dataType : "html",
		success : function(data) {
			$('#match-row').html(data);
			$('#challenge-loader').hide();
			if($('#player-1 .challenge-score').html() != '0' && $('#player-2 .challenge-score').html() != '0'){
				if(parseInt($('#player-1 .challenge-score').html()) < parseInt($('#player-2 .challenge-score').html())){
					$('#player-1').prepend('<img src="img/medal.png" id="medal">');
				} else {
					$('#player-2').prepend('<img src="img/medal.png" id="medal">');
				}
				$('#reset-button').addClass('disabled');
				$('#start-button').addClass('disabled');
				
			}

		},
		error : function(err) {
			console.log("Error: " + err);
		}
	});
}

function loadChallenges(){
	$('#clg-loader').show();
	$('#last-challenges-box .scrollable').html('');
	$.ajax({
		url : "http://www.bastapuntoesclamativo.it/private/15puzzle/last-challenges.php",
		method : "GET",
		dataType : "html",
		success : function(data) {
			$('#clg-loader').hide();
			$('#last-challenges-box .scrollable').html(data);
		},
		error : function(err) {
			console.log("Error: " + err);
		}
	});
}

function loadAllChallenges(){
	$('#clg-loader').show();
	$('#last-challenges-box .scrollable').html('');
	$.ajax({
		url : "http://www.bastapuntoesclamativo.it/private/15puzzle/all-challenges.php",
		method : "GET",
		dataType : "html",
		success : function(data) {
			$('#clg-loader').hide();
			$('#last-challenges-box .scrollable').html(data);
		},
		error : function(err) {
			console.log("Error: " + err);
		}
	});
}