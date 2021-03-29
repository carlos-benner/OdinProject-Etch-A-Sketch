function createGrid(height, width) {
    if (!Number.isInteger(height) || !Number.isInteger(width)) return;
    const container = document.querySelector('.container');
    container.innerHTML = '';
    container.setAttribute(
        'style',
        `grid-template-columns: repeat(${width}, 1fr); grid-template-rows: repeat(${height}, 1fr);`
    );
    for (let i = 0; i < height * width; i++) {
        const tile = document.createElement('div');
        container.appendChild(tile);
        tile.addEventListener('mouseover', (e) => {
            if (e.target.style.backgroundColor === '') {
                const color = Math.floor(Math.random() * 2 ** 24)
                    .toString(16)
                    .padStart(6, '0');
                e.target.style.backgroundColor = `#${color}`;
                e.target.setAttribute(
                    `data-color`,
                    e.target.style.backgroundColor
                );
            } else {
                e.target.style.backgroundColor = darken(
                    e.target.style.backgroundColor,
                    e.target.attributes[`data-color`].value,
                    10
                );
            }
        });
    }
}

function start() {
    let width;
    let height;
    while (!Number.isInteger(+width) || width > 100 || width < 16) {
        width = prompt(
            'Enter a number between 16 and 100 for the width of the grid.',
            32
        );
    }
    while (!Number.isInteger(+height) || height > 100 || height < 16) {
        height = prompt(
            'Enter a number between 16 and 100 for the height of the grid.',
            18
        );
    }
    createGrid(+height, +width);
}

function darken(RGBString, originalRGBString, amt) {
    if (
        RGBString == null ||
        RGBString == '' ||
        !Number.isInteger(+amt) ||
        amt < 0
    )
        return RGBString;

    amt = amt > 100 ? 100 : amt;
    let color = getRGBArrayFromRGBString(RGBString);
    let originalColor = getRGBArrayFromRGBString(originalRGBString);

    const [reduceAmountR, reduceAmountG, reduceAmountB] = [
        Math.ceil(originalColor.r * (amt / 100)),
        Math.ceil(originalColor.g * (amt / 100)),
        Math.ceil(originalColor.b * (amt / 100)),
    ];
    color.r = color.r - reduceAmountR < 0 ? 0 : color.r - reduceAmountR;
    color.g = color.g - reduceAmountG < 0 ? 0 : color.g - reduceAmountG;
    color.b = color.b - reduceAmountB < 0 ? 0 : color.b - reduceAmountB;

    return `rgb(${color.r},${color.g},${color.b})`;
}

function getRGBArrayFromRGBString(rgbString) {
    let color = {};
    if (rgbString.startsWith('rgb') || rgbString.startsWith('rgba')) {
        [color.r, color.g, color.b] = rgbString
            .replace('rgb(', '')
            .replace('rgba(', '')
            .replace(')', '')
            .split(',');
    }
    return color;
}

function showResetButton(e) {
    const resetContainer = document.querySelector('.reset-container');
    resetContainer.classList.toggle('hidden');
}

alert('Click anywhere to show the reset button');
start();
