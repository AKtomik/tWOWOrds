//--- initialization ---


const chat_messages_max=50;//change it to whatever you want


let chat_messages=[];
let chat_messages_index=-1;
chat_element=document.getElementById("msg_cat");

/**
 * add a message to the cat
 * @param {string} f_msg the message
 * @param {string} f_style the style for b (color)
 */
function chat_add(f_msg, f_style="")
{
	console.log("[WOWO] [cat] : "+f_msg);

	if (f_style!="")
	{
		f_msg="<b class=\""+f_style+"\">"+f_msg+"</b>";
	}

	if (chat_messages.length<chat_messages_max)
	{
		chat_messages.push(f_msg);
	}
	else
	{
		chat_messages_index++;
		if (!(chat_messages_index<chat_messages_max))
		{
			chat_messages_index=0;
		}
		chat_messages[chat_messages_index]=(f_msg);
	}
	chat_display();
}

/**
 * refresh the cat
 */
function chat_display()
{
	here_string=""
	for (let i=chat_messages_index+1;i<chat_messages.length;i++)
	{
		here_string+="</br>"+chat_messages[i];
	}
	for (let i=0;i<=chat_messages_index;i++)
	{
		here_string+="</br>"+chat_messages[i];
	}
	
	chat_element.innerHTML=here_string;
}


//you say it's cHat ? 
//no
//cat it's sounds better.