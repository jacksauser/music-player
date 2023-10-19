// Create your global variables below:
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [];
var curr_vol = 0;
var curr_playback_time = 0;
var playing = null;

function init() {
	for (let i = 0; i < 6; i++){
		volLevels.push(document.getElementById("vl"+i))
	}

	for (let i = 0; i < 3; i++){
		volLevels[i].classList.toggle("toggle-vol-on")
		curr_vol = i
	}
};

function volUp() {
	if (curr_vol < 5){
		volLevels[curr_vol + 1].classList.toggle("toggle-vol-on")
		curr_vol = curr_vol + 1
	}
};

function volDown() {
	if (curr_vol >= 0){
		volLevels[curr_vol].classList.toggle("toggle-vol-on")
		curr_vol = curr_vol - 1
	}
};

function switchPlay() {
	let button = document.getElementById("middle-button-style")
	if (!playing){
		button.innerHTML = `<i class="material-icons">pause</i>`

		playing = setInterval(playingBar, 1000);
	} else {
		button.innerHTML = `<i class="material-icons">play_arrow</i>`
		clearInterval(playing)
		playing = null
	}
}

function playingBar(){
	let bar = document.getElementById("volume-bar");
	let time_elapsed = document.getElementById("time-elapsed");
	if ( curr_playback_time < 180) {
		curr_playback_time = curr_playback_time + 1
		bar.innerHTML = `<input type="range" value="${curr_playback_time}" min="0" max="180" class="time-slider"></input>`
		time_elapsed.innerHTML = secondsToMs(curr_playback_time)
	} else { 
		nextSong()
	}
	
}

function nextSong() {
	resetSong()

	let song_title_container = document.getElementById("player-artist-name");
	let song_name = song_title_container.textContent;
	
	const isSong = (e) => e === song_name;

	let song_index = tracklist.findIndex(isSong);
	let next_index = song_index + 1;

	if (song_index == tracklist.length - 1){
		next_index = 0
	}

	song_title_container.innerHTML = tracklist[next_index]

}



function resetSong(){
	let bar = document.getElementById("volume-bar");
	let time_elapsed = document.getElementById("time-elapsed");

	curr_playback_time = 0 

	bar.innerHTML = `<input type="range" value="${curr_playback_time}" min="0" max="180" class="time-slider"></input>`
	time_elapsed.innerHTML = secondsToMs(curr_playback_time)
}

function prevSong() {
	resetSong()

	let song_title_container = document.getElementById("player-artist-name");
	let song_name = song_title_container.textContent;
	
	const isSong = (e) => e === song_name;

	let song_index = tracklist.findIndex(isSong);
	let prev_index = song_index - 1;

	if (song_index == 0){
		prev_index = tracklist.length - 1
	}

	song_title_container.innerHTML = tracklist[prev_index]

}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();