const bits = document.querySelectorAll('.bit');
const hexEl = document.querySelector('#hex-num');
const decEl = document.querySelector('#dec-num');

let value = 0;

bits.forEach((bit, i) =>
{
    bit.addEventListener('click', (e) =>
    {
        const valEl = bit.querySelector('h1');
        let val = parseInt(valEl.innerHTML);
        const d = Math.pow(2, bits.length - i - 1);
        value = !val ? value + d : value - d;
        val = !val + 0;
        valEl.innerHTML = val;
        decEl.innerHTML = value;
        hexEl.innerHTML = `0x${value.toString(16)}`;
    });
});