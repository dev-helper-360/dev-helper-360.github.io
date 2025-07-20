// 해시 생성기 클래스
class HashGenerator {
  constructor() {
    this.initializeEventListeners();
  }

  // 이벤트 리스너 초기화
  initializeEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      // 실시간 해시 생성 (텍스트 입력 시)
      const inputText = document.getElementById('inputText');
      if (inputText) {
        inputText.addEventListener('input', () => {
          this.generateHashes();
        });
      }

      // 체크박스 변경 시 해시 재생성
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          this.generateHashes();
        });
      });

      // 파일 입력 이벤트
      const fileInput = document.getElementById('fileInput');
      if (fileInput) {
        fileInput.addEventListener('change', (e) => {
          this.handleFileSelect(e);
        });
      }
    });
  }

  // 해시 생성 메인 함수
  generateHashes() {
    const inputText = document.getElementById('inputText').value.trim();
    
    if (!inputText) {
      this.showEmptyMessage();
      return;
    }

    const results = [];
    const algorithms = this.getSelectedAlgorithms();

    algorithms.forEach(algorithm => {
      try {
        const hash = this.generateHash(inputText, algorithm);
        results.push({
          algorithm: algorithm,
          hash: hash
        });
      } catch (error) {
        console.error(`Error generating ${algorithm} hash:`, error);
        results.push({
          algorithm: algorithm,
          hash: 'Error generating hash',
          error: true
        });
      }
    });

    this.displayResults(results);
  }

  // 선택된 알고리즘 가져오기
  getSelectedAlgorithms() {
    const algorithms = [];
    const checkboxes = {
      'md5': 'MD5',
      'sha1': 'SHA1', 
      'sha256': 'SHA256',
      'sha512': 'SHA512',
      'ripemd160': 'RIPEMD160',
      'whirlpool': 'Whirlpool'
    };

    Object.keys(checkboxes).forEach(key => {
      const checkbox = document.getElementById(key);
      if (checkbox && checkbox.checked) {
        algorithms.push(checkboxes[key]);
      }
    });

    return algorithms;
  }

  // 개별 해시 생성
  generateHash(text, algorithm) {
    switch (algorithm) {
      case 'MD5':
        return CryptoJS.MD5(text).toString();
      case 'SHA1':
        return CryptoJS.SHA1(text).toString();
      case 'SHA256':
        return CryptoJS.SHA256(text).toString();
      case 'SHA512':
        return CryptoJS.SHA512(text).toString();
      case 'RIPEMD160':
        return CryptoJS.RIPEMD160(text).toString();
      case 'Whirlpool':
        return CryptoJS.Whirlpool(text).toString();
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  }

  // 결과 표시
  displayResults(results) {
    const resultsContainer = document.getElementById('hashResults');
    
    if (results.length === 0) {
      this.showEmptyMessage();
      return;
    }

    let html = '';
    results.forEach(result => {
      const hashClass = result.error ? 'text-danger' : 'text-success';
      html += `
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <strong class="text-primary">${result.algorithm}</strong>
            <button class="btn btn-sm btn-outline-primary" onclick="hashGenerator.copyToClipboard('${result.hash}')">
              <i class="fas fa-copy"></i> 복사
            </button>
          </div>
          <div class="p-2 bg-light rounded border">
            <code class="${hashClass}" style="word-break: break-all; font-size: 0.9rem;">${result.hash}</code>
          </div>
        </div>
      `;
    });

    resultsContainer.innerHTML = html;
  }

  // 빈 메시지 표시
  showEmptyMessage() {
    const resultsContainer = document.getElementById('hashResults');
    resultsContainer.innerHTML = `
      <div class="text-center text-muted">
        <i class="fas fa-info-circle fa-2x mb-3"></i>
        <p>텍스트를 입력하고 해시 생성 버튼을 클릭하세요.</p>
      </div>
    `;
  }

  // 클립보드에 복사
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('클립보드에 복사되었습니다!', 'success');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      this.showToast('복사에 실패했습니다.', 'error');
    });
  }

  // 모든 내용 지우기
  clearAll() {
    document.getElementById('inputText').value = '';
    document.getElementById('fileInput').value = '';
    document.getElementById('verifyText').value = '';
    document.getElementById('verifyHash').value = '';
    document.getElementById('fileHashResults').innerHTML = '';
    document.getElementById('verifyResult').innerHTML = '';
    this.showEmptyMessage();
  }

  // 파일 선택 처리
  handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      this.generateFileHash(file);
    }
  }

  // 파일 해시 생성
  generateFileHash(file = null) {
    if (!file) {
      const fileInput = document.getElementById('fileInput');
      file = fileInput.files[0];
    }

    if (!file) {
      this.showToast('파일을 선택해주세요.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      
      const results = [];
      const algorithms = this.getSelectedAlgorithms();

      algorithms.forEach(algorithm => {
        try {
          const hash = this.generateHashFromWordArray(wordArray, algorithm);
          results.push({
            algorithm: algorithm,
            hash: hash,
            filename: file.name
          });
        } catch (error) {
          console.error(`Error generating ${algorithm} hash for file:`, error);
          results.push({
            algorithm: algorithm,
            hash: 'Error generating hash',
            error: true,
            filename: file.name
          });
        }
      });

      this.displayFileResults(results);
    };

    reader.onerror = () => {
      this.showToast('파일 읽기에 실패했습니다.', 'error');
    };

    reader.readAsArrayBuffer(file);
  }

  // WordArray에서 해시 생성
  generateHashFromWordArray(wordArray, algorithm) {
    switch (algorithm) {
      case 'MD5':
        return CryptoJS.MD5(wordArray).toString();
      case 'SHA1':
        return CryptoJS.SHA1(wordArray).toString();
      case 'SHA256':
        return CryptoJS.SHA256(wordArray).toString();
      case 'SHA512':
        return CryptoJS.SHA512(wordArray).toString();
      case 'RIPEMD160':
        return CryptoJS.RIPEMD160(wordArray).toString();
      case 'Whirlpool':
        return CryptoJS.Whirlpool(wordArray).toString();
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  }

  // 파일 해시 결과 표시
  displayFileResults(results) {
    const resultsContainer = document.getElementById('fileHashResults');
    
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p class="text-muted">파일을 선택해주세요.</p>';
      return;
    }

    let html = '<h6 class="mb-3">파일 해시 결과</h6>';
    results.forEach(result => {
      const hashClass = result.error ? 'text-danger' : 'text-success';
      html += `
        <div class="mb-3">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <strong class="text-primary">${result.algorithm}</strong>
            <button class="btn btn-sm btn-outline-primary" onclick="hashGenerator.copyToClipboard('${result.hash}')">
              <i class="fas fa-copy"></i> 복사
            </button>
          </div>
          <div class="p-2 bg-light rounded border">
            <code class="${hashClass}" style="word-break: break-all; font-size: 0.9rem;">${result.hash}</code>
          </div>
          <small class="text-muted">파일: ${result.filename}</small>
        </div>
      `;
    });

    resultsContainer.innerHTML = html;
  }

  // 해시 검증
  verifyHash() {
    const originalText = document.getElementById('verifyText').value.trim();
    const hashToVerify = document.getElementById('verifyHash').value.trim();
    const algorithm = document.getElementById('verifyAlgorithm').value;

    if (!originalText || !hashToVerify) {
      this.showToast('원본 텍스트와 해시값을 모두 입력해주세요.', 'error');
      return;
    }

    try {
      const generatedHash = this.generateHash(originalText, algorithm);
      const isMatch = generatedHash.toLowerCase() === hashToVerify.toLowerCase();
      
      const resultContainer = document.getElementById('verifyResult');
      const resultClass = isMatch ? 'alert-success' : 'alert-danger';
      const resultIcon = isMatch ? 'fa-check-circle' : 'fa-times-circle';
      const resultText = isMatch ? '해시가 일치합니다!' : '해시가 일치하지 않습니다.';
      
      resultContainer.innerHTML = `
        <div class="alert ${resultClass} d-flex align-items-center" role="alert">
          <i class="fas ${resultIcon} me-2"></i>
          <div>
            <strong>${resultText}</strong><br>
            <small>생성된 해시: ${generatedHash}</small>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Hash verification error:', error);
      this.showToast('해시 검증 중 오류가 발생했습니다.', 'error');
    }
  }

  // 토스트 메시지 표시
  showToast(message, type = 'info') {
    // 간단한 토스트 구현
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
    
    // 3초 후 자동 제거
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 3000);
  }
}

// 전역 해시 생성기 인스턴스
let hashGenerator;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  hashGenerator = new HashGenerator();
}); 