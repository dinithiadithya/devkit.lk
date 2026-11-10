const radiusRange = document.getElementById('radiusRange');
const paddingRange = document.getElementById('paddingRange');
const shadowRange = document.getElementById('shadowRange');
const bgColor = document.getElementById('bgColor');

const radiusVal = document.getElementById('radiusVal');
const paddingVal = document.getElementById('paddingVal');
const shadowVal = document.getElementById('shadowVal');

const previewBtn = document.getElementById('previewBtn');
const codeOutput = document.getElementById('codeOutput');
const copyBtn = document.getElementById('copyBtn');

const tabBtn = document.getElementById('tabBtn');
const tabCard = document.getElementById('tabCard');
const tabBadge = document.getElementById('tabBadge');

const modeCss = document.getElementById('modeCss');
const modeTailwind = document.getElementById('modeTailwind');

let currentComponent = 'button';
let currentMode = 'css';

function updateComponent() {
    const radius = radiusRange.value;
    const padding = paddingRange.value;
    const shadow = shadowRange.value;
    const bg = bgColor.value;

    radiusVal.textContent = radius;
    paddingVal.textContent = padding;
    shadowVal.textContent = shadow;

    previewBtn.style.borderRadius = radius + 'px';
    previewBtn.style.padding = padding + 'px ' + (padding * 1.5) + 'px';
    previewBtn.style.backgroundColor = bg;
    previewBtn.style.boxShadow = '0 ' + (shadow / 2) + 'px ' + shadow + 'px rgba(0, 0, 0, 0.4)';

    if (currentComponent === 'button') {
        previewBtn.textContent = 'Explore Component';
    } else if (currentComponent === 'card') {
        previewBtn.textContent = 'Card Component Box';
    } else if (currentComponent === 'badge') {
        previewBtn.textContent = 'New Feature Badge';
    }

    if (currentMode === 'css') {
        codeOutput.textContent = 
`border-radius: ${radius}px;
padding: ${padding}px ${padding * 1.5}px;
background-color: ${bg};
box-shadow: 0 ${Math.round(shadow/2)}px ${shadow}px rgba(0, 0, 0, 0.4);`;
    } else {
        codeOutput.textContent = `<div class="rounded-[${radius}px] p-[${padding}px] bg-[${bg}] shadow-[0_${Math.round(shadow/2)}px_${shadow}px_rgba(0,0,0,0.4)]">
    ${previewBtn.textContent}
</div>`;
    }
}

[tabBtn, tabCard, tabBadge].forEach(tab => {
    tab.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentComponent = e.target.id.replace('tab', '').toLowerCase();
        updateComponent();
    });
});

[modeCss, modeTailwind].forEach(mode => {
    mode.addEventListener('click', (e) => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentMode = e.target.id === 'modeCss' ? 'css' : 'tailwind';
        updateComponent();
    });
});

[radiusRange, paddingRange, shadowRange, bgColor].forEach(input => {
    input.addEventListener('input', updateComponent);
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(codeOutput.textContent).then(() => {
        copyBtn.textContent = 'Copied! 🎉';
        copyBtn.classList.add('copy-feedback');
        setTimeout(() => {
            copyBtn.textContent = 'Copy Code';
            copyBtn.classList.remove('copy-feedback');
        }, 2000);
    });
});

updateComponent();