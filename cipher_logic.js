const allCipherParameters = document.getElementsByClassName("cipher-input")
const cipherSelecter = document.getElementById("cipherSelect")
const plaintext = document.getElementById("plaintext")
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let ciphertextTextarea = document.getElementById("ciphertext")
const encryptButton = document.getElementById("encryptButton")

updateInputs()
cipherSelecter.addEventListener('change', updateInputs)
encryptButton.addEventListener('click',computeCiphertext)

function updateInputs(){
    const selectedCipher = cipherSelecter.value

    for (let input of allCipherParameters) {
    input.style.display = "none"

    if (input.classList.contains("cipher-"+selectedCipher)){
        input.style.display = "block"
    }
}}

function computeCiphertext(){
    const encryptors = {
        caesar: caesarEncrypt,
        vigenere: vigenereEncrypt,
        //permutation: permutationEncrypt
}
    let selectedCipher = cipherSelecter.value
    console.log('selected',selectedCipher)
    let encryptFunction = encryptors[selectedCipher]
    let ciphertext = encryptFunction()
    ciphertextTextarea.value = ciphertext
}



//CAESAR CIPHER
function caesarEncrypt(){
    const caesarInput = document.getElementById("caesarShift")
    const caesarShift = ((Number(caesarInput.value)%26)+26)%26
    let newText = ""
    for (letter of plaintext.value.toUpperCase()){
        if (alphabet.indexOf(letter) === -1){
            newText += letter
        }
        else{
            newText += caesarShiftLetter(letter,caesarShift)

        }
    }
    return newText

}

function caesarShiftLetter(letter,shift){
    let previousIndex = alphabet.indexOf(letter)
    let newIndex = (previousIndex + shift)%26
    return alphabet[newIndex]
}

//VIGENERE

function vigenereEncrypt(){
    const vigenereInput = document.getElementById("vigenereKeyword")
    const vigenereKeyword = vigenereInput.value.toUpperCase()
    const upperPlaintext = plaintext.value.toUpperCase()
    const keywordLength = vigenereKeyword.length
    let newText = ""
    for (i in upperPlaintext){
        let letter = upperPlaintext[i]
        if (alphabet.indexOf(letter) === -1){
            newText += letter
        }
        else{
            let shift = alphabet.indexOf(vigenereKeyword[i%(keywordLength)])
            let newIndex = (alphabet.indexOf(upperPlaintext[i]) + shift)%26
            newText += alphabet[newIndex]
        }

    }
    return newText
}
