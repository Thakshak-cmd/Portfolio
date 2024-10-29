document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.redirect-button');
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var targetPage = this.getAttribute('data-target');
            window.location.href = targetPage;
        });
    });
});