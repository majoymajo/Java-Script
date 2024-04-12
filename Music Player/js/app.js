$(document).ready(function () {
    $("#login").click(function () {
        // Hide the login button
        $(this).hide();

        // Show the login form
        $(".login-form").show();
        $("#logout").click(function () {
            logout(); // Call the logout function when the logout button is clicked
        });
    });
    displayLists();
    $("#example-search-button").click(function(){
        var name = $("#example-search-input").val();
        var songName = name.split("-")
        $(".songImage").attr("src",songImages[name])
        $(".song-title").text(songName[0])
        $(".artist-title").text(songName[1]);
    })
    var mainAudio = new Audio();
    $(".playSong").click(function(){
        var name = $("#example-search-input").val();
        var playIcon = $(this).find("i").attr("class");
        if (playIcon === "fas fa-play"){
            mainAudio = new Audio(`music/${name}.mp3`);
            mainAudio.play();
            $(this).find("i").removeClass('fa-play').addClass('fa-pause');
        }else{
            mainAudio.pause();
            $(this).find("i").removeClass('fa-pause').addClass('fa-play');
        }
        mainAudio.addEventListener('timeupdate', function() {
            const progress = (mainAudio.currentTime / mainAudio.duration) * 100;
            $(".track div").css({width : `${progress}%`})       

        });
    })
  
});



function validateCredentials(event) {
    event.preventDefault(); // Prevent form from submitting
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessageDiv = document.getElementById('loginMessage');
    const invalidLoginMessageDiv = document.getElementById('invalidLoginMessage'); // Correctly define this variable

    if (username === 'Majo Castro' && password === 'Music Player') {
        $(".login-form").hide();
        loginMessageDiv.style.display = 'block';
        loginMessageDiv.textContent = 'Login successful';
        $("#logout").show();

        setTimeout(function () {
            loginMessageDiv.style.display = 'none';
        }, 3000); // Hide the success message after 3 seconds
    } else {
        invalidLoginMessageDiv.style.display = 'block'; // Show invalid login message
        invalidLoginMessageDiv.textContent = 'Invalid username or password';

        setTimeout(function () {
            invalidLoginMessageDiv.style.display = 'none';
        }, 3000); // Hide the invalid login message after 3 seconds
    }
}

function logout() {
    $("#logout").hide(); // Hide the logout button
    $("#login").show(); // Show the login button again
    $(".login-form").hide(); // Optional: Hide the login form if it's visible
    // Optionally reset the form or clear any sensitive information
    $("#username").val('');
    $("#password").val('');
    // Any other cleanup you want to do on logout
}


const song_list = [
    "Apache 200 kmh",
    "Dream On - Aerosmith",
    "Wien - Mayberg",
    "Kill em with Kindness - Selena Gomez",
    "Slow Down - Selena Gomez",
    "Morad - Bzrp",
    "God´s Plan-Drake",
    "Fair Trade-Drake",
    "Non Stop-Drake",
    "Gimme!Gimme!Gimme!-ABBA",
    "I was made for lovin´you -KISS",
    "Be Mine-Offenbach",
    "Temperature-Sean Paul",
    "Pon de Replay-Rihanna",
    "Young,Wild & Free-Snoop Dog",
    "Unforgettable-French Montana",
    "High Enough-K.Flay",
    "Bajo el mismo Sol-Alvaro Soler",
    "Sexy Bitch-David Guetta",
    "Memories-David Guetta",
    "I think I like it-Fake Blood",
    "No Lie-Sean Paul",
    "Hotline Bling-Drake",
    "Joro-Wizkid",
    "Roller-Apache",
    "Radioactive-Imagine Dragons",
    "Counting Stars-One Republic",
    "Centuries-Fall Out Boy",
    "The Time-Black Eyed Peas",
    "Pursuit of happiness-Steve Aoki"
];

function showSuggestions(inputText) {
    let suggestionBox = document.getElementById('suggestion-box');
    if (!inputText) {
        suggestionBox.innerHTML = '';
        return;
    }

    let matches = song_list.filter(suggestion => {
        return suggestion.toLowerCase().includes(inputText.toLowerCase());
    });

    if (matches.length > 0) {
        suggestionBox.innerHTML = matches.map(match => `<div style="padding: 10px; cursor: pointer;" onclick="selectSuggestion('${match}')">${match}</div>`).join('');
    } else {
        suggestionBox.innerHTML = '<div style="padding: 10px;">No suggestions found</div>';
    }
}

function selectSuggestion(value){
    document.getElementById('example-search-input').value = value;
    document.getElementById('suggestion-box').innerHTML = '';
}

// Sort the song list alphabetically
song_list.sort();

;

// const myFavourites = [
// "Apache 200 kmh",
// "Dream On - Aerosmith",
// "Wien - Mayberg",
// "Kill em with Kindness - Selena Gomez",
// "Slow Down - Selena Gomez",
// "Morad - Bzrp",
// "God´s Plan-Drake",
// "Fair Trade-Drake",
// "Non Stop-Drake",
// "Gimme!Gimme!Gimme!-ABBA",
// ];

function displayLists() {
    displayList('search-results', song_list);
}

function playMusic(audio, playIcon){
    const $listItem = $(playIcon).closest('li');

    $('audio').each(function () {
        if (this !== audio && !this.paused){
            this.pause();
            const associatedPlayIcon = $(this).closest('li').find('.fa-pause');
            if (associatedPlayIcon.length){
                associatedPlayIcon.removeClass('fa-pause').addClass('fa fa-play');
            }
        }
    });

    // Play or pause the clicked audio
    if (audio.paused) {
        audio.play();
        $(playIcon).removeClass('fa-play').addClass('fa fa-pause');
        $(playIcon).children().remove();
    } else{
        audio.pause();
        $(playIcon).removeClass('fa-pause').addClass('fa fa-play');
    }
}

function displayList(listId, songs) {
    const $listElement = $('#' + listId);
    $listElement.empty(); // Clear existing list items

    $.each(songs, function (index, song) {
        const $listItem = $('<li></li>').css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
        });

        const $songName = $('<span></span>').text(song).addClass('song-name').css({
            flexGrow: '1'
        });

        const $playIconSpan = $('<span><i class="fa fa-play" aria-hidden="true"></i></span>').css({
            flexShrink: '0'
        });

        const $heartIconSpan = $(`<span data-song="${song}" onclick=addToFav($(this))><i class="fa fa-heart" aria-hidden="true"></i></span>`).css({
            flexShrink: '0'
        });

        $listItem.append($songName, $playIconSpan, $heartIconSpan);

        if (listId === 'my-playlist') {
            const $trashIconSpan = $(`<span data-song="${song}" onclick=remove($(this))><i class="fas fa-trash-alt"></i></span>`).css({
                flexShrink: '0'
            });

            $listItem.append($trashIconSpan);
        }

        if (listId === 'search-results') {
            const $audio = new Audio(`music/${song}.mp3`);
            $audio.preload = 'auto';
            $listItem.data('audio', $audio); // Store the audio element in the <li> element

            const $plusIconSpan = $(`<span data-song="${song}" onclick=addToPlaylist($(this))><i class="fa-solid fa-plus"></i></span>`).css({
                flexShrink: '0'
            });

            $listItem.append($plusIconSpan);

        $listElement.append($listItem);
        
            // Add click event handler for the plus icon in search results
            $plusIconSpan.on("click", function () {
                const clickedSong = $listItem.find('span:eq(1)').text();
                // Check if the song is not already in myFavourites
                if (!myFavourites.includes(clickedSong)) {
                    // Add the song to myFavourites
                    myFavourites.push(clickedSong);
                    displayLists();
                    showAddedToFavoritesMessage();
                }
            });               
        } else if (listId === 'my-favourites') {
            const $minusIconSpan = $(`<span data-song="${song}" onclick=removeFromFavorites($(this))><i class="fa fa-minus" aria-hidden="true"></i></span>`).css({
                flexShrink: '0'
            });
            
            $listItem.append($minusIconSpan);

            // Add click event handler for the minus icon in my-favourites
            $minusIconSpan.on("click", function () {
                const clickedSong = $listItem.find('span:eq(1)').text(); // Update this line
                const songIndex = myFavourites.indexOf(clickedSong);

                if (songIndex !== -1) {
                    // Remove the song from my-favourites
                    myFavourites.splice(songIndex, 1);
                    // Update the displayed lists
                    displayLists();
                }
            });
        }

        const encodedFileName = encodeURIComponent(song.replace(' ', '_'));
        const audio = new Audio(`music/${song}.mp3`);

        $playIconSpan.on("click", function () {
            playMusic(audio, $playIconSpan);
        });

        $listElement.append($listItem);
    });
}

function showAddedToPlaylistMessage() {
    const messageDiv = document.getElementById('addedToPlaylistMessage');
    messageDiv.style.display = 'block';
    messageDiv.textContent = 'Added to My Playlist';

    setTimeout(function () {
        messageDiv.style.display = 'none';
    }, 4000); // Hide the message after 4 seconds
}
var myFavourites = [];
var myPlaylist = [];

function addToFav(song) {
    var songName = $(song).attr("data-song")

    // Check if the song is already in myFavourites
    if (!myFavourites.includes(songName)) {
        // Add the song to myFavourites
        myFavourites.push(songName);
        displayList('my-favourites', myFavourites);
    }
}

function addToPlaylist(song) {
    var songName = $(song).attr("data-song");

    // Check if the song is not already in myPlaylist
    if (!myPlaylist.includes(songName)) {
        // Add the song to myPlaylist
        myPlaylist.push(songName);
        displayList('my-playlist', myPlaylist);
        showAddedToPlaylistMessage(); // Show the message for adding to playlist
    }
}
function remove(song) {
    var songName = $(song).attr("data-song");
    var songIndex = myPlaylist.indexOf(songName);

    if (songIndex !== -1) {
        myPlaylist.splice(songIndex, 1);
        displayList('my-playlist', myPlaylist);
    }
}
function removeFromFavorites(song) {
    var songName = $(song).attr("data-song");
    var songIndex = myFavourites.indexOf(songName);

    if (songIndex !== -1) {
        myFavourites.splice(songIndex, 1);
        displayList('my-favourites', myFavourites);
    }
}
const songImages = {
    "Apache 200 kmh": "https://i.ytimg.com/vi/GoFfNGhdY0k/maxresdefault.jpg",
    "Dream On - Aerosmith": "https://i.scdn.co/image/ab67616d0000b273b11078ee23dcd99e085ac33e",
    "Wien - Mayberg": "https://www.laut.de/Mayberg/mayberg-217274.jpg",
    "Kill em with Kindness - Selena Gomez": "https://3fc4ed44-3fbc-419a-97a1-a29742511391.selcdn.net/coub_storage/coub/simple/cw_timeline_pic/7efb2343003/47178333403214027b4de/1506102089_image.jpg",
    "Slow Down - Selena Gomez": "https://cdn01.justjared.com/wp-content/uploads/2013/08/gomez-video/selena-gomez-slow-down-music-video-pics-18.JPG",
    "Morad - Bzrp": "https://viapais.com.ar/resizer/kRlAXYm8DIFnShsLTgC-4AZpPuk=/980x640/smart/filters:quality(75):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/35PD75HHZ5CPLPGCSI3RMIFMYM.jpg",
    "God´s Plan-Drake": "https://pbs.twimg.com/media/EsFvPrgXIAAvO9f.jpg:large",
    "Fair Trade-Drake":"https://i.ytimg.com/vi/THVbtGqEO1o/maxresdefault.jpg",
    "Non Stop-Drake":"https://i1.sndcdn.com/artworks-xxcv2noL5RYv-0-t500x500.jpg",
    "Gimme!Gimme!Gimme!-ABBA": "https://i.ytimg.com/vi/XEjLoHdbVeE/maxresdefault.jpg",
    "I was made for lovin´you -KISS": "https://i.scdn.co/image/ab67616d0000b2734384b6976cadaec272114022",
    "Be Mine-Offenbach":"https://upload.wikimedia.org/wikipedia/en/5/5a/Be_Mine_Ofenbach_Cover.jpg",
    "Temperature-Sean Paul":"https://c.saavncdn.com/860/The-Trinity-English-2005-20190607045406-500x500.jpg",
    "Pon de Replay-Rihanna":"https://pbs.twimg.com/media/EYylTgIWAAAuJQ4.jpg:large",
    "Young,Wild & Free-Snoop Dog": "https://www.rap-up.com/wp-content/uploads/2011/11/snoop-wiz-ywf.jpg",
    "Unforgettable-French Montana": "https://i.scdn.co/image/ab67616d0000b2738a31195a371b2233456f6c07",
    "High Enough-K.Flay":"https://i1.sndcdn.com/artworks-F4FE5iqVPWhs-0-t500x500.jpg",
    "Bajo el mismo Sol-Alvaro Soler":"https://pop100.es/wp-content/uploads/2022/03/portada_bajo-el-mismo-sol_alvaro-soler_202202091209-scaled-e1646236214610.jpg",
    "Sexy Bitch-David Guetta":"https://i.ytimg.com/vi/mIIN_SGQy9c/maxresdefault.jpg",
    "Memories-David Guetta":"https://upload.wikimedia.org/wikipedia/en/4/47/David_Guetta_featuring_Kid_Cudi_-_Memories.png",
    "I think I like it-Fake Blood":"https://i.ytimg.com/vi/l4TnIt3Rwug/maxresdefault.jpg",
    "No Lie-Sean Paul":"https://upload.wikimedia.org/wikipedia/en/d/de/Sean_Paul_ft_Dua_Lipa_-_No_lie.jpg",
    "Hotline Bling-Drake":"https://i.ytimg.com/vi/uxpDa-c-4Mc/maxresdefault.jpg",
    "Joro-Wizkid":"https://thenativemag.com/wp-content/uploads/2019/10/Screen-Shot-2019-10-04-at-13.44.24.png",
    "Roller-Apache":"https://upload.wikimedia.org/wikipedia/en/1/14/Apache_207_-_Roller.png",
    "Radioactive-Imagine Dragons":"https://i.pinimg.com/originals/2b/c4/27/2bc427d0c83c133448251a8ab1ecb8d8.jpg",
    "Counting Stars-One Republic":"https://i.scdn.co/image/ab67616d0000b2739e2f95ae77cf436017ada9cb",
    "Centuries-Fall Out Boy":"https://upload.wikimedia.org/wikipedia/en/7/78/FallOutBoy-Centuries.png",
    "The Time-Black Eyed Peas":"https://i.scdn.co/image/ab67616d0000b2734cb6f9960e9b5bce7e1babc0",
    "Pursuit of happiness-Steve Aoki":"https://i.scdn.co/image/ab67616d0000b273fe7908b7666690bf4e83ce14",
};
