// 다국어 지원 시스템
const languages = {
  ko: {
    // 메인 페이지
    title: "UtilTools - 감성 실용 도구 모음",
    description: "개발자를 위한 실용적인 온라인 도구 모음. Base64 인코더/디코더, JSON 포매터, URL 인코더/디코더, 계산기, 타임스탬프 변환기 등을 제공합니다.",
    keywords: "개발도구, Base64, JSON, URL인코더, 계산기, 타임스탬프, 온라인도구",
    mainTitle: "🔧 UtilTools",
    mainSubtitle: "개발자를 위한 실용적인 온라인 도구 모음",
    
    // 도구 카드들
    base64: {
      title: "Base64 인코더/디코더",
      description: "텍스트를 Base64로 인코딩하거나 디코딩합니다.",
      button: "사용하기"
    },
    json: {
      title: "JSON 포매터",
      description: "JSON 데이터를 읽기 쉽게 포맷팅합니다.",
      button: "사용하기"
    },
    url: {
      title: "URL 인코더/디코더",
      description: "URL을 인코딩하거나 디코딩합니다.",
      button: "사용하기"
    },
    calculator: {
      title: "계산기",
      description: "실용적인 계산기 인터페이스로 빠르고 정확한 계산을 제공합니다.",
      button: "사용하기"
    },
    timestamp: {
      title: "Unix 타임스탬프 변환",
      description: "Unix 타임스탬프를 읽기 쉬운 날짜로 변환합니다.",
      button: "사용하기"
    },
    
    // 사이드바
    sidebar: {
      title: "UtilTools",
      home: "홈",
      textTools: "텍스트 도구",
      devTools: "개발 도구",
      utility: "유틸리티"
    },
    
    // 푸터
    footer: "© 2025 UtilTools. 내가 쓰려고 만든 여러가지 툴.",
    
    // 공통 버튼들
    buttons: {
      copy: "복사",
      clear: "지우기",
      convert: "변환",
      calculate: "계산",
      format: "포맷",
      encode: "인코딩",
      decode: "디코딩"
    },
    
    // 알림 메시지
    messages: {
      copied: "클립보드에 복사되었습니다!",
      error: "오류가 발생했습니다.",
      success: "성공적으로 처리되었습니다."
    },
    
    // 도구별 텍스트
    tools: {
      base64: {
        title: "Base64 인코더/디코더",
        subtitle: "텍스트를 Base64로 인코딩하거나 디코딩합니다",
        encode: "인코딩",
        decode: "디코딩",
        input: "입력 텍스트",
        output: "결과",
        clear: "지우기",
        copy: "복사"
      },
      json: {
        title: "JSON 포매터",
        subtitle: "JSON 데이터를 읽기 쉽게 포맷팅합니다",
        format: "포맷",
        minify: "압축",
        validate: "검증",
        input: "JSON 입력",
        output: "포맷된 JSON",
        clear: "지우기",
        copy: "복사"
      },
      url: {
        title: "URL 인코더/디코더",
        subtitle: "URL을 인코딩하거나 디코딩합니다",
        encode: "인코딩",
        decode: "디코딩",
        input: "입력 URL",
        output: "결과",
        clear: "지우기",
        copy: "복사"
      },
      calculator: {
        title: "간단 계산기",
        subtitle: "수식을 입력하여 빠르게 계산합니다",
        calculate: "계산",
        clear: "지우기",
        result: "결과",
        expression: "수식"
      },
      timestamp: {
        title: "Unix 타임스탬프 변환",
        subtitle: "Unix 타임스탬프를 읽기 쉬운 날짜로 변환합니다",
        convert: "변환",
        clear: "지우기",
        timestamp: "타임스탬프",
        date: "날짜",
        now: "현재 시간"
      },
      color: {
        title: "색상 변환기",
        subtitle: "HEX, RGB, HSL 색상 코드를 서로 변환합니다",
        hex: "HEX",
        rgb: "RGB",
        hsl: "HSL",
        colorCode: "색상 코드",
        colorPreview: "색상 미리보기",
        colorPalette: "색상 팔레트",
        colorInfo: "색상 정보",
        currentColor: "현재 색상"
      },
      regex: {
        title: "정규표현식 테스터",
        subtitle: "정규표현식을 실시간으로 테스트하고 디버깅합니다",
        pattern: "정규표현식 패턴",
        testText: "테스트할 텍스트",
        options: "옵션",
        global: "Global (g)",
        caseInsensitive: "Case Insensitive (i)",
        multiline: "Multiline (m)",
        test: "테스트 실행",
        clear: "결과 지우기",
        matchResults: "매칭 결과",
        examples: "자주 사용하는 정규표현식",
        useExample: "사용하기"
      },
      hash: {
        title: "해시 생성기/검증기",
        subtitle: "MD5, SHA1, SHA256 등 다양한 해시 알고리즘으로 텍스트를 암호화하고 검증합니다",
        inputText: "해시할 텍스트",
        algorithms: "해시 알고리즘",
        generate: "해시 생성",
        clear: "모두 지우기",
        results: "해시 결과",
        fileHash: "파일 해시",
        selectFile: "파일 선택",
        generateFileHash: "파일 해시 생성",
        verify: "해시 검증",
        originalText: "원본 텍스트",
        hashValue: "해시값",
        algorithm: "알고리즘",
        verifyHash: "해시 검증"
      }
    }
  },
  
  en: {
    // 메인 페이지
    title: "UtilTools - Practical Developer Tools",
    description: "A collection of practical online tools for developers. Base64 encoder/decoder, JSON formatter, URL encoder/decoder, calculator, timestamp converter and more.",
    keywords: "developer tools, Base64, JSON, URL encoder, calculator, timestamp, online tools",
    mainTitle: "🔧 UtilTools",
    mainSubtitle: "Practical Online Tools for Developers",
    
    // 도구 카드들
    base64: {
      title: "Base64 Encoder/Decoder",
      description: "Encode or decode text to Base64 format.",
      button: "Use Tool"
    },
    json: {
      title: "JSON Formatter",
      description: "Format JSON data for better readability.",
      button: "Use Tool"
    },
    url: {
      title: "URL Encoder/Decoder",
      description: "Encode or decode URLs.",
      button: "Use Tool"
    },
    calculator: {
      title: "Calculator",
      description: "Practical calculator interface for fast and accurate calculations.",
      button: "Use Tool"
    },
    timestamp: {
      title: "Unix Timestamp Converter",
      description: "Convert Unix timestamps to readable dates.",
      button: "Use Tool"
    },
    
    // 사이드바
    sidebar: {
      title: "UtilTools",
      home: "Home",
      textTools: "Text Tools",
      devTools: "Developer Tools",
      utility: "Utility"
    },
    
    // 푸터
    footer: "© 2025 UtilTools. Practical tools for developers.",
    
    // 공통 버튼들
    buttons: {
      copy: "Copy",
      clear: "Clear",
      convert: "Convert",
      calculate: "Calculate",
      format: "Format",
      encode: "Encode",
      decode: "Decode"
    },
    
    // 알림 메시지
    messages: {
      copied: "Copied to clipboard!",
      error: "An error occurred.",
      success: "Processed successfully."
    },
    
    // 도구별 텍스트
    tools: {
      base64: {
        title: "Base64 Encoder/Decoder",
        subtitle: "Encode or decode text to Base64 format",
        encode: "Encode",
        decode: "Decode",
        input: "Input Text",
        output: "Result",
        clear: "Clear",
        copy: "Copy"
      },
      json: {
        title: "JSON Formatter",
        subtitle: "Format JSON data for better readability",
        format: "Format",
        minify: "Minify",
        validate: "Validate",
        input: "JSON Input",
        output: "Formatted JSON",
        clear: "Clear",
        copy: "Copy"
      },
      url: {
        title: "URL Encoder/Decoder",
        subtitle: "Encode or decode URLs",
        encode: "Encode",
        decode: "Decode",
        input: "Input URL",
        output: "Result",
        clear: "Clear",
        copy: "Copy"
      },
      calculator: {
        title: "Simple Calculator",
        subtitle: "Quickly calculate mathematical expressions",
        calculate: "Calculate",
        clear: "Clear",
        result: "Result",
        expression: "Expression"
      },
      timestamp: {
        title: "Unix Timestamp Converter",
        subtitle: "Convert Unix timestamps to readable dates",
        convert: "Convert",
        clear: "Clear",
        timestamp: "Timestamp",
        date: "Date",
        now: "Current Time"
      },
      color: {
        title: "Color Converter",
        subtitle: "Convert between HEX, RGB, HSL color codes",
        hex: "HEX",
        rgb: "RGB",
        hsl: "HSL",
        colorCode: "Color Code",
        colorPreview: "Color Preview",
        colorPalette: "Color Palette",
        colorInfo: "Color Information",
        currentColor: "Current Color"
      },
      regex: {
        title: "Regex Tester",
        subtitle: "Test and debug regular expressions in real-time",
        pattern: "Regex Pattern",
        testText: "Test Text",
        options: "Options",
        global: "Global (g)",
        caseInsensitive: "Case Insensitive (i)",
        multiline: "Multiline (m)",
        test: "Run Test",
        clear: "Clear Results",
        matchResults: "Match Results",
        examples: "Common Regex Patterns",
        useExample: "Use This"
      },
      hash: {
        title: "Hash Generator/Verifier",
        subtitle: "Encrypt and verify text with various hash algorithms like MD5, SHA1, SHA256",
        inputText: "Text to Hash",
        algorithms: "Hash Algorithms",
        generate: "Generate Hash",
        clear: "Clear All",
        results: "Hash Results",
        fileHash: "File Hash",
        selectFile: "Select File",
        generateFileHash: "Generate File Hash",
        verify: "Hash Verification",
        originalText: "Original Text",
        hashValue: "Hash Value",
        algorithm: "Algorithm",
        verifyHash: "Verify Hash"
      }
    }
  }
};

// 언어 감지 및 설정
class LanguageManager {
  constructor() {
    this.currentLang = this.detectLanguage();
    this.init();
  }
  
  // 브라우저 언어 감지
  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    // 지원하는 언어인지 확인
    if (languages[langCode]) {
      return langCode;
    }
    
    // 기본값은 영어
    return 'en';
  }
  
  // 언어 설정
  setLanguage(langCode) {
    if (languages[langCode]) {
      this.currentLang = langCode;
      localStorage.setItem('preferredLanguage', langCode);
      this.updatePageContent();
    }
  }
  
  // 텍스트 가져오기
  getText(key) {
    const keys = key.split('.');
    let value = languages[this.currentLang];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // 해당 언어에 없으면 영어로 폴백
        value = languages.en;
        for (const fallbackKey of keys) {
          if (value && value[fallbackKey]) {
            value = value[fallbackKey];
          } else {
            return key; // 최종적으로 키 자체를 반환
          }
        }
      }
    }
    
    return value;
  }
  
  // 페이지 내용 업데이트
  updatePageContent() {
    // 메타 태그 업데이트
    document.title = this.getText('title');
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', this.getText('description'));
    }
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', this.getText('keywords'));
    }
    
    // 메인 페이지인지 도구 페이지인지 확인
    const isMainPage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/') || 
                       window.location.pathname === '';
    
    if (isMainPage) {
      // 메인 페이지 업데이트
      this.updateMainPage();
    } else {
      // 도구 페이지 업데이트
      this.updateToolPage();
    }
    
    // 사이드바 업데이트
    this.updateSidebar();
    
    // 푸터 업데이트
    const footer = document.querySelector('footer p');
    if (footer) {
      footer.textContent = this.getText('footer');
    }
    
    // 언어 선택기 업데이트
    this.updateLanguageSelector();
  }
  
  // 메인 페이지 업데이트
  updateMainPage() {
    // 메인 제목 업데이트
    const mainTitle = document.querySelector('.display-4');
    if (mainTitle) {
      mainTitle.textContent = this.getText('mainTitle');
    }
    
    // 메인 부제목 업데이트
    const mainSubtitle = document.querySelector('.lead');
    if (mainSubtitle) {
      mainSubtitle.textContent = this.getText('mainSubtitle');
    }
    
    // 도구 카드들 업데이트
    this.updateToolCards();
  }
  
  // 도구 페이지 업데이트
  updateToolPage() {
    const currentPath = window.location.pathname;
    let toolType = '';
    
    // 현재 도구 타입 감지
    if (currentPath.includes('base64.html')) toolType = 'base64';
    else if (currentPath.includes('json.html')) toolType = 'json';
    else if (currentPath.includes('url.html')) toolType = 'url';
    else if (currentPath.includes('calculator.html')) toolType = 'calculator';
    else if (currentPath.includes('timestamp.html')) toolType = 'timestamp';
    else if (currentPath.includes('color-converter.html')) toolType = 'color';
    else if (currentPath.includes('regex-tester.html')) toolType = 'regex';
    else if (currentPath.includes('hash-generator.html')) toolType = 'hash';
    
    if (toolType) {
      // 페이지 제목 업데이트
      const pageTitle = document.querySelector('.display-5');
      if (pageTitle) {
        pageTitle.innerHTML = `<i class="fas fa-${this.getToolIcon(toolType)}"></i> ${this.getText(`tools.${toolType}.title`)}`;
      }
      
      // 페이지 부제목 업데이트
      const pageSubtitle = document.querySelector('.lead');
      if (pageSubtitle) {
        pageSubtitle.textContent = this.getText(`tools.${toolType}.subtitle`);
      }
      
      // 도구별 특정 요소들 업데이트
      this.updateToolSpecificElements(toolType);
    }
  }
  
  // 도구별 아이콘 반환
  getToolIcon(toolType) {
    const icons = {
      base64: 'code',
      json: 'file-code',
      url: 'link',
      calculator: 'calculator',
      timestamp: 'clock',
      color: 'palette',
      regex: 'search',
      hash: 'fingerprint'
    };
    return icons[toolType] || 'toolbox';
  }
  
  // 도구별 특정 요소들 업데이트
  updateToolSpecificElements(toolType) {
    const toolTexts = this.getText(`tools.${toolType}`);
    
    // 라벨 업데이트
    document.querySelectorAll('label').forEach(label => {
      const text = label.textContent.toLowerCase();
      if (text.includes('입력') || text.includes('input')) {
        label.textContent = toolTexts.input || toolTexts.inputText;
      } else if (text.includes('결과') || text.includes('result')) {
        label.textContent = toolTexts.output || toolTexts.result;
      } else if (text.includes('지우기') || text.includes('clear')) {
        label.textContent = toolTexts.clear;
      } else if (text.includes('복사') || text.includes('copy')) {
        label.textContent = toolTexts.copy;
      }
    });
    
    // 버튼 텍스트 업데이트
    document.querySelectorAll('button').forEach(button => {
      const text = button.textContent.toLowerCase();
      if (text.includes('인코딩') || text.includes('encode')) {
        button.innerHTML = `<i class="fas fa-arrow-right"></i> ${toolTexts.encode}`;
      } else if (text.includes('디코딩') || text.includes('decode')) {
        button.innerHTML = `<i class="fas fa-arrow-left"></i> ${toolTexts.decode}`;
      } else if (text.includes('포맷') || text.includes('format')) {
        button.innerHTML = `<i class="fas fa-magic"></i> ${toolTexts.format}`;
      } else if (text.includes('계산') || text.includes('calculate')) {
        button.innerHTML = `<i class="fas fa-calculator"></i> ${toolTexts.calculate}`;
      } else if (text.includes('변환') || text.includes('convert')) {
        button.innerHTML = `<i class="fas fa-exchange-alt"></i> ${toolTexts.convert}`;
      }
    });
  }
  
  // 도구 카드들 업데이트
  updateToolCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      const toolTypes = ['base64', 'json', 'url', 'calculator', 'timestamp'];
      const toolType = toolTypes[index];
      
      if (toolType) {
        const title = card.querySelector('.card-title');
        const description = card.querySelector('.card-text');
        const button = card.querySelector('.btn');
        
        if (title) title.textContent = this.getText(`${toolType}.title`);
        if (description) description.textContent = this.getText(`${toolType}.description`);
        if (button) button.textContent = this.getText(`${toolType}.button`);
      }
    });
  }
  
  // 사이드바 업데이트
  updateSidebar() {
    const sidebarTitle = document.querySelector('.sidebar-header h2');
    if (sidebarTitle) {
      sidebarTitle.textContent = this.getText('sidebar.title');
    }
    
    // 사이드바 링크들 업데이트
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const icon = link.querySelector('i');
      if (icon) {
        const iconClass = icon.className;
        if (iconClass.includes('fa-home')) {
          link.innerHTML = `<i class="${iconClass}"></i> ${this.getText('sidebar.home')}`;
        }
      }
    });
    
    // 카테고리 헤더들 업데이트
    const categoryHeaders = document.querySelectorAll('.nav-category-header');
    categoryHeaders.forEach(header => {
      const icon = header.querySelector('i:first-child');
      if (icon) {
        const iconClass = icon.className;
        if (iconClass.includes('fa-font')) {
          header.innerHTML = `<i class="${iconClass}"></i> ${this.getText('sidebar.textTools')} <i class="fas fa-chevron-down category-arrow"></i>`;
        } else if (iconClass.includes('fa-code')) {
          header.innerHTML = `<i class="${iconClass}"></i> ${this.getText('sidebar.devTools')} <i class="fas fa-chevron-down category-arrow"></i>`;
        } else if (iconClass.includes('fa-tools')) {
          header.innerHTML = `<i class="${iconClass}"></i> ${this.getText('sidebar.utility')} <i class="fas fa-chevron-down category-arrow"></i>`;
        }
      }
    });
  }
  
  // 언어 선택기 생성
  createLanguageSelector() {
    const selector = document.createElement('div');
    selector.className = 'language-selector';
    selector.innerHTML = `
      <div class="language-buttons">
        <button class="lang-btn ${this.currentLang === 'ko' ? 'active' : ''}" onclick="languageManager.setLanguage('ko')">
          🇰🇷 한국어
        </button>
        <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" onclick="languageManager.setLanguage('en')">
          🇺🇸 English
        </button>
      </div>
    `;
    
    // 헤더에 추가
    const header = document.querySelector('header');
    if (header) {
      header.appendChild(selector);
    }
  }
  
  // 언어 선택기 업데이트
  updateLanguageSelector() {
    const selector = document.querySelector('.language-selector');
    if (selector) {
      const buttons = selector.querySelectorAll('.lang-btn');
      buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes('한국어') && this.currentLang === 'ko') {
          btn.classList.add('active');
        } else if (btn.textContent.includes('English') && this.currentLang === 'en') {
          btn.classList.add('active');
        }
      });
    }
  }
  
  // 초기화
  init() {
    // 저장된 언어 설정 확인
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languages[savedLang]) {
      this.currentLang = savedLang;
    }
    
    // 언어 선택기 생성
    this.createLanguageSelector();
    
    // 페이지 내용 업데이트
    this.updatePageContent();
  }
}

// 전역 언어 매니저 인스턴스
let languageManager; 