//this variable is for what is the message device going to say
const message = new SpeechSynthesisUtterance();
let voices = [];
const voiceDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"] , [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

message.text = document.querySelector('[name="text"]').value;

function makeSound(){
    voices = this.getVoices();
    console.log(voices);
    const voiceOptions = voices.map(voices => `<option value="${voices.name}">${voices.name} (${voices.lang})</option>`)
    .join('');
    voiceDropdown.innerHTML = voiceOptions;
}


//set the new option for voices
function newVoice(){
    message.voice = voices.find( voices => voices.name===this.value);
    cancelling();
}


// function for cancelling the voice while we change the language mode 

function cancelling(startOver = true){
    speechSynthesis.cancel();
    if(startOver){
        speechSynthesis.speak(message);
    }
}

function newOption(){
    console.log(this.name , this.value);
    message[this.name] = this.value;
    cancelling();
}

voiceDropdown.addEventListener('change',newVoice);
speechSynthesis.addEventListener('voiceschanged',makeSound);
options.forEach(option => option.addEventListener('change', newOption));
speakButton.addEventListener('click',cancelling);
stopButton.addEventListener('click',function() {
    cancelling(false);
});