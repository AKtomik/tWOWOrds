print("--- tWOWOrds game ---")
print("starting perfs.py...")

from time import time
import os

def prefix_action():
	here_time=time()-time_begin
	here_time=round(here_time*1000)/1000
	return "[WOWO] [finder] "+str(here_time)+"s"

print("[WOWO] [finder] : hi!")
print("[WOWO] [finder] : today:"+str(time()))

#input
print("[WOWO] [finder] : how many times would you read?")
input_times=int(input("[you] >"))

time_begin=time()
print(f"{prefix_action()} : reading {input_times} times...")

delta_begin=0
deltas=0
for i in range(0,input_times+1):
	delta_begin=time()
	
	with open(os.path.dirname(os.path.realpath('__file__'))+"/build/soluces.txt", mode="r", encoding="utf-8") as myfile:
		#save
		
		read_problems={}

		#both working with ~ same performances
		for this_line in myfile.readlines():
		#for this_line in myfile:
			this_sol=this_line.rstrip("\n").split(" ")
			read_problems[this_sol[0]]=[]
			for i in range(1,len(this_sol)):
				read_problems[this_sol[0]].append(this_sol[i])
	
	here_delta=time()-delta_begin
	deltas+=here_delta
print(f"{prefix_action()} : total average for "+str(input_times)+" times : "+str(deltas/input_times)+"s")
			
print(f"{prefix_action()} : read!")