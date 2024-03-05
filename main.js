//--- initialization ---


/**
 * settings variables :
 * you can adjust them.
 */
const sett_type_letters="abcdefghijklmnopqrstuvwxyz";//case sensive
const sett_display_upper=false;
const sett_display_wordCheck=true;//display if one of the two word is good. preformances eater.


/**
 * game variables :
 * clear when reload (als all other)
 */
let game_id=0;
let game_state=-1;
//-1 = loading
//0 = menu
//1 = game round
//2 = end.

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
let file_words=["potato"];

{
	let file_xml = new XMLHttpRequest();
	//ON : file finish reading
	file_xml.onreadystatechange=function()
		{//on file state change
		    if (file_xml.readyState==4 && file_xml.status==200) 
			{//is finsih reading
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
						file_problems[k].push(wowo_use_text_case((here_list[i])));
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

if (sett_display_wordCheck)
{
	let file_xml = new XMLHttpRequest();
	//ON : file finish reading
	file_xml.onreadystatechange=function()
		{//on file state change
		    if (file_xml.readyState==4 && file_xml.status==200) 
			{//is finsih reading
				file_words=[];
				const here_text_all=file_xml.responseText;
				const here_text_lines=here_text_all.split("\n");
				for (let i=0;i<here_text_lines.length;i++)
				{
					file_words.push(wowo_use_text_case(here_text_lines[i]));
				}
		        console.log("[WOWO] [database] : all words :");
		        console.log(file_words);
		    }
		}

	file_xml.open('GET', 'build/words.txt', true);
	file_xml.send();
}


/**
 * display elements :
 * changed only on load.
 * store each HTML element we will edit
 */
//body
let display_element_question_left=0;
let display_element_question_right=0;
let display_element_answer=0;
//header
let display_element_soluces=0;
//footer
let display_element_bar_left_text=0;
let display_element_bar_left_shape=0;
let display_element_bar_right_text=0;
let display_element_bar_right_shape=0;

let display_element_side_timer=0;


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


/***
 * game round action : restart
 */
function wowo_game_restart()
{
	//reset
	game_round_answer="";
	game_round_answer_good=[];
	game_round_answer_wrong=[];

	//choose the problem
	game_round_problem_key=file_problems_keys[wowo_use_rickroll(file_problems_keys.length)];
	game_round_problem_left=wowo_use_text_case(wowo_use_text_begin(game_round_problem_key));
	game_round_problem_right=wowo_use_text_case(wowo_use_text_end(game_round_problem_key));
	game_round_solutions=file_problems[game_round_problem_key];
	
	//messages
	console.log("[WOWO] [round] : problem="+game_round_problem_key);
	console.log("[WOWO] [round] : solutions=");
	console.log(game_round_solutions);
	chat_add("new round","cyan");
	chat_add(game_round_answer_good.length+"/"+game_round_solutions.length+" found");

	//and change state
	game_state=1;
}


/***
 * game round action : end
 */
function wowo_game_end()
{
	//chat
	chat_add("end round","cyan");
	chat_add(game_round_answer_good.length+"/"+game_round_solutions.length+" found");
	
	//and change state
	game_state=2;
}


/**
 * check if is one of the answer of the round
 * @param {string} f_str the 3 letters
 * @returns {boolean} is an anwers
 */
function wowo_game_isAnswer(f_str)
{
	//this list is pretty small, so
	//iterate thoug the whole list
	for (let i=0;i<game_round_solutions.length;i++)
		if (game_round_solutions[i]===f_str) return true;
	return false;
}

/**
 * check if the word given is a real word
 * @param {String} f_str the 6 letters word
 * @returns is in word list
 */
function wowo_game_isWord(f_str)
{
	//it's possible to find a better way to check
	//the list is ordered
	for (let i=0;i<file_words.length;i++)
		if (file_words[i]===f_str) return true;
	return false;
}


//--- functions/display ---


/**
 * loading all elements used by displays fonctions
 */
function wowo_display_load()
{
	//getElementById must be used here, not before (else, HTML page isn't loaded)

	//center elements
	display_element_question_left=document.getElementById("question_left_0");
	display_element_question_right=document.getElementById("question_right_0");
	display_element_answer=document.getElementById("answer_0");
	
	display_element_soluces=document.getElementById("soluces");

	//bar elements
	display_element_bar_left_text=document.getElementById("bar_left_text");
	display_element_bar_left_shape=document.getElementById("bar_left_shape");
	display_element_bar_right_text=document.getElementById("bar_right_text");
	display_element_bar_right_shape=document.getElementById("bar_right_shape");
	
	display_element_side_timer=document.getElementById("side_timer");
}


/**
 * refresh the display
 * MUST be executed when a visible change is made
 */
function wowo_display_refresh()
{
	//just edit string
	display_element_question_left.innerHTML=game_round_problem_left;
	display_element_question_right.innerHTML=game_round_problem_right;
	display_element_bar_left_text.innerHTML=game_round_problem_left+game_round_answer;
	display_element_bar_right_text.innerHTML=game_round_answer+game_round_problem_right;
	{
		let here_string=game_round_answer;
		for (let i=0;i<3-game_round_answer.length;i++)
		{
			here_string+="_";
		}
		display_element_answer.innerHTML=here_string;
	}
	{
		here_string="";
		for (let i=0;i<game_round_solutions.length;i++)
		{
			if (game_round_answer_good.includes(game_round_solutions[i]))
				here_string+="<b class=\"green\">"+game_round_solutions[i]+"</b></br>";
			else
				here_string+="<b>"+"???"+"</b></br>";
		}
	}
	display_element_soluces.innerHTML=here_string;

	//colors, verry specific to each cases
	here_color="#ffffff";
	here_wrongDetails=false;
	if (game_state===1)
	{
		if (game_round_answer_good.includes(game_round_answer))
		{
			here_color="#00ff00";
		}
		else if (game_round_answer_wrong.includes(game_round_answer))
		{
			here_wrongDetails=true;
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

	display_element_answer.style.color=here_color;
	
	if (here_wrongDetails && sett_display_wordCheck)
	{
		console.log("wowo_game_isWord(game_round_problem_left+game_round_answer)");
		console.log(game_round_problem_left+game_round_answer);
		console.log(wowo_game_isWord(game_round_problem_left+game_round_answer));
		if (wowo_game_isWord(game_round_problem_left+game_round_answer))
			display_element_bar_left_shape.style.backgroundColor="#009900";
		else
			display_element_bar_left_shape.style.backgroundColor="#990000";
		
		if (wowo_game_isWord(game_round_answer+game_round_problem_right))
			display_element_bar_right_shape.style.backgroundColor="#009900";
		else
			display_element_bar_right_shape.style.backgroundColor="#990000";
	}
	else
	{
		display_element_bar_left_shape.style.backgroundColor=here_color;
		display_element_bar_right_shape.style.backgroundColor=here_color;
	}
	
}

let display_timer = 0;

setInterval(() => {
  let display_timer_m = parseInt(display_timer / 60, 10);
  let display_timer_s = parseInt(display_timer % 60, 10);
  display_timer_m = display_timer_m < 10 ? "0" + display_timer_m : display_timer_m;
  display_timer_s = display_timer_s < 10 ? "0" + display_timer_s : display_timer_s;
  display_element_side_timer.innerHTML = display_timer_m+":"+display_timer_s;
  display_timer++;
}, 1000);




//--- functions/action ---

/**
 * funcions to  act when loading the page
 * @public is dirrectly used by the HTML
 */
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
		game_state=0;
		wowo_display_refresh();
		chat_add("ready!","cyan");
	}


/**
 * act when key press
 * @public is dirrectly used by the HTML
 */
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

		if (here_found) 
		{
			wowo_display_refresh();
		}
	}
}


/**
 * act when user check
 * @public is dirrectly used by the HTML
 */
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
			chat_add(game_round_answer+" : good try","green");
			chat_add(game_round_answer_good.length+"/"+game_round_solutions.length+" found","yellow");
			if (game_round_answer_good.length===game_round_solutions.length)
			{
				chat_add("TODO : all found");
			}
		} else {
			game_round_answer_wrong.push(game_round_answer);
			chat_add(game_round_answer+" : wrong try","red");
		}

		if (here_edit)
		{
			wowo_display_refresh();
		}
	}
}


/**
 * act when user next
 * @public is dirrectly used by the HTML
 */
function wowo_action_next()
{
	if (game_state===1)
	{
		wowo_game_end();
		wowo_display_refresh();
	} 
	else if (game_state===2 || game_state===0) 
	{
		wowo_game_restart();
		wowo_display_refresh();
	}
}