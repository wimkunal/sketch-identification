function setup() {
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function preload() {
  classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas() {
    background("white");
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed) {
      line(pmouseX,pmouseY,mouseX,mouseY);
    } 
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results) {
  if (error){
  console.error(error);
   }

   console.log(results);
   document.getElementById('label').innerHTML = 'Label: ' + results[0].label;
   document.getElementById('confidence').innerHTML = 'confidence: ' + Math.round(results[0].confidence * 100) + '%';
   utterThis = new SpeechSynthesisUtterance(results[0].label);
   synth.speak(utterThis);
}
var time_limit = 30;

var time_out = setInterval(() => {

  if(time_limit == 0) {
    
    $('#timer').html('Time Over');
        
  } else {
    
    if(time_limit < 10) {
      time_limit = 0 + '' + time_limit;
    }
    
    $('#timer').html('00:' + time_limit);
    
    time_limit -= 1;
    
  }

}, 1000);
