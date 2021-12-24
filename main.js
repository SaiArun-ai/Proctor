var GrinchAlarm = "";
var status = "";
var objects = [];
var counter3 = 0;
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380)
    ml5 = ml5.objectDetector("cocossd",ML);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
}
function ML(){
    status = true;
    ml5.detect(video,gotresult);
}
function gotresult(error,result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        objects = result;
        for(i = 0; i< objects.length; i++){
            if(objects[i].label == "person"){
                counter3 = counter3+1;
            }
            if(counter3 == 1){
                CiPiNC = "Nc";
            }else{
                CiPiNC = "C,IAFW";
        }
        
        }
    }
}
function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        for(i = 0; i<objects.length; i++){
            r = random(0,255);
            g = random(0,255);
            b = random(0,255);
            document.getElementById("status").innerHTML = "Status:Object Identified";
            fill(r,g,b);
            text(objects[i].label + ", " + 100*objects[i].confidence + "%",objects[i].x,objects[i].y);
            document.getElementById("NOODOS").innerHTML = "No. Of Objects Detected On Site = " + objects.length;
            noFill();
            stroke(b,r,g);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(CiPiNC = "C,IAFW"){
                window.alert("You have been spotted with more than one person on camera. Further attemps will result in disqualification and ban from further writing of this examination");
            }
        }   
    }
}