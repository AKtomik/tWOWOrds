/*
1. Écrire un code qui calcule la somme des entiers de 0 à 150 et qui l’affiche (résultat=11325). Modifier le
code pour qu’il fasse la somme des entiers à partir de 4 jusque 100 en allant de 3 en 3 (résultat=1716).
2. Écrire une fonction parfoisLong() qui simule le lancer d’un dé à 6 faces, l’opération étant répétée
jusqu’à ce l’on obtienne 6. La fonction écrira le nombre de lancer effectués dans la console avec la
commande console.log() (au lieu de print()). Pour la génération d’entier aléatoire entre 1 et 6 on
utilisera : Math.floor(Math.random()*6)+1 . Pour déclencher l’exécution de la fonction on complétera
<body> avec <body onload="parfoisLong()">
*/

function cps_load()
{
	var click_actual=document.getElementById("click_show");
	click_actual.innerHTML="0";
	var click_best=document.getElementById("best_show");
	click_best.innerHTML="0";
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
