// JSON 포매터 기능
function formatJson(){
  const input = document.getElementById('inputJson').value;
  try {
    const parsed = JSON.parse(input);
    const pretty = JSON.stringify(parsed, null, 2);
    document.getElementById('resultJson').value = pretty;
  } catch (e){
    document.getElementById('resultJson').value = '⚠️ JSON 구문 오류입니다.';
  }
}

function clearInput() {
  document.getElementById('inputJson').value = '';
  document.getElementById('resultJson').value = '';
}

function copyResult() {
  const result = document.getElementById('resultJson');
  result.select();
  document.execCommand('copy');
  alert('결과가 클립보드에 복사되었습니다!');
}

function minifyJson() {
  const input = document.getElementById('resultJson').value;
  if (input.trim()) {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      document.getElementById('resultJson').value = minified;
    } catch (e) {
      alert('유효한 JSON이 아닙니다.');
    }
  }
}

function loadSample() {
  const sample = `{
  "name": "홍길동",
  "age": 30,
  "email": "hong@example.com",
  "hobbies": ["독서", "여행", "프로그래밍"],
  "address": {
    "city": "서울",
    "district": "강남구",
    "zipcode": "12345"
  },
  "active": true
}`;
  document.getElementById('inputJson').value = sample;
} 