let result = document.querySelector(".result"),
result2 = document.querySelector(".result2"),
save = document.querySelector(".save"),
save2 = document.querySelector(".save-2"),
upload1 = document.querySelector("#file-input1"),
upload2 = document.querySelector("#file-input2"),
selceted1 = document.querySelector(".selected1"),
selceted2 = document.querySelector(".selected2"),
cropper1 = "";
cropper2 = "";
upload1.addEventListener('change' , (e) => {
console.log(e)
    const reader1 = new FileReader();
reader1.onload = (e) => {
if (e.target){
    //upload first image
    let img = document.createElement("img");
    img.id = "img";
    img.src = e.target.result;
    //clean 1st image
    result.innerHTML = " ";
    //add 1st image 
    result.appendChild(img);
    save.classList.remove("hide");
    //init cropper
    console.log(img);
    cropper1 = new Cropper(img,{
        autoCrop:false,
    });
}
};
//read the  1st img & send it 
img1_send =  e.target.files[0];
reader1.readAsDataURL(img1_send);
var xhr=new XMLHttpRequest();
var fd=new FormData();
fd.append("image1",img1_send, './static/uploadedimg/first_img');
xhr.onreadystatechange = function() {
    if (xhr.status == 200) {
        send_img();
        document.getElementById('User-img').style.display = 'block';
    }
    };
xhr.open("POST","/",true);
xhr.send(fd);
selceted1.classList.add("hide");
selceted2.classList.add("hide");
})
////second image
upload2.addEventListener('change' , (e) => {
    
    console.log(e)
        const reader2 = new FileReader();
    reader2.onload = (e) => {
    if (e.target){
        //upload second image
        let img2 = document.createElement("img");
        img2.id = "img2";
        img2.src = e.target.result;
        //clean 2st image
        result2.innerHTML = " ";
        //add 2st image 
        result2.appendChild(img2);
        save2.classList.remove("hide");
        //init cropper
        //console.log(img2);
        cropper2 = new Cropper(img2,{
            autoCrop:false,
        });
    
    }
    };
    //read the  2st img & send it to back
    img2_send =  e.target.files[0];
    reader2.readAsDataURL(img2_send);
    var xhr=new XMLHttpRequest();
    var fd=new FormData();
    fd.append("image2",img2_send, './static/uploadedimg/second_img');
    xhr.onreadystatechange = function() {
		if (xhr.status == 200) {
            send_img();
            document.getElementById('User-img').style.display = 'block';

		}
	};
    xhr.open("POST","/",true);
    xhr.send(fd);
    selceted1.classList.add("hide");
    selceted2.classList.add("hide");
    selceted1.classList.remove("hide");
    })
//save selected imgs
save.addEventListener('click' , (e)=>{
e.preventDefault()
cropper1.getCroppedCanvas().toBlob((blob) => {
    var fd = new FormData();
    fd.append("phase1", blob,'./static/phase/phase1');
    var xhr = new XMLHttpRequest;
    xhr.open( "POST", "/",true);
    xhr.send(fd);
}, "image/jpeg");
cropper2.getCroppedCanvas().toBlob((blob) => {
    var fd = new FormData();
    fd.append("mag2", blob,'./static/mag/mag2');
    var xhr = new XMLHttpRequest;
    xhr.open( "POST", "/",true);
    xhr.send(fd);
}, "image/jpeg");
send_img();
selceted1.classList.remove("hide");
selceted2.classList.add("hide");
sel1 = setTimeout(select1, 2000);
document.getElementById('User-img').style.display = 'block';
console.log("U have succesfully selected the first img phase & secong image magnitude");
});

save2.addEventListener('click' , (e)=>{
    e.preventDefault()
    cropper2.getCroppedCanvas().toBlob((blob) => {
        var fd = new FormData();
        fd.append("phase2", blob,'./static/phase/phase2');
        var xhr = new XMLHttpRequest;
        xhr.open( "POST", "/",true);
        xhr.send(fd);

    }, "image/jpeg");
    cropper1.getCroppedCanvas({
    }).toBlob((blob) => {
        var fd = new FormData();
        fd.append("mag1", blob,'./static/mag/mag1');
        var xhr = new XMLHttpRequest;
        xhr.open( "POST", "/",true);
        xhr.send(fd);
    
    }, "image/jpeg");
    send_img();
    selceted2.classList.remove("hide");
    selceted1.classList.add("hide");
    sel2 =setTimeout(select2, 2000);
    document.getElementById('User-img').style.display = 'block';
    console.log("U have successfully selected the second img phase & first image mag");
    });



function send_img(){
    checkIfImageExists('./static/images/send.jpg', (exists) => {
    if (exists) {
        console.log('Image exists.')
        var timestamp = new Date().getTime();
        img_to_user = document.getElementById("User-img");
        img_to_user.src = './static/images/send.jpg?t=' + timestamp;
        document.getElementById("User-img").innerHTML = img_to_user.src ;
        console.log("sucessfully send"); 
    } else {
        console.log('Image does not exists.')
    }
});
}
function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;
    
    if (img.complete) {
        callback(true);
    } else {
        img.onload = () => {
        callback(true);
    };
        img.onerror = () => {
        callback(false);
        };
    }
}
function select1() {
    document.getElementById('button1').click();  
    clearTimeout(sel1);
}
function select2() {
    document.getElementById('button2').click();  
    clearTimeout(sel2);
}