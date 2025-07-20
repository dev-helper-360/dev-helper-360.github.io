// 색상 변환기 기능
class ColorConverter {
  constructor() {
    this.currentColor = '#FF0000';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateColor('#FF0000');
    this.generateColorPalette();
  }

  setupEventListeners() {
    // HEX 입력
    document.getElementById('hexInput').addEventListener('input', (e) => {
      const hex = e.target.value.replace('#', '');
      if (this.isValidHex(hex)) {
        this.updateColor('#' + hex);
      }
    });

    // RGB 입력
    ['rgbR', 'rgbG', 'rgbB'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        this.updateFromRGB();
      });
    });

    // HSL 입력
    ['hslH', 'hslS', 'hslL'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        this.updateFromHSL();
      });
    });
  }

  isValidHex(hex) {
    return /^[0-9A-Fa-f]{6}$/.test(hex);
  }

  updateColor(color) {
    this.currentColor = color;
    this.updateAllInputs();
    this.updatePreviews();
    this.updateColorInfo();
  }

  updateAllInputs() {
    const rgb = this.hexToRgb(this.currentColor);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hex = this.currentColor.replace('#', '');

    // HEX 입력 업데이트
    document.getElementById('hexInput').value = hex;

    // RGB 입력 업데이트
    document.getElementById('rgbR').value = rgb.r;
    document.getElementById('rgbG').value = rgb.g;
    document.getElementById('rgbB').value = rgb.b;

    // HSL 입력 업데이트
    document.getElementById('hslH').value = Math.round(hsl.h);
    document.getElementById('hslS').value = Math.round(hsl.s);
    document.getElementById('hslL').value = Math.round(hsl.l);
  }

  updateFromRGB() {
    const r = parseInt(document.getElementById('rgbR').value) || 0;
    const g = parseInt(document.getElementById('rgbG').value) || 0;
    const b = parseInt(document.getElementById('rgbB').value) || 0;
    
    const hex = this.rgbToHex(r, g, b);
    this.updateColor(hex);
  }

  updateFromHSL() {
    const h = parseInt(document.getElementById('hslH').value) || 0;
    const s = parseInt(document.getElementById('hslS').value) || 0;
    const l = parseInt(document.getElementById('hslL').value) || 0;
    
    const rgb = this.hslToRgb(h, s, l);
    const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
    this.updateColor(hex);
  }

  updatePreviews() {
    const previews = ['hexPreview', 'rgbPreview', 'hslPreview'];
    previews.forEach(id => {
      const preview = document.getElementById(id);
      preview.style.backgroundColor = this.currentColor;
      preview.style.border = '1px solid #ddd';
      preview.style.height = '60px';
      preview.style.borderRadius = '8px';
    });
  }

  updateColorInfo() {
    const rgb = this.hexToRgb(this.currentColor);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    // 현재 색상 표시
    const currentDisplay = document.getElementById('currentColorDisplay');
    currentDisplay.innerHTML = `
      <div style="background-color: ${this.currentColor}; height: 80px; border-radius: 8px; border: 2px solid #ddd;"></div>
    `;

    // 색상 코드 표시
    const colorCodes = document.getElementById('colorCodes');
    colorCodes.innerHTML = `
      <div class="mb-2">
        <strong>HEX:</strong> <code>${this.currentColor}</code>
        <button class="btn btn-sm btn-outline-primary ms-2" onclick="Utils.copyToClipboard('${this.currentColor}')">
          <i class="fas fa-copy"></i>
        </button>
      </div>
      <div class="mb-2">
        <strong>RGB:</strong> <code>rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</code>
        <button class="btn btn-sm btn-outline-primary ms-2" onclick="Utils.copyToClipboard('rgb(${rgb.r}, ${rgb.g}, ${rgb.b})')">
          <i class="fas fa-copy"></i>
        </button>
      </div>
      <div class="mb-2">
        <strong>HSL:</strong> <code>hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)</code>
        <button class="btn btn-sm btn-outline-primary ms-2" onclick="Utils.copyToClipboard('hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)')">
          <i class="fas fa-copy"></i>
        </button>
      </div>
    `;
  }

  generateColorPalette() {
    const palette = document.getElementById('colorPalette');
    const colors = [
      '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00', '#ADFF2F', '#00FF00', '#00FA9A',
      '#00FFFF', '#00BFFF', '#0000FF', '#8A2BE2', '#FF00FF', '#FF1493', '#DC143C', '#800000'
    ];

    palette.innerHTML = colors.map(color => `
      <div class="col-2 col-md-1">
        <div class="palette-color" 
             style="background-color: ${color}; height: 40px; border-radius: 6px; cursor: pointer; border: 2px solid #ddd;"
             onclick="colorConverter.updateColor('${color}')"
             title="${color}">
        </div>
      </div>
    `).join('');
  }

  // 색상 변환 함수들
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: h * 360,
      s: s * 100,
      l: l * 100
    };
  }

  hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }
}

// 색상 변환기 인스턴스 생성
let colorConverter;
document.addEventListener('DOMContentLoaded', function() {
  colorConverter = new ColorConverter();
}); 