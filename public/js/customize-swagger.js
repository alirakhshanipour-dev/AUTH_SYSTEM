(function () {
    // Create link element for Bootstrap CSS
    var link = document.createElement('link');
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    link.integrity = 'sha384-KyZXEAg3QhqLMpG8r+Knujsl5/5hb7V0k9sy8VeMNly6Yz5zLMdJlD6A2mlQ5kF9';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Create script element for Bootstrap JS
    var script = document.createElement('script');
    script.src = 'https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/js/bootstrap.bundle.min.js';
    script.integrity = 'sha384-kaPldLgfiRb6lNU5Qb4Rm9Ki3BLTjxQ2B+5ZjO9yTmI3DlJ+XkYI5q60ftWi0N6l';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
})();
