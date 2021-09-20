song1 = "";
song2 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('rgb(255, 0, 119)');
    stroke('rgb(255, 0, 119)');

    if(scoreRightWrist > 0.2)
    {
        if(rightWristY > 0 && rightWristY <= 500)
        {
            song1.play();
            song2.pause();
            document.getElementById("song_name").innerHTML = "Song Name = " + song1;
        }
    }
    if(scoreLeftWrist > 0.2)
    {
        if(leftWristY > 0 && leftWristY <= 500)
        {
            song2.play();
            song1.pause();
        }
    }
}

function play() {
    song1.play();
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log('scoreLeftWrist = ' + scoreLeftWrist + 'scoreRightWrist = ' + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristX = results[0].pose.leftWrist.y;
        console.log('leftWristX = ' + leftWristX + 'leftWristY = ' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('rightWristX = ' + rightWristX + 'rightWristY = ' + rightWristY);
    }
}