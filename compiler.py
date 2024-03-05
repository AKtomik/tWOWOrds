sett_timeout=1

print("--- tWOWOrds game ---")
print("starting compiler.py...")

from time import time
import os

def prefix_action():
	here_time=time()-time_begin
	here_time=round(here_time*10)/10
	return "[WOWO] [compiler] "+str(here_time)+"s"

def wowo_txt_get_begin(f_str):
	return f_str[0]+f_str[1]+f_str[2]
def wowo_txt_get_end(f_str):
	return f_str[3]+f_str[4]+f_str[5]


print("[WOWO] [compiler] : hi!")
print("[WOWO] [compiler] : today:"+str(time()))
time_begin=time()
print("[WOWO] [compiler] : wich task have I todo?")
print("| tasks:")
print("| 0 - quit")
print("| 1 - ALL (recomanded)")
print("| 2 - clean build folder")
print("| 3 - sort dictionnary")
print("| 4 - compile soluces")
print("| 5 - cleanup temp file")

program_run=True
while (program_run):
	
	#argument
	user_input=input("[you] > ")
	assert (int(user_input) or user_input=="0"), "[WOWO] [compiler] : type an integer!!"
	user_action=int(user_input)
	assert (user_action>=0), "[WOWO] [compiler] : cant be negative!!"

	#time
	time_begin=time()

	if (user_action==0):#quit
		print(f"{prefix_action()} : quiting...")
		program_run=False

	if (user_action==1 or user_action==2):#clean usefull
		
		print(f"{prefix_action()} : removing build folder...")
		if (not os.path.isdir("./build")):
			print(f"{prefix_action()} : cant find build folder!")
		else:
			for i_file in (os.listdir("./build")):
				os.remove(f"./build/{i_file}")
			os.rmdir("./build")
		print(f"{prefix_action()} : removed.")


	if (user_action==1 or user_action==3):#sort

		if (not os.path.isdir("./resource")):
			print(f"{prefix_action()} : create [resource] folder")
			os.mkdir("./resource")
		if (not os.path.isdir("./build")):
			print(f"{prefix_action()} : create [build] folder")
			os.mkdir("./build")

		if (not os.path.isfile("./resource/dictionnaire.txt")):
			print(f"{prefix_action()} : cant find [resource/dictionnaire.txt] !")
		else:
			print(f"{prefix_action()} : sorting words...")
			print(f"{prefix_action()} : sorting words... reading...")
			with open(os.path.dirname(os.path.realpath('__file__'))+"/resource/dictionnaire.txt","r") as myfile:
				word_all=myfile.readlines()
				word_strip = [v for v in word_all if (len(v.rstrip("\n"))==6)]
				#print(word_strip)


			print(f"{prefix_action()} : sorting words... writting...")
			with open(os.path.dirname(os.path.realpath('__file__'))+"/build/words.txt","w") as myfile:
				for v in word_strip:
					myfile.write(v)
			print(f"{prefix_action()} : {len(word_strip)} words sorted!")

	if (user_action==1 or user_action==4):#compile
		
		if (not os.path.isfile("./build/words.txt")):
			print(f"{prefix_action()} : cant find the sorted dictionnary!")
		else:
			
			print(f"{prefix_action()} : compiling...")
			print(f"{prefix_action()} : compiling... reading...")
			
			with open(os.path.dirname(os.path.realpath('__file__'))+"/build/words.txt","r") as myfile:
				word_all=myfile.readlines()
				#word_strip = [v for v in word_all if (len(v)==7)]
				word_strip = [v.rstrip("\n") for v in word_all]
				#print(word_strip)

			#for v_second in word_strip:
			#	print(v_second[0]+v_second[1]+v_second[2]+" :")
			#	for v_first in word_strip:
			#		if (v_first[3]+v_first[4]+v_first[5]==v_second[0]+v_second[1]+v_second[2]):
			#			print(v_first+" "+v_second)

			
			print(f"{prefix_action()} : compiling... prepare...")

			last_first_begin=""
			here_first_begin=""
			here_second={}#to sort the second texts by end
			save_problems={}#all problems, by their solutions
			index=0
			count_msg_time=0
			count_problem=0
			count_soluces=0

			print(f"{prefix_action()} : compiling... solving...")
			for v_first in word_strip:
				#if (index>=len(word_strip)/10*index_ten):
				if (count_msg_time+ sett_timeout <time()):
					print(f"{prefix_action()} : compiling... solving... [{round(index / len(word_strip)*100)}%] ({v_first})")
					count_msg_time=time()

				#save when first begin change
				if (last_first_begin!=wowo_txt_get_begin(v_first)):
					#print(last_first_begin+" --- ---")
					count_problem+=len(here_second)
					for k in here_second.keys():
						#print(last_first_begin+" [???] "+k+" size:"+str(len(here_second[k])))
						save_problems[last_first_begin+k]=[]
						count_soluces+=len(here_second[k])
						for here_solv in here_second[k]:
							#print(last_first_begin+"["+here_solv+"]"+k)
							save_problems[last_first_begin+k].append(here_solv)
					here_second={}
				last_first_begin=wowo_txt_get_begin(v_first)

				#print(wowo_txt_get_begin(v_first)+" ["+wowo_txt_get_end(v_first)+"]")
				for v_second in word_strip:
					if (wowo_txt_get_end(v_first)==wowo_txt_get_begin(v_second)):
						try:
							here_second[wowo_txt_get_end(v_second)]
						except:
							here_second[wowo_txt_get_end(v_second)]=[]
						here_second[wowo_txt_get_end(v_second)].append(wowo_txt_get_begin(v_second))
						#print(wowo_txt_get_end(v_second))
				
				index+=1

			print(f"{prefix_action()} : compiling... solved!")




			print(f"{prefix_action()} : compiling... saving...")
			with open(os.path.dirname(os.path.realpath('__file__'))+"/build/soluces.txt", mode="w", encoding="utf-8") as myfile:
				#writting
				for k in save_problems.keys():
					myfile.write(k)
					for v in save_problems[k]:
						myfile.write(" "+v)
					myfile.write("\n")
			print(f"{prefix_action()} : compiling... saved!")

			print(f"{prefix_action()} : {count_problem} problems, {count_soluces} solutions.")
			print(f"{prefix_action()} : compiled!")

			
	if (user_action==1 or user_action==5):#clean useless
		
		print(f"{prefix_action()} : cleanup...")
		if (not os.path.isdir("./build")):
			print(f"{prefix_action()} : cant find build folder!")
		else:
			if (os.path.isfile("./build/words.txt")):
				os.remove("./build/words.txt")
			print(f"{prefix_action()} : clean!")
	
	if (user_action==1):#all
		print(f"{prefix_action()} : all actions finish! (time : {round((time()-time_begin)*1000000)/1000000}s)")

print("[WOWO] [compiler] : bye!")
