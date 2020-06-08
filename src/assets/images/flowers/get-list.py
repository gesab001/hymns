import json
import os
arr = os.listdir()
jsonObj = {"items" : arr}
print(jsonObj)
with open("image-list.json", "w") as outfile:
  json.dump(jsonObj, outfile)
