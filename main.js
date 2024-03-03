//--- variables ---


//biblio



//variable initalization


var game_id=0;
var game_state=-1;

var game_round_question_left="...";
var game_round_question_right="...";
var game_round_answer="...";


//elements initialization
var display_element_question_left=0;
var display_element_question_right=0;
var display_element_answer_1=0;
var display_element_answer_2=0;
var display_element_answer_3=0;


//--- functions/use ---


/**
 * return random integer from range [0,f_range[
 * @param {int} f_range define the range for the integer
 * @returns {int} a random integer in the f_range range
 */
function wowo_use_rickroll(f_range)
{
  return Math.floor(Math.random() * f_range);
}


//--- functions/game ---



function wowo_game_restart()
{
	game_round_question_left= String(wowo_use_rickroll(1000));
	game_round_question_right= String(wowo_use_rickroll(1000));
	game_round_answer= String((parseInt(game_round_question_left)+parseInt(game_round_question_right))/2);
}


//--- functions/display ---


/**
 * loading all elements used by displays fonctions
 * @function wowo_display_load
 */
function wowo_display_load()
{
	display_element_question_left=document.getElementById("question_left_0");
	display_element_question_right=document.getElementById("question_right_0");
	display_element_answer_1=document.getElementById("answer_1");
	display_element_answer_2=document.getElementById("answer_2");
	display_element_answer_3=document.getElementById("answer_3");
}

function wowo_display_refresh()
{
	display_element_question_left.innerHTML=game_round_question_left;
	display_element_question_right.innerHTML=game_round_question_right;
	display_element_answer_1.innerHTML=game_round_answer[0];
	display_element_answer_2.innerHTML=game_round_answer[1];
	display_element_answer_3.innerHTML=game_round_answer[2];
	//display_element_answer.innerHTML="game_round_answer";
}



//--- functions/action ---


function wowo_action_load()
{
	var click_actual=document.getElementById("jsedit");

	click_actual.innerHTML="loading";

	wowo_display_load();

	wowo_game_restart();
	wowo_display_refresh();
	click_actual.innerHTML="loaded";

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
