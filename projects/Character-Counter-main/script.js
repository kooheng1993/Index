document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('input-text');
    inputText.addEventListener('input', updateCounts);
    document.getElementById('clear').addEventListener('click', clearText);
});

function updateCounts() {
    const text = document.getElementById('input-text').value;
    
    document.getElementById('char-count').textContent = countCharacters(text);
    document.getElementById('word-count').textContent = countWords(text);
    document.getElementById('sentence-count').textContent = countSentences(text);
    document.getElementById('paragraph-count').textContent = countParagraphs(text);
    document.getElementById('space-count').textContent = countSpaces(text);
}

function countCharacters(text) {
    return text.length;
}

function countWords(text) {
    if (text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
}

function countSentences(text) {
    if (text.trim() === '') return 0;
    return text.split(/[.!?]+/).filter(Boolean).length;
}

function countParagraphs(text) {
    if (text.trim() === '') return 0;
    return text.split(/\n+/).filter(Boolean).length;
}

function countSpaces(text) {
    return text.split(' ').length - 1;
}

function clearText() {
    document.getElementById('input-text').value = '';
    updateCounts();
}
