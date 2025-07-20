// 공통 JavaScript 기능들

// 사이드바 초기화 (sidebar.js에서 관리)
document.addEventListener('DOMContentLoaded', function() {
  initSidebar();
});

// 공통 유틸리티 함수들
const Utils = {
  // 클립보드 복사 함수 (모던 브라우저용)
  copyToClipboard: function(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      // 폴백: 구형 브라우저용
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
        return Promise.resolve();
      } catch (err) {
        textArea.remove();
        return Promise.reject(err);
      }
    }
  },
  
  // 알림 메시지 표시
  showNotification: function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  },
  
  // 입력 필드 지우기
  clearInput: function(inputId, resultId = null) {
    const input = document.getElementById(inputId);
    if (input) input.value = '';
    
    if (resultId) {
      const result = document.getElementById(resultId);
      if (result) {
        if (result.tagName === 'TEXTAREA' || result.tagName === 'INPUT') {
          result.value = '';
        } else {
          result.textContent = '결과가 여기에 표시됩니다';
        }
      }
    }
  }
}; 