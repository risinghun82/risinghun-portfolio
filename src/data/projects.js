// ---------------------------------------------------------------------------
// Central project data source.
// Each project drives both the "Selected Works" list and its own case-study
// detail page (see src/pages/ProjectDetail.jsx).
//
// image / images fields are placeholder paths under /public/images/.
// Replace the actual files in that folder — see README.md "이미지 교체 방법".
// ---------------------------------------------------------------------------

export const projects = [
  {
    id: 1,
    slug: "ppasak-camping",
    number: "01",
    title: "Ppasak Camping",
    category: "E-commerce Website Redesign",
    role: "Web Design / UI·UX / Publishing",
    contribution: "100% (기획·디자인·퍼블리싱 단독 진행)",
    year: "2022",
    accent: "#B5652E",
    // This project uses real screenshots instead of color placeholders —
    // see the `images` flag below and Works.jsx / ProjectDetail.jsx, which
    // check it to decide whether to render an <img> or the placeholder div.
    images: {
      hero: true,
      screens: [true, true, true],
      responsive: [true, true],
    },
    summary:
      "아웃도어 브랜드 빠삭한 캠핑의 온라인 스토어를, 감도 높은 라이프스타일 사진과 명확한 카테고리 구조로 다시 설계했습니다.",
    heroImage: "/images/project-01-hero.jpg",
    overview: {
      client: "Ppasak Camping (빠삭한 캠핑)",
      scope: "이커머스 웹사이트 UI 리디자인, 상품 상세 시스템, 반응형 퍼블리싱",
      duration: "2022.10 – 2022.11",
      description:
        "텐트·가구·조명 등 아웃도어 장비를 판매하는 캠핑 브랜드의 온라인 스토어를 리디자인한 프로젝트입니다. 제품은 좋지만 사이트는 평범한 쇼핑몰로만 보여, 브랜드가 지향하는 '감도 높은 아웃도어 라이프'가 전달되지 않는 문제가 있었습니다.",
    },
    background: [
      "타겟 고객층이 가격보다 톤앤매너와 사진의 질을 먼저 보고 브랜드를 판단하는 프리미엄 캠핑 시장이었습니다.",
      "상품 수가 많아지면서 카테고리 구조 없이 목록만 계속 늘어나는 상태였습니다.",
      "홈 화면에서 브랜드의 정체성보다 할인·이벤트 배너가 먼저 보이는 구조였습니다.",
    ],
    problems: [
      "홈 히어로가 브랜드 무드를 전달하지 못하고 일반 쇼핑몰 배너처럼 보임",
      "카테고리별 상품이 단순 나열되어 있어 '무엇부터 봐야 할지' 안내가 없음",
      "상품 상세페이지에서 이미지·옵션·구매 버튼의 위계가 불명확함",
    ],
    direction: [
      "노을·모닥불 같은 웜톤 라이프스타일 사진을 히어로 전면에 배치해 브랜드 무드부터 전달",
      "'쓰임에 따라 고른 장비' 카테고리 큐레이션 섹션을 홈에 추가해 탐색 동선을 짧게 만듦",
      "상품 상세는 큰 이미지 → 정보 → 구매 순으로 위계를 명확히 하고, 구매 버튼은 오렌지 포인트 컬러로 통일",
    ],
    colorTypography: {
      colors: ["#171717", "#F5EFE4", "#C1652F", "#5B5A42"],
      typefaces: ["Inter (영문 헤드라인)", "Pretendard (본문/한글)"],
    },
    screens: [
      "/images/project-01-screen-01.jpg",
      "/images/project-01-screen-02.jpg",
      "/images/project-01-screen-03.jpg",
    ],
    responsive: [
      "/images/project-01-responsive-01.jpg",
      "/images/project-01-responsive-02.jpg",
    ],
    toolsUsed: ["Figma", "Photoshop", "HTML/CSS", "반응형 퍼블리싱"],
    result:
      "카테고리 큐레이션 섹션을 도입한 이후 홈에서 상품 목록으로 이어지는 탐색 동선이 짧아졌고, 사진 톤을 웜톤으로 통일하면서 사이트 전체의 브랜드 인상이 한층 또렷해졌습니다.",
  },
  {
    id: 2,
    slug: "noden",
    number: "02",
    title: "NODEN",
    category: "D2C Product Brand Website (개인 프로젝트)",
    role: "Web Design / UI Design / Publishing",
    contribution: "100% (기획·디자인·퍼블리싱 단독 진행)",
    year: "2022",
    accent: "#2B3742",
    // The hero photo's headline + CTA block sits in the lower half of the
    // source image (nav bar takes up the top). A pure vertical "center" crop
    // was slicing into the "DISCOVER L01" button, so bias the crop toward
    // the bottom of the source image to keep the whole text group intact.
    imagePosition: "left 75%",
    // Real screenshots of a self-built, self-directed site — see Works.jsx / ProjectDetail.jsx.
    images: {
      hero: true,
      screens: [true, true, true],
      responsive: [true, true],
    },
    summary:
      "집과 업무 공간, 야외를 오가며 쓰는 휴대형 라이프스타일 오브젝트 브랜드 'NODEN'의 웹사이트를, 기획부터 디자인·퍼블리싱까지 직접 진행한 개인 프로젝트입니다.",
    heroImage: "/images/project-02-hero.jpg",
    overview: {
      client: "개인 프로젝트 · 가상 브랜드 (실제 클라이언트 없음)",
      scope:
        "D2C 브랜드 웹사이트 기획 및 UI 디자인, 인터랙션 설계, 반응형 퍼블리싱 (셀프 디렉팅)",
      duration: "2022.06",
      description:
        "휴대형 조명·서큘레이터·스피커·시계 등 '공간을 옮겨 다니며 쓰는' 라이프스타일 오브젝트를 파는 가상 브랜드 'NODEN'의 웹사이트를 직접 기획하고 디자인·퍼블리싱까지 완성한 개인 프로젝트입니다. 클라이언트 없이도 제품 스토리텔링부터 구매 전환까지 이어지는 D2C 사이트를 처음부터 끝까지 완성할 수 있는지 검증하기 위해 시작했습니다.",
    },
    background: [
      "실무에서 자주 맡지 않는 '기획자 없이 혼자 컨셉부터 완성까지' 진행하는 경험을 쌓고 싶었습니다.",
      "캠핑 브랜드 작업(Ppasak Camping)이 아웃도어 장비였던 것과 달리, 미니멀한 실내외 겸용 라이프스타일 제품에서는 톤과 인터랙션을 어떻게 다르게 설계해야 하는지 실험해보고 싶었습니다.",
      "제품이 4종뿐인 상황에서, 단순 나열이 아니라 공간(집·업무·야외)을 축으로 제품을 소개하는 구조를 만들 수 있는지가 관건이었습니다.",
    ],
    problems: [
      "레퍼런스로 삼은 미니멀 라이프스타일 브랜드 다수가 제품 나열 위주라, '왜 하나의 제품이 여러 공간에서 쓰이는지'를 설득하지 못함",
      "컬러 옵션·스펙·가격 등 정보량이 많은 제품 상세를 감성적인 톤 그대로 유지하면서 보여줘야 했음",
      "재구매·비교가 잦은 카테고리 특성상, 4개 제품을 스펙으로 비교할 수 있는 장치가 필요했음",
    ],
    direction: [
      "히어로에서 어두운 톤의 무드 사진으로 제품을 먼저 각인시키고, 이후 섹션에서 톤을 밝게 전환해 정보 전달에 집중",
      "'ONE OBJECT, THREE SPACES' 탭 섹션을 두어 같은 제품이 HOME·WORK·OUTDOOR에서 각각 다르게 쓰이는 모습을 하나의 인터랙션으로 보여줌",
      "제품 상세는 컬러 스와치·다이얼 조작 등 실제 사용성을 다이어그램처럼 시각화해 정보량이 많아도 정돈되어 보이게 구성",
      "THE COLLECTION 그리드와 스펙 비교표를 함께 제공해, 첫 방문자가 4개 제품 중 무엇을 볼지 스스로 판단할 수 있도록 설계",
      "'FROM ROOM TO OPEN AIR' 라이프스타일 갤러리로 마무리해, 스펙이 아니라 실제 생활 속 장면으로 브랜드를 다시 각인",
    ],
    colorTypography: {
      colors: ["#1F2A33", "#F3F5F6", "#2B3742", "#8B8272"],
      typefaces: [
        "Space Grotesk (영문 헤드라인)",
        "IBM Plex Mono (스펙/숫자)",
        "Noto Sans KR (본문/한글)",
      ],
    },
    screens: [
      "/images/project-02-screen-01.jpg",
      "/images/project-02-screen-02.jpg",
      "/images/project-02-screen-03.jpg",
    ],
    responsive: [
      "/images/project-02-responsive-01.jpg",
      "/images/project-02-responsive-02.jpg",
    ],
    toolsUsed: ["Figma", "Photoshop", "HTML/CSS/JS", "반응형 퍼블리싱"],
    result:
      "클라이언트 없이도 기획 → 디자인 → 퍼블리싱을 혼자 끝까지 완성해본 프로젝트입니다. 캠핑 장비(Project 01)와는 전혀 다른 제품군에서, 공간 전환 인터랙션과 라이프스타일 사진만으로도 제품의 다용도성을 설득할 수 있다는 것을 확인했습니다.",
  },
  {
    id: 3,
    slug: "gimesee",
    number: "03",
    title: "Gimesee",
    category: "In-house Messaging Service · Web/UI Design",
    role: "Web Design / UI·UX / Publishing / Brand Content",
    contribution: "기획 90% · 디자인 100% · 퍼블리싱 100%",
    year: "2023",
    accent: "#159895",
    // Real screenshots + real promotional creative — see Works.jsx / ProjectDetail.jsx.
    images: {
      hero: true,
      screens: [true, true, true],
      responsive: [true, true],
    },
    // This hero is much wider than the works-card / hero-panel boxes, so the
    // generic "left center" crop pushes the headline text hard against the
    // right edge and leaves a dead gray gap on the left. Center the crop
    // closer to the text block instead — see Works.css / ProjectDetail.css.
    imagePosition: "19% center",
    summary:
      "자사 메시징 서비스 '지메시'의 웹 UI/UX 기획과 화면 디자인을 전담하며, 실무자 중심이던 B2B 도구를 일반 사용자도 쉽게 쓸 수 있는 서비스로 전환해가고 있습니다.",
    heroImage: "/images/project-03-hero.jpg",
    overview: {
      client: "지메시 (Gimesee) — 자사 서비스",
      scope:
        "웹 UI/UX 기획·화면 디자인, HTML/CSS 퍼블리싱, 온·오프라인 브랜드 콘텐츠 제작",
      duration: "2023.07 – 2023.11",
      description:
        "문자·카카오톡·RCS 등 다채널 메시지 발송 서비스 '지메시'의 웹 UI/UX와 화면 디자인을 전담하고 있습니다. 기존 B2B 중심의 발송 도구를 일반 사용자도 쉽게 이용할 수 있는 서비스로 전환하는 화면 설계부터, 신규 기능 추가에 따른 UI 고도화, 서비스 소개 페이지와 온·오프라인 홍보 콘텐츠 제작까지 서비스 전반의 디자인을 담당하고 있습니다.",
    },
    background: [
      "기존 B2B 메시지 발송 도구를 일반 사용자 중심의 B2C 서비스로 전환해야 하는 과제가 있었습니다.",
      "기능과 이용 절차가 실무자 기준으로 설계돼 있어, 새로 유입되는 일반 사용자에게는 진입장벽이 높았습니다.",
      "온라인 화면뿐 아니라 전시회 백월·리플렛 등 오프라인 홍보물까지 함께 관리해야 하는 구조였습니다.",
    ],
    problems: [
      "실무자용으로 만들어진 화면을 그대로 쓰고 있어, 일반 사용자가 보기엔 기능과 용어가 낯설고 진입장벽이 높음",
      "복잡한 발송 절차가 단계 구분 없이 그대로 노출되어, 처음 온 사용자가 어디서부터 시작해야 할지 안내가 부족함",
      "신규 기능이 추가될 때마다 화면이 그때그때 덧붙는 식으로 늘어나 서비스 전체의 디자인 톤이 흔들리기 쉬움",
    ],
    direction: [
      "B2C 전환에 맞춰 정보 구조와 화면 흐름을 다시 설계하고, 복잡한 발송 절차를 단계별로 안내되도록 UI/UX 개선",
      "신규 기능이 추가될 때마다 기존 화면과 같은 톤으로 UI를 확장하고, HTML/CSS로 직접 퍼블리싱해 실제 운영 화면에 반영",
      "서비스 소개 페이지·온라인 프로모션 이미지부터 전시회 백월·리플렛 같은 오프라인 콘텐츠까지 함께 제작해 온·오프라인 톤을 일치시킴",
      "영업·기획·개발 담당자와 협업해 요구사항을 실제 운영 가능한 화면으로 구현하고, 서비스 전반의 디자인 일관성과 가독성을 지속적으로 관리",
    ],
    colorTypography: {
      colors: ["#159895", "#1B2A6B", "#FFFFFF", "#F2F5F5"],
      typefaces: ["Pretendard (헤드라인/본문)", "Inter (숫자·영문)"],
    },
    // These three assets are offline print/campaign creative, not in-app UI —
    // so this project uses its own section title + per-image captions instead
    // of the generic "Key UI Screens" heading. Real UI screens (if added
    // later) should go in a separate array so the two don't get conflated.
    screensTitle: "Campaign & Print Materials",
    // This section is meant to hold a growing pile of banner/print creative
    // (many more will be added over time), not a handful of full-width
    // screenshots — "gallery" renders it as a dense multi-column grid of
    // small tiles instead of one large image per row. See
    // ProjectDetail.jsx / ProjectDetail.css. Adding more banners later is
    // just adding more entries to screens/screenCaptions/images.screens
    // below — the grid itself needs no further changes.
    screensLayout: "gallery",
    screenCaptions: [
      "조선일보 지면광고 배너",
      "3단 리플렛 — 앞면",
      "3단 리플렛 — 뒷면",
    ],
    screens: [
      "/images/project-03-screen-01.jpg",
      "/images/project-03-screen-02.jpg",
      "/images/project-03-screen-03.jpg",
    ],
    // Real in-app UI screenshots, separate from the print materials above.
    // Personal phone numbers visible in the source screenshots (sender +
    // recipient) were redacted before saving these — see public/images.
    uiScreens: [
      "/images/project-03-ui-01.jpg",
      "/images/project-03-ui-02.jpg",
      "/images/project-03-ui-03.jpg",
    ],
    uiScreenCaptions: ["새 메시지 작성", "주소록", "전송 결과 상세"],
    // This project does not have a mobile/responsive version — skip the
    // "Responsive Screens" section entirely on the case study page rather
    // than showing placeholder or misleading images. See ProjectDetail.jsx.
    noResponsive: true,
    toolsUsed: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "HTML/CSS",
      "반응형 퍼블리싱",
    ],
    result:
      "B2B 실무자용에 머물러 있던 화면을 일반 사용자도 헤매지 않고 쓸 수 있는 구조로 단계적으로 전환했고, 온라인 화면과 오프라인 홍보물까지 하나의 톤으로 관리하면서 서비스 전체의 브랜드 인상을 일관되게 유지하고 있습니다.",
  },
  {
    id: 4,
    slug: "ppasak-guys",
    number: "04",
    title: "Ppasak Guys",
    category: "B2B Service Landing Page",
    role: "Web Design / UI·UX / Publishing",
    contribution: "기획 50% · 디자인 100% · 퍼블리싱 100%",
    year: "2022",
    accent: "#DC3B2B",
    // Real screenshots, same pattern as Projects 01 / 05.
    images: { hero: true, screens: [true, true], responsive: [true, true] },
    // Headline here is centered in the source photo, not left-aligned — the
    // generic "left center" crop clips it on the right. Plain center keeps
    // the full headline in frame regardless of box aspect ratio.
    imagePosition: "center",
    // These screens are full-section page captures, taller than the default
    // 16:9 crop — force-cropping them to 16:9 clips cards at the edges.
    // Render them at their natural height instead of cropping to fit a box.
    screensAspect: "auto",
    summary:
      "소방기관 전용 무인 매점 구독 서비스 '빠삭한 녀석들'의 세일즈 랜딩페이지를, 정량적 효과가 먼저 읽히는 구조로 설계했습니다.",
    heroImage: "/images/project-04-hero.jpg",
    overview: {
      client: "빠삭한 녀석들 (Deepdive Co., Ltd.)",
      scope: "B2B 랜딩페이지 신규 제작, 반응형 퍼블리싱",
      duration: "2022.08 – 2022.09",
      description:
        "소방기관을 대상으로 무인 매점·간식 구독 설비를 제공하는 B2B 서비스의 랜딩페이지입니다. 예산 담당자가 결재를 검토하는 상황을 가정해, 감성적 소개보다 정량적 도입 효과를 먼저 보여주는 것이 핵심 과제였습니다.",
    },
    background: [
      "시장에 직접적인 경쟁 서비스가 거의 없어, 카테고리 자체를 처음 설명해야 하는 상황이었습니다.",
      "실제 의사결정자는 현장 소방관이 아니라 예산을 집행하는 행정 담당자였습니다.",
      "설비 100% 무상 지원이라는 강점이 있었지만, 이를 신뢰감 있게 전달할 근거 자료가 부족했습니다.",
    ],
    problems: [
      "도입 효과가 '편리하다' 같은 추상적 문구로만 소개되어 결재 근거로 쓰기 어려움",
      "요금제 4종이 동일한 비중으로 나열되어 있어 어떤 플랜을 골라야 할지 안내가 없음",
      "문의 접점이 페이지 최하단 한 곳뿐이라 관심이 생겨도 이탈하기 쉬움",
    ],
    direction: [
      "'관리 업무 시간 90% 감소', '운영 예산 45% 절감' 같은 실제 수치를 컬러 대비가 강한 블록으로 전면 배치",
      "4개 요금제 중 추천 플랜에 'BEST' 배지와 강조 테두리를 적용해 선택 부담을 줄임",
      "히어로에 실제 근무 공간 사진을 사용해 타겟(소방관)이 자신의 상황으로 곧바로 인식하게 설계",
      "상담 신청 CTA를 히어로·요금제·하단 총 3곳에 반복 배치해 이탈 지점을 줄임",
    ],
    colorTypography: {
      colors: ["#1B1F6B", "#2A3AA0", "#DC3B2B", "#FFD400"],
      typefaces: ["Pretendard (헤드라인/본문)", "Inter (숫자·영문)"],
    },
    screens: [
      "/images/project-04-screen-01.jpg",
      "/images/project-04-screen-02.jpg",
    ],
    // Offline flyer designed alongside the landing page for the same
    // campaign — shown as its own section under Key UI Screens rather than
    // mixed into the on-screen UI shots.
    flyerScreensTitle: "Print & Flyer Design",
    flyerScreens: [
      "/images/project-04-flyer-02.jpg",
      "/images/project-04-flyer-01.jpg",
    ],
    flyerCaptions: [
      "전단지 — 설치 안내 & 실제 설치 사례",
      "전단지 — 서비스 소개 & 판매랭킹",
    ],
    responsive: [
      "/images/project-04-responsive-01.jpg",
      "/images/project-04-responsive-02.jpg",
    ],
    toolsUsed: ["Figma", "Photoshop", "HTML/CSS", "반응형 퍼블리싱"],
    result:
      "정량 효과를 페이지 상단부로 끌어올린 이후, 스크롤 없이도 핵심 메시지가 전달된다는 내부 피드백을 받았습니다. B2B 랜딩페이지일수록 감성보다 숫자가 먼저 설득한다는 것을 확인한 프로젝트입니다.",
  },
  {
    id: 5,
    slug: "hrd-asset",
    number: "05",
    title: "HRD Asset",
    category: "Corporate E-Learning Platform",
    role: "Web Design / UI·UX / Publishing",
    contribution: "기획 50% · 디자인 70% · 퍼블리싱 60%",
    year: "2023",
    accent: "#1D5D99",
    // Real screenshots, same pattern as Project 01 — see Works.jsx / ProjectDetail.jsx.
    images: {
      hero: true,
      screens: [true, true, true],
      responsive: [true, true],
    },
    summary:
      "법정의무교육 이러닝 플랫폼 HRD에셋교육원의 학습 화면을, 신뢰감 있는 톤과 명확한 안내 구조로 재정비했습니다.",
    // Full homepage screenshot — used on the main Selected Works card, where
    // the 16:10 thumbnail box is a close enough match to this crop's own
    // ratio that cover-fit shows almost the whole screenshot uncropped.
    heroImage: "/images/project-05-hero.jpg",
    // The case-study hero panel is a much narrower box, so a separate crop
    // isolating just the trophy/badge strip is used there instead — see
    // detailHeroImage below. Using the full screenshot in that narrow panel
    // is what caused the earlier cropping/seam issues.
    detailHeroImage: "/images/project-05-hero-detail.jpg",
    // This hero is a wide banner strip (trophy + headline only, nav/FAQ
    // already cropped out at the source) — much wider than the hero panel's
    // own box ratio. Covering the box would crop the headline or trophy off
    // the sides, so this one is shown in full (contain) instead of cropped.
    heroFit: "contain",
    // Letterbox color matched to the image's own corner pixel (#211912),
    // not the site's --night-brown (#24100b) — those two browns were
    // visibly different, which is what showed up as a seam/line where the
    // image met the panel.
    heroBg: "#211912",
    overview: {
      client: "HRD에셋교육원 (HRD Asset)",
      scope:
        "이러닝 플랫폼 UI 리디자인, 고객지원/게시판 화면 개선, 반응형 퍼블리싱",
      duration: "2023.02 (1개월)",
      description:
        "직장 내 성희롱 예방, 괴롭힘 예방 등 법정의무교육을 온라인으로 제공하는 이러닝 플랫폼입니다. 수강생이 자주 헤매는 지점인 고객지원·자료실·강좌 목록 화면을 중심으로 UI를 재정비했습니다.",
    },
    background: [
      "이용자 다수가 IT에 익숙하지 않은 전 직군 직장인이라, 화려함보다 '헤매지 않는 것'이 최우선 과제였습니다.",
      "법정교육 특성상 고객센터 문의가 잦아, 지원 채널의 가시성이 매출과 직결되는 구조였습니다.",
      "강좌 수가 계속 늘어나는데도 화면 구조는 초기 버전 그대로 유지되고 있었습니다.",
    ],
    problems: [
      "강좌 카드 썸네일이 전부 동일한 기본 이미지로 노출되어 강좌 간 구분이 되지 않음",
      "지원센터·원격지원·1:1문의 등 고객지원 채널이 흩어져 있어 급할 때 찾기 어려움",
      "게시판형 화면(자료실·공지사항)이 전형적인 표 형태에 머물러 있어 가독성이 낮음",
    ],
    direction: [
      "FAQ와 고객지원 채널을 홈 화면 상단부에 하나의 블록으로 묶어 문의 동선을 단축",
      "법정교육 카테고리를 탭 구조로 정리해 '전산업/보건의료/보육/요양/공공기관'을 한눈에 비교 가능하게 구성",
      "브랜드 블루를 축으로 정보 신뢰도를 높이고, 인증서·지정기관 표시를 시각적으로 강조",
    ],
    colorTypography: {
      colors: ["#0B3550", "#1D5D99", "#6C5CE7", "#FFFFFF"],
      typefaces: ["Inter (영문/숫자)", "Pretendard (본문/한글)"],
    },
    screens: [
      "/images/project-05-screen-01.jpg",
      "/images/project-05-screen-02.jpg",
      "/images/project-05-screen-03.jpg",
    ],
    responsive: [
      "/images/project-05-responsive-01.jpg",
      "/images/project-05-responsive-02.jpg",
    ],
    toolsUsed: ["Figma", "Photoshop", "HTML/CSS", "반응형 퍼블리싱"],
    result:
      "고객지원 블록을 상단으로 재배치한 이후 반복 문의가 줄었다는 운영팀 피드백을 받았습니다. 화려한 장식보다 '헤매지 않는 동선'이 신뢰를 만든다는 것을 확인한 프로젝트입니다.",
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
