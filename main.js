peter_pan_theme="";
harry_potter_theme="";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_Peter_pan = "";
song_Harry_potter = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function preload(){
    peter = loadSound("music2.mp3");
    harry = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00EFF8");
    stroke("#00EFF8");

    song_Peter_pan = peter.isPlaying();
    console.log(song_Peter_pan);

    song_Harry_potter = harry.isPlaying();
    console.log(song_Harry_potter);

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        harry.stop();
        if(song_Peter_pan == false){
            peter.play();
        }
        else{
            console.log("Song Name: Peter Pan Theme");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Theme";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        harry.stop();
        if(song_Harry_potter == false){
            harry.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}