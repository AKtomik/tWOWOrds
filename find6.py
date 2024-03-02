print("find6 : hi !")
mot_file=open(__file__+"\\..\\dictionnaire.txt","r")

mot_all=mot_file.readlines()
mot_strip = [v for v in mot_all if (len(v)==7)]
#mot_strip = [v.rstrip("\n") for v in mot_all]
print(mot_strip)
mot_file.close()

with open(__file__+"\\..\\dictionnaire6.txt","w") as myfile:
	#myfile.write('readme')
	for v in mot_strip:
		myfile.write(v)