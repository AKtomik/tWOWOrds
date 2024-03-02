print("--- tWOWOrds game ---")
print("starting player.py...")

from time import time
from random import randint as rickroll
from random import choice as listroll
import os

def prefix_action():
	here_time=time()-time_begin
	here_time=round(here_time*10)/10
	return "[WOWO] [player] "+str(here_time)+"s"

def wowo_txt_get_begin(f_str):
	return f_str[0]+f_str[1]+f_str[2]
def wowo_txt_get_end(f_str):
	return f_str[3]+f_str[4]+f_str[5]

def game_findProblem():
	return

print("[WOWO] [player] : hi!")
print("[WOWO] [player] : today:"+str(time()))
time_begin=time()


print(f"{prefix_action()} : reading...")
read_problems={}
with open(__file__+"\\..\\build\soluces.txt", mode="r", encoding="utf-8") as myfile:
	#read
	for this_line in myfile.readlines():
		this_sol=this_line.rstrip("\n").split(" ")
		read_problems[this_sol[0]]=[]
		for i in range(1,len(this_sol)):
			read_problems[this_sol[0]].append(this_sol[i])			
print(f"{prefix_action()} : read!")


print(f"{prefix_action()} : starting...")

user_try=""

round_solutions=[]

round_problem_key=0
round_problem_txt_1=""
round_problem_txt_2=""

print(f"{prefix_action()} : ready!")

program_run=True
print("[WOWO] : let's play!")
while (program_run):#each round
	print("search a problem...")
	
	#searching a problem
	round_problem_key=listroll(list(read_problems.keys()))
	round_solutions=read_problems[round_problem_key]
	round_problem_txt_1=wowo_txt_get_begin(round_problem_key)
	round_problem_txt_2=wowo_txt_get_end(round_problem_key)
	
	round_problem_key=0#bcs dict, isn't used.
	
	print("could you find the solution?")
	while (program_run):#each round
		print(round_problem_txt_1+" ___ "+round_problem_txt_2)
		("> ")
	print(round_solutions)


