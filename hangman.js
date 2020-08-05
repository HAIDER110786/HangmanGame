const word_def = [
    {word:"banana ",synonym:"a fruit",definition:"Long curved fruit which grows in clusters"},
    {word:"carnivorous",synonym:"animal eating type",definition:"Animals feeding on other animals"},
    {word:"stratosphere",synonym:"atmospheric layer",definition:"Second layer of the atmosphere as you go upward"},
];

const answer = document.querySelector('.answer');
let currentWord;
let currentDefinition;
let counter=0;
let disableKeys = false;


window.onload = generateWord();


function generateWord(){
let randomWordIndex = this.generateRandomIndex();
currentWord = word_def[randomWordIndex].word;
currentDefinition = word_def[randomWordIndex].definition;
for(let i=0;i<currentWord.length;i++){
    if(currentWord[i]!==' '){
        const alphabet = document.createElement('div');
        alphabet.setAttribute('id','alphabetWithoutText');
        alphabet.className = i;
        answer.appendChild(alphabet);
    }   
}
const hint = document.querySelector('.hint');
hint.innerHTML = `<b>Hint: </b> ${word_def[randomWordIndex].synonym.toUpperCase()}`;
}   

function generateRandomIndex(){   
    return Math.floor((Math.random()*word_def.length));
}

document.addEventListener('keypress',(e)=>{
    if(!disableKeys){
        if(Word.checkFortheKey(e.key)){
            let index = Word.getAlphabetPosition(e.key);
            if(index!==null){
                answer.childNodes.forEach(alphabetsInputBoxes=>{
                    if(Word.wordDivMatcher(alphabetsInputBoxes.className,index)){
                        alphabetsInputBoxes.setAttribute('id','alphabetWithText')
                        alphabetsInputBoxes.textContent = e.key;
                    }
                }) 
                if(GuessedTheAnswer()){
                    document.querySelector('#shortVerticalLine').style.visibility = "hidden";
                    if(document.querySelector('#moveableDiagram').style.visibility = "hidden"){
                        document.querySelector('#moveableDiagram').style.visibility = "visible";
                    }
                    if(document.querySelector('#face').style.visibility = "hidden"){
                        document.querySelector('#face').style.visibility = "visible";
                    }
                    if(document.querySelector('#body').style.visibility = "hidden"){
                        document.querySelector('#body').style.visibility = "visible";
                    }
                    if(document.querySelector('#leftHand').style.visibility = "hidden"){
                        document.querySelector('#leftHand').style.visibility = "visible";
                    }
                    if(document.querySelector('#rightHand').style.visibility = "hidden"){
                        document.querySelector('#rightHand').style.visibility = "visible";
                    }
                    if(document.querySelector('#leftLeg').style.visibility = "hidden"){
                        document.querySelector('#leftLeg').style.visibility = "visible";
                    }
                    if(document.querySelector('#rightLeg').style.visibility = "hidden"){
                        document.querySelector('#rightLeg').style.visibility = "visible";
                    }
                    document.querySelector('#moveableDiagram').className = ' moveableDiagramSafe'
                    document.querySelector('.replayButton').style.visibility = "visible";
                    happyAnimation();
                    if(document.querySelector('#mouth_happy')){
                        document.querySelector('#mouth_happy').style.visibility = "visible"
                        document.querySelector('#mouth_happy').setAttribute('id',"mouth_WOOHOO");
                    }
                    else if(document.querySelector('#mouth_normal')){
                        document.querySelector('#mouth_normal').setAttribute('id',"mouth_WOOHOO");
                    }
                    else if(document.querySelector('#mouth_sad')){
                        document.querySelector('#mouth_sad').setAttribute('id',"mouth_WOOHOO");
                    }
                }
            }
        }else{
            switch(counter){
                case 0:
                    document.querySelector('#shortVerticalLine').style.visibility = "visible";
                    counter++;
                    break;
                
                case 1:
                    document.querySelector('#face').style.visibility = "visible";
                    counter++;
                    break;

                case 2:
                    document.querySelector('#body').style.visibility = "visible";
                    document.querySelector('.hint').innerHTML = `<b>Hint: </b> ${currentDefinition}`;
                    document.querySelector('#mouth_happy').setAttribute('id',"mouth_normal");
                    counter++;
                    break;
                
                case 3:
                    document.querySelector('#leftHand').style.visibility = "visible";
                    counter++;
                    break;
                
                case 4:
                    document.querySelector('#rightHand').style.visibility = "visible";
                    document.querySelector('#mouth_normal').setAttribute('id',"mouth_sad");
                    counter++;
                    break;
                
                case 5:
                    document.querySelector('#leftLeg').style.visibility = "visible";
                    counter++;
                    break;
                
                case 6:
                    document.querySelector('#rightLeg').style.visibility = "visible";
                    document.querySelector('.replayButton').style.visibility = "visible";
                    document.querySelector('#mouth_sad').setAttribute('id',"mouth_WHATHAVEYOUDONE");
                    disableKeys=true;
                    startAnimation();
                    break;
            }
        }
    }
})

function happyAnimation(){
    setTimeout(function(){
        document.querySelector('#leftHand').setAttribute('id','leftHandHappy');
        document.querySelector('#rightHand').setAttribute('id','rightHandHappy');
    },500);
    setTimeout(function(){
        document.querySelector('#leftHandHappy').setAttribute('id','leftHand');
        document.querySelector('#rightHandHappy').setAttribute('id','rightHand');
        happyAnimation();
    },1000);
}

function GuessedTheAnswer(){
    let didGuessAll=true;
    answer.childNodes.forEach(alphabetsInputBoxes=>{
        if(alphabetsInputBoxes.textContent === ''){
            didGuessAll = false
        }
    })
    return didGuessAll;
}

class Word{
    static checkFortheKey(key){
        for(let i=0;i<currentWord.length;i++){
            if(key==currentWord[i]) {
                return true;
            }
        }
        return false;
    }

    static getAlphabetPosition(key){
        let positionArray = [];
        for(let i=0;i<currentWord.length;i++){
            if(key==currentWord[i]) {
                positionArray.push(i);
            }
        }
        if(positionArray.length>0)
            return positionArray;
        else
            return null;
    }

    static wordDivMatcher(classOfDiv,index){
        for(let i=0;i<index.length;i++){
            if(classOfDiv==index[i]){
                return true;
            }
        }
        return false;
    }
}


function startAnimation(){
    document.querySelector('#moveableDiagram').className = ' moveableAreaBetweenMiddleAndLeft'
    setTimeout(function(){
        document.querySelector('#moveableDiagram').className = ' moveableAreaLeft'
    },150)
    setTimeout(function(){
        document.querySelector('#moveableDiagram').className = ' moveableAreaBetweenMiddleAndLeft'
    },250)
    setTimeout(function(){
        document.querySelector('#moveableDiagram').className = ' moveableAreaMiddle'
    },350)
    setTimeout(function(){
        document.querySelector('#moveableDiagram').className = ' moveableAreaBetweenMiddleAndRight'
    },450)
    setTimeout(function(){
        document.querySelector('#moveableDiagram').className = ' moveableAreaRight'
    },550)
    setTimeout(function(){
        document.querySelector('#moveableDiagram').className = ' moveableAreaBetweenMiddleAndRight'
    },650)
    setTimeout(function(){
        document.querySelector('#moveableDiagram').className = ' moveableAreaMiddle'
    },750)
    setTimeout(function(){
        startAnimation();
    },850)
}




document.querySelector('.replay').addEventListener('click',(e)=>{
    if(e.target.classList.contains('replayButton')){
        window.location.reload();
    }
})