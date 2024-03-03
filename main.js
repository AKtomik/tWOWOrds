//--- initialization ---

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
let game_round_answer="a";

/**
 * file variables :
 * in order to store all problems in a map variables.
 * like that file_problems["XXXYYY"]=[AAA(,BBB,...)]
 * where XXX is the begin of the first word
 * where YYY is the end of the second word
 * where AAA (and potentialy BBB) is (are) solutions of the problem
 */
let file_problems={"empthy":["soo","lot"]};
let file_problems_keys=["empthy"];//is needed to acces random key.
let file_readed=false;

{
	let file_xml = new XMLHttpRequest();
	file_xml.onreadystatechange=function() 
	
	//ON : file finish reading
		{//on file state change
		    if (file_xml.readyState==4 && file_xml.status==200) 
			{//is finsih readling
				file_problems={};
				const here_text_all=file_xml.responseText;
				const here_text_lines=here_text_all.split("\n");
				for (let i=0;i<here_text_lines.length;i++)
				{
					let here_list=here_text_lines[i].split(" ");
					let k=here_list[0];
					file_problems[k]=[];
					for (let i=1;i<here_list.length;i++)
					{
						file_problems[k].push(here_list[i]);
					}
					//console.log(k+":"+file_problems[k]);
				}
				file_problems_keys=Object.keys(file_problems);
				file_readed=true;
				
		        console.log("click there :");
		        console.log(file_problems);
		        console.log("or not.");
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
let display_element_actual=0;
let display_element_question_left=0;
let display_element_question_right=0;
let display_element_answer=[0,0,0];


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



//--- functions/game ---



function wowo_game_restart()
{
	game_round_problem_key=file_problems_keys[wowo_use_rickroll(file_problems_keys.length)];
	game_round_problem_left=wowo_use_text_begin(game_round_problem_key);
	game_round_problem_right=wowo_use_text_end(game_round_problem_key);
	game_round_solutions=file_problems[game_round_problem_key];
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
	display_element_answer[0]=document.getElementById("answer_1");
	display_element_answer[1]=document.getElementById("answer_2");
	display_element_answer[2]=document.getElementById("answer_3");
}

function wowo_display_refresh()
{
	display_element_question_left.innerHTML=game_round_problem_left;
	display_element_question_right.innerHTML=game_round_problem_right;
	for (v in display_element_answer)
	{
		v.innerHTML="_";
	}
	for (let i=0;i<game_round_answer.length;i++)
	{
		display_element_answer[i].innerHTML=game_round_answer[i];
	}
}



//--- functions/action ---


function wowo_action_load()
{
	display_element_actual=document.getElementById("jsedit");

	display_element_actual.innerHTML="loading";

	wowo_display_load();

	wowo_game_restart();
	wowo_display_refresh();
	display_element_actual.innerHTML="loaded";
}


//function wowo_action_type()
//{
//}