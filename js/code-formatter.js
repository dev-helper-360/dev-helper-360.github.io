class CodeFormatter {
  constructor() {
    this.examples = {
      html: `<!DOCTYPE html>
<html>
<head>
<title>My Website</title>
</head>
<body>
<div class="container">
<h1>Hello World</h1>
<p>This is a paragraph.</p>
</div>
</body>
</html>`,
      css: `body{margin:0;padding:0;font-family:Arial,sans-serif;}.container{max-width:1200px;margin:0 auto;padding:20px;}h1{color:#333;text-align:center;}p{line-height:1.6;color:#666;}`,
      javascript: `function calculateSum(a,b){return a+b;}const numbers=[1,2,3,4,5];const sum=numbers.reduce((acc,curr)=>acc+curr,0);console.log('Sum:',sum);`,
      python: `def fibonacci(n):
if n<=1:return n
return fibonacci(n-1)+fibonacci(n-2)
numbers=[1,2,3,4,5]
squares=[x**2 for x in numbers]
print("Squares:",squares)`,
      java: `public class HelloWorld{public static void main(String[] args){System.out.println("Hello, World!");int sum=0;for(int i=1;i<=10;i++){sum+=i;}System.out.println("Sum: "+sum);}}`,
      json: `{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York","zip":"10001"},"hobbies":["reading","swimming","coding"]}`,
      sql: `SELECT u.name,u.email,o.order_date,o.total_amount FROM users u INNER JOIN orders o ON u.id=o.user_id WHERE o.order_date>='2023-01-01' ORDER BY o.total_amount DESC LIMIT 10;`
    };
    
    this.init();
  }

  init() {
    this.sourceCode = document.getElementById('sourceCode');
    this.formattedCode = document.getElementById('formattedCode');
    this.languageSelect = document.getElementById('languageSelect');
    
    // 이벤트 리스너 등록
    this.sourceCode.addEventListener('input', () => this.updateStats());
    this.languageSelect.addEventListener('change', () => this.updateSyntaxHighlighting());
    
    // 초기 통계 업데이트
    this.updateStats();
  }

  formatCode() {
    const source = this.sourceCode.value.trim();
    if (!source) {
      this.showMessage('포맷팅할 코드를 입력해주세요.', 'warning');
      return;
    }

    const language = this.languageSelect.value;
    const options = this.getFormatOptions();
    
    try {
      let formatted = this.formatByLanguage(source, language, options);
      
      // 줄 끝 문자 처리
      formatted = this.applyLineEndings(formatted, options.lineEnding);
      
      // 결과 표시
      this.displayFormattedCode(formatted, language);
      this.updateStats();
      
      this.showMessage('코드가 성공적으로 포맷팅되었습니다!', 'success');
    } catch (error) {
      this.showMessage('포맷팅 중 오류가 발생했습니다: ' + error.message, 'danger');
    }
  }

  formatByLanguage(code, language, options) {
    switch (language) {
      case 'html':
        return this.formatHTML(code, options);
      case 'css':
        return this.formatCSS(code, options);
      case 'javascript':
        return this.formatJavaScript(code, options);
      case 'python':
        return this.formatPython(code, options);
      case 'java':
        return this.formatJava(code, options);
      case 'json':
        return this.formatJSON(code, options);
      case 'xml':
        return this.formatXML(code, options);
      case 'sql':
        return this.formatSQL(code, options);
      case 'php':
        return this.formatPHP(code, options);
      case 'csharp':
        return this.formatCSharp(code, options);
      case 'cpp':
      case 'c':
        return this.formatCpp(code, options);
      case 'go':
        return this.formatGo(code, options);
      case 'rust':
        return this.formatRust(code, options);
      case 'ruby':
        return this.formatRuby(code, options);
      case 'swift':
        return this.formatSwift(code, options);
      case 'kotlin':
        return this.formatKotlin(code, options);
      case 'scala':
        return this.formatScala(code, options);
      case 'typescript':
        return this.formatTypeScript(code, options);
      case 'jsx':
        return this.formatJSX(code, options);
      case 'tsx':
        return this.formatTSX(code, options);
      default:
        return this.formatGeneric(code, options);
    }
  }

  formatHTML(code, options) {
    if (options.minify) {
      return this.minifyHTML(code);
    }
    
    let formatted = code
      .replace(/></g, '>\n<')
      .replace(/\s*\/>/g, ' />')
      .replace(/\s*>/g, '>')
      .replace(/<\s*/g, '<');
    
    // 들여쓰기 적용
    return this.applyIndentation(formatted, options.indentSize);
  }

  formatCSS(code, options) {
    if (options.minify) {
      return this.minifyCSS(code);
    }
    
    let formatted = code
      .replace(/}/g, '}\n')
      .replace(/;/g, ';\n')
      .replace(/\s*{\s*/g, ' {\n')
      .replace(/\s*}\s*/g, '\n}\n');
    
    return this.applyIndentation(formatted, options.indentSize);
  }

  formatJavaScript(code, options) {
    if (options.minify) {
      return this.minifyJavaScript(code);
    }
    
    // 기본적인 JavaScript 포맷팅
    let formatted = code
      .replace(/;/g, ';\n')
      .replace(/\s*{\s*/g, ' {\n')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/\s*,\s*/g, ', ')
      .replace(/\s*=\s*/g, ' = ')
      .replace(/\s*\+\s*/g, ' + ')
      .replace(/\s*-\s*/g, ' - ')
      .replace(/\s*\*\s*/g, ' * ')
      .replace(/\s*\/\s*/g, ' / ');
    
    return this.applyIndentation(formatted, options.indentSize);
  }

  formatPython(code, options) {
    if (options.minify) {
      return this.minifyPython(code);
    }
    
    // Python은 들여쓰기가 중요하므로 기본 포맷팅만
    let formatted = code
      .replace(/:\s*/g, ':\n')
      .replace(/;\s*/g, '\n');
    
    return this.applyIndentation(formatted, options.indentSize);
  }

  formatJava(code, options) {
    if (options.minify) {
      return this.minifyJava(code);
    }
    
    let formatted = code
      .replace(/;/g, ';\n')
      .replace(/\s*{\s*/g, ' {\n')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/\s*,\s*/g, ', ')
      .replace(/\s*=\s*/g, ' = ');
    
    return this.applyIndentation(formatted, options.indentSize);
  }

  formatJSON(code, options) {
    try {
      const parsed = JSON.parse(code);
      return JSON.stringify(parsed, null, options.minify ? 0 : parseInt(options.indentSize));
    } catch (error) {
      throw new Error('유효하지 않은 JSON 형식입니다.');
    }
  }

  formatXML(code, options) {
    if (options.minify) {
      return this.minifyXML(code);
    }
    
    let formatted = code
      .replace(/></g, '>\n<')
      .replace(/\s*\/>/g, ' />')
      .replace(/\s*>/g, '>')
      .replace(/<\s*/g, '<');
    
    return this.applyIndentation(formatted, options.indentSize);
  }

  formatSQL(code, options) {
    if (options.minify) {
      return this.minifySQL(code);
    }
    
    let formatted = code
      .replace(/\bSELECT\b/gi, '\nSELECT')
      .replace(/\bFROM\b/gi, '\nFROM')
      .replace(/\bWHERE\b/gi, '\nWHERE')
      .replace(/\bORDER BY\b/gi, '\nORDER BY')
      .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
      .replace(/\bHAVING\b/gi, '\nHAVING')
      .replace(/\bLIMIT\b/gi, '\nLIMIT')
      .replace(/\bJOIN\b/gi, '\nJOIN')
      .replace(/\bINNER JOIN\b/gi, '\nINNER JOIN')
      .replace(/\bLEFT JOIN\b/gi, '\nLEFT JOIN')
      .replace(/\bRIGHT JOIN\b/gi, '\nRIGHT JOIN')
      .replace(/\bUNION\b/gi, '\nUNION')
      .replace(/,/g, ',\n  ');
    
    return this.applyIndentation(formatted, options.indentSize);
  }

  formatGeneric(code, options) {
    if (options.minify) {
      return this.minifyGeneric(code);
    }
    
    let formatted = code
      .replace(/;/g, ';\n')
      .replace(/\s*{\s*/g, ' {\n')
      .replace(/\s*}\s*/g, '\n}\n');
    
    return this.applyIndentation(formatted, options.indentSize);
  }

  // 미니파이 함수들
  minifyHTML(code) {
    return code
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .replace(/\s*\/>/g, '/>')
      .trim();
  }

  minifyCSS(code) {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '') // 주석 제거
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*:\s*/g, ':')
      .trim();
  }

  minifyJavaScript(code) {
    return code
      .replace(/\/\/.*$/gm, '') // 한 줄 주석 제거
      .replace(/\/\*[\s\S]*?\*\//g, '') // 여러 줄 주석 제거
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*=\s*/g, '=')
      .trim();
  }

  minifyPython(code) {
    return code
      .replace(/#.*$/gm, '') // 주석 제거
      .replace(/\s+/g, ' ')
      .replace(/\s*:\s*/g, ':')
      .trim();
  }

  minifyJava(code) {
    return code
      .replace(/\/\/.*$/gm, '') // 한 줄 주석 제거
      .replace(/\/\*[\s\S]*?\*\//g, '') // 여러 줄 주석 제거
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*;\s*/g, ';')
      .trim();
  }

  minifyXML(code) {
    return code
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  minifySQL(code) {
    return code
      .replace(/\s+/g, ' ')
      .replace(/\s*,\s*/g, ',')
      .trim();
  }

  minifyGeneric(code) {
    return code
      .replace(/\/\/.*$/gm, '') // 한 줄 주석 제거
      .replace(/\/\*[\s\S]*?\*\//g, '') // 여러 줄 주석 제거
      .replace(/\s+/g, ' ')
      .trim();
  }

  applyIndentation(code, indentSize) {
    const lines = code.split('\n');
    let indentLevel = 0;
    const indent = ' '.repeat(parseInt(indentSize));
    
    return lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      
      // 닫는 괄호나 태그가 있으면 들여쓰기 레벨 감소
      if (trimmed.match(/^[})\]]/) || trimmed.match(/^<\//)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      const result = indent.repeat(indentLevel) + trimmed;
      
      // 여는 괄호나 태그가 있으면 들여쓰기 레벨 증가
      if (trimmed.match(/[{([]$/) || trimmed.match(/<[^/][^>]*[^/]>$/)) {
        indentLevel++;
      }
      
      return result;
    }).join('\n');
  }

  applyLineEndings(code, lineEnding) {
    switch (lineEnding) {
      case 'lf':
        return code.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      case 'crlf':
        return code.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '\r\n');
      case 'cr':
        return code.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n/g, '\r');
      default:
        return code;
    }
  }

  displayFormattedCode(code, language) {
    const codeElement = this.formattedCode.querySelector('code');
    codeElement.textContent = code;
    codeElement.className = `language-${language}`;
    Prism.highlightElement(codeElement);
  }

  updateSyntaxHighlighting() {
    const language = this.languageSelect.value;
    const codeElement = this.formattedCode.querySelector('code');
    if (codeElement.textContent.trim() !== '포맷팅된 코드가 여기에 표시됩니다.') {
      codeElement.className = `language-${language}`;
      Prism.highlightElement(codeElement);
    }
  }

  getFormatOptions() {
    return {
      indentSpaces: document.getElementById('indentSpaces').checked,
      removeComments: document.getElementById('removeComments').checked,
      minify: document.getElementById('minify').checked,
      indentSize: document.getElementById('indentSize').value,
      lineEnding: document.getElementById('lineEnding').value
    };
  }

  updateStats() {
    const source = this.sourceCode.value;
    const formatted = this.formattedCode.querySelector('code').textContent;
    
    const sourceLines = source.split('\n').length;
    const sourceChars = source.length;
    const sourceWords = source.split(/\s+/).filter(word => word.length > 0).length;
    
    const formattedLines = formatted.split('\n').length;
    const formattedChars = formatted.length;
    const formattedWords = formatted.split(/\s+/).filter(word => word.length > 0).length;
    
    const sizeReduction = sourceChars > 0 ? Math.round(((sourceChars - formattedChars) / sourceChars) * 100) : 0;
    
    document.getElementById('lineCount').textContent = formattedLines;
    document.getElementById('charCount').textContent = formattedChars;
    document.getElementById('wordCount').textContent = formattedWords;
    document.getElementById('sizeReduction').textContent = sizeReduction + '%';
  }

  loadExample() {
    const language = this.languageSelect.value;
    const example = this.examples[language] || '// 예제 코드를 입력하세요...';
    this.sourceCode.value = example;
    this.updateStats();
  }

  clearCode() {
    this.sourceCode.value = '';
    this.formattedCode.querySelector('code').textContent = '포맷팅된 코드가 여기에 표시됩니다.';
    this.updateStats();
  }

  copyFormattedCode() {
    const code = this.formattedCode.querySelector('code').textContent;
    if (code && code !== '포맷팅된 코드가 여기에 표시됩니다.') {
      navigator.clipboard.writeText(code).then(() => {
        this.showMessage('코드가 클립보드에 복사되었습니다!', 'success');
      }).catch(() => {
        this.showMessage('클립보드 복사에 실패했습니다.', 'danger');
      });
    } else {
      this.showMessage('복사할 코드가 없습니다.', 'warning');
    }
  }

  downloadCode() {
    const code = this.formattedCode.querySelector('code').textContent;
    if (code && code !== '포맷팅된 코드가 여기에 표시됩니다.') {
      const language = this.languageSelect.value;
      const extension = this.getFileExtension(language);
      const filename = `formatted-code.${extension}`;
      
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      this.showMessage('코드가 다운로드되었습니다!', 'success');
    } else {
      this.showMessage('다운로드할 코드가 없습니다.', 'warning');
    }
  }

  getFileExtension(language) {
    const extensions = {
      html: 'html',
      css: 'css',
      javascript: 'js',
      python: 'py',
      java: 'java',
      json: 'json',
      xml: 'xml',
      sql: 'sql',
      php: 'php',
      csharp: 'cs',
      cpp: 'cpp',
      c: 'c',
      go: 'go',
      rust: 'rs',
      ruby: 'rb',
      swift: 'swift',
      kotlin: 'kt',
      scala: 'scala',
      typescript: 'ts',
      jsx: 'jsx',
      tsx: 'tsx'
    };
    return extensions[language] || 'txt';
  }

  showMessage(message, type) {
    // Bootstrap 토스트 또는 알림 표시
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 3000);
  }
}

// 전역 함수들
let codeFormatter;

function formatCode() {
  if (codeFormatter) {
    codeFormatter.formatCode();
  }
}

function loadExample() {
  if (codeFormatter) {
    codeFormatter.loadExample();
  }
}

function clearCode() {
  if (codeFormatter) {
    codeFormatter.clearCode();
  }
}

function copyFormattedCode() {
  if (codeFormatter) {
    codeFormatter.copyFormattedCode();
  }
}

function downloadCode() {
  if (codeFormatter) {
    codeFormatter.downloadCode();
  }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  codeFormatter = new CodeFormatter();
}); 