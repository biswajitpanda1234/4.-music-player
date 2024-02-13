//to play music must give an event and that event is must not be wheel
// to wait for duration  load must be wait for loading metadata of song
//Always remember that before start new setInterval remove old one.
//.hasOwnProperty function of filter funcion
console.log("If there is some error is come on music loading please check host address and url address must be same")
const playlist = document.querySelector(".playlist");
const playlistSec = document.querySelector(".playlist_sec");
let maxCounter = 0;
let counter = 0;
let width;
// no of element visible  in the playlist row


let swiperWrapper = document.querySelector(".swiper-wrapper");
let swiperContainer = document.querySelector(".swiper");
let play = document.querySelector(".ri-play-circle-line");
let pause = document.querySelector(".ri-pause-circle-line");
// slide in leftside
let currentAudio;
let myFavSong = [];  // use to store fav song
let currentmin;
let currentSec;
let currentminStr;
let currentSecStr;
let myInterval;

playlist.addEventListener("wheel", (event) => {
  width = document.querySelector(".demo").offsetWidth;
  let noofvisibleEle = playlist.offsetWidth / width;
  if (event.deltaY > 0 && counter <= Math.ceil(maxCounter - noofvisibleEle)) {
    for (let i of playlist.querySelectorAll(".demo")) {
      i.style.transform = `translateX(-${width * counter}px)`;
    }
    counter++;
  }
  event.preventDefault();
});
//slide in right side
playlist.addEventListener("wheel", (event) => {
  if (event.deltaY < 0 && counter >= 0) {
    for (let i of playlist.querySelectorAll(".demo")) {
      i.style.transform = `translateX(-${width * counter}px)`;
    }
    counter--;
  }
  event.preventDefault();
});
//create bollywood cards
function createBollywoodCard(title) {
  let div = document.createElement("div");
  div.className = "demo";
  div.innerHTML = `
                        <div class="container">
                            <div class="card_container">
                                <img src="images/OIP.jpeg" alt="image" />
                            </div>
                            <div class="overflow height_h2">
                                <h3>${title}</h3>
                            </div>
                            <div class="overflow height_p">
                                <p>artist name </p>
                            </div>

                            <div class="play"><i class="ri-play-mini-fill"></i></div>
                        </div>
  `;
  playlist.appendChild(div);
  maxCounter++;
  // calling card event fuction after card creation
}

// Get all the names and attributes from bollywood song folder
async function bollywoodSong() {
  let data = await fetch("http://127.0.0.1:5502/bollywood songs/");

  let response = await data.text();

  // Now here we see this response give us html elment and we cant't access it directly so we inject it inside a div tag;
  let div = document.createElement("div");
  div.innerHTML = response;


  let li = div.querySelectorAll("li");
  li.forEach((ele, index) => {
    if (index !== 0) {
      // let v = div.querySelector("#files").querySelector(".icon-directory").querySelector(".name");

      // let style = getComputedStyle(v);
      // // console.log(style
      // let bgImage = style.backgroundImage;
      // console.log (bgImage)

      let title = ele.querySelector("a").title;

      createBollywoodCard(title);
    }
  });
}

// card events for music play

playlist.addEventListener("mousemove", () => {
  let demo = document.querySelectorAll(".demo");
  for (let i of demo) {
    i.onclick = (event) => {
      let songName = i
        .querySelector(".container")
        .querySelector("h3").innerHTML;
      if (currentAudio) {
        currentAudio.remove();
        currentAudio.pause();
      }
      currentAudio = new Audio(`./bollywood songs/${songName}`);
      audioController(currentAudio, songName);
    };
  }
});

// code for latest song section
//to create international sec cards
function createinternationalCard(title) {
  let div = document.createElement("div");
  div.className = "swiper-slide";
  div.innerHTML = `
  <div class="container">
                                <div class="card_container">
                                    <img src="images/OIP.jpeg" alt="image" />
                                </div>
                                <div class="overflow height_h2">
                                    <h3>${title}</h3>
                                </div>
                                <div class="overflow height_p">
                                    <p>artist name fsdfd fdsfd sfds bcbvbvc</p>
                                </div>

                                <div class="play"><i class="ri-play-mini-fill"></i></div>
                            </div>
`;

  swiperWrapper.appendChild(div);
}
//Event for play international song
swiperContainer.addEventListener("mousemove", () => {
  let swiperSlide = document.querySelectorAll(".swiper-slide");
  for (let i of swiperSlide) {
    i.onclick = (event) => {
      let songName = i
        .querySelector(".container")
        .querySelector("h3").innerHTML;

      if (currentAudio) {
        currentAudio.remove();
        currentAudio.pause();
      }
      currentAudio = new Audio(`./international songs/${songName}`);
      // currentAudio.loop = true;
      audioController(currentAudio, songName);
    };
  }
});

async function internationalSong() {
  let data = await fetch("http://127.0.0.1:5502/international songs");

  let response = await data.text();

  // Now here we see this response give us html elment and we cant't access it directly so we inject it inside a div tag;
  let div = document.createElement("div");
  div.innerHTML = response;

  let li = div.querySelectorAll("li");
  li.forEach((ele, index) => {
    if (index !== 0) {
      let title = ele.querySelector("a").title;
      createinternationalCard(title);
    }
  });
}

window.onload = () => {
  bollywoodSong();
  internationalSong();
};

// work with footer section

// create footer image section

function createFooterImg(songName) {
  let footerImg = document.querySelector(".footer_img");
  footerImg.innerHTML = `
  <img src="images/OIP.jpeg" alt="">
            <div >
                <div >
                    <h3>${songName}</h3>
                </div>
                <div >
                    <p>artist dsad da da ada ada asdas</p>
                </div>
            </div>
            <i class="ri-heart-line font_size absolute" style=" right: 0;" onclick=like()></i>
            <i class="ri-heart-fill font_size absolute selected" style=" right: 0; display: none;" onclick=dislike()></i>
  `;
}
// create my favourite playlist

function addFavSong() {
  document.querySelector(".fav-song-container").innerHTML = "";
  myFavSong.forEach((element) => {
    // console.log(element)
    
    for (let i in element) {
      // console.log(i)// ye hame song ka name de raha hai and 
      // console.log(element[i])  // ye hame song ka address de raha hai
      let it = i.replace(/%20/g, " ")
      let div = document.createElement("div")
      div.className = "fav-song flex ";
      div.innerHTML = `
      <img src="images/OIP.jpeg" alt=""> 
                    <div >${it}</div>
                    <div style="display:none" >${element[i]}</div>
                    <i class="ri-close-line" style="font-size:1.5em ; display:none" onclick="removeFavList(event)"></i>
                    
      `
       document.querySelector(".fav-song-container").appendChild(div);
      
    }
    
  })

  

  let favSong = document.querySelectorAll(".fav-song")
      favSong.forEach((ele) => {
        
        ele.onclick = (event) => {
          let favSongName = ele.querySelector("div").innerHTML;
          favSongName = favSongName.replace(/%20/g, " ")
          // console.log(ele.getElementsByTagName("div")[1].innerHTML);
          let favSongSrc = ele.getElementsByTagName("div")[1].innerHTML;
          let index = favSongSrc.lastIndexOf("/", favSongSrc.lastIndexOf("/") - 1);
          favSongSrc = favSongSrc.slice(index + 1);
          favSongSrc = favSongSrc.replace(/%20/g, " ")
          if (currentAudio) {
            currentAudio.remove();
            currentAudio.pause();
          }
          currentAudio = new Audio(`./${favSongSrc}`);
          audioController(currentAudio, favSongName);
        }
      })
}

// to remove from fav list
document.querySelector("body").addEventListener("dblclick",()=>{myFavSong.forEach((element)=>{
  console.log(element)
})})
function removeFavList(e) {
  let deleteSongName = e.target.parentNode.querySelector("div").innerHTML; // give us name of deleted song
  
  myFavSong = myFavSong.filter(obj => !obj.hasOwnProperty(deleteSongName)) // VVI
  addFavSong();
}

// show fav song container

function showFavSongContainer(){
  document.querySelector(".fav-song-container").style.display="block";
  document.querySelector("#createplaylist").style.display="none";
  document.querySelector("#letfind").style.display="none";
  document.querySelector("#show").style.display="none";
  document.querySelector("#hide").style.display="inline";
  
}
function hideFavSongContainer(){
  document.querySelector(".fav-song-container").style.display="none";
  document.querySelector("#createplaylist").style.display="block";
  document.querySelector("#letfind").style.display="block";
  document.querySelector("#show").style.display="inline";
  document.querySelector("#hide").style.display="none";
  
}

// like dislike event
function like() {
  let likeHeart = document.querySelector(".ri-heart-fill");
  let dislikeHeart = document.querySelector(".ri-heart-line");
  dislikeHeart.style.display = "none";
  likeHeart.style.display = "inline";
  // console.log(currentAudio)
  let src = currentAudio.src;
  // console.log(src)
  let key = src.slice(src.lastIndexOf("/") + 1);
  // console.log(key)
  // console.log({key : src}) // ye technique nahin chalega
  let obj = {};       //use this one
  obj[key] = src;
  // console.log(obj)
  myFavSong.push(obj);
  addFavSong()
}
function dislike() {
  let likeHeart = document.querySelector(".ri-heart-fill");
  let dislikeHeart = document.querySelector(".ri-heart-line");
  dislikeHeart.style.display = "inline";
  likeHeart.style.display = "none";
}

// controller section

//pause button event
pause.addEventListener("click", (event) => {
  currentAudio.pause();
  play.classList.remove("none");
  pause.classList.add("none");
});
//play button event
play.addEventListener("click", (event) => {
  currentAudio.play();
  play.classList.add("none");
  pause.classList.remove("none");
});

// duration of audio
function audioController(currentAudio, songName) {

  currentAudio.addEventListener("loadedmetadata", function () {

    currentAudio.play();
    createFooterImg(songName);
    play.classList.add("none");
    pause.classList.remove("none");
    // The metadata has been loaded
    let duration = currentAudio.duration; // Get the duration property

    let durationmin = Math.floor(duration / 60);

    let durationSec = Math.floor(duration % 60);

    // console.log(currentAudio.currentTime )
    // insert duration in webpage
    let durationSlider = document.querySelector(".duration-slider");
    let durationminStr = durationmin.toString().padStart(2, "0");
    let durationSecStr = durationSec.toString().padStart(2, "0");
    // Display the strings in the duration slider

    durationSlider.getElementsByTagName("p")[1].innerHTML = `${durationminStr}:${durationSecStr}`;

    // duration event
    let durationBar = document.getElementById("duration");
    clearInterval(myInterval);// ye 2 ghanta khaya hai
    myInterval = setInterval(() => {
      currentmin = Math.floor(currentAudio.currentTime / 60);
      currentSec = Math.floor(currentAudio.currentTime % 60);

      // duration  slider
      function durationSliderTimer(currentmin, currentSec,) {

        // Convert the numbers to strings and pad them with zeros if needed
        currentminStr = currentmin.toString().padStart(2, "0"); //ye funtion 2 digit nahin hua to 0 add kar dega
        currentSecStr = currentSec.toString().padStart(2, "0");

        durationSlider.querySelector("p").innerHTML = `${currentminStr}:${currentSecStr}`;
        durationBar.value = (currentAudio.currentTime / currentAudio.duration) * 100;
        // duration change using input range
        durationBar.addEventListener("change", () => {
          currentAudio.currentTime = (durationBar.value * currentAudio.duration) / 100
        })
      }

      durationSliderTimer(currentmin, currentSec);
    }, 1000);
  });

}

// Deal with volume
// Here we use input event instead of change because change only fire when user interact but input fire always with or withought user interact
volume.addEventListener("input", (event) => {
  console.log(((volume.value / 100).toFixed(1)))
  currentAudio.volume = (volume.value / 100).toFixed(1);
})
let mute = document.querySelector(".ri-volume-mute-line");
mute.addEventListener("click", () => {
  currentAudio.volume = 0;
  volume.value = 0;
})

// hamberger rotational effect

let hamberger = document.getElementById("hamberger")
hamberger.addEventListener("click", () => {
  console.log('dfs')
  hamberger.classList.toggle("rotate");
  let leftSide = document.querySelector(".left_side");
  leftSide.classList.toggle("left_side_hover");

})

