import json
import subprocess
import urllib.parse

f = open("hymns-spotify.json", "r")
string = f.read()
json_data = json.loads(string)
f.close()
#print(json_data)

for key in json_data:
 title = json_data[key]['title']
 searchterm = urllib.parse.quote(title)
 #searchterm = searchterm.replace("'", "'\\''")
 #print(title)
 output = "itunes-"+title.lower().replace(" ", "-") + ".json"
 #print(output) 
 command = "sudo curl  -L 'https://itunes.apple.com/search?term="+searchterm+ "' -o ./tracks/"+output
 #print(command)
 subprocess.call(command, shell=True)
 json_data[key]['itunes'] = output

with open("hymns-itunes.json", "w") as outfile:
  json.dump(json_data, outfile)


