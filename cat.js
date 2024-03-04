//--- initialization ---

chat_messages=[]

function chat_add(f_msg)
{
	chat_messages.push(f_msg);
	console.log("[WOWO] [cat] : "+f_msg);
	chat_display();
}

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


//you say it's cHat ? yep, but i prefear cat, it's sounds better.