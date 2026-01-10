const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const allCipherParameters = document.getElementsByClassName("cipher-input")
const cipherSelecter = document.getElementById("cipherSelect")
const plaintext = document.getElementById("plaintext")
const sanitisedPlaintext = sanitisePlaintext()
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
        //permutation: permutationEncrypt
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
    return newText
}

function raiseError(error){
    const errorMessage = document.getElementById("errorMessage")
    const possibleErrors = {
        "noError": "",
        "vigenereKeywordMustBeAllLetters": "Please enter a keyword with only letters, no numbers or spaces.",
        "caesarShiftUnder26": "Please enter a shift between 0 and 25 inclusive."
    }
    errorMessage.textContent = possibleErrors[error]
    console.log(errorMessage.value)

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
    
}

