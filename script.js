let currentComponent = 'button';
let currentMode = 'css';

const radiusInput = document.getElementById('radiusInput');
const paddingInput = document.getElementById('paddingInput');
const shadowInput = document.getElementById('shadowInput');
const bgColorPicker = document.getElementById('bgColorPicker');
const borderStyleSelect = document.getElementById('borderStyleSelect');
const textSizeSelect = document.getElementById('textSizeSelect');
const minifierToggle = document.getElementById('minifierToggle');

const radiusVal = document.getElementById('radiusVal');
const paddingVal = document.getElementById('paddingVal');
const shadowVal = document.getElementById('shadowVal');
const colorHexVal = document.getElementById('colorHexVal');

const previewComponent = document.getElementById('previewComponent');
const previewContainer = document.getElementById('previewContainer');
const codeOutput = document.getElementById('codeOutput');
const bodyTag = document.getElementById('bodyTag');
const toast = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

function updatePreview() {
    const radius = radiusInput.value;
    const padding = paddingInput.value;
    const shadow = shadowInput.value;
    const color = bgColorPicker.value;
    const borderStyle = borderStyleSelect.value;
    const textSize = textSizeSelect.value;

    radiusVal.textContent = radius + 'px';
    paddingVal.textContent = padding + 'px';
    shadowVal.textContent = shadow + 'px';
    colorHexVal.textContent = color;

    previewComponent.style.borderRadius = radius + 'px';
    previewComponent.style.padding = padding + 'px ' + (padding * 1.5) + 'px';
    previewComponent.style.boxShadow = '0px ' + (shadow / 2) + 'px ' + shadow + 'px rgba(0, 0, 0, 0.4)';
    previewComponent.style.backgroundColor = color;
    previewComponent.style.borderWidth = borderStyle === 'none' ? '0px' : '2px';
    previewComponent.style.borderStyle = borderStyle;
    previewComponent.style.borderColor = '#ffffff';
    previewComponent.style.fontSize = textSize;

    generateCode(radius, padding, shadow, color, borderStyle, textSize);
}

function generateCode(radius, padding, shadow, color, borderStyle, textSize) {
    const isMinified = minifierToggle.checked;
    let code = '';

    if (currentMode === 'css') {
        if (isMinified) {
            code = '.custom-' + currentComponent + '{background-color:' + color + ';border-radius:' + radius + 'px;padding:' + padding + 'px ' + (padding * 1.5) + 'px;box-shadow:0px ' + Math.round(shadow / 2) + 'px ' + shadow + 'px rgba(0,0,0,0.4);border:' + (borderStyle === 'none' ? 'none' : '2px ' + borderStyle + ' #ffffff') + ';font-size:' + textSize + ';color:#ffffff;transition:all 0.3s ease;}';
        } else {
            code = 
'.custom-' + currentComponent + ' {\n' +
'  background-color: ' + color + ';\n' +
'  border-radius: ' + radius + 'px;\n' +
'  padding: ' + padding + 'px ' + (padding * 1.5) + 'px;\n' +
'  box-shadow: 0px ' + Math.round(shadow / 2) + 'px ' + shadow + 'px rgba(0, 0, 0, 0.4);\n' +
'  border: ' + (borderStyle === 'none' ? 'none' : '2px ' + borderStyle + ' #ffffff') + ';\n' +
'  font-size: ' + textSize + ';\n' +
'  color: #ffffff;\n' +
'  transition: all 0.3s ease;\n' +
'}';
        }
    } else {
        if (isMinified) {
            code = '<div class="bg-[' + color + '] rounded-[' + radius + 'px] px-[' + Math.round(padding * 1.5) + 'px] py-[' + padding + 'px] shadow-[0_' + Math.round(shadow / 2) + 'px_' + shadow + 'px_rgba(0,0,0,0.4)] border-2 border-' + borderStyle + ' text-[' + textSize + '] text-white">' + currentComponent.charAt(0).toUpperCase() + currentComponent.slice(1) + ' Component</div>';
        } else {
            code = 
'<div class="bg-[' + color + '] rounded-[' + radius + 'px] px-[' + Math.round(padding * 1.5) + 'px] py-[' + padding + 'px] shadow-[0_' + Math.round(shadow / 2) + 'px_' + shadow + 'px_rgba(0,0,0,0.4)] border-2 border-' + borderStyle + ' text-[' + textSize + '] text-white">\n' +
'  ' + currentComponent.charAt(0).toUpperCase() + currentComponent.slice(1) + ' Component\n' +
'</div>';
        }
    }
    codeOutput.textContent = code;
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

function applyPreset(radius, padding, shadow, color) {
    radiusInput.value = radius;
    paddingInput.value = padding;
    shadowInput.value = shadow;
    bgColorPicker.value = color;
    updatePreview();
}

function setScreenSize(size) {
    const btnFull = document.getElementById('screenFull');
    const btnTablet = document.getElementById('screenTablet');
    const btnMobile = document.getElementById('screenMobile');

    btnFull.className = 'px-2.5 py-1 text-xs font-medium rounded text-gray-400 hover:text-white transition';
    btnTablet.className = 'px-2.5 py-1 text-xs font-medium rounded text-gray-400 hover:text-white transition';
    btnMobile.className = 'px-2.5 py-1 text-xs font-medium rounded text-gray-400 hover:text-white transition';

    if (size === 'full') {
        previewContainer.style.maxWidth = '100%';
        btnFull.className = 'px-2.5 py-1 text-xs font-medium rounded bg-indigo-600 text-white transition';
    } else if (size === 'tablet') {
        previewContainer.style.maxWidth = '480px';
        btnTablet.className = 'px-2.5 py-1 text-xs font-medium rounded bg-indigo-600 text-white transition';
    } else if (size === 'mobile') {
        previewContainer.style.maxWidth = '300px';
        btnMobile.className = 'px-2.5 py-1 text-xs font-medium rounded bg-indigo-600 text-white transition';
    }
}

function saveToFavorites() {
    const savedData = {
        component: currentComponent,
        radius: radiusInput.value,
        padding: paddingInput.value,
        shadow: shadowInput.value,
        color: bgColorPicker.value
    };
    localStorage.setItem('devKitFavorite', JSON.stringify(savedData));
    showToast('⭐ Component saved to favorites successfully!');
}

function downloadCodeFile() {
    const code = codeOutput.textContent;
    const filename = currentMode === 'css' ? 'style.css' : 'index.html';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    showToast('📥 Code file downloaded successfully!');
}

function showToast(msg) {
    if (toast && toastMessage) {
        toastMessage.textContent = msg;
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        
        setTimeout(function() {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 2500);
    }
}

function copyCode() {
    navigator.clipboard.writeText(codeOutput.textContent);
    showToast('✅ Code copied to clipboard successfully!');
}

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

if (themeToggle) {
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
}

radiusInput.addEventListener('input', updatePreview);
paddingInput.addEventListener('input', updatePreview);
shadowInput.addEventListener('input', updatePreview);
bgColorPicker.addEventListener('input', updatePreview);
minifierToggle.addEventListener('change', updatePreview);

updatePreview();