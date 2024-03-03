//biblio

var crypto = require("crypto");


//variable initalization


var game_id=0;
var game_state=-1;

var game_round_question_left="...";
var game_round_question_right="...";
var game_round_answer="...";


//elements initialization
var display_element_question_left=0;
var display_element_question_right=0;


function wowo_load()
{
	display_element_question_left=document.getElementById("question_left_0");
	display_element_question_right=document.getElementById("question_right_0");

	var click_actual=document.getElementById("jsedit");
	click_actual.innerHTML="loading";
	wowo_game_restart();
	wowo_display_refresh();
	click_actual.innerHTML="loaded";

}


function wowo_game_restart()
{
	game_round_question_left= "lll";
	game_round_question_right= "rrr";
	game_round_answer= "aaa";
	//game_round_question_left= crypto.randomBytes(20).toString('hex');
	//game_round_question_right= crypto.randomBytes(20).toString('hex');
	//game_round_answer= crypto.randomBytes(20).toString('hex');
}


function wowo_display_refresh()
{
	display_element_question_left.innerHTML=game_round_question_left;
	display_element_question_right.innerHTML=game_round_question_right;
	//display_element_answer.innerHTML="game_round_answer";
}


function cps_refresh()
{
}

function cps_click()
{
	var click_actual=document.getElementById("click_show");
	var click_best=document.getElementById("best_show");
	click_actual.innerHTML++;
	if (parseInt(click_actual.innerHTML) > parseInt(click_best.innerHTML))
		click_best.innerHTML=click_actual.innerHTML;
	
	setTimeout(
		function()
		{
		click_actual.innerHTML--;
		}
	, 1000);
}
