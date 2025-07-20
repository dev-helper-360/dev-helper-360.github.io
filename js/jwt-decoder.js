class JWTDecoder {
  constructor() {
    this.exampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MTAwMDAwMDAsImlzcyI6ImV4YW1wbGUuY29tIiwiYXVkIjoiYXBwLmV4YW1wbGUuY29tIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    
    this.standardClaims = {
      iss: { name: 'Issuer', description: '토큰 발급자' },
      sub: { name: 'Subject', description: '토큰 주체' },
      aud: { name: 'Audience', description: '토큰 대상자' },
      exp: { name: 'Expiration Time', description: '만료 시간' },
      nbf: { name: 'Not Before', description: '유효 시작 시간' },
      iat: { name: 'Issued At', description: '발급 시간' },
      jti: { name: 'JWT ID', description: '고유 식별자' }
    };
    
    this.init();
  }

  init() {
    this.jwtInput = document.getElementById('jwtInput');
    this.decodingResult = document.getElementById('decodingResult');
    this.errorMessage = document.getElementById('errorMessage');
    this.errorText = document.getElementById('errorText');
    
    // 이벤트 리스너 등록
    this.jwtInput.addEventListener('input', this.handleInput.bind(this));
    
    // 클립보드 이벤트 리스너
    document.addEventListener('paste', this.handlePaste.bind(this));
  }

  handleInput() {
    const token = this.jwtInput.value.trim();
    if (token && this.isValidJWTFormat(token)) {
      this.decodeJWT();
    }
  }

  handlePaste(event) {
    const pastedText = event.clipboardData.getData('text');
    if (this.isValidJWTFormat(pastedText)) {
      setTimeout(() => {
        this.decodeJWT();
      }, 100);
    }
  }

  isValidJWTFormat(token) {
    // JWT는 3개의 부분으로 구성되어 있으며, 각 부분은 Base64로 인코딩되어 있습니다
    const parts = token.split('.');
    return parts.length === 3 && 
           parts.every(part => part.length > 0) &&
           /^[A-Za-z0-9+/=]+$/.test(parts[0]) &&
           /^[A-Za-z0-9+/=]+$/.test(parts[1]) &&
           /^[A-Za-z0-9+/=]+$/.test(parts[2]);
  }

  decodeJWT() {
    const token = this.jwtInput.value.trim();
    
    if (!token) {
      this.showError('JWT 토큰을 입력해주세요.');
      return;
    }

    if (!this.isValidJWTFormat(token)) {
      this.showError('유효하지 않은 JWT 형식입니다. JWT는 3개의 부분으로 구성되어야 합니다.');
      return;
    }

    try {
      const parts = token.split('.');
      const header = this.decodeBase64(parts[0]);
      const payload = this.decodeBase64(parts[1]);
      const signature = parts[2];

      this.displayResults(header, payload, signature, token);
      this.hideError();
      
    } catch (error) {
      this.showError('JWT 디코딩 중 오류가 발생했습니다: ' + error.message);
    }
  }

  decodeBase64(base64String) {
    try {
      // Base64 패딩 추가
      while (base64String.length % 4) {
        base64String += '=';
      }
      
      // Base64 URL 안전 문자를 표준 Base64로 변환
      base64String = base64String.replace(/-/g, '+').replace(/_/g, '/');
      
      const decoded = atob(base64String);
      return JSON.parse(decoded);
    } catch (error) {
      throw new Error('Base64 디코딩 실패: ' + error.message);
    }
  }

  displayResults(header, payload, signature, originalToken) {
    // 토큰 정보 표시
    this.displayTokenInfo(header, payload);
    
    // 헤더 표시
    this.displayHeader(header);
    
    // 페이로드 표시
    this.displayPayload(payload);
    
    // 서명 표시
    this.displaySignature(signature);
    
    // 결과 표시
    this.decodingResult.style.display = 'block';
    
    // 원본 토큰 저장
    this.originalToken = originalToken;
  }

  displayTokenInfo(header, payload) {
    // 토큰 타입
    document.getElementById('tokenType').textContent = header.typ || 'JWT';
    
    // 알고리즘
    document.getElementById('algorithm').textContent = header.alg || 'Unknown';
    
    // 서명 상태
    document.getElementById('signatureStatus').textContent = '서명됨 (검증 불가)';
    
    // 발급 시간
    if (payload.iat) {
      const issuedAt = new Date(payload.iat * 1000);
      document.getElementById('issuedAt').textContent = issuedAt.toLocaleString();
      document.getElementById('issuedAt').title = `Unix timestamp: ${payload.iat}`;
    } else {
      document.getElementById('issuedAt').textContent = 'N/A';
    }
    
    // 만료 시간
    if (payload.exp) {
      const expiresAt = new Date(payload.exp * 1000);
      const now = new Date();
      const isExpired = expiresAt < now;
      const expiresElement = document.getElementById('expiresAt');
      
      expiresElement.textContent = expiresAt.toLocaleString();
      expiresElement.title = `Unix timestamp: ${payload.exp}`;
      expiresElement.className = isExpired ? 'ms-2 timestamp expired' : 'ms-2 timestamp valid';
    } else {
      document.getElementById('expiresAt').textContent = 'N/A';
    }
    
    // 유효성
    this.updateValidity(payload);
  }

  updateValidity(payload) {
    const now = Math.floor(Date.now() / 1000);
    const validityElement = document.getElementById('validity');
    
    if (payload.exp) {
      if (payload.exp < now) {
        validityElement.textContent = '만료됨';
        validityElement.className = 'ms-2 expired';
      } else if (payload.exp - now < 3600) { // 1시간 이내
        validityElement.textContent = '곧 만료됨';
        validityElement.className = 'ms-2 warning';
      } else {
        validityElement.textContent = '유효함';
        validityElement.className = 'ms-2 valid';
      }
    } else {
      validityElement.textContent = '만료 시간 없음';
      validityElement.className = 'ms-2';
    }
  }

  displayHeader(header) {
    const headerJson = document.getElementById('headerJson');
    headerJson.textContent = JSON.stringify(header, null, 2);
    headerJson.className = 'language-json mb-0';
    Prism.highlightElement(headerJson);
    
    // 헤더 클레임 표시
    this.displayClaims(header, 'headerClaims', '헤더');
  }

  displayPayload(payload) {
    const payloadJson = document.getElementById('payloadJson');
    payloadJson.textContent = JSON.stringify(payload, null, 2);
    payloadJson.className = 'language-json mb-0';
    Prism.highlightElement(payloadJson);
    
    // 페이로드 클레임 표시
    this.displayClaims(payload, 'payloadClaims', '페이로드');
  }

  displaySignature(signature) {
    document.getElementById('signatureText').textContent = signature;
  }

  displayClaims(data, containerId, sectionName) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (Object.keys(data).length === 0) {
      container.innerHTML = '<p class="text-muted">클레임이 없습니다.</p>';
      return;
    }
    
    Object.entries(data).forEach(([key, value]) => {
      const claimItem = document.createElement('div');
      claimItem.className = 'claim-item';
      
      const claimInfo = this.standardClaims[key];
      const displayName = claimInfo ? `${key} (${claimInfo.name})` : key;
      const description = claimInfo ? claimInfo.description : '';
      
      let displayValue = this.formatClaimValue(key, value);
      
      claimItem.innerHTML = `
        <div>
          <div class="claim-key">${displayName}</div>
          ${description ? `<small class="text-muted">${description}</small>` : ''}
        </div>
        <div class="claim-value">${displayValue}</div>
      `;
      
      container.appendChild(claimItem);
    });
  }

  formatClaimValue(key, value) {
    // 특별한 클레임들에 대한 포맷팅
    switch (key) {
      case 'iat':
      case 'exp':
      case 'nbf':
        if (typeof value === 'number') {
          const date = new Date(value * 1000);
          return `${date.toLocaleString()} (${value})`;
        }
        break;
      case 'aud':
        if (Array.isArray(value)) {
          return value.join(', ');
        }
        break;
      case 'scope':
        if (typeof value === 'string') {
          return value.split(' ').join(', ');
        }
        break;
    }
    
    // 일반적인 값 포맷팅
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  }

  showError(message) {
    this.errorText.textContent = message;
    this.errorMessage.style.display = 'block';
    this.decodingResult.style.display = 'none';
  }

  hideError() {
    this.errorMessage.style.display = 'none';
  }

  clearInput() {
    this.jwtInput.value = '';
    this.decodingResult.style.display = 'none';
    this.hideError();
  }

  loadExample() {
    this.jwtInput.value = this.exampleToken;
    this.decodeJWT();
  }

  copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent || element.innerText;
    
    navigator.clipboard.writeText(text).then(() => {
      this.showMessage('클립보드에 복사되었습니다!', 'success');
    }).catch(() => {
      this.showMessage('클립보드 복사에 실패했습니다.', 'danger');
    });
  }

  downloadDecoded() {
    if (!this.originalToken) {
      this.showMessage('다운로드할 데이터가 없습니다.', 'warning');
      return;
    }

    const header = document.getElementById('headerJson').textContent;
    const payload = document.getElementById('payloadJson').textContent;
    const signature = document.getElementById('signatureText').textContent;
    
    const content = `JWT 토큰 디코딩 결과

원본 토큰:
${this.originalToken}

헤더 (Header):
${header}

페이로드 (Payload):
${payload}

서명 (Signature):
${signature}

디코딩 시간: ${new Date().toLocaleString()}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jwt-decoded-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showMessage('결과가 다운로드되었습니다!', 'success');
  }

  generateCurl() {
    if (!this.originalToken) {
      this.showMessage('cURL을 생성할 데이터가 없습니다.', 'warning');
      return;
    }

    const curlCommand = `curl -H "Authorization: Bearer ${this.originalToken}" \\
  -H "Content-Type: application/json" \\
  -X GET \\
  "https://api.example.com/endpoint"`;

    // 모달로 cURL 명령어 표시
    this.showCurlModal(curlCommand);
  }

  showCurlModal(curlCommand) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">cURL 명령어</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <pre class="bg-light p-3 rounded">${curlCommand}</pre>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" class="btn btn-primary" onclick="copyCurlCommand()">복사</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    // 모달이 닫힐 때 제거
    modal.addEventListener('hidden.bs.modal', () => {
      document.body.removeChild(modal);
    });
    
    // 전역 함수로 복사 기능 제공
    window.copyCurlCommand = () => {
      navigator.clipboard.writeText(curlCommand).then(() => {
        this.showMessage('cURL 명령어가 복사되었습니다!', 'success');
        modalInstance.hide();
      });
    };
  }

  validateToken() {
    if (!this.originalToken) {
      this.showMessage('검증할 토큰이 없습니다.', 'warning');
      return;
    }

    const validationResults = [];
    
    try {
      const parts = this.originalToken.split('.');
      const payload = this.decodeBase64(parts[1]);
      const now = Math.floor(Date.now() / 1000);
      
      // 만료 시간 검증
      if (payload.exp) {
        if (payload.exp < now) {
          validationResults.push('❌ 토큰이 만료되었습니다.');
        } else {
          const timeLeft = payload.exp - now;
          const hours = Math.floor(timeLeft / 3600);
          const minutes = Math.floor((timeLeft % 3600) / 60);
          validationResults.push(`✅ 토큰이 유효합니다. (${hours}시간 ${minutes}분 남음)`);
        }
      } else {
        validationResults.push('⚠️ 만료 시간이 설정되지 않았습니다.');
      }
      
      // 유효 시작 시간 검증
      if (payload.nbf) {
        if (payload.nbf > now) {
          validationResults.push('❌ 토큰이 아직 유효하지 않습니다.');
        } else {
          validationResults.push('✅ 토큰이 유효 시작 시간을 통과했습니다.');
        }
      }
      
      // 필수 클레임 검증
      if (!payload.iss) {
        validationResults.push('⚠️ 발급자(iss) 클레임이 없습니다.');
      }
      if (!payload.sub) {
        validationResults.push('⚠️ 주체(sub) 클레임이 없습니다.');
      }
      
      // 토큰 길이 검증
      if (this.originalToken.length > 8192) {
        validationResults.push('⚠️ 토큰이 너무 깁니다. (8KB 초과)');
      }
      
    } catch (error) {
      validationResults.push('❌ 토큰 검증 중 오류가 발생했습니다: ' + error.message);
    }
    
    // 검증 결과 표시
    this.showValidationResults(validationResults);
  }

  showValidationResults(results) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">토큰 검증 결과</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <ul class="list-unstyled">
              ${results.map(result => `<li class="mb-2">${result}</li>`).join('')}
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
      document.body.removeChild(modal);
    });
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

// 전역 함수들
let jwtDecoder;

function decodeJWT() {
  if (jwtDecoder) {
    jwtDecoder.decodeJWT();
  }
}

function clearInput() {
  if (jwtDecoder) {
    jwtDecoder.clearInput();
  }
}

function loadExample() {
  if (jwtDecoder) {
    jwtDecoder.loadExample();
  }
}

function copyToClipboard(elementId) {
  if (jwtDecoder) {
    jwtDecoder.copyToClipboard(elementId);
  }
}

function downloadDecoded() {
  if (jwtDecoder) {
    jwtDecoder.downloadDecoded();
  }
}

function generateCurl() {
  if (jwtDecoder) {
    jwtDecoder.generateCurl();
  }
}

function validateToken() {
  if (jwtDecoder) {
    jwtDecoder.validateToken();
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  jwtDecoder = new JWTDecoder();
}); 