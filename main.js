//--- variables ---


//biblio



//variable initalization


let game_id=0;
let game_state=-1;

let game_round_problem_key=0;
let game_round_problem_left="...";
let game_round_problem_right="...";
let game_round_solutions=[];

//reading

let game_problems={"soo":["emp","thy"]};
let game_problems_keys=["soo"];

let file_xml = new XMLHttpRequest();
file_xml.onreadystatechange=function() {
	//event when the file finish reading
    if (file_xml.readyState==4 && file_xml.status==200) 
	{
		game_problems={};
		const here_text_all=file_xml.responseText;
		const here_text_lines=here_text_all.split("\n");
		for (let i=0;i<here_text_lines.length;i++)
		{
			let here_list=here_text_lines[i].split(" ");
			let k=here_list[0];
			game_problems[k]=[];
			for (let i=1;i<here_list.length;i++)
			{
				game_problems[k].push(here_list[i]);
			}
			//console.log(k+":"+game_problems[k]);
		}
		game_problems_keys=Object.keys(game_problems);//is needed to acces random key.
		
        console.log("click there :");
        console.log(game_problems);
        console.log("or not.");
    }
}
file_xml.open('GET', 'build/soluces.txt', true);
file_xml.send();


//elements initialization
let display_element_question_left=0;
let display_element_question_right=0;
let display_element_answer_1=0;
let display_element_answer_2=0;
let display_element_answer_3=0;


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

function wowo_use_text_begin(f_str)
{
	return f_str[0]+f_str[1]+f_str[2];
}

function wowo_use_text_end(f_str)
{
	return f_str[3]+f_str[4]+f_str[5];
}

//--- functions/game ---



function wowo_game_restart()
{
	game_round_problem_key=game_problems_keys[wowo_use_rickroll(game_problems_keys.length)];
	game_round_problem_left= wowo_use_text_begin(game_round_problem_key);
	game_round_problem_right= wowo_use_text_end(game_round_problem_key);
	game_round_answer= "___";
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
	display_element_question_left.innerHTML=game_round_problem_left;
	display_element_question_right.innerHTML=game_round_problem_right;
	display_element_answer_1.innerHTML=game_round_answer[0];
	display_element_answer_2.innerHTML=game_round_answer[1];
	display_element_answer_3.innerHTML=game_round_answer[2];
	//display_element_answer.innerHTML="game_round_answer";
}



//--- functions/action ---


function wowo_action_load()
{
	let click_actual=document.getElementById("jsedit");

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
	let click_actual=document.getElementById("click_show");
	let click_best=document.getElementById("best_show");
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
