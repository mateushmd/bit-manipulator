const bits = document.querySelectorAll('.bit');
const hexEl = document.querySelector('#hex-num');
const decEl = document.querySelector('#dec-num');
const variationsEl = document.querySelector('#variations');

let value = 0;
const varbits = [];

const updateVariations = () =>
{
    variationsEl.innerHTML = '';

    if (varbits.length === 0)
        return;

    const bits = [];

    for (let j = 0; j < varbits.length; j++)
    {
        bits.push(0);
    }

    for (let j = 0; j < Math.pow(2, varbits.length); j++)
    {
        const pEl = document.createElement('h1');

        let tmp = value;

        for (let k = 0; k < varbits.length; k++)
        {
            if (bits[k] === 1)
                tmp += Math.pow(2, varbits[k]);
        }

        let binTmpStr = tmp.toString(2);

        for (let k = binTmpStr.length; k < 8; k++)
            binTmpStr = `0${binTmpStr}`;

        let hexTmpStr = tmp.toString(16);
        if (hexTmpStr.length === 1) hexTmpStr = `0${hexTmpStr}`;
        hexTmpStr = `0x${hexTmpStr}`

        pEl.innerHTML = `${binTmpStr} ${hexTmpStr} ${tmp}`;
        variationsEl.appendChild(pEl);

        for (let k = 0; k < varbits.length; k++)
        {
            let pot = Math.pow(2, k);
            bits[k] = ((j % (2 * pot)) / pot);
        }
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