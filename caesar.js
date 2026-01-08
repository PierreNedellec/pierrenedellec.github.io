let button = document.getElementById('encryptButton')
let input = document.getElementById('shift')
let plaintext = document.getElementById('plaintext')
let encryptedText = document.getElementById('encryptedText')

button.addEventListener('click', function (event) {
    event.preventDefault()
    if (input.value === ""){
        input.value = 0
    }
    let output = shiftText(plaintext.value, parseInt(input.value))
    encryptedText.textContent = output
});



const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function shiftLetter(letter,shift){
    letter = letter.toUpperCase()
    console.log('letter input',letter)
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (alphabet.indexOf(letter) === -1){
        return letter
    }
    let originalIndex = alphabet.indexOf(letter)
    let newIndex = (originalIndex + shift)%26
    let newLetter = alphabet[newIndex]
    console.log('newLetter',newLetter)
    return newLetter
}

function shiftText(text,shift){
    shift = ((shift%26) + 26)%26
    let newText = ''
    for(let i=0;i<text.length;i++){
        newText = newText + shiftLetter(text[i],shift)
    }
    return newText

}

