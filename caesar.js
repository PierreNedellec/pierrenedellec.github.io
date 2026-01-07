let button = document.getElementById('encryptButton')
let input = document.getElementById('shift')
let plaintext = document.getElementById('plaintext')
let encryptedText = document.getElementById('encryptedText')

button.addEventListener('click', function (event) {
    event.preventDefault()
    console.log('Shift value',input.value,'and plaintext entered:',plaintext.value)
    let output = shiftText(plaintext.value, parseInt(input.value))
    console.log(output)
    encryptedText.textContent = output
});

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

