// JSON 포매터 및 뷰어 클래스
class JsonFormatter {
  constructor() {
    this.currentJson = null;
    this.jsonViewer = null;
    this.resultTextarea = null;
    this.initializeElements();
  }

  // DOM 요소 초기화
  initializeElements() {
    // DOM이 로드되면 요소들을 가져오기
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.jsonViewer = document.getElementById('jsonViewer');
        this.resultTextarea = document.getElementById('resultJson');
      });
    } else {
      // DOM이 이미 로드된 경우
      this.jsonViewer = document.getElementById('jsonViewer');
      this.resultTextarea = document.getElementById('resultJson');
    }
  }

  // JSON 포맷팅 메인 함수
  formatJson() {
    const input = document.getElementById('inputJson').value.trim();
    
    if (!input) {
      this.showEmptyMessage();
      return;
    }

    try {
      const parsed = JSON.parse(input);
      this.currentJson = parsed;
      const pretty = JSON.stringify(parsed, null, 2);
      
      // 원본 텍스트 저장
      this.resultTextarea.value = pretty;
      
      // 대화형 뷰어 생성
      this.createInteractiveViewer(parsed);
      
    } catch (e) {
      this.showErrorMessage(`JSON 구문 오류: ${e.message}`);
    }
  }

  // 대화형 JSON 뷰어 생성
  createInteractiveViewer(jsonData) {
    const viewerHtml = this.generateJsonHtml(jsonData, 0);
    this.jsonViewer.innerHTML = viewerHtml;
    
    // 이벤트 리스너 추가
    this.addViewerEventListeners();
  }

  // JSON을 HTML로 변환
  generateJsonHtml(data, level = 0) {
    const indent = '  '.repeat(level);
    
    if (data === null) {
      return `<span class="json-null">null</span>`;
    }
    
    if (typeof data === 'boolean') {
      return `<span class="json-boolean">${data}</span>`;
    }
    
    if (typeof data === 'number') {
      return `<span class="json-number">${data}</span>`;
    }
    
    if (typeof data === 'string') {
      return `<span class="json-string">"${this.escapeHtml(data)}"</span>`;
    }
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return `<span class="json-bracket">[]</span>`;
      }
      
      const items = data.map((item, index) => {
        const itemHtml = this.generateJsonHtml(item, level + 1);
        return `
          <div class="json-line json-array-item">
            <div class="json-indent"></div>
            <div class="json-value">${itemHtml}${index < data.length - 1 ? '<span class="json-comma">,</span>' : ''}</div>
          </div>
        `;
      }).join('');
      
      return `
        <div class="json-node" data-type="array" data-level="${level}">
          <span class="json-toggle" data-action="toggle">▶</span>
          <span class="json-bracket">[</span>
          <div class="json-children">
            ${items}
          </div>
          <span class="json-bracket">]</span>
        </div>
      `;
    }
    
    if (typeof data === 'object') {
      const keys = Object.keys(data);
      
      if (keys.length === 0) {
        return `<span class="json-bracket">{}</span>`;
      }
      
      const items = keys.map((key, index) => {
        const valueHtml = this.generateJsonHtml(data[key], level + 1);
        return `
          <div class="json-line">
            <div class="json-indent"></div>
            <div class="json-value">
              <span class="json-key">"${this.escapeHtml(key)}"</span>: ${valueHtml}${index < keys.length - 1 ? '<span class="json-comma">,</span>' : ''}
            </div>
          </div>
        `;
      }).join('');
      
      return `
        <div class="json-node" data-type="object" data-level="${level}">
          <span class="json-toggle" data-action="toggle">▶</span>
          <span class="json-bracket">{</span>
          <div class="json-children">
            ${items}
          </div>
          <span class="json-bracket">}</span>
        </div>
      `;
    }
    
    return '';
  }

  // HTML 이스케이프
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 뷰어 이벤트 리스너 추가
  addViewerEventListeners() {
    const toggles = this.jsonViewer.querySelectorAll('.json-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleNode(toggle);
      });
    });

    const nodes = this.jsonViewer.querySelectorAll('.json-node');
    nodes.forEach(node => {
      node.addEventListener('click', (e) => {
        if (e.target.classList.contains('json-toggle')) return;
        const toggle = node.querySelector('.json-toggle');
        if (toggle) {
          this.toggleNode(toggle);
        }
      });
    });
  }

  // 노드 토글 (접기/펼기)
  toggleNode(toggle) {
    const node = toggle.closest('.json-node');
    const children = node.querySelector('.json-children');
    
    if (children.classList.contains('collapsed')) {
      // 펼기
      children.classList.remove('collapsed');
      toggle.classList.remove('collapsed');
      toggle.textContent = '▼';
    } else {
      // 접기
      children.classList.add('collapsed');
      toggle.classList.add('collapsed');
      toggle.textContent = '▶';
    }
  }

  // 모든 노드 펼기
  toggleAllNodes() {
    const toggles = this.jsonViewer.querySelectorAll('.json-toggle');
    toggles.forEach(toggle => {
      const children = toggle.closest('.json-node').querySelector('.json-children');
      children.classList.remove('collapsed');
      toggle.classList.remove('collapsed');
      toggle.textContent = '▼';
    });
  }

  // 모든 노드 접기
  collapseAllNodes() {
    const toggles = this.jsonViewer.querySelectorAll('.json-toggle');
    toggles.forEach(toggle => {
      const children = toggle.closest('.json-node').querySelector('.json-children');
      children.classList.add('collapsed');
      toggle.classList.add('collapsed');
      toggle.textContent = '▶';
    });
  }

  // 빈 메시지 표시
  showEmptyMessage() {
    this.jsonViewer.innerHTML = `
      <div class="text-center text-muted py-4">
        <i class="fas fa-file-code fa-2x mb-3"></i>
        <p>JSON을 입력하고 포맷팅 버튼을 클릭하세요.</p>
      </div>
    `;
    this.resultTextarea.value = '';
  }

  // 오류 메시지 표시
  showErrorMessage(message) {
    this.jsonViewer.innerHTML = `
      <div class="text-center text-danger py-4">
        <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
        <p>${message}</p>
      </div>
    `;
    this.resultTextarea.value = message;
  }

  // 입력 지우기
  clearInput() {
    document.getElementById('inputJson').value = '';
    this.showEmptyMessage();
  }

  // 결과 복사
  copyResult() {
    if (this.currentJson) {
      const pretty = JSON.stringify(this.currentJson, null, 2);
      navigator.clipboard.writeText(pretty).then(() => {
        this.showToast('클립보드에 복사되었습니다!', 'success');
      }).catch(() => {
        // 폴백: 구식 방법
        this.resultTextarea.style.display = 'block';
        this.resultTextarea.select();
        document.execCommand('copy');
        this.resultTextarea.style.display = 'none';
        this.showToast('클립보드에 복사되었습니다!', 'success');
      });
    } else {
      this.showToast('복사할 JSON이 없습니다.', 'error');
    }
  }

  // JSON 압축
  minifyJson() {
    if (this.currentJson) {
      try {
        const minified = JSON.stringify(this.currentJson);
        this.resultTextarea.value = minified;
        this.showToast('JSON이 압축되었습니다.', 'success');
      } catch (e) {
        this.showToast('압축 중 오류가 발생했습니다.', 'error');
      }
    } else {
      this.showToast('압축할 JSON이 없습니다.', 'error');
    }
  }

  // 샘플 로드
  loadSample() {
    const sample = {
      "name": "홍길동",
      "age": 30,
      "email": "hong@example.com",
      "active": true,
      "hobbies": ["독서", "여행", "프로그래밍"],
      "address": {
        "city": "서울",
        "district": "강남구",
        "zipcode": "12345",
        "details": {
          "street": "테헤란로 123",
          "building": "ABC빌딩"
        }
      },
      "preferences": {
        "theme": "dark",
        "language": "ko",
        "notifications": {
          "email": true,
          "sms": false,
          "push": true
        }
      },
      "metadata": {
        "created": "2024-01-01T00:00:00Z",
        "updated": "2024-01-15T12:30:00Z",
        "version": "1.0.0"
      }
    };
    
    document.getElementById('inputJson').value = JSON.stringify(sample, null, 2);
    this.formatJson();
  }

  // 토스트 메시지 표시
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}-circle me-2"></i>
        <span>${message}</span>
        <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 3000);
  }
}

// 전역 JSON 포매터 인스턴스
let jsonFormatter = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  jsonFormatter = new JsonFormatter();
});

// 즉시 실행 함수로 전역 함수들을 미리 정의
(function() {
  window.formatJson = function() {
    // jsonFormatter가 없거나 DOM 요소가 없는 경우 초기화
    if (!jsonFormatter) {
      jsonFormatter = new JsonFormatter();
    }
    
    // DOM 요소가 없는 경우 다시 가져오기
    if (!jsonFormatter.jsonViewer || !jsonFormatter.resultTextarea) {
      jsonFormatter.jsonViewer = document.getElementById('jsonViewer');
      jsonFormatter.resultTextarea = document.getElementById('resultJson');
    }
    
    if (jsonFormatter && jsonFormatter.jsonViewer && jsonFormatter.resultTextarea) {
      jsonFormatter.formatJson();
    } else {
      // DOM이 로드되지 않았을 경우 잠시 대기
      setTimeout(() => {
        window.formatJson();
      }, 100);
    }
  };

  window.clearInput = function() {
    if (!jsonFormatter) {
      jsonFormatter = new JsonFormatter();
    }
    if (!jsonFormatter.jsonViewer || !jsonFormatter.resultTextarea) {
      jsonFormatter.jsonViewer = document.getElementById('jsonViewer');
      jsonFormatter.resultTextarea = document.getElementById('resultJson');
    }
    if (jsonFormatter && jsonFormatter.jsonViewer && jsonFormatter.resultTextarea) {
      jsonFormatter.clearInput();
    } else {
      setTimeout(() => window.clearInput(), 100);
    }
  };

  window.copyResult = function() {
    if (!jsonFormatter) {
      jsonFormatter = new JsonFormatter();
    }
    if (!jsonFormatter.jsonViewer || !jsonFormatter.resultTextarea) {
      jsonFormatter.jsonViewer = document.getElementById('jsonViewer');
      jsonFormatter.resultTextarea = document.getElementById('resultJson');
    }
    if (jsonFormatter && jsonFormatter.jsonViewer && jsonFormatter.resultTextarea) {
      jsonFormatter.copyResult();
    } else {
      setTimeout(() => window.copyResult(), 100);
    }
  };

  window.minifyJson = function() {
    if (!jsonFormatter) {
      jsonFormatter = new JsonFormatter();
    }
    if (!jsonFormatter.jsonViewer || !jsonFormatter.resultTextarea) {
      jsonFormatter.jsonViewer = document.getElementById('jsonViewer');
      jsonFormatter.resultTextarea = document.getElementById('resultJson');
    }
    if (jsonFormatter && jsonFormatter.jsonViewer && jsonFormatter.resultTextarea) {
      jsonFormatter.minifyJson();
    } else {
      setTimeout(() => window.minifyJson(), 100);
    }
  };

  window.loadSample = function() {
    if (!jsonFormatter) {
      jsonFormatter = new JsonFormatter();
    }
    if (!jsonFormatter.jsonViewer || !jsonFormatter.resultTextarea) {
      jsonFormatter.jsonViewer = document.getElementById('jsonViewer');
      jsonFormatter.resultTextarea = document.getElementById('resultJson');
    }
    if (jsonFormatter && jsonFormatter.jsonViewer && jsonFormatter.resultTextarea) {
      jsonFormatter.loadSample();
    } else {
      setTimeout(() => window.loadSample(), 100);
    }
  };

  window.toggleAllNodes = function() {
    if (!jsonFormatter) {
      jsonFormatter = new JsonFormatter();
    }
    if (!jsonFormatter.jsonViewer || !jsonFormatter.resultTextarea) {
      jsonFormatter.jsonViewer = document.getElementById('jsonViewer');
      jsonFormatter.resultTextarea = document.getElementById('resultJson');
    }
    if (jsonFormatter && jsonFormatter.jsonViewer && jsonFormatter.resultTextarea) {
      jsonFormatter.toggleAllNodes();
    } else {
      setTimeout(() => window.toggleAllNodes(), 100);
    }
  };

  window.collapseAllNodes = function() {
    if (!jsonFormatter) {
      jsonFormatter = new JsonFormatter();
    }
    if (!jsonFormatter.jsonViewer || !jsonFormatter.resultTextarea) {
      jsonFormatter.jsonViewer = document.getElementById('jsonViewer');
      jsonFormatter.resultTextarea = document.getElementById('resultJson');
    }
    if (jsonFormatter && jsonFormatter.jsonViewer && jsonFormatter.resultTextarea) {
      jsonFormatter.collapseAllNodes();
    } else {
      setTimeout(() => window.collapseAllNodes(), 100);
    }
  };
})();

 