const musicContainer = document.querySelector(".music-container")
const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")
const prevBtn = document.querySelector("#prev")
const audio = document.querySelector("#audio")
const progressContainer = document.querySelector(".progress-container")
const progress = document.querySelector(".progress")
const title = document.querySelector("#title")
const cover = document.querySelector("#cover")

// song title
const songs = ['10000', 'alyson', 'nothing', 'love']

// keep track of song 
let songIndex = 0

// initially load songs 
loadSongs(songs[songIndex]);


// update song details functions

function loadSongs(song){
	title.innerText = song

	audio.src = `music/${song}.mp3`
	cover.src = `images/${song}.jpg`
}
function playSong(){
	musicContainer.classList.add('play')
	playBtn.querySelector('i.fas').classList.remove("fa-play")
	playBtn.querySelector('i.fas').classList.add("fa-pause")
	audio.play()
}
function pauseSong(){
	musicContainer.classList.remove('play')
	playBtn.querySelector('i.fas').classList.add('fa-play')
	playBtn.querySelector('i.fas').classList.remove('fa-pause')
	audio.pause()
}


function prevSong(){
	songIndex--

	if(songIndex < 0){
		songIndex = 0
	}
	loadSongs(songs[songIndex])
	playSong()
}

function nextSong(){
	songIndex++
	if(songIndex > songIndex.length -1){
		songIndex = songIndex.length -1
	}
	loadSongs(songs[songIndex])
	playSong()
}

function updateProgress(e) {
	console.log(e.srcElement.duration)
	console.log(e.srcElement.currentTime)

	const { duration, currentTime} = e.srcElement 
	const progressPercent = ( currentTime / duration) * 100

	progress.style.width = `${progressPercent}%`
}

function setProgress(e){
	const width = this.clientWidth //this gets the width of the progresscontainer
	const clientX = e.offsetX //this will move the 
	
	const duration = audio.duration

	audio.currentTime = (clientX * width) * duration
}

// add event listeners
playBtn.addEventListener('click', ()=> {
	const isPlaying = musicContainer.classList.contains('play')
	if(isPlaying){
		pauseSong()
	}else{
		playSong()
	}
})

// change songs events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
progressContainer.addEventListener("click",  setProgress)

audio.addEventListener('timeupdate', updateProgress)

audio.addEventListener('ended', nextSong)