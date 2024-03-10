print("--- tWOWOrds game ---")
print("starting finder.py...")

from time import time
import os

def prefix_action():
	here_time=time()-time_begin
	here_time=round(here_time*1000)/1000
	return "[WOWO] [finder] "+str(here_time)+"s"

print("[WOWO] [finder] : hi!")
print("[WOWO] [finder] : today:"+str(time()))
time_begin=time()


print(f"{prefix_action()} : reading...")

read_problems={}
with open(os.path.dirname(os.path.realpath('__file__'))+"/build/soluces.txt", mode="r", encoding="utf-8") as myfile:
	#read
	for this_line in myfile.readlines():
		this_sol=this_line.rstrip("\n").split(" ")
		read_problems[this_sol[0]]=[]
		for i in range(1,len(this_sol)):
			read_problems[this_sol[0]].append(this_sol[i])
	
			
print(f"{prefix_action()} : read!")



print(f"{prefix_action()} : searching...")
#total
total_problems=len(read_problems)
total_soluce=0
for k in read_problems:
	total_soluce+=len(read_problems[k])

#bigger
biger_v=0
biger_i=""
for k in read_problems:
	if (len(read_problems[k])>biger_v):
		biger_i=k
		biger_v=len(read_problems[k])

#number of different solutions
solutionAmount_list={}
for k in read_problems:
	for v in read_problems[k]:
		try:
			solutionAmount_list[v]
		except:
			solutionAmount_list[v]=1
		else:
			solutionAmount_list[v]+=1

#big solution
solutionPresent_i=0
solutionPresent_v=0
for k in solutionAmount_list:
	if (solutionAmount_list[k]>solutionPresent_v):
		solutionPresent_i=k
		solutionPresent_v=solutionAmount_list[k]

print(f"{prefix_action()} : searched!")

print(f"[WOWO] [finder] : {total_problems} problems, with {total_soluce} solitions")
print(f"[WOWO] [finder] : number of differents solutions : {len(solutionAmount_list)}")
print(f"[WOWO] [finder] : the solution {solutionPresent_i} solves {solutionPresent_v} problems")
print(f"[WOWO] [finder] : the bigest, with {biger_v} solutions : {biger_i}")
print("[WOWO] [finder] : and that it.")
