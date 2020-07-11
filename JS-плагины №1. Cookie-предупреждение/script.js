const cookieEl = document.querySelector('.cookie-block');
const okEl = document.querySelector('.ok');

okEl.addEventListener('click', () => {
    cookieEl.style.display = 'none';
});

let cookies = () => {
    if (!Cookies.get('hide-cookie')) {
        setTimeout(() => {
            cookieEl.style.display = 'block';
        }, 1000);
    }

    Cookies.set('hide-cookie', 'true', {
        expires: 30
    });
}


cookies();