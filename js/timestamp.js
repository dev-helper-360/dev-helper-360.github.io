// Unix 타임스탬프 변환기 기능
function convertTimestamp(){
  const input = document.getElementById('timestampInput').value;
  try {
    const ts = Number(input);
    if(isNaN(ts)) throw new Error();
    const date = new Date(ts * 1000);
    document.getElementById('timestampResult').textContent = date.toLocaleString();
  } catch {
    document.getElementById('timestampResult').textContent = '⚠️ 올바른 타임스탬프가 아닙니다.';
  }
}

function clearInput() {
  document.getElementById('timestampInput').value = '';
  document.getElementById('timestampResult').textContent = '결과가 여기에 표시됩니다';
}

function getCurrentTimestamp() {
  const now = Math.floor(Date.now() / 1000);
  document.getElementById('timestampInput').value = now;
  convertTimestamp();
}

function updateCurrentTime() {
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000);
  document.getElementById('currentTimestamp').textContent = timestamp;
  document.getElementById('currentDateTime').textContent = now.toLocaleString('ko-KR');
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // Enter 키로 변환 실행
  document.getElementById('timestampInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      convertTimestamp();
    }
  });
  
  // 현재 시간 업데이트
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
}); 