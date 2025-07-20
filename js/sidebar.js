// 사이드바 관련 기능들
let sidebar = null;
let hamburgerButton = null;

// 사이드바 생성
function createSidebar() {
  // 사이드바 요소 생성
  sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';
  
  // 현재 페이지 경로에 따른 base path 설정
  const currentPath = window.location.pathname;
  const basePath = currentPath.includes('/tools/') ? '../' : './';
  
  sidebar.innerHTML = `
    <div class="sidebar-header">
      <h2>UtilTools</h2>
      <button class="sidebar-close" onclick="toggleSidebar()">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <nav class="sidebar-nav">
      <a href="${basePath}index.html" class="nav-link" data-page="home">
        <i class="fas fa-home"></i> 홈
      </a>
      
      <div class="nav-category">
        <div class="nav-category-header" onclick="toggleCategory('text-tools')">
          <i class="fas fa-font"></i> 텍스트 도구
          <i class="fas fa-chevron-down category-arrow"></i>
        </div>
        <div class="nav-category-content" id="text-tools">
          <a href="${basePath}tools/base64.html" class="nav-link sub-link" data-page="base64">
            <i class="fas fa-code"></i> Base64 인코더/디코더
          </a>
          <a href="${basePath}tools/url.html" class="nav-link sub-link" data-page="url">
            <i class="fas fa-link"></i> URL 인코더/디코더
          </a>
        </div>
      </div>
      
      <div class="nav-category">
        <div class="nav-category-header" onclick="toggleCategory('dev-tools')">
          <i class="fas fa-code"></i> 개발 도구
          <i class="fas fa-chevron-down category-arrow"></i>
        </div>
        <div class="nav-category-content" id="dev-tools">
          <a href="${basePath}tools/json.html" class="nav-link sub-link" data-page="json">
            <i class="fas fa-file-code"></i> JSON 포매터
          </a>
          <a href="${basePath}tools/timestamp.html" class="nav-link sub-link" data-page="timestamp">
            <i class="fas fa-clock"></i> Unix 타임스탬프 변환
          </a>
          <a href="${basePath}tools/regex-tester.html" class="nav-link sub-link" data-page="regex">
            <i class="fas fa-search"></i> 정규표현식 테스터
          </a>
          <a href="${basePath}tools/hash-generator.html" class="nav-link sub-link" data-page="hash">
            <i class="fas fa-fingerprint"></i> 해시 생성기/검증기
          </a>
        </div>
      </div>
      
      <div class="nav-category">
        <div class="nav-category-header" onclick="toggleCategory('utility-tools')">
          <i class="fas fa-tools"></i> 유틸리티
          <i class="fas fa-chevron-down category-arrow"></i>
        </div>
        <div class="nav-category-content" id="utility-tools">
          <a href="${basePath}tools/calculator.html" class="nav-link sub-link" data-page="calculator">
            <i class="fas fa-calculator"></i> 간단 계산기
          </a>
          <a href="${basePath}tools/color-converter.html" class="nav-link sub-link" data-page="color">
            <i class="fas fa-palette"></i> 색상 변환기
          </a>
        </div>
      </div>
    </nav>
  `;
  
  document.body.appendChild(sidebar);
  
  // 현재 페이지 하이라이트
  highlightCurrentPage();
}

// 햄버거 버튼 생성
function createHamburgerButton() {
  hamburgerButton = document.createElement('button');
  hamburgerButton.className = 'hamburger-button';
  hamburgerButton.id = 'hamburger-button';
  hamburgerButton.innerHTML = '<i class="fas fa-bars"></i>';
  hamburgerButton.onclick = toggleSidebar;
  
  document.body.appendChild(hamburgerButton);
}

// 사이드바 토글 설정
function setupSidebarToggle() {
  // 모든 경우에 사이드바를 기본적으로 닫힌 상태로 유지
  sidebar.classList.remove('open');
  if (hamburgerButton) {
    hamburgerButton.style.display = 'block';
  }
  
  // 윈도우 리사이즈 이벤트
  window.addEventListener('resize', () => {
    // 리사이즈 시에도 사이드바는 닫힌 상태 유지
    sidebar.classList.remove('open');
    if (hamburgerButton) {
      hamburgerButton.style.display = 'block';
    }
  });
}

// 사이드바 토글
function toggleSidebar() {
  sidebar.classList.toggle('open');
  
  // 메인 콘텐츠 영역 조정
  const mainContent = document.querySelector('main') || document.querySelector('.container') || document.body;
  if (sidebar.classList.contains('open')) {
    mainContent.classList.add('sidebar-open');
  } else {
    mainContent.classList.remove('sidebar-open');
  }
  
  // 햄버거 버튼 표시/숨김 관리
  if (hamburgerButton) {
    if (sidebar.classList.contains('open')) {
      hamburgerButton.style.display = 'none';
    } else {
      hamburgerButton.style.display = 'block';
    }
  }
}

// 카테고리 토글 기능
function toggleCategory(categoryId) {
  const categoryContent = document.getElementById(categoryId);
  const categoryHeader = categoryContent.previousElementSibling;
  const arrow = categoryHeader.querySelector('.category-arrow');
  
  if (categoryContent.classList.contains('open')) {
    categoryContent.classList.remove('open');
    arrow.style.transform = 'rotate(0deg)';
  } else {
    categoryContent.classList.add('open');
    arrow.style.transform = 'rotate(180deg)';
  }
}

// 현재 페이지 하이라이트
function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href) || 
        (currentPath.endsWith('/') && href.includes('index.html')) ||
        (currentPath.endsWith('index.html') && href.includes('index.html'))) {
      link.classList.add('active');
      
      // 현재 페이지가 속한 카테고리 자동 열기
      const category = link.closest('.nav-category-content');
      if (category) {
        category.classList.add('open');
        const arrow = category.previousElementSibling.querySelector('.category-arrow');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    }
  });
}

// 사이드바 초기화
function initSidebar() {
  createSidebar();
  createHamburgerButton();
  setupSidebarToggle();
} 