let disc = document.querySelector(".disc div");
let songName = document.querySelector(".song-name");
let artist = document.querySelector(".artist");
let songSlider = document.querySelector(".song-slider input");
let currentSec = document.querySelector(".current-time .sec").textContent;
let currentmin = document.querySelector(".current-time .minutes").textContent;
let Duration = document.querySelector(".duration");
let Minutes_duration = document.querySelector(".duration .durMin");
let Seconds_duration = document.querySelector(".duration .durSec");
let controls = document.querySelector(".controls").children;
let prevSong = controls[0];
let Play = controls[1];
let Pause = document.querySelector(".pause");
let nextSong = controls[3];
let volume = document.querySelector(".volume input");


let songs = [{
               name: "♪ Chinni Chinni Aasa ♫",
               artist: "A.R.Rahman",
               src: "Assets/Chinni Chinni Aasa.mp3",
               image: "url('Assets/Roja.jpg')"
               },
            {
                name:"♪ Jilibili Palukula ♫",
                artist: "Ilaiyaraaja",
                src: "Assets/Jilibili Palukula.mp3",
                image:"url('Assets/sitara.jpg')"
            },
            {
                name:"♪ Roja Roja ♫",
                artist: "A.R.Rahman",
                src: "Assets/Roja Roja.mp3",
                image:"url('Assets/roja-roja.jpg')"
            },
            {
                name:"♪ Naa Cheli Rojave ♫",
                artist: "A.R.Rahman",
                src: "Assets/Naa Cheli Rojave.mp3",
                image:"url('Assets/naa-cheli-rojave.jpg')"
            }];

//looping through the songs array using currSong variable
    let currSong = 0;
    let audio;
    let myInterval;

         audio = new Audio(songs[currSong].src);
         
//on clicking on the "play" icon
        Play.addEventListener("click",()=>{
            //wrapping the code in setTimeout,just to see the transition of icon in 0.5s
            setTimeout(()=>{
             audio.play();
             Pause.style.display = "flex";
             Play.style.display = "none";
        },200)
        //updating the song name
         songName.textContent = songs[currSong].name;
         songName.style.color = "#ffc87c";
        //updating the Artist name
        artist.textContent = songs[currSong].artist;
        artist.style.color = "#ffffff";
        artist.style.fontWeight = "900";
        //updating the disc
        disc.style.backgroundImage = songs[currSong].image;
        disc.style.backgroundSize = "cover";
        disc.style.backgroundPosition = "80% 0px";
        disc.style.backgroundRepeat = "no-repeat";
  
     myInterval = setInterval(()=>{
    currentSec++;
        if(currentSec==60){
            currentSec=0;
            currentmin++;
        }
        if(currentSec<10){
            currentSec = "0" + currentSec;
        }
        // Update the UI elements with the updated time values
        document.querySelector(".current-time .sec").textContent = currentSec;
        document.querySelector(".current-time .minutes").textContent = currentmin;

        
         // Update the slider position during playback
         audio.addEventListener("timeupdate", () => {
            let currentTimeinSeconds = audio.currentTime;
            let durationinSeconds = audio.duration;
            let progress = (currentTimeinSeconds/durationinSeconds)*100;
            songSlider.value = progress;
            
    
            if(audio.duration){
            //setting the duration time
            const durationMin = Math.floor(durationinSeconds / 60);
            const durationSec = Math.floor(durationinSeconds % 60);
            Minutes_duration.textContent = durationMin;
            Seconds_duration.textContent = durationSec;
            }
    
            // Check if audio playback is completed
            if (audio.ended) {
                clearInterval(myInterval);
                // Additional code to handle completion
                // For example, you might want to reset the slider and current time
                songSlider.value = 0;
                currentSec = 0;
                currentmin = 0;
              }
})
  },1000);
})
  


//on clicking on the "pause" icon
        Pause.addEventListener("click",()=>{
            setTimeout(()=>{
            audio.pause();
             Pause.style.display = "none";
             Play.style.display = "flex";
            },200)

            clearInterval(myInterval);
            })



//on clicking on "next-song" icon
        nextSong.addEventListener("click",()=>{
            songSlider.value = 0;
            currentmin="0";
            currentSec="00";

     // Increment currSong for the next iteration
        currSong++;
    // Stop the previous audio if it is playing
     if (audio) {
        audio.pause();
        }
        //if currSong value exceeds 3(last object of songs array),then set currSong to 0.so that,it'll play back from starting song
        if(currSong>3){
            currSong = 0;
           }
        //updating the song name  
        songName.textContent = songs[currSong].name;
        //updating the Artist name
        artist.textContent = songs[currSong].artist;
         //updating the disc
         disc.style.backgroundImage = songs[currSong].image;
         disc.style.backgroundSize = "cover";
         disc.style.backgroundPosition = "80% 0px";
         disc.style.backgroundRepeat = "no-repeat";

        // audio object of the next song
        audio = new Audio(songs[currSong].src);
         audio.play();
         
        })
    
    //on clicking on the "previous song" icon
    prevSong.addEventListener("click",()=>{
        songSlider.value = 0;
        currentmin="0";
        currentSec="00";

    // decrement currSong for the previous iteration
        currSong--;
    // Stop the previous audio if it is playing
    if (audio) {
        audio.pause();
        }
        //if currSong value is less than 0(first object of songs array),then set currSong to 3.so that,it'll play back from last song
        if(currSong<0){
            currSong = 3;
           }
        //updating the song name
        songName.textContent = songs[currSong].name;
        //updating the Artist name
        artist.textContent = songs[currSong].artist;
        //updating the disc
        disc.style.backgroundImage = songs[currSong].image;
        disc.style.backgroundSize = "cover";
        disc.style.backgroundPosition = "80% 0px";
        disc.style.backgroundRepeat = "no-repeat";
    audio = new Audio(songs[currSong].src);
    audio.play();
    })
    


// Update the audio playback position when the slider is clicked
songSlider.addEventListener("input",(event)=>{
    //sliderIsClicked = true;
    songSlider.max = audio.duration;
    const selectedTime = parseFloat(event.target.value);
    audio.currentTime = selectedTime;
    // Update the slider position
    songSlider.value = selectedTime;
    // Update the UI elements with the updated time values
    currentSec = Math.floor(selectedTime % 60) ;
    currentmin =  Math.floor(selectedTime / 60);
    
    
})


// Get the volume range input element
const volumeRange = document.getElementById('volumeRange');
// Add an event listener to the range input to detect changes
volumeRange.addEventListener('input', function () {
    audio.volume = volumeRange.value/100 ;
});
