console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songoct.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif'); 
let songInfo = document.querySelector('.songInfo');

let songs = [
    { songName: "We Fell in Love in October", filePath: "songoct.mp3", coverPath: "coveroct.jpg" },
    { songName: "This is what slow dancing feels like", filePath: "songslowdancing.mp3", coverPath: "coverslowdancing.jpg" },
    { songName: "Sweater Weather", filePath: "songsweater.mp3", coverPath: "coversweater.jpg" },
    { songName: "Wake Me up When September Ends", filePath: "songseptends.mp3", coverPath: "coverseotends.jpg" },
    { songName: "Stubborn Love", filePath: "songstub.mp3", coverPath: "coverstub.jpg" },
    { songName: "Home", filePath: "songhome.mp3", coverPath: "coverhome.jpg" },
    { songName: "Somewhere Only we Know", filePath: "songsomewhere.mp3", coverPath: "coversomewhere.jpg" },
    { songName: "Viva la Vida", filePath: "songvivalavida.mp3", coverPath: "covervivalavida.jpg" },
    { songName: "Tek it", filePath: "songtekit.mp3", coverPath: "covertekit.jpg" },
    { songName: "Make You Mine", filePath: "songmakeumine.mp3", coverPath: "covermakeumine.jpg" },
    { songName: "Cigarette Daydreams", filePath: "songcig.mp3", coverPath: "covercig.jpg" },
];

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1; 
        songInfo.innerText = songs[songIndex].songName;  
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0; 
    }
});

audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

document.querySelectorAll('.songItemPlay').forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;  
        } else {
            makeAllPlays();
            songIndex = index;
            audioElement.src = songs[index].filePath;
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            songInfo.innerText = songs[index].songName;  
            gif.style.opacity = 1;  
        }
    });
});

document.querySelector('.fa-forward').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;  
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    songInfo.innerText = songs[songIndex].songName;  
    gif.style.opacity = 1;  
});

document.querySelector('.fa-backward').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; 
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    songInfo.innerText = songs[songIndex].songName; 
    gif.style.opacity = 1;  
});
