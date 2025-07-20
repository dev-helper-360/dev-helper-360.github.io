// 간단 계산기 기능
function calculate(){
  const input = document.getElementById('calcInput').value;
  try {
    // eslint-disable-next-line no-eval
    const result = eval(input);
    document.getElementById('calcResult').textContent = result;
  } catch {
    document.getElementById('calcResult').textContent = '⚠️ 계산식 오류입니다.';
  }
}

function clearInput() {
  document.getElementById('calcInput').value = '';
  document.getElementById('calcResult').textContent = '결과가 여기에 표시됩니다';
}

// Enter 키로 계산 실행
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('calcInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      calculate();
    }
  });
}); 