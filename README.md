# RISINGHUN — Web & Visual Designer Portfolio

브랜드 콘셉트 "떠오르는 태양"을 어둠→빛, 아래→위 상승, 확산하는 빛이라는 추상적 감각으로 표현한
채용용 웹기획·UI/UX 디자이너 포트폴리오입니다. React + Vite로 구현되어 있으며, 5개 프로젝트의 데스크톱·태블릿·모바일 이미지가 모두 적용되어 있습니다.

## 1. 로컬 실행 방법

```bash
npm install
npm run dev       # http://localhost:5173
```

배포용 빌드:

```bash
npm run build      # dist/ 폴더 생성
npm run preview    # 빌드 결과 로컬 확인
```

## 2. 폴더 구조

```
src/
  components/
    Nav/            상단 고정 내비게이션 (스크롤 위치에 따라 라이트/다크 텍스트 전환)
    Hero/           01. Hero — 어둠→빛 도입부
    About/          02. Introduction — "ABOUT THE RISE"
    Works/          03. Selected Works — 5개 프로젝트, 비대칭 레이아웃
    Process/        05. Design Process — Discover→Define→Design→Develop
    Skills/         06. Skills — 카테고리별 실사용 도구
    Contact/        07. Contact — 다시 어두운 배경, Hero와 연결되는 광원
    Reveal.jsx      스크롤 등장(상승) 애니메이션 공통 래퍼
  pages/
    Home.jsx        전체 섹션을 조립하는 랜딩 페이지
    ProjectDetail.jsx  04. Project Detail / Case Study (10단계 구조)
  data/
    projects.js     프로젝트 데이터 (5개) — 실제 콘텐츠 수정은 이 파일에서
  hooks/
    useScrollReveal.js  IntersectionObserver 기반 등장 애니메이션 훅
  styles/
    variables.css   컬러/타이포/스페이싱/모션 디자인 토큰
    global.css      리셋, 공통 타이포, reveal/placeholder 공통 스타일
```

## 3. 이미지 관리 방법

1. 실제 이미지 원본은 `public/images/` 폴더에 있습니다.
2. `src/data/projects.js`의 `heroImage`, `screens`, `responsive` 경로는 `/images/...` 형식의 절대경로를 사용합니다.
3. 이미지를 교체할 때는 기존 파일명과 해상도 규칙을 유지하면 레이아웃 수정 없이 바로 반영됩니다.
4. 권장 규격은 Hero/Screen 1920×1080, Responsive 1200×1600 JPG입니다.
5. `public/resume.pdf`를 실제 이력서 파일로 추가하면 Contact의 "Download PDF"가 동작합니다.

## 4. 디자인 완성도를 높일 수 있는 추가 포인트

- 실제 프로젝트 사진이 들어가면 Works/ProjectDetail의 `--ph-a`/`--ph-b` 그라데이션은
  자동으로 사라지므로, 사진 톤에 맞춰 accent 컬러(`projects.js`의 `accent`)만 다시 점검하면 됩니다.
- Hero의 상승하는 빛은 현재 `scrollY` 기반 CSS 변수로 구현되어 있습니다. GSAP ScrollTrigger를
  추가하면 더 정교한 타이밍 제어가 가능합니다.
- Works 리스트가 6개 이상으로 늘어날 경우, 비대칭 2열 대신 "대표 3개 + 나머지 리스트형"
  구조로 전환하는 것을 권장합니다.
- 프로젝트 상세 페이지의 "결과" 섹션에 실제 정량 지표(전환율, 문의 수 등)가 있다면
  숫자를 크게 강조하는 통계 블록을 추가하면 설득력이 올라갑니다.
- 나비게이션의 라이트/다크 전환은 `document.elementFromPoint`로 섹션의 `data-nav-theme`
  속성을 읽는 방식입니다. 섹션을 추가/삭제할 때는 해당 section 태그에
  `data-nav-theme="dark"` 또는 `"light"`를 반드시 지정해야 합니다.

## 5. 접근성 / 코드 품질 체크리스트

- 시맨틱 태그(`header`, `main`, `section`, `nav`, `dl`, `ol`) 사용
- 모든 이미지 자리에 대체 텍스트에 준하는 안내 문구 포함, 실제 이미지 교체 시 `alt` 필수 작성
- 포커스 가능한 요소에 `:focus-visible` 아웃라인 적용
- `prefers-reduced-motion`에서 모든 트랜지션/애니메이션 즉시 종료 처리
- 색상 대비: 본문 텍스트는 크림/차콜 배경 위에서 WCAG AA 이상 대비를 만족하도록 설계

## 6. 2026-07 이미지 완성도 보정 반영

- 5개 프로젝트의 히어로 및 핵심 화면을 1920×1080으로 통일
- 누락된 태블릿·모바일 프레젠테이션 10장 제작
- 세로형 캠페인 이미지를 16:9 프레젠테이션 보드로 재구성해 잘림 방지
- 프로젝트 상세 페이지 이미지 경로를 `/images/...`로 수정
- 프로젝트 목록 이미지 프레임을 16:10으로 조정
- `dist/index.html` 단일 파일 버전에도 동일 변경 사항 반영

이미지별 문제와 수정 방향은 `IMAGE_REVIEW_REPORT.md`에 정리되어 있습니다.
