function loadProject(project) {
    const iframe = document.getElementById('iframe-content');
    switch (project) {
        case 'splitlist':
            iframe.src = 'projects/splitlist-main/index.html';
            break;
        case 'numberfilter':
            iframe.src = 'projects/NumberFilter-main/index.html';
            break;
        case '2fa':
            iframe.src = 'projects/2FA-main/index.html';
            break;
        case 'charcounter':
            iframe.src = 'projects/Character-Counter-main/index.html';
            break;
        default:
            iframe.src = '';
            break;
    }
}
