let currentComponent = 'button';
let currentMode = 'css';

const radiusInput = document.getElementById('radiusInput');
const paddingInput = document.getElementById('paddingInput');
const shadowInput = document.getElementById('shadowInput');
const bgColorPicker = document.getElementById('bgColorPicker');

const radiusVal = document.getElementById('radiusVal');
const paddingVal = document.getElementById('paddingVal');
const shadowVal = document.getElementById('shadowVal');
const colorHexVal = document.getElementById('colorHexVal');

const previewComponent = document.getElementById('previewComponent');
const codeOutput = document.getElementById('codeOutput');
const bodyTag = document.getElementById('bodyTag');

function updatePreview() {
    const radius = radiusInput.value;
    const padding = paddingInput.value;
    const shadow = shadowInput.value;
    const color = bgColorPicker.value;

    radiusVal.textContent = radius + 'px';
    paddingVal.textContent = padding + 'px';
    shadowVal.textContent = shadow + 'px';
    colorHexVal.textContent = color;

    previewComponent.style.borderRadius = radius + 'px';
    previewComponent.style.padding = padding + 'px ' + (padding * 1.5) + 'px';
    previewComponent.style.boxShadow = '0px ' + (shadow / 2) + 'px ' + shadow + 'px rgba(0, 0, 0, 0.4)';
    previewComponent.style.backgroundColor = color;

    generateCode(radius, padding, shadow, color);
}

function generateCode(radius, padding, shadow, color) {
    if (currentMode === 'css') {
        codeOutput.textContent = 
'.custom-' + currentComponent + ' {\n' +
'  background-color: ' + color + ';\n' +
'  border-radius: ' + radius + 'px;\n' +
'  padding: ' + padding + 'px ' + (padding * 1.5) + 'px;\n' +
'  box-shadow: 0px ' + Math.round(shadow / 2) + 'px ' + shadow + 'px rgba(0, 0, 0, 0.4);\n' +
'  color: #ffffff;\n' +
'  transition: all 0.3s ease;\n' +
'}';
    } else {
        codeOutput.textContent = 
'<div class="bg-[' + color + '] rounded-[' + radius + 'px] px-[' + Math.round(padding * 1.5) + 'px] py-[' + padding + 'px] shadow-[0_' + Math.round(shadow / 2) + 'px_' + shadow + 'px_rgba(0,0,0,0.4)] text-white">\n' +
'  ' + currentComponent.charAt(0).toUpperCase() + currentComponent.slice(1) + ' Component\n' +
'</div>';
    }
}

function switchTab(component) {
    currentComponent = component;
    
    const btnButton = document.getElementById('tabButton');
    const btnCard = document.getElementById('tabCard');
    const btnBadge = document.getElementById('tabBadge');

    if (component === 'button') {
        btnButton.className = 'tab-btn py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white transition';
        btnCard.className = 'tab-btn py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition';
        btnBadge.className = 'tab-btn py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition';
        previewComponent.textContent = 'Explore Component';
    } else if (component === 'card') {
        btnButton.className = 'tab-btn py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition';
        btnCard.className = 'tab-btn py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white transition';
        btnBadge.className = 'tab-btn py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition';
        previewComponent.textContent = 'Pro Card Content Area';
    } else if (component === 'badge') {
        btnButton.className = 'tab-btn py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition';
        btnCard.className = 'tab-btn py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white transition';
        btnBadge.className = 'tab-btn py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white transition';
        previewComponent.textContent = 'New Feature';
    }

    updatePreview();
}

function setMode(mode) {
    currentMode = mode;
    const btnCss = document.getElementById('modeCss');
    const btnTailwind = document.getElementById('modeTailwind');

    if (mode === 'css') {
        btnCss.className = 'px-3 py-1 text-xs font-semibold rounded-md bg-indigo-600 text-white transition';
        btnTailwind.className = 'px-3 py-1 text-xs font-semibold rounded-md text-gray-400 hover:text-white transition';
    } else {
        btnTailwind.className = 'px-3 py-1 text-xs font-semibold rounded-md bg-indigo-600 text-white transition';
        btnCss.className = 'px-3 py-1 text-xs font-semibold rounded-md text-gray-400 hover:text-white transition';
    }
    updatePreview();
}

function setThemeColor(hexColor) {
    bgColorPicker.value = hexColor;
    updatePreview();
}

function copyCode() {
    navigator.clipboard.writeText(codeOutput.textContent);
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.textContent = '✅ Copied!';
    setTimeout(function() {
        copyBtn.textContent = '📋 Copy Code';
    }, 2000);
}

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

themeToggle.addEventListener('click', function() {
    if (bodyTag.classList.contains('bg-gray-900')) {
        bodyTag.classList.remove('bg-gray-900', 'text-white');
        bodyTag.classList.add('bg-gray-100', 'text-gray-900');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
    } else {
        bodyTag.classList.remove('bg-gray-100', 'text-gray-900');
        bodyTag.classList.add('bg-gray-900', 'text-white');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
    }
});

radiusInput.addEventListener('input', updatePreview);
paddingInput.addEventListener('input', updatePreview);
shadowInput.addEventListener('input', updatePreview);
bgColorPicker.addEventListener('input', updatePreview);

updatePreview();