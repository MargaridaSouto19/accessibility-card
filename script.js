// --------------- Text size --------------- //

let small = document.getElementById("smallText");
let normal = document.getElementById("mediumText");
let big = document.getElementById("bigText");

let title = document.querySelector("h1");
let subtitles = document.querySelectorAll("h2");
let paragraphs = document.querySelectorAll("p");

let smallTextActive = true;
let normalTextActive = true;
let bigTextActive = true;

small.addEventListener("click", () => {
  if (smallTextActive) {
    small.style.backgroundColor = "var(--lightBlue)";
    small.style.color = "var(--darkBlue)";
    normal.style.backgroundColor = "var(--darkBlue)";
    normal.style.color = "var(--white)";
    big.style.backgroundColor = "var(--darkBlue)";
    big.style.color = "var(--white)";
  } else {
    smallTextActive = !smallTextActive;
  }
  title.style.fontSize = "3rem";
  subtitles.forEach(subtitle => {
    subtitle.style.fontSize = "1.5rem";
  })
  paragraphs.forEach(paragraph => {
    paragraph.style.fontSize = "1rem";
  })
});

normal.addEventListener("click", () => {
  if (normalTextActive) {
    normal.style.backgroundColor = "var(--lightBlue)";
    normal.style.color = "var(--darkBlue)";
    small.style.backgroundColor = "var(--darkBlue)";
    small.style.color = "var(--white)";
    big.style.backgroundColor = "var(--darkBlue)";
    big.style.color = "var(--white)";
  } else {
    normalTextActive = !normalTextActive;
  }
  title.style.fontSize = "4rem";
  subtitles.forEach(subtitle => {
    subtitle.style.fontSize = "2.5rem";
  })
  paragraphs.forEach(paragraph => {
    paragraph.style.fontSize = "2rem";
  })
});

big.addEventListener("click", () => {
  if (bigTextActive) {
    big.style.backgroundColor = "var(--lightBlue)";
    big.style.color = "var(--darkBlue)";
    small.style.backgroundColor = "var(--darkBlue)";
    small.style.color = "var(--white)";
    normal.style.backgroundColor = "var(--darkBlue)";
    normal.style.color = "var(--white)";
  } else {
    bigTextActive = !bigTextActive;
  }
  title.style.fontSize = "5rem";
  subtitles.forEach(subtitle => {
    subtitle.style.fontSize = "3.5rem";
  })
  paragraphs.forEach(paragraph => {
    paragraph.style.fontSize = "3rem";
  })
});

// ------------- High Contrast ------------- //

let contrast = document.getElementById("contrast");
let constrastIcon = contrast.querySelector("img");

let active = false;

contrast.addEventListener("click", () => {
  active = !active;
  if (active) {
    document.documentElement.style.setProperty('--darkBlue', '#101010');
    contrast.style.backgroundColor = "var(--white)";
    constrastIcon.setAttribute("src", "./images/codicon_color-mode-3.svg");

  } else {
    document.documentElement.style.setProperty('--darkBlue', '#205465');
    constrastIcon.setAttribute("src", "./images/codicon_color-mode-2.svg");
  }
});

// ----------------- Audio ----------------- //

let allPlayButtons = document.querySelectorAll(".controlButton");
let currentAudio = null;

const stopCurrentAudio = () => {
  if (currentAudio) {
    window.speechSynthesis.cancel();
    currentAudio.querySelector("img").setAttribute("src", "images/play_icon.svg");
    currentAudio.querySelector("img").setAttribute("alt", "play icon");
    currentAudio = null;
  }
};

const listenTextTranslated = (textToRead, listenButton) => {
  let text = document.getElementById(textToRead);
  let audioMessage = new SpeechSynthesisUtterance();
  let activeBtn = document.getElementById(listenButton);

  if (window.speechSynthesis.speaking && currentAudio !== activeBtn) {
    stopCurrentAudio();
  }

  if (window.speechSynthesis.paused && currentAudio === activeBtn) {
    window.speechSynthesis.resume();
    activeBtn.querySelector("img").setAttribute("src", "images/pause_icon.svg");
    activeBtn.querySelector("img").setAttribute("alt", "pause icon");
  } else if (window.speechSynthesis.speaking && currentAudio === activeBtn) {
    window.speechSynthesis.pause();
    activeBtn.querySelector("img").setAttribute("src", "images/play_icon.svg");
    activeBtn.querySelector("img").setAttribute("alt", "play icon");
  } else {
    stopCurrentAudio();
    audioMessage.text = text.innerText;
    audioMessage.lang = "en-US";
    audioMessage.onend = () => {
      activeBtn.querySelector("img").setAttribute("src", "images/play_icon.svg");
      activeBtn.querySelector("img").setAttribute("alt", "play icon");
    };
    window.speechSynthesis.speak(audioMessage);
    activeBtn.querySelector("img").setAttribute("src", "images/pause_icon.svg");
    activeBtn.querySelector("img").setAttribute("alt", "pause icon");
    currentAudio = activeBtn;
  }
};

allPlayButtons.forEach((playButton) => {
  if (playButton.id === "listenTitle") {
    playButton.addEventListener("click", () => {
      listenTextTranslated("card-title", "listenTitle");
    });
  } else if (playButton.id === "listenImpairment") {
    playButton.addEventListener("click", () => {
      listenTextTranslated("impairment", "listenImpairment");
    });
  } else if (playButton.id === "listenAlternatives") {
    playButton.addEventListener("click", () => {
      listenTextTranslated("alternatives", "listenAlternatives");
    });
  } else if (playButton.id === "listenLikes") {
    playButton.addEventListener("click", () => {
      listenTextTranslated("likes", "listenLikes");
    });
  } else if (playButton.id === "listenIssues") {
    playButton.addEventListener("click", () => {
      listenTextTranslated("issues", "listenIssues");
    });
  }
});