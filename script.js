const color1 = document.getElementById("color1")
const color2 = document.getElementById("color2")
const color3 = document.getElementById("color3")

const text1 = document.getElementById("text1")
const text2 = document.getElementById("text2")
const text3 = document.getElementById("text3")

const betColor = document.getElementById("colorBet")
const ranButton = document.getElementById("ran")
const betField = document.getElementById("bet")

const modalTitle = document.getElementById("title")
const resultLabel = document.getElementById("modalLabel")

let ran1 = 0, ran2 = 0, ran3 = 0
let colors = ["blue", "red", "green", "white", "pink", "yellow"];
let colorName = ["Blue", "Red", "Green", "White", "Pink", "Yellow"];

ranButton.onclick = function () {
    if(betField.value == 0){
        modalTitle.textContent = "ERROR"
        resultLabel.innerHTML = "Please input your bet"
        const modal = document.querySelector('#modal')
        openModal(modal)
        return
    }
    timer = setInterval(randomize, 10)
    betColor.setAttribute("disabled", "true")
    ranButton.setAttribute("disabled", "true")
    betField.setAttribute("disabled", "true")
}
let counter = 100
function randomize() {    
    modalTitle.textContent = "Result"
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
        betField.value = 0
        counter = 100;
    }
    counter--
}
function checkWin(r1, r2, r3) {
    betColor.removeAttribute("disabled")
    betField.removeAttribute("disabled")
    ranButton.removeAttribute("disabled")
    let guess = betColor.selectedIndex
    let win = 1;
    r1 == guess ? win++ : null
    r2 == guess ? win++ : null
    r3 == guess ? win++ : null
    const modal = document.querySelector('#modal')
    openModal(modal)
    if (win == 1) {
        resultLabel.innerHTML = `You Lose (-$${Number(betField.value)})`
    } else {
        let moneyWon = win * Number(betField.value)
        resultLabel.innerHTML = `You Won $${moneyWon} (x${win}) with ${colorName[guess]}`
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

const closeButtons = document.querySelectorAll('[data-close]')
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modalClass')
        closeModal(modal)
    })
});
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
    modal.classList.remove('active')
    overlay.classList.remove('active')
}