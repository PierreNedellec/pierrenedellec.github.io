const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const allCipherParameters = document.getElementsByClassName("cipher-input")
const cipherSelecter = document.getElementById("cipherSelect")
const plaintext = document.getElementById("plaintext")
const ciphertextTextarea = document.getElementById("ciphertext")
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

    raiseError("noError")
    }
}}

function computeCiphertext(){
    raiseError("noError")
    const encryptors = {
        caesar: caesarEncrypt,
        vigenere: vigenereEncrypt,
        permutation: permutationEncrypt
}
    let selectedCipher = cipherSelecter.value
    console.log('selected',selectedCipher)
    let encryptFunction = encryptors[selectedCipher]
    let ciphertext = encryptFunction()
    ciphertextTextarea.value = ciphertext
}
function sanitisePlaintext(){
    let newText = ""
    const upperPlaintext = plaintext.value.toUpperCase()
    for (letter of upperPlaintext){
        if (alphabet.indexOf(letter) !== -1){
            newText += letter
        }
    }
    console.log('sanitised text,',newText)
    return newText
}

function raiseError(error){
    const errorMessage = document.getElementById("errorMessage")
    const possibleErrors = {
        "noError": "",
        "vigenereKeywordMustBeAllLetters": "Please enter a keyword with only letters, no numbers or spaces.",
        "caesarShiftUnder26": "Please enter a shift between 0 and 25 inclusive.",
        "caesarShiftMustBeInteger": "Please enter an integer shift."
    }
    errorMessage.textContent = possibleErrors[error]
    console.log("Error: ",errorMessage.value)

}


//CAESAR CIPHER
function caesarEncrypt(){
    if (checkCaesarShift()){
        const caesarInput = document.getElementById("caesarShift")
        const caesarShift = ((Number(caesarInput.value)%26)+26)%26
        let newText = ""
        for (letter of plaintext.value.toUpperCase()){
            if (alphabet.indexOf(letter) === -1){
                newText += ''
            }
            else{
                newText += caesarShiftLetter(letter,caesarShift)
            }
        }
        return newText
    }
    else {
        return ''
    }
}

function caesarShiftLetter(letter,shift){
    let previousIndex = alphabet.indexOf(letter)
    let newIndex = (previousIndex + shift)%26
    return alphabet[newIndex]
}

function checkCaesarShift(){
    const caesarInput = document.getElementById("caesarShift")
    const caesarShift = Number(caesarInput.value)
    if (caesarShift < 0 || caesarShift > 25){
        raiseError("caesarShiftUnder26")
        return false
    }
    if (!Number.isInteger(caesarShift)){
        raiseError("caesarShiftMustBeInteger")
        return false
    }
    return true
}

//VIGENERE

function checkVigenereKeywordIsAllLetters(){
    const vigenereInput = document.getElementById("vigenereKeyword")
    const vigenereKeyword = vigenereInput.value.toUpperCase()
    for (char of vigenereKeyword){
        if (alphabet.indexOf(char) === -1){
            raiseError("vigenereKeywordMustBeAllLetters")
            return false
        }
    }
    return true
}


function vigenereEncrypt(){
    if (checkVigenereKeywordIsAllLetters()){
        const sanitisedPlaintext = sanitisePlaintext()
        const vigenereInput = document.getElementById("vigenereKeyword")
        const vigenereKeyword = vigenereInput.value.toUpperCase()
        const keywordLength = vigenereKeyword.length
        let newText = ""
        for (i in sanitisedPlaintext){
            let letter = sanitisedPlaintext[i]
            if (alphabet.indexOf(letter) === -1){
                newText += letter
            }
            else{
                let shift = alphabet.indexOf(vigenereKeyword[i%(keywordLength)])
                let newIndex = (alphabet.indexOf(sanitisedPlaintext[i]) + shift)%26
                newText += alphabet[newIndex]
            }

        }
        return newText
    }
    else{
        return ''
    }
}

//PERMUTATION

function permutationEncrypt(){
    const permutationKeyword = document.getElementById("permutation")
    const permuationKeyNumbers = keywordToKey(permutationKeyword)
    const keySize = permuationKeyNumbers.length
    const sanitisedPlaintext = padPlaintext(sanitisePlaintext(),keySize)
    let plaintextListedCharacters = sanitisedPlaintext.split("")
    const totalNumberOfBlocks = (sanitisedPlaintext.length/keySize)
    let newText = ""
    let originalBlock = []
    let newBlock = Array(keySize)
    for (let i=0; i<totalNumberOfBlocks;i++){
        originalBlock = plaintextListedCharacters.splice(0,keySize)
        for (position in originalBlock){
            newBlock[permuationKeyNumbers[position]] = originalBlock[position]
        }
        newText += newBlock.join("")
    }
    return newText
}

function keywordToKey(keyword){
    return keyword.value.split("")
}

function padPlaintext(text,blockSize){
    while (text.length < 10000000) {
        if (text.length%blockSize === 0){
            return text
            }
        text += "X"
    }

}

