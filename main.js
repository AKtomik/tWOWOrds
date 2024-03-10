cat_add("chargement...","neg white bold");
let span_loading_begin=Date.now();//new getting timespan for time difference
let span_loading_end=0;
let span_timer_begin=0;
let span_timer_end=0;


//--- initialization ---
//the script is loaded when the page is totaly loaded

let span_subloading_begin=Date.now();
cat_add("variables...","neg gray");


/**
 * settings variables :
 * you can adjust them by yourself.
 */
const sett_debug=true;//try to find common problems
let sett_game_wordCheck=true;//display if one of the two word is good.
//automatically disabled if [words6.txt] didnt exist
let sett_game_optionLength=true;//the player can change length
//automatically disabled if [soluces.txt] isn't ordered

const sett_data_method=false;//the method to get all values
//false = using text file. requires [./build/soluces.txt]
//true = using js file. requires [./build/soluces.js]

const sett_data_limit_new="\r\n";//the new line delimitation
//when compiled on windows : "\n"
//when compiled on linux : "\r\n" (yes, I tried it)
const sett_data_limit_between=" ";//the spacing character delimitation

const sett_type_alphabet="abcdefghijklmnopqrstuvwxyz";//case sensive
//const sett_type_alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";//case sensive
const sett_display_upper=false;//want we all upercase ? (change alphabet !)
const sett_display_transition_color=1;//must be >0 !
const sett_display_transition_text=3;//must be >0 !


//soluces lenght (solucesL)
let file_solucesL_Min=0;//min soluce length
let file_solucesL_Max=0;//max soluce length
let file_solucesL_border=[];//index of each limit of soluce length
//[ 0 , {file_solucesALimit[0]} [ = all problems with 0 solution
//[ {file_solucesALimit[0]} , {file_solucesALimit[2]} [ = all problems with 1 solution
//[ {file_solucesALimit[1]} , {file_solucesALimit[2]} [ = all problems with 2 solutions
//...
//[ {file_solucesALimit[n-1]} , {file_solucesALimit[n]} [ = all problems with n solutions

/**
 * options variables :
 * editable in game
 */
let game_option_minSoluces=-2;


/**
 * game variables :
 * clear when reload (als all other)
 */
let game_recursive_id=0;//prevent multiples recursive display function
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
let game_round_checked=false;

let game_round_answer_good=[];
let game_round_answer_wrong=[];



/**
 * display elements :
 * changed only on load.
 * store each HTML element we will edit
 */

//center elements
let display_element_question_left=document.getElementById("question_left_0");
let display_element_question_right=document.getElementById("question_right_0");
let display_element_answer=document.getElementById("answer_0");

//up elements
let display_element_head_soluces=document.getElementById("soluces");
let display_element_head_title=document.getElementById("title");
let display_element_head_subtitle=document.getElementById("subtitle");

//down elements
let display_element_bar_left_text=document.getElementById("bar_left_text");
let display_element_bar_left_shape=document.getElementById("bar_left_shape");
let display_element_bar_right_text=document.getElementById("bar_right_text");
let display_element_bar_right_shape=document.getElementById("bar_right_shape");

//left elements
let display_element_side=document.getElementById("side");
let display_element_side_timer=document.getElementById("side_timer");
let display_element_side_round_div=document.getElementById("side_round_div");
let display_element_side_round_score=document.getElementById("side_round_score");
let display_element_can_next=document.getElementById("can_next");
let display_element_can_check=document.getElementById("can_check");
let display_element_can_up=document.getElementById("can_up");
let display_element_can_down=document.getElementById("can_down");

let display_element_opt_soluces=document.getElementById("option_soluces");

//block element
let display_block_vertical=document.getElementById("screen_contain_vertical");
let display_block_contain=document.getElementById("screen_contain");
let display_block_side=document.getElementById("side");



cat_add(`variables en ${Date.now() - span_subloading_begin} ms`,"neg gray");


//--- functions/use ---
//useful functions

cat_add("fonctions...","neg gray");
span_subloading_begin=Date.now();


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

/**
 * tool for conditionnaly display plural element
 * @param {float} f_num the value to check
 * @param {string} f_end the plural element
 * @returns plural element if plural
 */
function wowo_use_plural(f_num,f_end="s")
{
	if (f_num<2)
		return "";
	else
		return f_end;
}

/**
 * in order to read a file using a httprequest.
 * @param {string} f_url url of the file to read
 * @param {Function} f_sucess code executed when sucessful reading
 * @param {Function} f_fail code executed when reading fail
 */
function wowo_use_readFile(f_url, f_sucess, f_fail)
{
	let file_xml=new XMLHttpRequest();
	//new request. will be used to read local text file.

	file_xml.onreadystatechange=function()
	//this happend when async events happend
	{
		if (file_xml.readyState===4)//if action finish
		{
			//cat_add(`${file_xml.readyState} ${file_xml.status}`,"neg");
			if (file_xml.status===200)//if no problem
			//is executed when the file sucessfuly finish reading
			{
				//the sucess function have to take as parameter the reading string
				f_sucess(file_xml.responseText);
				return;
			}
			else//if not found (404) or another problem
			//is executed when the file is not found
			{
				f_fail();
				return;
			}
		}
	}

	file_xml.open
	('GET',//on odrer the get the file content
	f_url,//the url passed by argument
	true
	//"L’utilisation d’XMLHttpRequest de façon synchrone sur le fil d’exécution principal est obsolète à cause de son impact négatif sur la navigation de l’utilisateur final. Consulter https://xhr.spec.whatwg.org/#sync-warning pour plus d’informations."
	//so we use async request
	);
	file_xml.send();
}

//--- functions/game ---
//game function



/***
 * game round action : menu
 * to state 0
 */
function wowo_game_menu()
{
	//reset
	game_round_answer="";
	game_round_answer_good=[];
	game_round_answer_wrong=[];
	game_round_problem_left="...";
	game_round_problem_right="...";
	
	//display
	wowo_display_change(0);

	//cat
	//cat_add("menu","gray");
	
	//and change state
	game_state=0;

	//actions
	wowo_display_refresh();
	wowo_display_blur();
}


/***
 * game round action : restart
 * from state 0
 * to state 1
 */
function wowo_game_restart()
{
	//choose the key
	{
		let here_down=file_solucesL_border[file_solucesL_Min-1];
		let here_up=file_solucesL_border[file_solucesL_Max];
		if (game_option_minSoluces!=file_solucesL_Min-1)
		{
			here_down=file_solucesL_border[game_option_minSoluces-1];
			here_up=file_solucesL_border[game_option_minSoluces];
		}
		console.log(`[WOWO] [round] : key is between index ${here_down} and ${here_up}`)
		game_round_problem_key=file_problems_keys[wowo_use_rickroll(here_up-here_down)+here_down];
	}
	

	//deduct the problem
	game_round_problem_left=wowo_use_text_case(wowo_use_text_begin(game_round_problem_key));
	game_round_problem_right=wowo_use_text_case(wowo_use_text_end(game_round_problem_key));
	game_round_solutions=file_problems[game_round_problem_key];

	//display
	wowo_display_change(1);
	
	//timer
	span_timer_begin=new Date();
	
	//messages
	cat_add("nouvelle manche","cyan bold");
	cat_add(`[${game_round_problem_left}[_]${game_round_problem_right}] (${game_round_solutions.length})`);
	console.log("[WOWO] [round] : hi cheater. here all solutions :");
	console.log(game_round_solutions);
	console.log("[WOWO] [round] : the problem="+game_round_problem_key);

	//and change state
	game_state=1;

	//actions
	wowo_display_refresh();
}


/***
 * game round action : end
 * to state 2
 */
function wowo_game_end()
{

	//cat
	cat_add(`${game_round_answer_good.length}/${game_round_solutions.length} trouvé${wowo_use_plural(game_round_answer_good.length)} en ${Math.floor((Date.now() - span_timer_begin)/1000)}.${Math.ceil((Date.now() - span_timer_begin)%1000)}s`,"cyan");
	//cat_add("end round","gray");

	//display
	wowo_display_change(2);
	
	//and change state
	game_state=2;

	//actions
	wowo_display_refresh();
	if (game_round_solutions.length>1)//avoid recursive for unic solution case (bcs it would be useless)
	{
		wowo_display_switch(0);//the state must be changed before
	}
}


/**
 * check if the word given is a real word
 * @param {String} f_str the 6 letters word
 * @returns is in word list
 */
function wowo_game_isWord(f_str)
{
	//you can check the whole list to find the word
	//but it's possible to find a better way to check
	//because the list is ordered, we can use the Binary Search algorithm.
	//execution time is realy faster !
	//time spend using classic way : ~1ms
	//time spend using Binary Search : ~0ms
	//you can check by yourself :
	
	//let here_begin=Date.now();//time

	//classic :
	/*
	for (let i=0;i<file_words.length;i++)	if (file_words[i]===f_str) return true;
	*/

	//binary :
	{
		here_min=0;
		here_max=file_words.length-1;
		here_loop=0;
		//console.log(`checking ${f_str}`);
		while (Math.abs(here_min-here_max) > 1 && here_loop<100000)
		{
			here_loop++;
			here_index=here_min+Math.floor((here_max - here_min) / 2);
			//console.log(`${here_index}  ${file_words[here_index]} (${here_min}-${here_max})`);
			if (file_words[here_index]<f_str)
				here_min=here_index;
			else if (file_words[here_index]>f_str)
				here_max=here_index;
			else
				return true;
		}
	}
	
	//console.log(`${Date.now() - here_begin} ms`);//time
	return false;
}


/**
 * check if is one of the solutions of the round
 * @param {string} f_str the 3 letters
 * @returns {boolean} are a solution
 */
function wowo_game_isSoluce(f_str)
{
	//this list is really small ;
	//we can iterate thoug the whole list
	for (let i=0;i<game_round_solutions.length;i++)
		if (game_round_solutions[i]===f_str) return true;
	return false;
}


//--- functions/display ---


/**
 * display elements when all is loaded
 */
function wowo_display_load()
{
    display_block_vertical.style.transition=`background-color ${sett_display_transition_color}s`;
    display_block_contain.style.transition=`opacity ${sett_display_transition_text}s`;
	display_block_side.style.transition=`opacity ${sett_display_transition_text}s`;

	display_block_vertical.style.backgroundColor="#000";

	display_block_vertical.addEventListener('transitionend', 
	() => {//this happend when first transition end
		//we can begin the nexts transitions
		display_block_contain.style.opacity=1;
		display_block_side.style.opacity=1;
	});
}


/**
 * apply display values each time you edit the game state
 * @param {int} f_state the new game state
 */
function wowo_display_change(f_state)
{
	if (f_state===0)
	{//when enter game
		display_element_can_check.innerHTML="ENTRÉE : vérifier";
		display_element_can_down.style.color="#bbb";
		display_element_can_up.style.color="#bbb";
	}
	if (f_state===0)
	{//when going to menu
		display_element_side_timer.innerHTML = "0.00";
		display_element_side_round_div.innerHTML = "0 trouvé";
		display_element_side_round_score.innerHTML = "rien à checher";

		display_element_can_next.innerHTML="ESPACE : commencer";
		display_element_can_next.style.color="#ff0";
		display_element_can_check.style.color="#555";

		display_element_can_down.innerHTML="FLECHE HAUT : augmenter";
		display_element_can_up.innerHTML="FLECHE BAS : baisser";
		display_element_can_down.style.display="";
		display_element_can_up.style.display="";
		display_element_opt_soluces.style.display="";


		display_element_side.style.color="#555";
		display_element_side_timer.style.color="#555";
		display_element_side_round_div.style.color="#555";
		display_element_side_round_score.style.color="#555";

		display_element_answer.style.color="#bbb";
		display_element_bar_left_shape.style.backgroundColor="#555";
		display_element_bar_right_shape.style.backgroundColor="#555";
		
		display_element_head_soluces.style.display="none";
		display_element_head_title.style.display="";
		display_element_head_subtitle.style.display="";
	}
	if (f_state===1)
	{//when going to game
		display_element_side_timer.style.color="#aaaaaa";

		display_element_can_next.innerHTML="ESPACE : abandonner";
		display_element_can_next.style.color="#aaaaaa";
		
		display_element_can_up.style.color="#aaa";
		display_element_can_up.innerHTML="[saisie activée]";
		display_element_can_up.style.display="";
		display_element_can_down.style.display="none";
		display_element_opt_soluces.style.display="none";

		display_element_head_subtitle.style.display="none";
		display_element_head_title.style.display="none";
		display_element_head_soluces.style.display="";
	}
	if (f_state===2)
	{//when going to win
		display_element_can_next.innerHTML="ESPACE : menu";
		display_element_can_next.style.color="#aaaaaa";
		display_element_can_check.style.color="#555";
		
		display_element_side_timer.style.color="#0000ff";

		display_element_can_up.style.display="none";
	}
}



/**
 * refresh the display
 * MUST be executed when a visible change is made
 */
function wowo_display_refresh()
{
	//in menu, the display_refresh is call a lot, but only a parth of the refresh is needed, so it's fine
	if (game_state!=0)
	{
		{//display answers
			let here_string="";
			if (game_state===2)
			{
				for (let i=0;i<game_round_solutions.length;i++)
				{
					if (game_round_answer_good.includes(game_round_solutions[i]))
						here_string+="<b class=\"green\">"+game_round_solutions[i]+"</b></br>";
					else
						here_string+="<b class=\"blue\">"+game_round_solutions[i]+"</b></br>";
				}
			} else {
				for (let i=0;i<game_round_solutions.length;i++)
				{
					if (game_round_answer_good.includes(game_round_solutions[i]))
						here_string+="<b class=\"green\">"+game_round_solutions[i]+"</b></br>";
					else
						here_string+="<b>"+"???"+"</b></br>";
				}
			}
			display_element_head_soluces.innerHTML=here_string;
		}

		{//display side divison
			let here_color=0;
			if (game_round_answer_good.length===0)
			{
				here_color="#ff0000";
			}
			else if (game_round_answer_good.length===game_round_solutions.length)
			{
				here_color="#00ff00";
			}
			else
			{
				here_color="#ffff00";
			}
			display_element_side_round_div.style.color=here_color;
			display_element_side_round_div.innerHTML=`${game_round_answer_good.length}/${game_round_solutions.length} trouvé${wowo_use_plural(game_round_answer_good.length)}`;
		}
		{//display side score
			let here_color=0;
			if (game_round_answer_wrong.length===0)
			{
				here_color="#aaaaaa";
			}
			else 
			//if (game_round_answer_wrong.length<10)
			{
				here_color="#ffaa00";
			}
			//else
			//{
			//	here_color="#ff0000";
			//}
			display_element_side_round_score.style.color=here_color;
			display_element_side_round_score.innerHTML=`${game_round_answer_wrong.length} erreur${wowo_use_plural(game_round_answer_wrong.length)}`;
		}

		//colors, verry specific to each cases
		{
			here_color="#ffffff";
			here_wrongDetails=false;
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
				else if (game_state===2)
				{
					here_color="#0000ff";
				}
				else if (game_round_checked && game_round_answer.length!=3)
				{
					here_color="#ffaa00";
				}
				else if (game_state===1 && game_round_answer.length===3)
				{
					here_color="#ffff00";
				}
				else 
				{
					here_color="#aaaaaa";
				}
			}

			display_element_answer.style.color=here_color;
			
			if (here_wrongDetails && sett_game_wordCheck)
			{
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

			if (game_round_answer.length===3)
			{
				display_element_can_check.style.color="#fff";
			}
			else
			{
				display_element_can_check.style.color="#aaa";
			}
		}
	} else {
		if (game_option_minSoluces===(file_solucesL_Min-1))
			display_element_opt_soluces.innerHTML=`aléatoire`;
		else
			display_element_opt_soluces.innerHTML=`${game_option_minSoluces} solution${wowo_use_plural(game_option_minSoluces)}`;

		if (game_option_minSoluces>=file_solucesL_Min)
			display_element_can_up.style.color="#aaa";
		else
			display_element_can_up.style.color="#555";

		if (game_option_minSoluces<file_solucesL_Max)
			display_element_can_down.style.color="#aaa";
		else
			display_element_can_down.style.color="#555";
	}

	//just edit string
	{//display answer
		let here_string=game_round_answer;
		for (let i=0;i<3-game_round_answer.length;i++)
		{
			here_string+="_";
		}
		display_element_answer.innerHTML=here_string;
	}
	{//display bar
		let here_left=game_round_problem_left;
		let here_right=game_round_problem_right;
		display_element_question_left.innerHTML=here_left;
		display_element_question_right.innerHTML=here_right;
		display_element_bar_left_text.innerHTML=here_left+game_round_answer;
		display_element_bar_right_text.innerHTML=game_round_answer+here_right;
	}


	
}

/**
 * a recursive function to switch answer between solutions
 * @param {int} f_i the solution index (nothing when outside call)
 * @param {int} f_id id of the execution (nothing when outside call)
 */
function wowo_display_switch(f_i=0,f_id=0)
{
	if (f_id===0)
	{
		game_recursive_id++;
		f_id=game_recursive_id;
	}
	if (game_state===2)
	{
		game_round_answer=game_round_solutions[f_i];
		wowo_display_refresh();
		
		{
			f_i++;
			if (!(f_i<game_round_solutions.length)) f_i=0;
			setTimeout(wowo_display_switch,1000,f_i,f_id);
		}
	}
}

/**
 * a recursive function to display random letters for LR problems
 * @param {int} f_id id of the execution (nothing when outside call)
 */
function wowo_display_blur(f_id=0)
{
	if (f_id===0)
	{
		game_recursive_id++;
		f_id=game_recursive_id;
	}
	if (game_state===0)
	{
		game_round_problem_left=sett_type_alphabet[wowo_use_rickroll(sett_type_alphabet.length)]+sett_type_alphabet[wowo_use_rickroll(sett_type_alphabet.length)]+sett_type_alphabet[wowo_use_rickroll(sett_type_alphabet.length)];
		game_round_problem_right=sett_type_alphabet[wowo_use_rickroll(sett_type_alphabet.length)]+sett_type_alphabet[wowo_use_rickroll(sett_type_alphabet.length)]+sett_type_alphabet[wowo_use_rickroll(sett_type_alphabet.length)];
		wowo_display_refresh();
	
		{
			setTimeout(wowo_display_blur,100,f_id);
		}
	}
}


/**
 * for the timer
 * executed each 10ms
 */
setInterval(
	function(){//anonymous function
	if (game_state===1)
	{
		let here_time = Date.now() - span_timer_begin;//ms
		let here_time_c = parseInt(here_time / 10 % 100, 10);//cs
		let here_time_s = parseInt(here_time / 1000 % 60, 10);//s
		let here_time_m = parseInt(here_time / 60000, 10);//m
		//format
		if (here_time_c < 10) here_time_c = "0" + here_time_c;
		//here_time_c = here_time_c < 10 ? "0" + here_time_c : here_time_c;
		if (here_time_m === 0)
		{
			here_time_m="";
		} else {
			if (here_time_s < 10) here_time_s = "0" + here_time_s;
			here_time_m = here_time_m + ":";
		}
		
		display_element_side_timer.innerHTML = here_time_m+here_time_s+"."+here_time_c;
	}
}, 10);




//--- functions/action ---

/**
 * funcions to  act when loading the page
 * @public is dirrectly used by the HTML
 */
function wowo_action_load()
//executed when files are readed
{
	span_loading_end=Date.now();

	wowo_game_menu();
	//wowo_game_restart();
	wowo_display_load();
	wowo_display_refresh();
	cat_add(`lecture et chargement : ${span_loading_end - span_loading_begin} ms`,"neg white bold");
	cat_add("prêt !","magenta");
}


/**
 * act when key press
 * @public is dirrectly used by the HTML
 */
function wowo_action_press(f_event)
{
	let here_key=String(f_event.key);
	let here_refresh=false;
	
	if (here_key===" ")
	{
		{
			here_refresh=true;
			wowo_action_next();
		}
	}
	else if (game_state==0 && here_key.slice(0,5)==="Arrow")
	{
		if (here_key==="ArrowUp")
		{
			if (game_option_minSoluces<file_solucesL_Max)
			{
				here_refresh=true;
				do {
					game_option_minSoluces++;
				} while (file_solucesL_border[game_option_minSoluces-1]===file_solucesL_border[game_option_minSoluces])
			}
		}
		if (here_key==="ArrowDown")
		{
			if (game_option_minSoluces>=file_solucesL_Min)
			{
				here_refresh=true;
				do {
					game_option_minSoluces--;
				} while (file_solucesL_border[game_option_minSoluces-1]===file_solucesL_border[game_option_minSoluces])
			}
		}
	}
	else if (game_state===1 && here_key==="Enter")
	{
		{
			wowo_action_check();
		}
	}
	else if (game_state!=2)
	{
		if (here_key==="Backspace")
		{
			if (game_round_answer.length>0)
			{
				game_round_answer=game_round_answer.slice(0,game_round_answer.length-1);
				here_refresh=true;
				game_round_checked=false;
			}
		}
		
		else if (here_key.length===1)
		{
			here_key=wowo_use_text_case(here_key);
			for (let char in sett_type_alphabet)
			{
				if (sett_type_alphabet[char]===here_key)
				{
					here_refresh=true;
				}
			}
			if (here_refresh) 
			{
				if (game_round_answer.length<3)
				{
					game_round_checked=false;
					game_round_answer+=here_key;
				}
				else if (game_round_answer.length===3 && game_round_checked)
				{
					game_round_checked=false;
					game_round_answer=here_key;
				}
			}
		}

		if (here_refresh) 
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
	game_round_checked=true;
	if (game_round_answer.length!=3)
	{
		wowo_display_refresh();
	}
	else if (!game_round_answer_wrong.includes(game_round_answer) && !game_round_answer_good.includes(game_round_answer))
	{

		let here_edit=true;
		
		if (wowo_game_isSoluce(game_round_answer))
		{
			game_round_answer_good.push(game_round_answer);
			cat_add(`${game_round_answer} : bonne réponse`,"green");
			if (game_round_answer_good.length===game_round_solutions.length)
			{
				if (game_round_answer_wrong.length===0)
					cat_add("WOWO !","green bold");
				else
					cat_add("tout trouvé !","green bold");
				wowo_game_end();
			} else {
				cat_add(`${game_round_answer_good.length}/${game_round_solutions.length} trouvé${wowo_use_plural(game_round_answer_good.length)}`);
			}
		} else {
			game_round_answer_wrong.push(game_round_answer);
			cat_add(game_round_answer+" : mauvaise réponse","red");
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
	if (game_state===0)
	{
		wowo_game_restart();
		wowo_display_refresh();
	} 
	else if (game_state===1) 
	{
		wowo_game_end();
		wowo_display_refresh();
	}
	else if (game_state===2) 
	{
		wowo_game_menu();
		//wowo_game_restart();
		wowo_display_refresh();
	}
}

cat_add(`fonctions en ${Date.now() - span_loading_begin} ms`,"neg gray");


//--- reading ---

/**
 * file variables :
 * in order to store all problems in a map variables.
 * 
 * data stored like that :
 * file_problems["XXXYYY"]=[AAA(,BBB,...)]
 * where XXX is the begin of the first word
 * where YYY is the end of the second word
 * where AAA (and potentialy BBB) is (are) solutions of the problem
 * all that is dirrectly read from file
 */
let file_problems={"empthy":["soo","lot"]};
let file_problems_keys=["empthy"];//is needed to acces random key.
let file_words=["potato"];
let file_readed=false;


cat_add("lecture...","neg gray");
span_subloading_begin=Date.now();


if (sett_game_wordCheck)
{
	console.log("[WOWO] [files] {words.txt} : reading... 1/3");

	wowo_use_readFile//reading file (function)
	(
		'build/words.txt'//url
		,
		function(f_f_text)//sucess
		{
			cat_add("lecture : words.txt","dark gray");
			console.log("[WOWO] [files] {words.txt} : reading... 2/3");
			file_words=[];
			const here_text_all=f_f_text;
			const here_text_lines=here_text_all.split(sett_data_limit_new);
			for (let i=0;i<here_text_lines.length;i++)
			{
				file_words.push((wowo_use_text_case(here_text_lines[i])));
			}

			console.log("[WOWO] [files] {words.txt} : reading... 3/3");
	        console.log("[WOWO] [database] : all words :");
	        console.log(file_words);
			cat_add("lu : words.txt","dark gray");
		}
		,
		function()//failure
		{
			cat_add("WARN : [words.txt] inacessible","red");
			sett_game_wordCheck=false;
			cat_add("une fonctionnalité désactivée","red");
		}
	);
}

{
	console.log("[WOWO] [files] {soluces.txt} : reading... 1/3");

	wowo_use_readFile//reading file (function)
	(
		'build/soluces.txt'//url
		,
		function(f_f_text)//sucess
		{
			cat_add("lecture : soluces.txt","dark gray");
			console.log("[WOWO] [files] {soluces.txt} : reading... 2/3");
			file_problems={};
			file_solucesL_Max=0;
			const here_text_all=f_f_text;
			const here_text_lines=here_text_all.split(sett_data_limit_new);
			for (let i=0;i<here_text_lines.length;i++)
			{
				let here_list=here_text_lines[i].split(sett_data_limit_between);
				let here_length=here_list.length-1;
				if (sett_game_optionLength)
				{
					while (here_length>file_solucesL_Max)
					{
						file_solucesL_border[file_solucesL_Max]=i;
						file_solucesL_Max++;
					}
					if (here_length<file_solucesL_Max && here_text_lines.length!=i+1)
					{
				        cat_add("WARN : [soluces.txt] pas ordonné correctement","red");
						sett_game_optionLength=false;
						cat_add("une fonctionnalité désactivée","red");
					}
				}
				let k=wowo_use_text_case(here_list[0]);
				file_problems[k]=[];
				for (let i=1;i<(here_length+1);i++)
				{
					file_problems[k].push((wowo_use_text_case((here_list[i]))));
				}
				//console.log("[WOWO] [database] :"+k+":"+file_problems[k]);
			}
			file_problems_keys=Object.keys(file_problems);

			file_solucesL_border[file_solucesL_Max]=(here_text_lines.length - 1);
			file_solucesL_Min=file_problems[file_problems_keys[0]].length;
			game_option_minSoluces=file_solucesL_Min-1;
			
			console.log("[WOWO] [files] {soluces.txt} : reading... 3/3");
	        console.log("[WOWO] [database] : click there :");
	        console.log(file_problems);
	        console.log("[WOWO] [database] : or not.");
			cat_add("lu : soluces.txt","dark gray");

			file_readed=true;
			cat_add(`lecture en ${Date.now() - span_subloading_begin} ms`,"neg gray");
			wowo_action_load();
			
			for (let i=0;i<file_solucesL_border.length;i++)
			{
				console.log(`${i} : ${file_solucesL_border[i]}`);
			}
		}
		,
		function()//failure
		{
			cat_add("FATAL : [soluces.txt] inacessible","bold red");
			cat_add("le programme ne peut s'exécuter","bold red");
		}
	);
}
