console.log("Welcome to MuseStation");
//Initialisation
 let songIndex=0;
 let  audioElement= new Audio("Songs/1.mp3");
 let masterplay= document.getElementById('masterplay');
 let myProgressBar= document.getElementById('myprogressbar');
 let gif= document.getElementById('gif');
 let songItems= document.getElementById('songItem');
 let displaysongname=document.getElementById('displaysongname');
 let shuffle=document.getElementById('shuffle');
 let repeat=document.getElementById('repeat');
 let mute=document.getElementById('mute');
 let songimage=document.getElementById('songimage');
 let currenttime=document.getElementById('currenttime');
 let totalduration=document.getElementById('totalduration');
 let volumeslider=document.getElementById('volumeslider');
 audioElement.muted=false;
let songs=[
    {songName:"Crawling", filepath:"Songs/1.mp3",coverpath:"Covers/1.jpeg"},
    {songName:"Lost", filepath:"Songs/2.mp3",coverpath:"Covers/2.jpeg"},
    {songName:"Numb", filepath:"Songs/3.mp3",coverpath:"Covers/3.jpeg"},                                                                                                                                                                                                             
    {songName:"What I have Done", filepath:"Songs/4.mp3",coverpath:"Covers/4.jpeg"},

]


//handle/play/pause click
masterplay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
    }
})

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //Update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
    let currentMinutes = Math.floor(audioElement.currentTime / 60);
    let currentSeconds = Math.floor(audioElement.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audioElement.duration / 60);
    let durationSeconds = Math.floor(audioElement.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    currenttime.innerText = currentMinutes + ":" + currentSeconds;
    totalduration.innerText = durationMinutes + ":" + durationSeconds;

})

//progress bar
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

//volume bar
volumeslider.addEventListener('change',()=>{
    audioElement.volume = volumeslider.value/100;
    if(audioElement.volume==0.0){
            audioElement.muted=true;
            mute.classList.remove('fa-volume-low');
            mute.classList.add('fa-volume-xmark');
    }
    else{
            audioElement.muted=false;
            mute.classList.remove('fa-volume-xmark');
            mute.classList.add('fa-volume-low');
        }
})


const makeAllPlay=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })

}
//handle individual songs 
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        if(audioElement.paused || audioElement.currentTime<=0 || e.target.classList.contains('fa-play-circle')){
            makeAllPlay();
            songIndex= parseInt(e.target.id);
            audioElement.src= `Songs/${songIndex}.mp3`;
            displaysongname.innerText= songs[songIndex-1].songName;
            songimage.src = `Covers/${songIndex}.jpeg`;
            audioElement.currentTime=0;
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
        }
        else{
            audioElement.pause();
            displaysongname.innerText= songs[songIndex-1].songName;
            songimage.src = `Covers/${songIndex}.jpeg`;
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');

        }
    })
})

//autoplay

//next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>3){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src= `Songs/${songIndex}.mp3`;
    displaysongname.innerText= songs[songIndex-1].songName;
    songimage.src = `Covers/${songIndex }.jpeg`;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

//previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<0){
        songIndex=4;
    }
    else{
        songIndex-=1;
    }
    audioElement.src= `Songs/${songIndex}.mp3`;
    displaysongname.innerText= songs[songIndex-1].songName;
    songimage.src = `Covers/${songIndex}.jpeg`;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

//shuffle

shuffle.addEventListener('click',()=>{
    songIndex=Math.floor(Math.random() * (5 - 1) + 1);
    audioElement.src= `Songs/${songIndex}.mp3`;
    displaysongname.innerText= songs[songIndex-1].songName;
    songimage.src = `Covers/${songIndex}.jpeg`;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

//loop
repeat.addEventListener('click',()=>{
    makeAllPlay();
    console.log(songIndex);
    let text = songIndex.toString();
    text= text.repeat(1);
    let songIndex1 = parseInt(songIndex);
    audioElement.src= `Songs/${songIndex1}.mp3`;
    displaysongname.innerText= songs[songIndex1-1].songName;
    songimage.src = `Covers/${songIndex}.jpeg`;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})

//mute
mute.addEventListener('click',()=>{
    if(audioElement.muted==false){
        audioElement.muted=true;
        mute.classList.remove('fa-volume-low');
        mute.classList.add('fa-volume-xmark');
}
else{
        audioElement.muted=false;
        mute.classList.remove('fa-volume-xmark');
        mute.classList.add('fa-volume-low');
    }
})

//song end
audioElement.addEventListener("ended",()=>{
    if(songIndex>3){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src= `Songs/${songIndex}.mp3`;
    displaysongname.innerText= songs[songIndex-1].songName;
    songimage.src = `Covers/${songIndex }.jpeg`;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
});