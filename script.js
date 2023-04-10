const color1 = document.getElementById("color1")
const color2 = document.getElementById("color2")
const color3 = document.getElementById("color3")

const text1 = document.getElementById("text1")
const text2 = document.getElementById("text2")
const text3 = document.getElementById("text3")

const chooserDiv = document.getElementById("chooserDiv")
const betButton = document.getElementById("colorBet")

const betField = document.getElementById("bet")
const ranButton = document.getElementById("ran")
const resultLabel = document.getElementById("resultLabel")

let bettedColor = -1
let ran1 = 0, ran2 = 0, ran3 = 0
let colors = ["blue", "red", "green", "white", "pink", "yellow"];
let colorName = ["Blue", "Red", "Green", "White", "Pink", "Yellow"];



ranButton.onclick = function () {
    if (betField.value == 0 || bettedColor == -1) {
        const modal = document.querySelector('#error')
        openModal(modal)
        return
    }
    timer = setInterval(randomize, 30)
    betButton.setAttribute("disabled", "true")
    ranButton.setAttribute("disabled", "true")
    betField.setAttribute("disabled", "true")
}
let counter = 100
function randomize() {
    
    ran1 = Math.floor(Math.random() * 6)
    ran2 = Math.floor(Math.random() * 6)
    ran3 = Math.floor(Math.random() * 6)
    color1.style.backgroundColor = colors[ran1]
    color2.style.backgroundColor = colors[ran2]
    color3.style.backgroundColor = colors[ran3]
    color1.style.boxShadow = `0 0 25px ${colors[ran1]}`
    color2.style.boxShadow = `0 0 25px ${colors[ran2]}`
    color3.style.boxShadow = `0 0 25px ${colors[ran3]}`
    text1.innerHTML = colorName[ran1]
    text2.innerHTML = colorName[ran2]
    text3.innerHTML = colorName[ran3]
    let pop = new Audio('pop.mp3')
    pop.volume = 0.2
    pop.play()
    if (counter == 50) {
        clearInterval(timer)
        timer = setInterval(randomize, 80)
    }
    if (counter == 30) {
        clearInterval(timer)
        timer = setInterval(randomize, 150)
    }
    if (counter == 8) {
        clearInterval(timer)
        timer = setInterval(randomize, 300)
    }
    if (counter == 0) {
        clearInterval(timer)
        checkWin(ran1, ran2, ran3);
        counter = 100;
/* 
        betField.value = 0
        bettedColor = -1
        betButton.style.backgroundColor = "white"
        betButton.textContent = "Choose"
        chooserDiv.textContent = "Bet a Color:"*/
    }
    counter--
}
function checkWin(r1, r2, r3) {
    betButton.removeAttribute("disabled")
    betField.removeAttribute("disabled")
    ranButton.removeAttribute("disabled")
    let guess = bettedColor
    let win = 1;
    r1 == guess ? win++ : null
    r2 == guess ? win++ : null
    r3 == guess ? win++ : null
    const modal = document.querySelector('#modal')
    openModal(modal)
    if (win == 1) {
        resultLabel.innerHTML = `You Lose (-$${Number(betField.value)})`
        let lose = new Audio('lose.mp3')
        lose.play()
    } else {
        let moneyWon = win * Number(betField.value)
        resultLabel.innerHTML = `You Won $${moneyWon} (x${win}) with ${colorName[guess]}`
        let winEffect = new Audio('win.mp3')
        winEffect.play()
    }
}

// modal script
const openButtons = document.querySelectorAll('[data-modal-target]')
const overlay = document.getElementById('overbg')

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modalClass.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})
function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}
function closeModal(modal) {
    if (modal == null) return
    //console.log(modal.querySelector("#modalLabel"))
    modal.classList.remove('active')
    overlay.classList.remove('active')
    if(modal.querySelector("#resultLabel") != null){
        betField.value = 0
        bettedColor = -1
        betButton.style.backgroundColor = "white"
        betButton.textContent = "Choose"
        chooserDiv.textContent = "Bet a Color:"
    }
}

//color chooser modal
const moda = document.querySelector("#modalChooserBody")
colors.forEach((color, index) => {
    const buttonColor = document.createElement("button")
    buttonColor.textContent = colorName[index]
    buttonColor.setAttribute('data-close', '')
    buttonColor.setAttribute("onclick", `hotdogs(${index})`)
    buttonColor.classList = "colorButts"
    //buttonColor.style.boxShadow = `2px 2px 20px ${colors[index]}`
    buttonColor.style.backgroundColor = color
    moda.append(buttonColor)
})
function hotdogs(index) {
    bettedColor = index
    betButton.style.backgroundColor = colors[index]
    betButton.textContent = colorName[index]
    chooserDiv.textContent = "Chosen Color:"
}
const closeButtons = document.querySelectorAll('[data-close]')
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modalClass')
        closeModal(modal)
    })
});