const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let jogadas = document.getElementById("jogadas")
let vezes = 0
jogadas.innerHTML = "Jogada " + vezes



startGame()


function startGame(){    
    initializeCards(game.createCardsFromTechs())
    
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard")
    

       
    gameBoard.innerHTML = ""    
    
    
    game.cards.forEach(card => { //criando uma div para cada carta
        let cardElement = document.createElement("div")
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)//evento de flip
        
        //cardElement.addEventListener('click', contador(testedoido))
        gameBoard.appendChild(cardElement) //add no tabuleiro
        

    })
    
    
}

function createCardContent(card, cardElement){ //criando front e back
    
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)

}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement("div")
    cardElementFace.classList.add(face)
    if(face === FRONT){
        let iconElement = document.createElement("img")
        iconElement.classList.add(ICON)
        iconElement.src = "./images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace)
}

//createCardsFromTechs(techs)

function flipCard(){
    
    if(game.setCard(this.id)) {

        this.classList.add("flip")
        if(game.secondCard){
            jogadas.innerHTML = "Jogada " + ++vezes
            if(game.checkMatch()){
                game.clearcards()
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver")
                    gameOverLayer.style.display = "flex"
                }
            }else{
            setTimeout(()=>{
            let fistCardView = document.getElementById(game.fistCard.id)
            let secondCardView = document.getElementById(game.secondCard.id)

            fistCardView.classList.remove("flip")
            secondCardView.classList.remove("flip")
            game.unflipCards()
            }, 1000)
            }
        }
    }
    
    
    

    
}

function restart(){
    game.clearcards()
    startGame()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = "none"
    vezes = 0
    
    jogadas.innerHTML = "Jogada " + vezes

}