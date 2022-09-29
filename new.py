
# importing required modules 
import sys
import PyPDF2
from gtts import gTTS
import random
random.seed(5)
# creating a pdf file object 
pdfFileObj = open(sys.argv[1], 'rb') 
rap = sys.argv[1]   
# creating a pdf reader object 
pdfReader = PyPDF2.PdfFileReader(pdfFileObj) 
    
# printing number of pages in pdf file 
k =0
txt=""
pgno = pdfReader.numPages
while(k< pgno):

# creating a page object 
	pageObj = pdfReader.getPage(k) 
	
	# extracting text from page 
	txt+=pageObj.extractText()
	k+=1
    
# closing the pdf file object 

pdfFileObj.close()
tts = gTTS(txt)
ran = random.random()*0
# nam =rap+str(ran)+'0.mp3'
nam =rap+'0.mp3'
tts.save(nam)

print(nam)