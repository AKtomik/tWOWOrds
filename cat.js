//--- initialization ---


const cat_messages_max=35;//change it to whatever you want


let cat_messages=[];
let cat_messages_index=-1;
cat_element=document.getElementById("msg_cat");

/**
 * add a message to the cat
 * @param {string} f_msg the message
 * @param {string} f_style the style for b (color)
 */
function cat_add(f_msg, f_style="")
{
	console.log("[WOWO] [cat] : "+f_msg);

	if (f_style!="")
	{
		f_msg="<b class=\""+f_style+"\">"+f_msg+"</b>";
	}

	if (cat_messages.length<cat_messages_max)
	{
		cat_messages.push(f_msg);
	}
	else
	{
		cat_messages_index++;
		if (!(cat_messages_index<cat_messages_max))
		{
			cat_messages_index=0;
		}
		cat_messages[cat_messages_index]=(f_msg);
	}
	cat_display();
}

/**
 * refresh the cat
 */
function cat_display()
{
	here_string=""
	//we use two loops to keep the cat ordered (regards the index)
	for (let i=cat_messages_index+1;i<cat_messages.length;i++)
	{
		here_string+="</br>"+cat_messages[i];
	}
	for (let i=0;i<=cat_messages_index;i++)
	{
		here_string+="</br>"+cat_messages[i];
	}
	
	cat_element.innerHTML=here_string;
}


//you say it's cat ? 
//no
//cat it's sounds better.