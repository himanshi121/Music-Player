$(document).ready(function(){
var audioPlayer =document.getElementById('audio-player')
var sw=document.getElementById('songs-wrapper');
var play=document.getElementById('play');
var previous=document.getElementById('back');
var next=document.getElementById('next');
var shuffle=document.getElementById('shuffle');
var repeat=document.getElementById('repeat');
var songcard= document.getElementById('song-card');
var progress= document.getElementById('progress');
let songIsPlaying = false;
var indexTrack=0;

play.addEventListener("click", justPlay);
next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);

repeat.addEventListener('click', function(){
    audioPlayer.currentTime = 0
})
audioPlayer.addEventListener('timeupdate', function(){
    console.log(progress.style)
    progress.style.width = (audioPlayer.currentTime/audioPlayer.duration)*100 + '%'
})

function justPlay() {
    if (songIsPlaying == false) {
      playSong();
    } else {
      pauseSong();
    }
  }
  
  // Play Song
  function playSong() {
    audioPlayer.play();
    songIsPlaying = true;
    play.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
  }
  
  // Pause Song
  function pauseSong() {
    audioPlayer.pause();
    songIsPlaying = false;
    play.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
  }

  // Next song
   function nextSong() {
    if (indexTrack < res.length - 1) {
      indexTrack++;
      loadTrack(indexTrack);
      playSong();
    } else {
      indexTrack = 0;
      loadTrack(indexTrack);
      playSong();
    }
  }
  
  // prev song
  function prevSong() {
    if (indexTrack > 0) {
      indexTrack--;
      loadTrack(indexTrack);
      playSong();
    } else {
      indexTrack = res.length - 1;
      loadTrack(indexTrack);
      playSong();
    }
  }
  
  
function loadTrack(indexTrack){
    $.get("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist",function(res){

    var data= res[indexTrack];
    // songcard.innerHTML
    var sc= `
    <div id="audio-wrapper">
     <div id="song-image">
         <img id="image" src=${data.albumCover} alt="album-cover">
     </div>
     <div id="audio-player">
         <audio >
         <source src=${data.file} type="audio/mp3"></audio>
     </div>
     <div id="progress-bar">
         <div id="progress">

         </div>

     </div>
     <div id="icons">
         <div class="icn" id="shuffle"><i class="fa-solid fa-shuffle"></i></div>
         <div class="icn" id="back"><i  class="fa-solid fa-backward-step"></i></div>
         <div class="icn" id="play"><i class="fa-regular fa-circle-play"></i></div>
         <div class="icn" id="next"><i class="fa-solid fa-forward-step"></i></div>
         <div class="icn" id="repeat"><i class="fa-solid fa-rotate-left"></i></div>
         
     </div>

     <div id="song-track">${data.track}</div>
     <div id="song-artist">${data.artist}</div>
     </div>
     `

     songcard.append(sc)
 })
}
// onclick='currentsong(${i+1})'
    $.get("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist",function(res){
        for(var i=0;i<res.length;i++){
            sw.innerHTML+=
            `
            <div id="card${i+1}" class="song-card" >
                <div id="songimg">
                     <img id="simage" src=${res[i].albumCover} alt="album-cover ">
                </div>
                <div id="song-info">
                     <div id="song-track1">${res[i].track}</div>
                     <div id="song-artist1">${res[i].artist}</div>
                </div>
            </div>
            <div id="hr"><hr></div>
         
            ` 
        }      
      
    })

    
})

