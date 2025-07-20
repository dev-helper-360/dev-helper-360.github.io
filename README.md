# 🔧 UtilTools - 무료 온라인 개발자 도구 모음

**개발자를 위한 실용적인 무료 온라인 도구 모음집** 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/util-tools-mvp)](https://github.com/yourusername/util-tools-mvp/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/util-tools-mvp)](https://github.com/yourusername/util-tools-mvp/network)

## 🌟 주요 특징

- ✅ **100% 무료** - 모든 도구를 무료로 사용
- ⚡ **실시간 변환** - 입력과 동시에 결과 확인
- 📱 **반응형 디자인** - 모바일/데스크톱 최적화
- 🌍 **다국어 지원** - 한국어/영어 지원
- 🔒 **개인정보 보호** - 서버에 데이터 저장하지 않음
- 🎨 **직관적 UI** - 사용하기 쉬운 인터페이스

## 🛠️ 제공하는 도구들

### 📝 텍스트 변환 도구
- **[Base64 인코더/디코더](tools/base64.html)** - 텍스트를 Base64로 인코딩/디코딩
- **[URL 인코더/디코더](tools/url.html)** - URL을 인코딩/디코딩
- **[JSON 포매터](tools/json.html)** - JSON 데이터 포맷팅 및 검증

### 💻 개발 도구
- **[정규표현식 테스터](tools/regex-tester.html)** - 실시간 정규표현식 테스트
- **[해시 생성기](tools/hash-generator.html)** - MD5, SHA1, SHA256 등 해시 생성
- **[Unix 타임스탬프 변환](tools/timestamp.html)** - 타임스탬프 ↔ 날짜 변환

### 🎨 유틸리티 도구
- **[색상 변환기](tools/color-converter.html)** - HEX ↔ RGB ↔ HSL 변환
- **[간단 계산기](tools/calculator.html)** - 수식 계산 도구

## 🚀 빠른 시작

### 온라인 사용
🌐 **바로 사용하기**: [https://dev-helper-360.github.io](https://dev-helper-360.github.io)

### 로컬 설치
```bash
# 저장소 클론
git clone https://github.com/yourusername/util-tools-mvp.git

# 디렉토리 이동
cd util-tools-mvp

# 로컬 서버 실행 (Python 3)
python -m http.server 8000

# 브라우저에서 접속
open http://localhost:8000
```

## 📁 프로젝트 구조

```
util-tools-mvp/
├── 📄 index.html              # 메인 페이지
├── 📁 css/
│   └── 🎨 style.css           # 스타일시트
├── 📁 js/
│   ├── 🔧 common.js           # 공통 JavaScript
│   ├── 📱 sidebar.js          # 사이드바 기능
│   ├── 🌍 languages.js        # 다국어 지원
│   ├── 🔤 base64.js           # Base64 도구
│   ├── 📋 json.js             # JSON 도구
│   ├── 🔗 url.js              # URL 도구
│   ├── 🧮 calculator.js       # 계산기 도구
│   ├── ⏰ timestamp.js        # 타임스탬프 도구
│   ├── 🎨 color-converter.js  # 색상 변환기
│   ├── 🔍 regex-tester.js     # 정규표현식 테스터
│   └── 🔐 hash-generator.js   # 해시 생성기
├── 📁 tools/
│   ├── 🔤 base64.html         # Base64 도구 페이지
│   ├── 📋 json.html           # JSON 도구 페이지
│   ├── 🔗 url.html            # URL 도구 페이지
│   ├── 🧮 calculator.html     # 계산기 도구 페이지
│   ├── ⏰ timestamp.html      # 타임스탬프 도구 페이지
│   ├── 🎨 color-converter.html # 색상 변환기 페이지
│   ├── 🔍 regex-tester.html   # 정규표현식 테스터 페이지
│   └── 🔐 hash-generator.html # 해시 생성기 페이지
├── 📄 sitemap.xml             # SEO 사이트맵
├── 📄 robots.txt              # 검색엔진 크롤러 설정
└── 📄 README.md               # 프로젝트 문서
```

## 🌍 다국어 지원

- 🇰🇷 **한국어** - 기본 언어
- 🇺🇸 **English** - International users
- 🌐 **자동 감지** - 브라우저 언어 설정 기반
- 🔄 **언어 선택기** - 수동 언어 변경 가능

## 🎨 UI/UX 특징

- **📱 반응형 디자인** - 모든 디바이스 최적화
- **🎯 사이드바 네비게이션** - 카테고리별 도구 분류
- **⚡ 실시간 업데이트** - 입력과 동시에 결과 표시
- **🎨 모던 디자인** - 깔끔하고 직관적인 인터페이스
- **♿ 접근성** - 키보드 네비게이션 지원

## 🚀 배포 가이드

### GitHub Pages (추천)
```bash
# 1. GitHub에 저장소 생성
# 2. 코드 업로드
git add .
git commit -m "Initial commit"
git push origin main

# 3. GitHub Pages 활성화
# Settings > Pages > Source: Deploy from a branch > main
```

### Netlify
```bash
# 1. Netlify 계정 생성
# 2. GitHub 저장소 연결
# 3. 자동 배포 설정
```

### Vercel
```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 배포
vercel
```

## 📊 SEO 최적화

- ✅ **메타 태그** - 완전한 SEO 메타데이터
- ✅ **구조화된 데이터** - Schema.org 마크업
- ✅ **사이트맵** - XML sitemap 제공
- ✅ **Open Graph** - 소셜 미디어 공유 최적화
- ✅ **반응형 디자인** - 모바일 친화적
- ✅ **빠른 로딩** - 최적화된 성능

## 🤝 기여하기

프로젝트 개선에 기여해주세요! 🙏

### 기여 방법
1. 🍴 **Fork** 이 저장소
2. 🌿 **브랜치 생성** (`git checkout -b feature/amazing-feature`)
3. 💾 **변경사항 커밋** (`git commit -m 'Add amazing feature'`)
4. 📤 **브랜치 푸시** (`git push origin feature/amazing-feature`)
5. 🔄 **Pull Request 생성**

### 기여 가이드라인
- 🐛 **버그 리포트**: 명확한 재현 단계 포함
- 💡 **기능 제안**: 구체적인 사용 사례 설명
- 📝 **문서 개선**: 더 나은 설명이나 예제 추가
- 🎨 **UI/UX 개선**: 사용자 경험 향상

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE) 하에 배포됩니다.

```
MIT License

Copyright (c) 2024 UtilTools

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 문의 및 지원

- 🐛 **버그 리포트**: [Issues](https://github.com/yourusername/util-tools-mvp/issues)
- 💡 **기능 제안**: [Discussions](https://github.com/yourusername/util-tools-mvp/discussions)
- 📧 **이메일**: contact@dev-helper-360.github.io

## ⭐ 스타가 되세요!

이 프로젝트가 도움이 되었다면 ⭐을 눌러주세요! 많은 분들이 찾을 수 있도록 도움이 됩니다.

---

**Made with ❤️ for developers around the world**

---

# 🔧 UtilTools - Free Online Developer Tools Collection

**A practical collection of free online tools for developers** 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/util-tools-mvp)](https://github.com/yourusername/util-tools-mvp/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/util-tools-mvp)](https://github.com/yourusername/util-tools-mvp/network)

## 🌟 Key Features

- ✅ **100% Free** - All tools are completely free to use
- ⚡ **Real-time Conversion** - See results instantly as you type
- 📱 **Responsive Design** - Optimized for mobile and desktop
- 🌍 **Multi-language Support** - Korean and English
- 🔒 **Privacy Protected** - No data stored on servers
- 🎨 **Intuitive UI** - Easy-to-use interface

## 🛠️ Available Tools

### 📝 Text Conversion Tools
- **[Base64 Encoder/Decoder](tools/base64.html)** - Encode or decode text to Base64 format
- **[URL Encoder/Decoder](tools/url.html)** - Encode or decode URLs
- **[JSON Formatter](tools/json.html)** - Format and validate JSON data

### 💻 Development Tools
- **[Regex Tester](tools/regex-tester.html)** - Test regular expressions in real-time
- **[Hash Generator](tools/hash-generator.html)** - Generate MD5, SHA1, SHA256 hashes
- **[Unix Timestamp Converter](tools/timestamp.html)** - Convert timestamps to dates

### 🎨 Utility Tools
- **[Color Converter](tools/color-converter.html)** - Convert between HEX, RGB, HSL color codes
- **[Simple Calculator](tools/calculator.html)** - Quick mathematical calculations

## 🚀 Quick Start

### Use Online
🌐 **Try Now**: [https://dev-helper-360.github.io](https://dev-helper-360.github.io)

### Local Installation
```bash
# Clone repository
git clone https://github.com/yourusername/util-tools-mvp.git

# Navigate to directory
cd util-tools-mvp

# Start local server (Python 3)
python -m http.server 8000

# Open in browser
open http://localhost:8000
```

## 🌍 International Support

- 🇰🇷 **Korean** - Default language
- 🇺🇸 **English** - International users
- 🌐 **Auto-detection** - Based on browser language settings
- 🔄 **Language Switcher** - Manual language selection

## 🎨 UI/UX Features

- **📱 Responsive Design** - Optimized for all devices
- **🎯 Sidebar Navigation** - Tools organized by categories
- **⚡ Real-time Updates** - Instant results as you type
- **🎨 Modern Design** - Clean and intuitive interface
- **♿ Accessibility** - Keyboard navigation support

## 🚀 Deployment Guide

### GitHub Pages (Recommended)
```bash
# 1. Create GitHub repository
# 2. Upload code
git add .
git commit -m "Initial commit"
git push origin main

# 3. Enable GitHub Pages
# Settings > Pages > Source: Deploy from a branch > main
```

### Netlify
```bash
# 1. Create Netlify account
# 2. Connect GitHub repository
# 3. Configure auto-deploy
```

### Vercel
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel
```

## 📊 SEO Optimized

- ✅ **Meta Tags** - Complete SEO metadata
- ✅ **Structured Data** - Schema.org markup
- ✅ **Sitemap** - XML sitemap provided
- ✅ **Open Graph** - Social media sharing optimized
- ✅ **Responsive Design** - Mobile-friendly
- ✅ **Fast Loading** - Optimized performance

## 🤝 Contributing

We welcome contributions to improve the project! 🙏

### How to Contribute
1. 🍴 **Fork** this repository
2. 🌿 **Create Branch** (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit Changes** (`git commit -m 'Add amazing feature'`)
4. 📤 **Push Branch** (`git push origin feature/amazing-feature`)
5. 🔄 **Create Pull Request**

### Contribution Guidelines
- 🐛 **Bug Reports**: Include clear reproduction steps
- 💡 **Feature Requests**: Describe specific use cases
- 📝 **Documentation**: Add better explanations or examples
- 🎨 **UI/UX Improvements**: Enhance user experience

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Contact & Support

- 🐛 **Bug Reports**: [Issues](https://github.com/yourusername/util-tools-mvp/issues)
- 💡 **Feature Requests**: [Discussions](https://github.com/yourusername/util-tools-mvp/discussions)
- 📧 **Email**: contact@dev-helper-360.github.io

## ⭐ Star This Project!

If this project helped you, please give it a ⭐! It helps more people discover it.

---

**Made with ❤️ for developers around the world** 