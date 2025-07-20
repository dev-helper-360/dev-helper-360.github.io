// 정규표현식 테스터 기능
class RegexTester {
  constructor() {
    this.debounceTimer = null;
    this.lastPattern = '';
    this.lastTestText = '';
    this.lastFlags = '';
    this.isProcessing = false;
    this.init();
  }

  init() {
    this.loadExamples();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // 디바운싱을 적용한 실시간 테스트 (300ms 지연)
    document.getElementById('regexInput').addEventListener('input', () => {
      this.debouncedTest();
    });

    document.getElementById('testText').addEventListener('input', () => {
      this.debouncedTest();
    });

    // 플래그 변경 시 즉시 테스트
    ['globalFlag', 'caseInsensitiveFlag', 'multilineFlag'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => {
        this.testRegex();
      });
    });
  }

  debouncedTest() {
    // 이전 타이머 취소
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    // 새로운 타이머 설정 (300ms 후 실행)
    this.debounceTimer = setTimeout(() => {
      this.testRegex();
    }, 300);
  }

  testRegex() {
    // 이미 처리 중이면 중단
    if (this.isProcessing) {
      return;
    }

    const pattern = document.getElementById('regexInput').value;
    const testText = document.getElementById('testText').value;
    
    // 플래그 구성
    let flags = '';
    if (document.getElementById('globalFlag').checked) flags += 'g';
    if (document.getElementById('caseInsensitiveFlag').checked) flags += 'i';
    if (document.getElementById('multilineFlag').checked) flags += 'm';

    // 입력이 없으면 초기 상태 표시
    if (!pattern || !testText) {
      this.showResults('테스트할 정규표현식과 텍스트를 입력해주세요.');
      return;
    }

    // 캐시된 결과와 동일한지 확인
    if (pattern === this.lastPattern && 
        testText === this.lastTestText && 
        flags === this.lastFlags) {
      return; // 동일한 입력이면 재실행하지 않음
    }

    // 처리 중 표시
    this.isProcessing = true;
    this.showLoading();

    // 비동기로 처리하여 UI 블로킹 방지
    setTimeout(() => {
      try {
        // 정규표현식 생성
        const cleanPattern = pattern.replace(/^\/|\/[gim]*$/g, '');
        const regex = new RegExp(cleanPattern, flags);

        // 매칭 실행 (최대 1000개로 제한)
        const matches = [];
        let match;
        let matchCount = 0;
        const maxMatches = 1000;
        
        while ((match = regex.exec(testText)) !== null && matchCount < maxMatches) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          
          matchCount++;
          
          // Global 플래그가 없으면 무한 루프 방지
          if (!flags.includes('g')) break;
        }

        // 결과 캐시 업데이트
        this.lastPattern = pattern;
        this.lastTestText = testText;
        this.lastFlags = flags;

        this.displayResults(matches, testText, regex, matchCount >= maxMatches);

      } catch (error) {
        this.showResults(`정규표현식 오류: ${error.message}`, 'error');
      } finally {
        this.isProcessing = false;
      }
    }, 10); // 10ms 지연으로 UI 블로킹 방지
  }

  showLoading() {
    const resultsDiv = document.getElementById('matchResults');
    resultsDiv.innerHTML = `
      <div class="alert alert-info">
        <i class="fas fa-spinner fa-spin"></i> 정규표현식을 테스트하고 있습니다...
      </div>
    `;
  }

  displayResults(matches, testText, regex, limitReached = false) {
    const resultsDiv = document.getElementById('matchResults');
    
    if (matches.length === 0) {
      resultsDiv.innerHTML = `
        <div class="alert alert-info">
          <i class="fas fa-info-circle"></i> 매칭되는 결과가 없습니다.
        </div>
      `;
      return;
    }

    let html = `
      <div class="alert alert-success">
        <i class="fas fa-check-circle"></i> ${matches.length}개의 매칭 결과를 찾았습니다.
        ${limitReached ? '<br><small class="text-warning"><i class="fas fa-exclamation-triangle"></i> 성능을 위해 최대 1000개까지만 표시됩니다.</small>' : ''}
      </div>
      <div class="mb-3">
        <h6>매칭된 텍스트:</h6>
        <div class="highlighted-text" style="background: #f8f9fa; padding: 1rem; border-radius: 0.5rem; font-family: monospace; white-space: pre-wrap;">${this.highlightMatches(testText, matches)}</div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>매칭된 텍스트</th>
              <th>위치</th>
              <th>그룹</th>
            </tr>
          </thead>
          <tbody>
    `;

    matches.forEach((match, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td><code>${this.escapeHtml(match.text)}</code></td>
          <td>${match.index}</td>
          <td>${match.groups.length > 0 ? match.groups.map(g => `<code>${this.escapeHtml(g)}</code>`).join(', ') : '-'}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    resultsDiv.innerHTML = html;
  }

  highlightMatches(text, matches) {
    // 텍스트가 너무 길면 하이라이팅 건너뛰기 (성능 최적화)
    if (text.length > 10000) {
      return `<div class="text-muted">텍스트가 너무 길어 하이라이팅을 건너뜁니다. (${text.length}자)</div>`;
    }

    // 매칭이 너무 많으면 하이라이팅 건너뛰기
    if (matches.length > 100) {
      return `<div class="text-muted">매칭이 너무 많아 하이라이팅을 건너뜁니다. (${matches.length}개 매칭)</div>`;
    }

    let highlightedText = text;
    let offset = 0;

    // 매칭을 인덱스 순으로 정렬
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    sortedMatches.forEach(match => {
      const before = highlightedText.substring(0, match.index + offset);
      const matched = highlightedText.substring(match.index + offset, match.index + offset + match.text.length);
      const after = highlightedText.substring(match.index + offset + match.text.length);
      
      highlightedText = before + `<mark style="background-color: #ffeb3b; padding: 2px;">${this.escapeHtml(matched)}</mark>` + after;
      offset += 25; // <mark> 태그 길이만큼 오프셋 조정
    });

    return highlightedText;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showResults(message, type = 'info') {
    const resultsDiv = document.getElementById('matchResults');
    const alertClass = type === 'error' ? 'alert-danger' : 'alert-info';
    const icon = type === 'error' ? 'exclamation-triangle' : 'info-circle';
    
    resultsDiv.innerHTML = `
      <div class="alert ${alertClass}">
        <i class="fas fa-${icon}"></i> ${message}
      </div>
    `;
  }

  clearResults() {
    // 캐시 초기화
    this.lastPattern = '';
    this.lastTestText = '';
    this.lastFlags = '';
    this.isProcessing = false;
    
    // 타이머 취소
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }

    document.getElementById('matchResults').innerHTML = '';
    document.getElementById('regexInput').value = '';
    document.getElementById('testText').value = '';
    document.getElementById('globalFlag').checked = true;
    document.getElementById('caseInsensitiveFlag').checked = false;
    document.getElementById('multilineFlag').checked = false;
  }

  loadExamples() {
    const examples = [
      {
        name: '이메일 주소',
        pattern: '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/',
        description: '이메일 주소 형식 검증'
      },
      {
        name: '전화번호',
        pattern: '/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/',
        description: '한국 휴대폰 번호 형식'
      },
      {
        name: 'URL',
        pattern: '/^https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-\\.,@?^=%&:\\/~\\+#]*[\\w\\-\\@?^=%&\\/~\\+#])?$/',
        description: 'URL 형식 검증'
      },
      {
        name: '숫자만',
        pattern: '/^[0-9]+$/',
        description: '숫자로만 구성된 문자열'
      },
      {
        name: '영문 소문자',
        pattern: '/[a-z]+/g',
        description: '영문 소문자 연속 매칭'
      },
      {
        name: 'HTML 태그',
        pattern: '/<[^>]+>/g',
        description: 'HTML 태그 찾기'
      }
    ];

    const examplesDiv = document.getElementById('regexExamples');
    examplesDiv.innerHTML = examples.map(example => `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title">${example.name}</h6>
            <p class="card-text small text-muted">${example.description}</p>
            <code class="d-block mb-2" style="font-size: 0.9rem;">${example.pattern}</code>
            <button class="btn btn-sm btn-outline-primary" onclick="regexTester.loadExample('${example.pattern}')">
              <i class="fas fa-arrow-right"></i> 사용하기
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  loadExample(pattern) {
    document.getElementById('regexInput').value = pattern;
    this.testRegex();
  }
}

// 정규표현식 테스터 인스턴스 생성
let regexTester;
document.addEventListener('DOMContentLoaded', function() {
  regexTester = new RegexTester();
}); 