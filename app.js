const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const shuffleBtn = document.querySelector("#shuffle");
const repeatBtn = document.querySelector("#repeat");
const progressBar = document.getElementById("progress-bar");
const playlist = document.getElementById("playlist");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");

let audio = new Audio();
let isPlaying = false;
let isOnShuffle = false;
let isOnRepeat = false;
let currentTrackIndex = 0;

const tracks = [
  {
    title: "Pehle bhi main",
    artist: "Vishal Mishra",
    src: "./Assets/ANIMAL_Pehle_Bhi_Main_Full_Video____Ranbir_Kapoor,Tripti_Dimri__Sandeep_V__Vishal_M,Raj_S__Bhushan_K(256k).mp3",
  },
  {
    title: "Chand Sifarish",
    artist: "Prasoon Joshi",
    src: "./Assets/Chand_Sifarish___Full_Song___Fanaa___Aamir_Khan,_Kajol___Shaan,_Kailash_Kher___Jatin-Lalit___Prasoon(256k).mp3",
  },
  {
    title: "Dil to bacha ha ji",
    artist: "Gulzar",
    src: "./Assets/LYRICALLY__Dil_Toh_Bachcha_Hai_Ji_lyrics___Ishqiya___naseeruddin_shah___Vidya_Balan___Gulzar___Rahat(256k).mp3",
  },
  {
    title: "Meri Mehbooba",
    artist: "Anand Bakshi",
    src: "./Assets/Meri_Mehbooba___Kumar_Sanu___Alka_Yagnik___Pardes__1997____Shahrukh_Khan___Mahima(256k).mp3",
  },
];

const loadTracks = (index) => {
  audio.src = tracks[index].src;
  trackTitle.innerText = tracks[index].title;
  trackArtist.innerText = `By ${tracks[index].artist}`;
};

const playSong = () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
  }
};

const pauseSong = () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
  }
};

const playPreviousSong = () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTracks(currentTrackIndex);
  audio.play();
  isPlaying = true;
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline";
};

const playNextSong = () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTracks(currentTrackIndex);
  audio.play();
  isPlaying = true;
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline";
};

const shuffleSongs = () => {
  isOnShuffle = !isOnShuffle;
  shuffleBtn.classList.toggle("active", isOnShuffle);
};

const repeatSongs = () => {
  isOnRepeat = !isOnRepeat;
  repeatBtn.classList.toggle("active", isOnRepeat);
  audio.loop = isOnRepeat;
};

playBtn.addEventListener("click", (evt) => {
  playSong();
});

pauseBtn.addEventListener("click", (evt) => {
  pauseSong();
});

prevBtn.addEventListener("click", (evt) => {
  playPreviousSong();
});

nextBtn.addEventListener("click", (evt) => {
  playNextSong();
});

shuffleBtn.addEventListener("click", (evt) => {
  shuffleSongs();
});

repeatBtn.addEventListener("click", (evt) => {
  repeatSongs();
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

loadTracks(currentTrackIndex);
