class ApiTester {
  constructor() {
    this.requestHistory = [];
    this.examples = {
      get: {
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        headers: [
          { key: 'Content-Type', value: 'application/json' }
        ],
        body: ''
      },
      post: {
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        headers: [
          { key: 'Content-Type', value: 'application/json' }
        ],
        body: JSON.stringify({
          title: 'Test Post',
          body: 'This is a test post',
          userId: 1
        }, null, 2)
      },
      put: {
        method: 'PUT',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        headers: [
          { key: 'Content-Type', value: 'application/json' }
        ],
        body: JSON.stringify({
          id: 1,
          title: 'Updated Post',
          body: 'This post has been updated',
          userId: 1
        }, null, 2)
      },
      delete: {
        method: 'DELETE',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        headers: [
          { key: 'Content-Type', value: 'application/json' }
        ],
        body: ''
      }
    };
    
    this.init();
  }

  init() {
    this.httpMethod = document.getElementById('httpMethod');
    this.requestUrl = document.getElementById('requestUrl');
    this.requestBody = document.getElementById('requestBody');
    this.responseBody = document.getElementById('responseBody');
    this.responseHeaders = document.getElementById('responseHeaders');
    this.statusCode = document.getElementById('statusCode');
    this.responseTime = document.getElementById('responseTime');
    this.responseInfo = document.getElementById('responseInfo');
    this.responseActions = document.getElementById('responseActions');
    this.curlCommand = document.getElementById('curlCommand');
    this.requestHistoryContainer = document.getElementById('requestHistory');
    
    // 이벤트 리스너 등록
    document.getElementById('timeoutEnabled').addEventListener('change', this.toggleTimeout.bind(this));
    this.loadHistory();
    
    // 초기 예제 로드
    this.loadExample('get');
  }

  toggleTimeout() {
    const timeoutContainer = document.getElementById('timeoutContainer');
    const isEnabled = document.getElementById('timeoutEnabled').checked;
    timeoutContainer.style.display = isEnabled ? 'block' : 'none';
  }

  addHeader() {
    const container = document.getElementById('headersContainer');
    const headerRow = document.createElement('div');
    headerRow.className = 'header-row';
    headerRow.innerHTML = `
      <input type="text" class="form-control" placeholder="Header name">
      <input type="text" class="form-control" placeholder="Header value">
      <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeHeader(this)">
        <i class="fas fa-trash"></i>
      </button>
    `;
    container.appendChild(headerRow);
  }

  removeHeader(button) {
    const headerRow = button.parentElement;
    if (document.querySelectorAll('.header-row').length > 1) {
      headerRow.remove();
    }
  }

  getHeaders() {
    const headers = {};
    const headerRows = document.querySelectorAll('.header-row');
    
    headerRows.forEach(row => {
      const inputs = row.querySelectorAll('input');
      const key = inputs[0].value.trim();
      const value = inputs[1].value.trim();
      
      if (key && value) {
        headers[key] = value;
      }
    });
    
    return headers;
  }

  async sendRequest() {
    const method = this.httpMethod.value;
    const url = this.requestUrl.value.trim();
    const body = this.requestBody.value.trim();
    const headers = this.getHeaders();
    
    if (!url) {
      this.showMessage('URL을 입력해주세요.', 'warning');
      return;
    }

    // 요청 시작 시간
    const startTime = Date.now();
    
    try {
      // 요청 옵션 설정
      const options = {
        method: method,
        headers: headers,
        mode: 'cors',
        credentials: document.getElementById('includeCredentials').checked ? 'include' : 'omit',
        redirect: document.getElementById('followRedirects').checked ? 'follow' : 'manual'
      };

      // 본문이 있는 경우 추가
      if (body && method !== 'GET' && method !== 'HEAD') {
        options.body = body;
      }

      // 타임아웃 설정
      if (document.getElementById('timeoutEnabled').checked) {
        const timeout = parseInt(document.getElementById('timeoutValue').value) * 1000;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        options.signal = controller.signal;
        
        try {
          const response = await fetch(url, options);
          clearTimeout(timeoutId);
          this.handleResponse(response, startTime);
        } catch (error) {
          clearTimeout(timeoutId);
          if (error.name === 'AbortError') {
            this.showMessage('요청이 타임아웃되었습니다.', 'danger');
          } else {
            throw error;
          }
        }
      } else {
        const response = await fetch(url, options);
        this.handleResponse(response, startTime);
      }
      
      // 히스토리에 추가
      this.addToHistory(method, url, headers, body);
      
    } catch (error) {
      this.handleError(error);
    }
  }

  async handleResponse(response, startTime) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    // 상태 코드 표시
    this.statusCode.textContent = response.status;
    this.statusCode.className = this.getStatusClass(response.status);
    
    // 응답 시간 표시
    this.responseTime.textContent = `${responseTime}ms`;
    
    // 응답 헤더 표시
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    this.responseHeaders.textContent = JSON.stringify(headers, null, 2);
    
    // 응답 본문 처리
    try {
      const contentType = response.headers.get('content-type');
      let responseText = '';
      
      if (contentType && contentType.includes('application/json')) {
        const jsonData = await response.json();
        responseText = JSON.stringify(jsonData, null, 2);
      } else {
        responseText = await response.text();
      }
      
      this.responseBody.textContent = responseText;
      
      // JSON인 경우 구문 강조 적용
      if (contentType && contentType.includes('application/json')) {
        this.responseBody.className = 'language-json';
        Prism.highlightElement(this.responseBody);
      } else {
        this.responseBody.className = '';
      }
      
    } catch (error) {
      this.responseBody.textContent = '응답 본문을 읽을 수 없습니다.';
    }
    
    // cURL 명령어 생성
    this.generateCurlCommand();
    
    // 응답 정보 표시
    this.responseInfo.style.display = 'block';
    this.responseActions.style.display = 'block';
    
    this.showMessage('요청이 성공적으로 완료되었습니다!', 'success');
  }

  handleError(error) {
    this.responseInfo.style.display = 'block';
    this.responseActions.style.display = 'block';
    
    this.statusCode.textContent = 'Error';
    this.statusCode.className = 'status-error';
    this.responseTime.textContent = 'N/A';
    this.responseHeaders.textContent = '{}';
    this.responseBody.textContent = `요청 중 오류가 발생했습니다:\n${error.message}`;
    
    this.showMessage(`요청 실패: ${error.message}`, 'danger');
  }

  getStatusClass(status) {
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 400 && status < 500) return 'status-error';
    if (status >= 500) return 'status-error';
    if (status >= 300 && status < 400) return 'status-warning';
    return 'status-info';
  }

  generateCurlCommand() {
    const method = this.httpMethod.value;
    const url = this.requestUrl.value;
    const headers = this.getHeaders();
    const body = this.requestBody.value.trim();
    
    let curl = `curl -X ${method}`;
    
    // 헤더 추가
    Object.entries(headers).forEach(([key, value]) => {
      curl += ` -H "${key}: ${value}"`;
    });
    
    // 본문 추가
    if (body && method !== 'GET' && method !== 'HEAD') {
      curl += ` -d '${body.replace(/'/g, "\\'")}'`;
    }
    
    curl += ` "${url}"`;
    
    this.curlCommand.textContent = curl;
  }

  addToHistory(method, url, headers, body) {
    const historyItem = {
      id: Date.now(),
      method,
      url,
      headers,
      body,
      timestamp: new Date().toLocaleString()
    };
    
    this.requestHistory.unshift(historyItem);
    if (this.requestHistory.length > 20) {
      this.requestHistory.pop();
    }
    
    this.saveHistory();
    this.displayHistory();
  }

  displayHistory() {
    this.requestHistoryContainer.innerHTML = '';
    
    this.requestHistory.forEach(item => {
      const historyElement = document.createElement('div');
      historyElement.className = 'list-group-item list-group-item-action';
      historyElement.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="badge bg-primary me-2">${item.method}</span>
            <span class="text-truncate">${item.url}</span>
          </div>
          <div class="d-flex align-items-center">
            <small class="text-muted me-2">${item.timestamp}</small>
            <button class="btn btn-outline-primary btn-sm" onclick="loadFromHistory(${item.id})">
              <i class="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      `;
      this.requestHistoryContainer.appendChild(historyElement);
    });
  }

  loadFromHistory(id) {
    const item = this.requestHistory.find(h => h.id === id);
    if (item) {
      this.httpMethod.value = item.method;
      this.requestUrl.value = item.url;
      this.requestBody.value = item.body;
      
      // 헤더 로드
      const headerContainer = document.getElementById('headersContainer');
      headerContainer.innerHTML = '';
      
      Object.entries(item.headers).forEach(([key, value]) => {
        const headerRow = document.createElement('div');
        headerRow.className = 'header-row';
        headerRow.innerHTML = `
          <input type="text" class="form-control" value="${key}">
          <input type="text" class="form-control" value="${value}">
          <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeHeader(this)">
            <i class="fas fa-trash"></i>
          </button>
        `;
        headerContainer.appendChild(headerRow);
      });
      
      this.showMessage('히스토리에서 요청이 로드되었습니다.', 'info');
    }
  }

  saveHistory() {
    localStorage.setItem('apiTesterHistory', JSON.stringify(this.requestHistory));
  }

  loadHistory() {
    const saved = localStorage.getItem('apiTesterHistory');
    if (saved) {
      this.requestHistory = JSON.parse(saved);
      this.displayHistory();
    }
  }

  clearHistory() {
    this.requestHistory = [];
    this.saveHistory();
    this.displayHistory();
    this.showMessage('히스토리가 지워졌습니다.', 'info');
  }

  loadExample(type) {
    const example = this.examples[type];
    if (example) {
      this.httpMethod.value = example.method;
      this.requestUrl.value = example.url;
      this.requestBody.value = example.body;
      
      // 헤더 로드
      const headerContainer = document.getElementById('headersContainer');
      headerContainer.innerHTML = '';
      
      example.headers.forEach(header => {
        const headerRow = document.createElement('div');
        headerRow.className = 'header-row';
        headerRow.innerHTML = `
          <input type="text" class="form-control" value="${header.key}">
          <input type="text" class="form-control" value="${header.value}">
          <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeHeader(this)">
            <i class="fas fa-trash"></i>
          </button>
        `;
        headerContainer.appendChild(headerRow);
      });
      
      this.showMessage(`${type.toUpperCase()} 예제가 로드되었습니다.`, 'info');
    }
  }

  copyResponse() {
    const responseText = this.responseBody.textContent;
    if (responseText) {
      navigator.clipboard.writeText(responseText).then(() => {
        this.showMessage('응답이 클립보드에 복사되었습니다!', 'success');
      }).catch(() => {
        this.showMessage('클립보드 복사에 실패했습니다.', 'danger');
      });
    }
  }

  downloadResponse() {
    const responseText = this.responseBody.textContent;
    if (responseText) {
      const blob = new Blob([responseText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `api-response-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.showMessage('응답이 다운로드되었습니다!', 'success');
    }
  }

  formatResponse() {
    const responseText = this.responseBody.textContent;
    if (responseText) {
      try {
        const parsed = JSON.parse(responseText);
        const formatted = JSON.stringify(parsed, null, 2);
        this.responseBody.textContent = formatted;
        this.responseBody.className = 'language-json';
        Prism.highlightElement(this.responseBody);
        this.showMessage('JSON이 포맷팅되었습니다!', 'success');
      } catch (error) {
        this.showMessage('유효한 JSON이 아닙니다.', 'warning');
      }
    }
  }

  showMessage(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 3000);
  }
}

// 전역 변수 및 함수들
let apiTester;

function sendRequest() {
  if (apiTester) {
    apiTester.sendRequest();
  }
}

function addHeader() {
  if (apiTester) {
    apiTester.addHeader();
  }
}

function removeHeader(button) {
  if (apiTester) {
    apiTester.removeHeader(button);
  }
}

function loadExample(type) {
  if (apiTester) {
    apiTester.loadExample(type);
  }
}

function loadFromHistory(id) {
  if (apiTester) {
    apiTester.loadFromHistory(id);
  }
}

function clearHistory() {
  if (apiTester) {
    apiTester.clearHistory();
  }
}

function copyResponse() {
  if (apiTester) {
    apiTester.copyResponse();
  }
}

function downloadResponse() {
  if (apiTester) {
    apiTester.downloadResponse();
  }
}

function formatResponse() {
  if (apiTester) {
    apiTester.formatResponse();
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  apiTester = new ApiTester();
}); 