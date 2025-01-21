const bits = document.querySelectorAll('.bit');
const hexEl = document.querySelector('#hex-num');
const decEl = document.querySelector('#dec-num');
const variationsEl = document.querySelector('#variations');
const copyEl = document.querySelector('#copy');

let value = 0;
const varbits = [];
let copyStr = '';

const updateVariations = () =>
{
    copyStr = '';

    variationsEl.innerHTML = '';

    if (varbits.length === 0)
        return;

    const numVariations = Math.pow(2, varbits.length);

    for (let j = 0; j < numVariations; j++)
    {
        const pEl = document.createElement('h1');

        let tmp = value;

        for (let k = 0; k < varbits.length; k++)
        {
            if ((j >> k) & 1)
            {
                tmp += Math.pow(2, varbits[k]);
            }
        }

        let binTmpStr = tmp.toString(2).padStart(8, '0');
        let hexTmpStr = tmp.toString(16).padStart(2, '0');
        hexTmpStr = `0x${hexTmpStr}`;

        copyStr += `case ${hexTmpStr}: `;

        pEl.innerHTML = `${binTmpStr} ${hexTmpStr} ${tmp}`;
        variationsEl.appendChild(pEl);
    }
};

bits.forEach((bit, i) =>
{
    const littleEndianIdx = bits.length - i - 1;

    bit.addEventListener('click', (e) =>
    {
        const valEl = bit.querySelector('h1');
        let val = parseInt(valEl.innerHTML);
        const d = Math.pow(2, littleEndianIdx);
        value = !val ? value + d : value - d;
        val = !val + 0;
        valEl.innerHTML = val;
        decEl.innerHTML = value;
        hexEl.innerHTML = `0x${value.toString(16)}`;
        updateVariations();
    });

    bit.addEventListener('contextmenu', (e) =>
    {
        e.preventDefault();
        bit.classList.toggle('variable');

        if (bit.classList.contains('variable'))
        {
            varbits.push(littleEndianIdx);

            let j = varbits.length - 2;

            while (j >= 0 && varbits[j] > varbits[j + 1])
            {
                const tmp = varbits[j];
                varbits[j] = varbits[j + 1];
                varbits[j + 1] = tmp;
                j--;
            }
        }
        else
        {
            for (let j = 0; j < varbits.length; j++)
            {
                if (varbits[j] === littleEndianIdx)
                    varbits.splice(j, 1);
            }
        }

        updateVariations();
    });
});

copyEl.addEventListener('click', e =>
{
    navigator.clipboard.writeText(copyStr);
});