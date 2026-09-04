// ============================================================
// App.tsx — 김진호 개발자 포트폴리오
// ============================================================

import { useState } from "react";

const C = {
    bg: "#0b0d12",
    card: "#141821",
    cardHover: "#181d28",
    line: "#232936",
    text: "#eef1f6",
    dim: "#98a1b2",
    faint: "#5a6474",
    accent: "#6ee7c7",
};

const SANS = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

// ── 실무 경력 프로젝트 (회사) ──
const WORK = [
    {
        no: "01",
        title: "한국도로공사 기술심사시스템 고도화",
        period: "2025.07 – 2026.04",
        summary: "입찰 기술평가 전 과정을 관리하는 공공 평가 시스템의 고도화",
        body: "eGovFrame 기반 시스템에서 수행계획 수립·평가조서 확인·평가위원 구성으로 이어지는 다단계 평가 프로세스를 개발했다. 하드코딩된 분류값을 공통코드 기반 동적 렌더링으로 전환하고, 평가방 입장·모의평가 등 평가위원 화면 로직과 신규 퍼블리싱 마크업을 적용했다. 매퍼·서비스·컨트롤러 전반을 수정하고 배포·운영 대응까지 담당했다.",
        stack: ["Java", "eGovFrame", "JSP", "PostgreSQL"],
    },
    {
        no: "02",
        title: "LGU+ 사내 회의통화시스템",
        period: "2024.08 – 2024.11",
        summary: "실시간 회의 개설·자동 전화 연결을 지원하는 사내 통합 시스템",
        body: "WebSquare 기반 UI 로직 구현을 주도하고, Java 백엔드로 조직·사원 정보 관리 기능을 구축했다. Apache POI로 대용량 엑셀 업로드/다운로드를 처리하고, MMS 발송 이력을 다중 조건으로 필터링해 관리 편의성을 높였다.",
        stack: ["Java", "WebSquare", "MariaDB", "jQuery"],
    },
    {
        no: "03",
        title: "KT알파 기프티쇼 커머스",
        period: "2023.04 – 2024.08",
        summary: "모바일 상품권을 발송·구매·교환하는 B2C 통합 커머스 플랫폼",
        body: "결제·상품·쿠폰·발송 등 전반 기능을 개선하고 신규 기능을 개발했다. Spring Task Scheduler 기반 예약 발송 배치를 자동화하고, 30건 이상 대량 발송 시 내부 통합 API로 전환해 안정성을 높였다. RESTful API로 사용자가 직접 예약을 변경·취소할 수 있게 개선했다.",
        stack: ["Java", "Spring", "MSSQL", "JSP"],
    },
    {
        no: "04",
        title: "OCR 기반 건강검진 시스템",
        period: "2021.07 – 2021.12",
        summary: "검진 서식을 촬영해 OCR로 자동 추출하는 마이데이터 헬스케어 플랫폼",
        body: "Morpheus 기반 하이브리드 앱 환경을 구성하고 백엔드 전반을 설계·구현했다. 네이버 CLOVA OCR API로 이미지에서 텍스트를 자동 추출해 JSON으로 파싱·정제했고, 다날 본인인증을 연동해 보안을 확보했다. AOS/iOS 앱 배포까지 주도했다.",
        stack: ["Java", "PostgreSQL", "CLOVA OCR", "SVN"],
    },
    {
        no: "05",
        title: "주문관리 재가급여 서비스",
        period: "2020.10 – 2021.02",
        summary: "고령화 사회를 위한 방문복지 통합 관리 플랫폼",
        body: "차량 주문·이동목욕·고객/통계 관리 등 다수 모듈을 설계하고 백엔드를 개발했다. 서비스별 데이터 흐름을 고려해 RESTful API를 설계·연동했고, Lombok으로 반복 코드를 줄여 코드 구조의 일관성을 확보했다.",
        stack: ["Java", "Spring", "MySQL", "JQGrid"],
    },
    {
        no: "06",
        title: "프로젝트 관리 · 다수 서비스",
        period: "상시",
        summary: "출입관리·앱 영상 렌더링·아기침대 모니터링 등 다양한 프로젝트 총괄",
        body: "블루투스 출입관리, 현대오토에버 앱 영상 렌더링, 베베루시 아기침대 모니터링 등 여러 프로젝트에서 요구사항 분석·기능 명세·일정 및 진척 관리를 맡았다. 프론트/백엔드 연계 흐름과 기술 방향을 수립하고 팀 커뮤니케이션을 주도했다.",
        stack: ["요구사항 분석", "일정 관리", "협업"],
    },
];

// ── 사이드 프로젝트 (AI, 라이브 데모 있음) ──
const SIDE = [
    {
        no: "01",
        title: "개발자 AI 도구상자",
        summary: "8개의 개발 도구를 한 화면에 모은 AI 유틸리티",
        body: "git diff·에러 로그·SQL 등을 넣으면 AI가 처리하는 웹 도구 모음. 서버가 API 키를 숨기고, Claude와 Gemini를 설정값 하나로 전환한다. 프롬프트 인젝션 방어까지 넣었다.",
        stack: ["React", "Express", "Claude / Gemini"],
        demo: "https://dev-toolbox-mckc.onrender.com",
        repo: "https://github.com/soskjh5382/dev-toolbox",
    },
    {
        no: "02",
        title: "문서 Q&A",
        summary: "문서를 근거로만 답하는 RAG 챗봇",
        body: "텍스트나 PDF를 넣으면 그 내용만 근거로 답한다. 임베딩·벡터 검색·AI 전처리로 정확도를 높였고, 문서에 없는 것은 지어내지 않는다. 대화 맥락도 이어진다.",
        stack: ["RAG", "임베딩", "Gemini"],
        demo: "https://doc-qa-k3hn.onrender.com",
        repo: "https://github.com/soskjh5382/doc-qa",
    },
    {
        no: "03",
        title: "PR 리뷰 봇",
        summary: "PR을 자동으로 리뷰하는 GitHub 봇",
        body: "PR이 열리면 AI가 에러 핸들링 관점으로 코드를 리뷰하고 코멘트를 남긴다. 평가셋으로 품질을 관리하고 GitHub Actions로 완전 자동화했다. 건당 비용과 응답 시간까지 측정한다.",
        stack: ["GitHub Actions", "평가셋", "TypeScript"],
        demo: "",
        repo: "https://github.com/soskjh5382/pr-review-test",
    },
    {
        no: "04",
        title: "코드베이스 분석 에이전트",
        summary: "프로젝트 파일을 직접 읽어 답하는 AI 에이전트",
        body: "질문을 던지면 에이전트가 스스로 필요한 파일을 찾고, 읽고, 검색해 종합해 답한다. 도구 호출·멀티스텝 추론·대화 맥락 유지를 구현했고, 설정값 하나로 Gemini·Claude·OpenAI를 전환한다. 답을 지어내지 않고 실제 코드를 확인한 뒤 대답한다.",
        stack: ["에이전트", "FastAPI", "React"],
        demo: "https://code-agent-frontend.onrender.com",
        repo: "https://github.com/soskjh5382/code-agent",
    },
    {
        no: "05",
        title: "코드 구조 분석 MCP 서버",
        summary: "코드를 문법 구조로 분석해 Claude Code에 연동한 MCP 서버",
        body: "함수 호출 관계와 변경 영향 범위를 분석하는 도구를 MCP 서버로 만들어 Claude Code에 연동했다. grep이 글자만 찾는 한계를 tree-sitter 기반 구문 분석으로 넘어, '이 함수를 누가 호출하는지'와 '이걸 고치면 어디가 깨지는지'를 정확히 추적한다. 기준 폴더 밖 접근을 차단하는 안전장치를 넣고, 환경변수로 분석 대상을 지정하게 해 다른 프로젝트도 분석할 수 있다.",
        stack: ["MCP", "tree-sitter", "Python"],
        demo: "",
        repo: "https://github.com/soskjh5382/code-structure-mcp",
    },
];

// ── 기술 스택 ──
const SKILLS = [
    { group: "Language / Framework", items: ["Java", "Spring", "eGovFrame", "JSP", "JavaScript", "jQuery", "React", "TypeScript"] },
    { group: "Database", items: ["Oracle", "MySQL", "MSSQL", "PostgreSQL", "MariaDB"] },
    { group: "AI / Tools", items: ["Claude", "Gemini", "RAG", "RestAPI", "WebSquare", "Git", "Jenkins", "Jira"] },
];

export default function App() {
    return (
        <div style={{ background: C.bg, color: C.text, fontFamily: SANS, minHeight: "100vh" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 28px" }}>
                <Hero />
                <WorkSection />
                <SideSection />
                <Skills />
                <Contact />
            </div>
        </div>
    );
}

function Hero() {
    return (
        <header style={{ padding: "128px 0 88px" }}>
            <h1 style={{ fontSize: "clamp(46px, 9vw, 66px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, margin: 0 }}>
                김진호
            </h1>
            <p style={{ fontSize: 20, color: C.accent, marginTop: 20, fontWeight: 500, fontFamily: MONO }}>
                백엔드 웹 개발자 · AI 통합
            </p>
            <p style={{ fontSize: 16, color: C.dim, marginTop: 28, lineHeight: 1.8, maxWidth: 540 }}>
                높은 퍼포먼스의 유연한 소프트웨어를 개발하는 엔지니어입니다. 다양한 기술 역량과 스택 활용 경험을 바탕으로 어떤 환경에서도 문제를 유연하게 해결합니다. 유연하지만 느슨하지 않고, 빠르지만 불안정하지 않은 코드를 지향합니다.
            </p>
            <p style={{ fontSize: 15, color: C.faint, marginTop: 16, lineHeight: 1.7, maxWidth: 540 }}>
                최근에는 LLM을 실제 제품에 통합하는 일에 집중하며, RAG·프롬프트 엔지니어링·배포까지 직접 만듭니다.
            </p>
            <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
                <a href="mailto:soskjh8914@naver.com" style={link}>이메일</a>
                <a href="https://github.com/soskjh5382" target="_blank" rel="noreferrer" style={link}>GitHub</a>
            </div>
        </header>
    );
}

// 실무 경력 (링크 없음, 설명 위주)
function WorkSection() {
    return (
        <section>
            <SectionHead label="경력 · 실무 프로젝트" count={WORK.length} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {WORK.map((p) => <WorkCard key={p.no} p={p} />)}
            </div>
        </section>
    );
}

function WorkCard({ p }: { p: (typeof WORK)[number] }) {
    const [hover, setHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={cardBox(hover)}
        >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span style={{ fontFamily: MONO, fontSize: 12, color: C.accent }}>{p.no}</span>
                    <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>{p.title}</h3>
                </div>
                <span style={{ fontFamily: MONO, fontSize: 11.5, color: C.faint, whiteSpace: "nowrap" }}>{p.period}</span>
            </div>
            <p style={{ color: C.dim, fontSize: 13.5, marginTop: 8, marginLeft: 24 }}>{p.summary}</p>
            <p style={{ color: C.text, fontSize: 14, lineHeight: 1.75, marginTop: 12, marginLeft: 24 }}>{p.body}</p>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 16, marginLeft: 24 }}>
                {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
        </div>
    );
}

// 사이드 프로젝트 (라이브 데모 + 소스)
function SideSection() {
    return (
        <section style={{ marginTop: 56 }}>
            <SectionHead label="사이드 · AI 프로젝트" count={SIDE.length} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {SIDE.map((p) => <SideCard key={p.no} p={p} />)}
            </div>
        </section>
    );
}

function SideCard({ p }: { p: (typeof SIDE)[number] }) {
    const [hover, setHover] = useState(false);
    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={cardBox(hover)}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ fontFamily: MONO, fontSize: 12, color: C.accent }}>{p.no}</span>
                <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>{p.title}</h3>
            </div>
            <p style={{ color: C.dim, fontSize: 13.5, marginTop: 8, marginLeft: 24 }}>{p.summary}</p>
            <p style={{ color: C.text, fontSize: 14, lineHeight: 1.75, marginTop: 12, marginLeft: 24 }}>{p.body}</p>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 16, marginLeft: 24 }}>
                {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
            <div style={{ display: "flex", gap: 18, marginTop: 18, marginLeft: 24 }}>
                {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" style={linkMono}>라이브 데모</a>}
                <a href={p.repo} target="_blank" rel="noreferrer" style={linkMono}>소스 코드</a>
            </div>
        </div>
    );
}

function Skills() {
    return (
        <section style={{ marginTop: 56 }}>
            <SectionHead label="기술 스택" />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {SKILLS.map((g) => (
                    <div key={g.group}>
                        <div style={{ fontFamily: MONO, fontSize: 12, color: C.faint, marginBottom: 10 }}>{g.group}</div>
                        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                            {g.items.map((s) => <Tag key={s}>{s}</Tag>)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Contact() {
    return (
        <footer style={{ padding: "56px 0 100px", marginTop: 56, borderTop: `1px solid ${C.line}` }}>
            <h2 style={{ fontSize: "clamp(24px, 5vw, 30px)", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
                같이 만들 이야기가 있다면
            </h2>
            <p style={{ color: C.dim, fontSize: 15, marginTop: 12 }}>새로운 문제나 협업 제안은 언제든 환영합니다.</p>
            <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
                <a href="mailto:soskjh8914@naver.com" style={link}>soskjh8914@naver.com</a>
                <a href="tel:+821089145382" style={link}>010-8914-5382</a>
                <a href="https://github.com/soskjh5382" target="_blank" rel="noreferrer" style={link}>github.com/soskjh5382</a>
            </div>
            <p style={{ color: C.faint, fontSize: 12, fontFamily: MONO, marginTop: 60 }}>© 2026 김진호</p>
        </footer>
    );
}

// ── 공통 조각 ──
function SectionHead({ label, count }: { label: string; count?: number }) {
    return (
        <div style={{ fontFamily: MONO, fontSize: 13, color: C.faint, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${C.line}` }}>
            {label}{count ? ` · ${count}` : ""}
        </div>
    );
}

function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span style={{ fontFamily: MONO, fontSize: 11, color: C.dim, border: `1px solid ${C.line}`, borderRadius: 5, padding: "3px 9px" }}>
      {children}
    </span>
    );
}

function cardBox(hover: boolean): React.CSSProperties {
    return {
        background: hover ? C.cardHover : C.card,
        border: `1px solid ${hover ? C.accent + "55" : C.line}`,
        borderRadius: 14,
        padding: "24px 26px 22px",
        transition: "background 0.2s, border-color 0.2s",
    };
}

const link: React.CSSProperties = {
    fontSize: 15,
    color: C.accent,
    textDecoration: "none",
    borderBottom: `1px solid ${C.accent}`,
    paddingBottom: 3,
};

const linkMono: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: 13,
    color: C.accent,
    textDecoration: "none",
    borderBottom: `1px solid ${C.accent}`,
    paddingBottom: 2,
};