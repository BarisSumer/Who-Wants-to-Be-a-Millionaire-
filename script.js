const questionDiv = document.getElementById("question")
const answerAButton = document.getElementById("A")
const answerBButton = document.getElementById("B")
const answerCButton = document.getElementById("C")
const answerDButton = document.getElementById("D")
const timerDiv = document.getElementById("timer")
const buttons = document.querySelectorAll(".button")
const questionMoneyDiv = document.getElementById("questionMoney")
const halfJokerDiv = document.getElementById("half")
const halfButton = document.getElementById("halfButton")
const spectatorJokerText = document.getElementById("spectatorText")
const spectatorButton = document.getElementById("spectatorButton")
const doubleAnswerButton = document.getElementById("doubleAnswerButton")
const withdrawButton = document.getElementById("withdrawButton")
const restartButton = document.getElementById("restart")
const placeHolder = document.getElementById("placeholder1")

doubleAnswerButton.style.display = "none"

const buttons1 = [halfButton,withdrawButton,doubleAnswerButton,spectatorButton] 


let boolDeneme = false
let withdrawBool = false
let countdownBool = false
let bool1 = false

let level = 0
let money = 0
let gameOver = false
let interval 
let halfJokerBool = false

let doubleAnswerBool = false

let counter = 0


let halfJoker1 = "halfJoker"
let spectatorJoker1 = "spectatorJoker"
let doubleAnswerJoker = "doubleAnswerJoker"


let jokers = []
jokers.push(halfJoker1,spectatorJoker1)

let answerIndex = [0,1,2,3]

let answersButton = [answerAButton,answerBButton,answerCButton,answerDButton]


const questions = [
    [ "Hollywood filmlerinde polislerin en fazla tükettikleri yiyecek ve içecek hangileri olur?"],
    ["Halk arasında kullanılan ifadeye göre, çok fikir değiştiren insanların hangisi gibi renkten renge girdiği söylenir?"],
    [ "'Son pişmanlık' şeklinde başlayan atasözünün devamı nasıldır?"],
    ["Aya ilk ayak basan kişi?"],
    ["Hangisi at üzerinde yapılan sporlardan biridir?"],
    [ "Güneş etrafındaki bir turu 88 dünya günü süren, Güneş'e bakan yüzü aşırı sıcak, diğer yüzü aşırı soğuk olan, Güneş'e en yakın gezegen hangisidir?"],
    ["Resimde 'empresyonizm' akımının öncülerinden olan ve bu akıma adını veren 'izlenim, Gün doğumu' tablosuyla da bilinen ressam kimdir?"],
    ["Kült film söz kalıbında geçen 'kült' kelimesinin Latince kökeninin anlamı nedir?"],
    ["Karadeniz Ereğli'nin Eski Belediye Başkanı Halil Posbıyık, kimin kendisine '2009 yılı programım dolu Halil'ciğim ama 2010'da Ereğli'yi düşünüyorum' dediğini duyurmuştur? "],
    ["Hangisinin bir türünün dişleri dünyadaki bilinen en güçlü biyolojik madde olup karbonu elmasa çevirebilecek güçteki basınca bile dayanabilir?"],
    ["Herodotos'a göre, Mısırlılar, ilk insanları araştırdıkları deneydeki çocuklar kimlerin dilinde 'bekos' yani 'ekmek' dedikleri için ilk insanları onlar olarak kabul etmişlerdir?"],
    ["On kıtadan oluşan İstiklal Marşı'nın tamamında, bu kelimelerden hangisi diğerlerinden daha az geçer?"]
]

const answers = [
    ["A- Çiğ köfte ve ayran","B- Lahmacun ve şalgam suyu","C- Leblebi ve boza","D- Donut ve kahve"],
    ["A- Bukalemun gibi","B- Şempanze gibi","C- Bizon gibi","D- Komodo ejderi gibi"],
    ["A- Uzun sürmez","B- Hemen geçmez","C- zarar vermez","D- Fayda etmez"],
    ["A- Alan Bean","B- Pete Condrad","C- Neil Alden Armstrong","D- Stephen Curry"],
    ["A- Golf","B- Körling","C- Polo","D- Ragbi"],
    ["A- Merkür","B- Venüs","C- Jüpiter","D- Satürn"],
    ["A- Munch", "B- Monet", "C- Vermeer", "D- Goya"],
    ["A- Ekip biçme","B- Yıkayıp parlatma","C- Ezip geçme","D- Silip süpürme"],
    ["A- Michael Jackson","B- Pele","C- Barack Obama","D- Mike Tyson"],
    ["A- Kerevit","B- Salyangoz","C- Komodo Ejderi","D- Hipopotam"],
    ["A- Frigyalılar", "B- Hititler","C- Sümerler","D- Lidyalılar"],
    ["A- Vatan","B- Kan","C- Toprak","D- Yurt"]
]

const trueAnswers = [3,0,3,2,2,0,1,0,0,1,0,0]

const awards = [1000,2000,3000,5000,7500,10000,30000,50000,100000,200000,400000,1000000]

let countdownArray = [15,15,45,45,45,45,45]


startGame()

function getQuestion(questions) {
    let question = questions[level][0]
    questionDiv.textContent = question
    console.log(question)
}


function getAnswers(answers){
  
    let answerA = answers[level][0]
    let answerB = answers[level][1]
    let answerC = answers[level][2]
    let answerD = answers[level][3]
    answerAButton.textContent = answerA
    answerBButton.textContent = answerB
    answerCButton.textContent = answerC
    answerDButton.textContent = answerD
    console.log(answerA)
    console.log(answerB)
    console.log(answerC)
    console.log(answerD)
  
} 


let boolArr = []

  buttons.forEach(button => {
    button.addEventListener('click', () => {

    
      buttonText = button.textContent;
    
      if(level == 11 && buttonText.includes(answers[level][trueAnswers[level]])){
        money = 1000000
        questionMoneyDiv.textContent = "Kazanılan Para: " + money 
        questionDiv.textContent = "Oyun Bitti"
        buttons.forEach(button => button.style.display ="none")
        buttons1.forEach(button => button.style.display = "none")
        questionDiv.textContent = "Oyun Bitti Büyük Ödül Kazanıldı!!!"
        timerDiv.style.display = "none"
        restartButton.style.display=""
        placeHolder.style.marginRight = "100px"
      }
      else{

      spectatorJokerText.textContent = ""

    
    
      if(halfJokerBool == true && doubleAnswerBool == false){
        for(let i = 0; i < 4; i++){
          console.log("burada")
          answersButton[i].style.display = ""
        }
      }
     

      if(doubleAnswerBool == true){
        console.log(level)
        if(buttonText.includes(answers[level][trueAnswers[level]])){
          boolArr.push("true")
          console.log(boolArr)
        }
        else{
          boolArr.push("false")
          console.log(boolArr)
          button.style.display = "none"
        }
      }

      if(doubleAnswerBool == true && boolArr.length <=2 && boolArr.includes("true")){
        doubleAnswerBool = false
        for(let i = 0; i < 4; i++){
          console.log(boolArr.includes("true"))
          answersButton[i].style.display = ""
        }
      }
      
      if(doubleAnswerBool == true){
        console.log("abccc")
        for(let i = 0; i < boolArr.length; i++){
          if(boolArr[i] == "false"){
            counter++
            console.log(counter)
          }
        }
        boolArr.shift()
      }

      if(counter == 2){
        gameOver = true
        doubleAnswerBool = false
      }

      


    
     


      clearInterval(interval)
   
     
       console.log(buttonText)

  
      

        if(buttonText.includes(answers[level][trueAnswers[level]])  && gameOver == false && doubleAnswerBool == false ){
        console.log("true")
        level++
        money = awards[level]
        questionMoneyDiv.textContent = `${level+1}. Soru: ` + awards[level] + " TL"
        console.log(level)
        getAnswers(answers)
        getQuestion(questions)
          if(level < 7){
            countdown(countdownArray[level]) 
          }
          else{
            timerDiv.textContent = ""
            if(boolDeneme == false){
              doubleAnswerButton.style.display = ""
            }    
                                
          }
     
       }
       else if(doubleAnswerBool == false ){
        restartButton.style.display = ""
        console.log("false")
        buttons.forEach(button => button.style.display ="none")
        buttons1.forEach(button => button.style.display = "none")
        questionDiv.textContent = "Oyun Bitti"
     
        if(level >= 2 && level < 7){
          console.log("aaa")
          money = 2000
          questionMoneyDiv.textContent = "Kazanılan Para: " + money  
        }
        else if(level >= 7){
          money = 30000
          questionMoneyDiv.textContent = "Kazanılan Para: " + money  
        }
        else{
          money = 0
          questionMoneyDiv.textContent = "Kazanılan Para: " + money  
        }
        
        gameOver = true
       }
      }

      console.log(level)

    
    });
  });


 

function startGame() {
    restartButton.style.display ="none"
    getQuestion(questions)
    getAnswers(answers)
    questionMoneyDiv.textContent = `${level+1}. Soru: ` + awards[level] + " TL"
    countdown(countdownArray[level])   
}



function countdown(seconds) {
    return new Promise((resolve, reject) => {
       interval = setInterval(() => {
        seconds--;
        if (seconds > 0) {
          timerDiv.textContent = seconds
        } else {
          clearInterval(interval);
          resolve();
          gameOver = true
          timerDiv.textContent = "0"
          buttons.forEach(button => button.style.display ="none")
          buttons1.forEach(button => button.style.display = "none")
          questionDiv.textContent = "Oyun Bitti"
          restartButton.style.display = ""
          if(level >= 2 && level < 7){
            console.log("aaa")
            money = 2000
            questionMoneyDiv.textContent = "Kazanılan Para: " + money  
          }
          else{
            money = 0
            questionMoneyDiv.textContent = "Kazanılan Para: " + money  
          }
         

        }
      }, 1000);
    });
 }


function withdraw(){
  gameOver = true
  money = awards[level-1]
  if(level == 0){
    money = 0
  }
  questionMoneyDiv.textContent = "Kazanılan Para: " + money  
  clearInterval(interval)   
 buttons.forEach(button => button.style.display ="none")
 buttons1.forEach(button => button.style.display = "none")
 questionDiv.textContent = "Oyun Bitti"
 restartButton.style.display = ""

} 

function halfJoker(){
  if(jokers.includes("halfJoker")){
    let arr = shuffle(answerIndex)
     for( let i = 0; i < arr.length; i++){ 
      if ( arr[i] === trueAnswers[level]) { 
        arr.splice(i, 1); 
        
      }
   }
     arr.shift()
     arr.shift()
    let a = arr[0]
    let b = trueAnswers[level]

    for(let i = 0; i < 4; i++){
      if(i != a && i != b){
        answersButton[i].style.display = "none"
      }
      
    }
  }

  jokers.shift()

  halfButton.style.display = "none"

  halfJokerBool = true

  

  
}


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;


  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let array1 = []
function spectatorJoker(){
  
    let arr = [0,1,2,3]
    let number = 1
    let decimal = (level/10) * 1.6
    let random = Math.floor(Math.random()*20)
    let prediction = (100 - random) 
    prediction = prediction / (number + decimal)
    let decimalPart = Math.floor(prediction)
    array1.push(answers[level][trueAnswers[level]] + "  " + "%"+ decimalPart)
    for( let i = 0; i < arr.length; i++){ 
      if ( arr[i] === trueAnswers[level]) { 
        arr.splice(i, 1); 
      }
   }
    let random1  = (100 - decimalPart)
    let result = divideNumberIntoThree(random1)
    console.log(arr)
    array1.push(answers[level][arr[0]] + "  " + "%"+ result[0])
    array1.push(answers[level][arr[1]] + "  " + "%"+ result[1])
    array1.push(answers[level][arr[2]] + "  " + "%"+ result[2])
    spectatorButton.style.display = "none"

   buttons.forEach(button =>{
     if(button.textContent == answers[level][trueAnswers[level]]){
        button.textContent += " % "+ decimalPart
     }
   })

   buttons.forEach(button =>{
    if(button.textContent == answers[level][arr[0]]){
       button.textContent += " % "+ result[0]
    }
  })

  buttons.forEach(button =>{
    if(button.textContent == answers[level][arr[1]]){
       button.textContent += " % "+ result[1]
    }
  })

  buttons.forEach(button =>{
    if(button.textContent == answers[level][arr[2]]){
       button.textContent += " % "+ result[2]
    }
  })



}


function divideNumberIntoThree(num) {
  let result = [];

  for (let i = 0; i < 2; i++) {
    let part = Math.floor(Math.random() * num);
    result.push(part);
    num -= part;
  }

  result.push(num);
  return result;
}


function doubleAnswer(){
  doubleAnswerBool = true
  doubleAnswerButton.style.display = "none"
  boolDeneme = true
}


function restartGame(){
  window.location.reload()
}


























