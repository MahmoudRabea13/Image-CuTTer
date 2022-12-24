from flask import request 
import numpy as np 
import matplotlib.pyplot as plt 
from PIL import Image
import cv2

## -- Functions File -- ##


## convert all imgs to gray scale 

def gray(input_image):
    imgs_save = input_image.filename + '.jpg'
    input_image.save(imgs_save)
    img_rgb =Image.open(imgs_save)
    img_gray = img_rgb.convert('L')
    img_gray.save(imgs_save)
    return imgs_save



## read imgs at the back as scores of 0 *not in the request * ,1 *in the request* 
def get_img():
    Score = [0,0,0,0,0,0]
    img1 = request.files.get('image1')
    img2 = request.files.get('image2')
    phase1= request.files.get('phase1')
    phase2= request.files.get('phase2')
    mag1 = request.files.get('mag1')
    mag2= request.files.get('mag2')
    files = [img1 ,img2, phase1 , phase2 , mag1, mag2]
    index = 0
    for files[index] in files:
        if files[index] != None:
            gray(files[index])
            Score[index] = 1
        index += 1
    return Score


## fourier function
def fourier (fou):
    fourier = np.fft.fft2(fou)
    return fourier



## function combine magnitude and phase ans send the result image
def mixer(img1,img2):
    f = fourier(img1)
    f2 = fourier(img2)
    combined = np.abs(f2) * np.exp(1j*np.angle(f))
    imgCombined = np.real(np.fft.ifft2(combined))
    send =np.abs(imgCombined.astype('uint8'))
    send = Image.fromarray(send)
    path = './static/images/send.jpg'
    send.save(path) 
    return path 

## function that detrmine which img should be send to the server 

def to_flask():
    output= get_img()
    print(output)
    # ---   handling 1st case ---   #
    if not output[0] == 1   !=  output[1] == 1 :
        print('send 1st case')
        img1 = cv2.imread('./static/uploadedimg/first_img.jpg')
        img2 = cv2.imread('./static/uploadedimg/second_img.jpg')
        default_img = cv2.imread('./static/images/Default.jpg')
        if img2 is None:
            mixer(img1,default_img)
        elif img1 is None:
            mixer(default_img,img2)
        elif not output[2]==1 and output[5] == 1:
            # ---   handling 2nd case ---   #
            print("send phase1 & mag2")
            img1 = cv2.resize(cv2.imread('./static/phase/phase1.jpg'),(800,800))
            img2 = cv2.resize(cv2.imread('./static/mag/mag2.jpg'),(800,800))
            mixer(img1,img2)

        elif not output[3]==1 and output[4] == 1:
            # ---   handling 3rd case ---   #
            print("send phase2 & mag1")
            img1 = cv2.resize(cv2.imread('./static/phase/phase2.jpg'),(800,800))
            img2 = cv2.resize(cv2.imread('./static/mag/mag1.jpg'),(800,800))
            mixer(img1,img2)
        else:
            mixer(img1,img2)

    return "successfully send to flask"


