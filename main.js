//--- initialization ---


/**
 * settings variables :
 * you can adjust them.
 */
const sett_type_letters="abcdefghijklmnopqrstuvwxyz";//case sensive
const sett_display_upper=false;


/**
 * game variables :
 * clear when reload (als all other)
 */
let game_id=0;
let game_state=-1;

/**
 * round variables :
 * cleared each rounds
 */
let game_round_problem_key=0;
let game_round_problem_left="...";
let game_round_problem_right="...";
let game_round_solutions=[];
let game_round_answer="";

let game_round_answer_good=[];
let game_round_answer_wrong=[];

/**
 * file variables :
 * in order to store all problems in a map variables.
 * like that file_problems["XXXYYY"]=[AAA(,BBB,...)]
 * where XXX is the begin of the first word
 * where YYY is the end of the second word
 * where AAA (and potentialy BBB) is (are) solutions of the problem
 */
let file_readed=false;
let file_problems={"empthy":["soo","lot"]};
let file_problems_keys=["empthy"];//is needed to acces random key.

{
	let file_xml = new XMLHttpRequest();
	//ON : file finish reading
	file_xml.onreadystatechange=function()
		{//on file state change
		    if (file_xml.readyState==4 && file_xml.status==200) 
			{//is finsih readling
				chat_add("reading...");
				file_problems={};
				const here_text_all=file_xml.responseText;
				const here_text_lines=here_text_all.split("\n");
				for (let i=0;i<here_text_lines.length;i++)
				{
					let here_list=here_text_lines[i].split(" ");
					let k=wowo_use_text_case(here_list[0]);
					file_problems[k]=[];
					for (let i=1;i<here_list.length;i++)
					{
						file_problems[k].push(wowo_use_text_case(wowo_use_text_begin(here_list[i])));
						//must use begin because of the \r
					}
					//console.log("[WOWO] [database] :"+k+":"+file_problems[k]);
				}
				file_problems_keys=Object.keys(file_problems);
				file_readed=true;
				
		        console.log("[WOWO] [database] : click there :");
		        console.log(file_problems);
		        console.log("[WOWO] [database] : or not.");
				chat_add("read");
		    }
		}

	file_xml.open('GET', 'build/soluces.txt', true);
	file_xml.send();
}


/**
 * display elements :
 * changed only on load.
 * store each HTML element we will edit
 */

let display_element_question_left=0;
let display_element_question_right=0;
let display_element_answers=0;
let display_element_answer=[0,0,0];

let display_anim_badCheck=false;


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

/**
 * return first parth of the key [0,2]
 * @param {string} f_str the 6 letters key
 * @returns begin (3 letters)
 */
function wowo_use_text_begin(f_str)
{
	return f_str[0]+f_str[1]+f_str[2];
}

/**
 * return second parth of the key [3,5]
 * @param {string} f_str the 6 letters key
 * @returns end (3 letters)
 */
function wowo_use_text_end(f_str)
{
	return f_str[3]+f_str[4]+f_str[5];
}

/**
 * chane the case to the setting
 * @param {string} f_str the origin string upper &| lower
 * @returns the string in the good case
 */
function wowo_use_text_case(f_str)
{
	if (sett_display_upper)
		return f_str.toUpperCase();
	else
		return f_str.toLowerCase();
}



//--- functions/game ---



function wowo_game_restart()
{
	game_round_answer="";
	game_round_answer_good=[];
	game_round_answer_wrong=[];

	game_round_problem_key=file_problems_keys[wowo_use_rickroll(file_problems_keys.length)];
	game_round_problem_left=wowo_use_text_case(wowo_use_text_begin(game_round_problem_key));
	game_round_problem_right=wowo_use_text_case(wowo_use_text_end(game_round_problem_key));
	game_round_solutions=file_problems[game_round_problem_key];
	console.log("[WOWO] [round] : problem="+game_round_problem_key);
	console.log("[WOWO] [round] : solutions=");
	console.log(game_round_solutions);
	

	chat_add("new round");
	chat_add(game_round_answer_good.length+"/"+game_round_solutions.length+" found");
	game_state=1;
}


function wowo_game_end()
{
	chat_add("end round");
	chat_add(game_round_answer_good.length+"/"+game_round_solutions.length+" found");
	game_state=2;
}

function wowo_game_isAnswer(f_str)
{
	for (let i=0;i<game_round_solutions.length;i++)
		if (game_round_solutions[i]===f_str) return true;
	return false;
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
	display_element_answers=document.getElementById("answer");
	display_element_answer[0]=document.getElementById("answer_1");
	display_element_answer[1]=document.getElementById("answer_2");
	display_element_answer[2]=document.getElementById("answer_3");
}

function wowo_display_refresh()
{
	display_element_question_left.innerHTML=game_round_problem_left;
	display_element_question_right.innerHTML=game_round_problem_right;

	here_color="#ffffff";
	if (game_state===1)
	{
		if (game_round_answer_good.includes(game_round_answer))
		{
			here_color="#00ff00";
		}
		else if (game_round_answer_wrong.includes(game_round_answer))
		{
			here_color="#ff0000";
		}
		else if (display_anim_badCheck)
		{
			here_color="#ffaa00";
		}
		else if (game_round_answer.length===3)
		{
			here_color="#ffff00";
		}
		else 
		{
			here_color="#aaaaaa";
		}
	}
	else if (game_state===2)
	{
		here_color="#0000ff";
	}

	display_element_answers.style.color=here_color;
	for (let i=0;i<display_element_answer.length;i++)
	{
		if (game_round_answer.length>i)
			display_element_answer[i].innerHTML=game_round_answer[i];
		else
			display_element_answer[i].innerHTML="_";
	}
}



//--- functions/action ---


function wowo_action_load()
{

	chat_add("loading...");
	
	//initalisation
	wowo_display_load();

	wowo_action_load_wait();
}


	function wowo_action_load_wait()
	{
		if (file_readed)
		{
			wowo_action_load_start();
		}
		else
		{
			console.log("[WOWO] [waiter] : waiting file read...");
			setTimeout(wowo_action_load_wait,10);
		}
	}


	function wowo_action_load_start()
	{
		wowo_game_restart();
		wowo_display_refresh();
		chat_add("ready!");
	}


	//here_key=here_key.toUpperCase();
function wowo_action_press(f_event)
{
	let here_key=String(f_event.key);
	let here_found=false;
	
	if (here_key===" ")
	{
		{
			here_found=true;
			wowo_action_next();
		}
	}
	else if (game_state===1)
	{
		
		if (here_key==="Enter")
		{
			{
				wowo_action_check();
			}
		}

		if (here_key==="Backspace")
		{
			if (game_round_answer.length>0)
			{
				game_round_answer=game_round_answer.slice(0,game_round_answer.length-1);
				here_found=true;
				display_anim_badCheck=false;
			}
		}
		
		else if (here_key.length===1)
		{
			here_key=wowo_use_text_case(here_key);
			for (let char in sett_type_letters)
			{
				if (sett_type_letters[char]===here_key)
				{
					here_found=true;
				}
			}
			if (here_found) 
			{
				if (game_round_answer.length<3)
				{
					display_anim_badCheck=false;
					game_round_answer+=here_key;
				}
			}
		}

			if (game_round_answer.length===3)
			{
				//can valid
			} else {
				//cant valid
			}

		if (here_found) 
		{
			wowo_display_refresh();
		}
	}
}

function wowo_action_check()
{
	if (game_round_answer.length!=3)
	{
		display_anim_badCheck=true;
		wowo_display_refresh();
	}
	else if (!game_round_answer_wrong.includes(game_round_answer) && !game_round_answer_good.includes(game_round_answer))
	{

		let here_edit=true;
		
		if (wowo_game_isAnswer(game_round_answer))
		{
			game_round_answer_good.push(game_round_answer);
			chat_add(game_round_answer+" : good try");
			chat_add(game_round_answer_good.length+"/"+game_round_solutions.length+" found");
			if (game_round_answer_good.length===game_round_solutions.length)
			{
				chat_add("TODO : all found");
			}
		} else {
			game_round_answer_wrong.push(game_round_answer);
			chat_add(game_round_answer+" : wrong try");
		}

		if (here_edit)
		{
			wowo_display_refresh();
		}
	}
}


function wowo_action_next()
{
	if (game_state===1)
	{
		wowo_game_end();
		wowo_display_refresh();
	} 
	else if (game_state===2) 
	{
		wowo_game_restart();
		wowo_display_refresh();
	}
}