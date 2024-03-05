//--- initialization ---

chat_messages=[]

/**
 * add a message to the cat
 * @param {string} f_msg the message
 * @param {string} f_style the style for b
 */
function chat_add(f_msg, f_style="")
{
	console.log("[WOWO] [cat] : "+f_msg);
	if (f_style!="")
	{
		f_msg="<b class=\""+f_style+"\">"+f_msg+"</b>"
	}
	chat_messages.push(f_msg);
	chat_display();
}

/**
 * refresh the cat
 */
function chat_display()
{
	here_string=""
	for (let i in chat_messages)
	{
		here_string+="</br>"+chat_messages[i];
	}
	
	here_element=document.getElementById("msg_cat");
	here_element.innerHTML=here_string;
}


//you say it's cHat ? 
//no
//cat it's sounds better.