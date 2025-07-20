// 계산기 상태 변수들
let currentExpression = '0';
let currentResult = '0';
let lastOperator = '';
let waitingForOperand = false;
let decimalAdded = false;

// DOM 요소들
let expressionElement;
let resultElement;

// 초기화
document.addEventListener('DOMContentLoaded', function() {
  expressionElement = document.getElementById('expression');
  resultElement = document.getElementById('result');
  
  // 키보드 이벤트 리스너 추가
  document.addEventListener('keydown', handleKeyPress);
  
  // 초기 상태 설정
  updateDisplay();
});

// 숫자 추가
function appendNumber(number) {
  if (waitingForOperand) {
    currentExpression = number;
    waitingForOperand = false;
  } else {
    if (currentExpression === '0') {
      currentExpression = number;
    } else {
      currentExpression += number;
    }
  }
  decimalAdded = false;
  updateDisplay();
}

// 소수점 추가
function appendDecimal() {
  if (waitingForOperand) {
    currentExpression = '0.';
    waitingForOperand = false;
  } else if (!decimalAdded) {
    currentExpression += '.';
  }
  decimalAdded = true;
  updateDisplay();
}

// 연산자 설정
function setOperator(operator) {
  const inputValue = parseFloat(currentExpression);
  
  if (currentExpression !== '0' && !waitingForOperand) {
    calculate();
  }
  
  lastOperator = operator;
  waitingForOperand = true;
  decimalAdded = false;
  
  // 연산자 표시 업데이트
  if (currentExpression !== '0') {
    const displayOperator = operator === '*' ? '×' : 
                           operator === '/' ? '÷' : 
                           operator === '-' ? '−' : operator;
    currentExpression = currentResult + ' ' + displayOperator;
  }
  
  updateDisplay();
}

// 계산 실행
function calculate() {
  const inputValue = parseFloat(currentExpression);
  
  if (lastOperator && !waitingForOperand) {
    const previousValue = parseFloat(currentResult);
    let newValue;
    
    switch (lastOperator) {
      case '+':
        newValue = previousValue + inputValue;
        break;
      case '-':
        newValue = previousValue - inputValue;
        break;
      case '*':
        newValue = previousValue * inputValue;
        break;
      case '/':
        if (inputValue === 0) {
          currentResult = 'Error';
          currentExpression = '0';
          lastOperator = '';
          waitingForOperand = true;
          updateDisplay();
          return;
        }
        newValue = previousValue / inputValue;
        break;
      case '%':
        newValue = previousValue % inputValue;
        break;
      default:
        newValue = inputValue;
    }
    
    currentResult = formatNumber(newValue);
    currentExpression = currentResult;
  } else {
    currentResult = currentExpression;
  }
  
  lastOperator = '';
  waitingForOperand = true;
  decimalAdded = false;
  updateDisplay();
}

// 모든 입력 지우기
function clearAll() {
  currentExpression = '0';
  currentResult = '0';
  lastOperator = '';
  waitingForOperand = false;
  decimalAdded = false;
  updateDisplay();
}

// 현재 입력만 지우기
function clearEntry() {
  currentExpression = '0';
  decimalAdded = false;
  updateDisplay();
}

// 백스페이스
function backspace() {
  if (currentExpression.length > 1) {
    currentExpression = currentExpression.slice(0, -1);
    if (currentExpression === '') {
      currentExpression = '0';
    }
  } else {
    currentExpression = '0';
  }
  updateDisplay();
}

// 수학 함수 추가
function addFunction(funcName) {
  if (currentExpression !== '0' && !waitingForOperand) {
    const value = parseFloat(currentExpression);
    let result;
    
    switch (funcName) {
      case 'Math.sqrt':
        if (value < 0) {
          result = 'Error';
        } else {
          result = Math.sqrt(value);
        }
        break;
      case 'Math.pow':
        result = Math.pow(value, 2);
        break;
      case 'Math.abs':
        result = Math.abs(value);
        break;
      case 'Math.round':
        result = Math.round(value);
        break;
      case 'Math.floor':
        result = Math.floor(value);
        break;
      case 'Math.ceil':
        result = Math.ceil(value);
        break;
      default:
        result = value;
    }
    
    if (result === 'Error') {
      currentExpression = 'Error';
    } else {
      currentExpression = formatNumber(result);
    }
    updateDisplay();
  }
}

// 괄호 추가
function addParentheses(bracket) {
  if (waitingForOperand) {
    currentExpression = bracket;
    waitingForOperand = false;
  } else {
    currentExpression += bracket;
  }
  updateDisplay();
}

// 연산자 추가 (추가 기능용)
function addOperator(operator) {
  setOperator(operator);
}

// 숫자 포맷팅
function formatNumber(num) {
  if (isNaN(num) || !isFinite(num)) {
    return 'Error';
  }
  
  // 정수인 경우 정수로 표시
  if (Number.isInteger(num)) {
    return num.toString();
  }
  
  // 소수인 경우 최대 10자리까지 표시
  return parseFloat(num.toFixed(10)).toString();
}

// 디스플레이 업데이트
function updateDisplay() {
  if (expressionElement) {
    expressionElement.textContent = currentExpression;
  }
  if (resultElement) {
    resultElement.textContent = currentResult;
  }
}

// 키보드 이벤트 처리
function handleKeyPress(event) {
  const key = event.key;
  
  // 숫자 키
  if (/[0-9]/.test(key)) {
    appendNumber(key);
  }
  // 연산자 키
  else if (['+', '-', '*', '/', '%'].includes(key)) {
    event.preventDefault();
    setOperator(key);
  }
  // 소수점
  else if (key === '.') {
    event.preventDefault();
    appendDecimal();
  }
  // Enter 또는 = 키
  else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
  }
  // Backspace 키
  else if (key === 'Backspace') {
    event.preventDefault();
    backspace();
  }
  // Escape 키 (Clear All)
  else if (key === 'Escape') {
    event.preventDefault();
    clearAll();
  }
  // Delete 키 (Clear Entry)
  else if (key === 'Delete') {
    event.preventDefault();
    clearEntry();
  }
}

// 계산기 히스토리 (선택적 기능)
let calculationHistory = [];

function addToHistory(expression, result) {
  calculationHistory.push({
    expression: expression,
    result: result,
    timestamp: new Date()
  });
  
  // 히스토리가 너무 길어지면 오래된 것부터 삭제
  if (calculationHistory.length > 10) {
    calculationHistory.shift();
  }
}

// 계산 완료 후 히스토리에 추가
function finalizeCalculation() {
  if (currentResult !== 'Error' && currentResult !== '0') {
    addToHistory(currentExpression, currentResult);
  }
} 