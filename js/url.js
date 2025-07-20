// URL 인코더/디코더 기능
function encodeUrl(){
  const input = document.getElementById('inputUrl').value;
  try {
    const encoded = encodeURIComponent(input);
    document.getElementById('resultUrl').value = encoded;
  } catch {
    document.getElementById('resultUrl').value = '⚠️ 인코딩 실패';
  }
}

function decodeUrl(){
  const input = document.getElementById('inputUrl').value;
  try {
    const decoded = decodeURIComponent(input);
    document.getElementById('resultUrl').value = decoded;
  } catch {
    document.getElementById('resultUrl').value = '⚠️ 디코딩 실패';
  }
}

function clearAll() {
  document.getElementById('inputUrl').value = '';
  document.getElementById('resultUrl').value = '';
}

function copyResult() {
  const result = document.getElementById('resultUrl');
  result.select();
  document.execCommand('copy');
  alert('결과가 클립보드에 복사되었습니다!');
}

function loadSample() {
  const sample = 'https://example.com/search?q=안녕하세요&category=도구&page=1';
  document.getElementById('inputUrl').value = sample;
} 