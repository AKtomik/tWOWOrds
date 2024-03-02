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
time_begin=time()


print(f"{prefix_action()} : average reading time...")

delta_begin=0
deltas=0
for i in range(0,21):
	delta_begin=time()
	
	with open(__file__+"\\..\\build\soluces.txt", mode="r", encoding="utf-8") as myfile:
		#save
		
		#read_string=myfile.read()
		
		#exec(f"read_problems={myfile.read()}")#use something else ??
		read_problems={}

		#both working with ~ same performances
		for this_line in myfile.readlines():
		#for this_line in myfile:
			#print("line:",this_line)
			this_sol=this_line.rstrip("\n").split(" ")
			read_problems[this_sol[0]]=[]
			for i in range(1,len(this_sol)):
				read_problems[this_sol[0]].append(this_sol[i])
			#print(this_sol[0],"=",read_problems[this_sol[0]])
	
	here_delta=time()-delta_begin
	#print(str(round(here_delta*1000)/1000)+"s")
	deltas+=here_delta
print("total average for "+str(21)+" : "+str(deltas/20))
			
print(f"{prefix_action()} : read!")