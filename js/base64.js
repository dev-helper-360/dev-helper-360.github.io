// Base64 인코더/디코더 기능
function encodeBase64(){
  const input = document.getElementById('inputBase64').value;
  try {
    const encoded = btoa(unescape(encodeURIComponent(input)));
    document.getElementById('resultBase64').value = encoded;
  } catch {
    document.getElementById('resultBase64').value = '⚠️ 인코딩 실패';
  }
}

function decodeBase64(){
  const input = document.getElementById('inputBase64').value;
  try {
    const decoded = decodeURIComponent(escape(atob(input)));
    document.getElementById('resultBase64').value = decoded;
  } catch {
    document.getElementById('resultBase64').value = '⚠️ 디코딩 실패: 올바른 Base64 문자열이 아닙니다.';
  }
}

function clearAll() {
  document.getElementById('inputBase64').value = '';
  document.getElementById('resultBase64').value = '';
}

function copyResult() {
  const result = document.getElementById('resultBase64');
  result.select();
  document.execCommand('copy');
  alert('결과가 클립보드에 복사되었습니다!');
} 