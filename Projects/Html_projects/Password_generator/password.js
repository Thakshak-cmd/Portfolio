let wordList = [];

// Read the CSV file
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        // Split by new lines to create an array of words
        wordList = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        alert('CSV loaded successfully!');
    };
    reader.readAsText(file);
});

function getRandomWords(numWords) {
    const selectedWords = [];
    for (let i = 0; i < numWords; i++) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        selectedWords.push(wordList[randomIndex]);
    }
    return selectedWords;
}

function generatePassword() {
    if (wordList.length === 0) {
        alert('Please load the CSV file first.');
        return;
    }
    const numWords = 4; // Number of words in the password, adjust as needed
    const words = getRandomWords(numWords);
    const password = words.join('-'); // Join words with a hyphen or any separator
    document.getElementById('passwordDisplay').innerText = "Generated Password: " + password;
}
