let videos = [];
let videoStates = [];
let index = 0;

function preload() {
  // Just create references in preload
  videos.push(createVideo('assets/video0.mp4'));
  videos.push(createVideo('assets/video1.mp4'));
  videos.push(createVideo('assets/video2.mp4'));
  videos.push(createVideo('assets/video3.mp4'));
  videos.push(createVideo('assets/video4.mp4'));
  videos.push(createVideo('assets/video5.mp4'));
  videos.push(createVideo('assets/video6.mp4'));
  videos.push(createVideo('assets/video7.mp4'));

 

  for (let i = 0; i < videos.length; i++) {
    videoStates.push({
      clarity: 100,      
      timeVisible: 0     
    });
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let v of videos) {
    v.volume(0);
    v.hide();
  }
  // Only start the first one
  videos[index].loop();
  videos[index].play();
}

function draw() {
  background(0);

  let currentVideo = videos[index];
  let state = videoStates[index];

  // Show the current video
  image(currentVideo, 0, 0, width, height);

  // Track how long it's been showing
  state.timeVisible += deltaTime;
  for (let i = 0; i < videoStates.length; i++) {
    if (i !== index) {
      // fade out faster if ignored
      videoStates[i].clarity = max(0, videoStates[i].clarity - 0.5);  // was 0.05
    } else {
      // fade slower while being watched
      videoStates[i].clarity = max(0, videoStates[i].clarity - 0.2);  // was 0.01
    }
  }
  

  // Apply visual clarity effect
  applyClarityEffect(state.clarity);

  fill(255);
textSize(16);
textAlign(LEFT);
text("Clarity: " + nf(videoStates[index].clarity, 0, 2), 10, 30);

}
function applyClarityEffect(clarity) {
  if (clarity < 100) {
    let blurAmount = map(100 - clarity, 0, 100, 0, 10); 
    filter(BLUR, blurAmount);

    // Less intense and less frequent glitching
    if (random(1) > 0.8 && clarity < 60) {
      let xOffset = random(-5, 5);
      let yOffset = random(-5, 5);
      translate(xOffset, yOffset);
    }
  }
}


function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    videos[index].stop();

    videoStates[index].clarity = min(100, videoStates[index].clarity + 20); 
    videoStates[index].timeVisible = 0;

    index = (index + 1) % videos.length;

    videos[index].loop();
    videos[index].play();
  }
}

