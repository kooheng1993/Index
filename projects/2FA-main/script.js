document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate').addEventListener('click', generateCode);
    document.getElementById('secret').addEventListener('input', resetCodeAndTimer);
});

let timer;
const step = 30;

function generateCode() {
    const secret = document.getElementById('secret').value.trim();
    if (!secret) {
        showAlert('Please enter a secret key.', true);
        return;
    }

    const authenticator = otplib.authenticator;
    authenticator.options = { digits: 6, step: step };

    try {
        const code = authenticator.generate(secret);
        document.getElementById('code').textContent = code;
        document.getElementById('timer').style.display = 'block';
        document.getElementById('progress-container').style.display = 'block';
        startTimer(authenticator.timeRemaining());
    } catch (e) {
        console.error('Error generating code:', e);
        showAlert('Error generating code. Please check your secret key.', true);
    }
}

function startTimer(timeLeft) {
    if (timer) {
        clearInterval(timer);
    }

    const totalTime = step;
    document.getElementById('time-left').textContent = timeLeft;
    updateProgressBar(timeLeft, totalTime);

    timer = setInterval(() => {
        timeLeft -= 1;
        document.getElementById('time-left').textContent = timeLeft;
        updateProgressBar(timeLeft, totalTime);

        if (timeLeft <= 0) {
            clearInterval(timer);
            generateCode();
        }
    }, 1000);
}

function updateProgressBar(timeLeft, totalTime) {
    const progress = (timeLeft / totalTime) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function copyCodeToClipboard() {
    const codeElement = document.getElementById('code');
    const code = codeElement.textContent;

    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    showAlert('2FA code copied to clipboard!');
}

let alertTimeout1;
let alertTimeout2;

function showAlert(message, isError = false) {
    const alertBox = document.getElementById('alert');

    clearTimeout(alertTimeout1);
    clearTimeout(alertTimeout2);

    alertBox.textContent = message;
    alertBox.className = isError ? 'alert alert-error' : 'alert';
    alertBox.style.display = 'block';
    alertBox.style.opacity = '1';

    alertTimeout1 = setTimeout(() => {
        alertBox.style.opacity = '0';
    }, 2000);

    alertTimeout2 = setTimeout(() => {
        alertBox.style.display = 'none';
        alertBox.style.opacity = '1';
    }, 3000);
}

function resetCodeAndTimer() {
    if (timer) {
        clearInterval(timer);
    }
    document.getElementById('code').textContent = '';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('progress-container').style.display = 'none';
    document.getElementById('progress-bar').style.width = '0%';
}
