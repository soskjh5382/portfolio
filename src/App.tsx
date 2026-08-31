// ============================================================
// App.tsx — 개발자 포트폴리오
// 자기소개 + 프로젝트 3개 + 연락처. 백엔드 없는 정적 페이지.
// [대괄호] 부분은 나중에 실제 내용으로 채우세요.
// ============================================================

import { useState, useEffect, useRef } from "react";

// 색상 토큰
const C = {
  bg: "#0a0b0f",
  bgSoft: "#12141c",
  card: "#161922",
  border: "#242938",
  text: "#f0f2f5",
  dim: "#9aa3b2",
  faint: "#5a6272",
  accent: "#7c9cff",   // 메인 강조색 (블루)
  accent2: "#e0a458",  // 보조 (호박)
};

// ── 프로젝트 데이터 (실제 정보) ──
const PROJECTS = [
  {
    title: "개발자 AI 도구상자",
    tagline: "8개의 개발 도구를 한 곳에",
    description:
        "git diff, 에러 로그, SQL 등을 넣으면 AI가 처리하는 웹 도구 모음. 서버가 API 키를 숨기고, Claude/Gemini를 설정 하나로 전환. 프롬프트 인젝션 방어까지.",
    tags: ["React", "Express", "Claude/Gemini", "프롬프트 엔지니어링"],
    demo: "https://dev-toolbox-mckc.onrender.com",
    github: "https://github.com/soskjh5382/dev-toolbox",
    accent: C.accent2,
  },
  {
    title: "문서 Q&A (RAG)",
    tagline: "문서에게 직접 물어보는 AI",
    description:
        "문서(텍스트/PDF)를 넣으면 그 내용만 근거로 답하는 RAG 앱. 임베딩·벡터 검색·AI 전처리로 정확도를 높이고, 없는 내용은 지어내지 않음. 대화도 이어짐.",
    tags: ["RAG", "임베딩", "벡터 검색", "Gemini"],
    demo: "https://doc-qa-k3hn.onrender.com",
    github: "https://github.com/soskjh5382/doc-qa",
    accent: C.accent,
  },
  {
    title: "PR 리뷰 봇",
    tagline: "코드를 자동으로 리뷰하는 봇",
    description:
        "GitHub PR이 열리면 AI가 에러 핸들링 관점으로 코드를 리뷰하고 코멘트를 다는 봇. 평가셋으로 품질을 관리하고, GitHub Actions로 완전 자동화. 비용·시간까지 측정.",
    tags: ["GitHub Actions", "CI/CD", "평가셋", "TypeScript"],
    demo: "",  // PR 봇은 라이브 데모 대신 GitHub만
    github: "https://github.com/soskjh5382/pr-review-test",
    accent: "#5fb87a",
  },
];

// 스크롤 시 요소가 부드럽게 나타나게 하는 훅
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setVisible(true),
        { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

export default function App() {
  return (
      <div
          style={{
            background: C.bg,
            color: C.text,
            fontFamily: "'Inter', system-ui, sans-serif",
            minHeight: "100vh",
            overflowX: "hidden",
          }}
      >
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
  );
}

// ── 상단 히어로 (이름 + 한 줄 소개) ──
function Hero() {
  return (
      <section
          style={{
            minHeight: "88vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 24px",
            maxWidth: 900,
            margin: "0 auto",
          }}
      >
        <div
            style={{
              fontSize: 13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.accent,
              marginBottom: 24,
            }}
        >
          Portfolio
        </div>
        <h1
            style={{
              fontSize: "clamp(40px, 8vw, 80px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
        >
          [당신 이름]
          <br />
          <span style={{ color: C.dim }}>[한 줄 소개]</span>
        </h1>
        <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: C.dim,
              marginTop: 28,
              lineHeight: 1.6,
              maxWidth: 620,
            }}
        >
          [예: AI를 제품에 붙이는 웹 개발자입니다. 데모에서 멈추지 않고
          평가·자동화·배포까지 직접 만듭니다.]
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
          <a href="#projects" style={btnPrimary}>
            프로젝트 보기
          </a>
          <a href="#contact" style={btnGhost}>
            연락하기
          </a>
        </div>
      </section>
  );
}

// ── 자기소개 ──
function About() {
  const { ref, visible } = useReveal();
  return (
      <section
          ref={ref}
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "80px 24px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
      >
        <SectionLabel>About</SectionLabel>
        <p
            style={{
              fontSize: "clamp(20px, 3vw, 28px)",
              lineHeight: 1.6,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
        >
          [여기에 자기소개를 채우세요. 예: 저는 웹 개발자이며, 최근에는 LLM을
          실제 제품에 통합하는 일에 집중하고 있습니다. API 연동, RAG,
          프롬프트 엔지니어링, 그리고 이를 안정적으로 배포하는 전 과정을
          직접 다룹니다.]
        </p>
      </section>
  );
}

// ── 프로젝트 목록 ──
function Projects() {
  return (
      <section id="projects" style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
        <SectionLabel>Projects</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} />
          ))}
        </div>
      </section>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const { ref, visible } = useReveal();
  const [hover, setHover] = useState(false);
  return (
      <div
          ref={ref}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            background: C.card,
            border: `1px solid ${hover ? project.accent : C.border}`,
            borderRadius: 18,
            padding: "32px 28px",
            opacity: visible ? 1 : 0,
            transform: visible
                ? hover
                    ? "translateY(-4px)"
                    : "translateY(0)"
                : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.3s ease, border-color 0.3s ease",
            boxShadow: hover ? `0 12px 40px ${project.accent}22` : "none",
          }}
      >
        <div style={{ fontSize: 13, color: project.accent, marginBottom: 8, fontWeight: 600 }}>
          {project.tagline}
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
          {project.title}
        </h3>
        <p style={{ color: C.dim, fontSize: 15, lineHeight: 1.7, marginTop: 14 }}>
          {project.description}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
          {project.tags.map((t) => (
              <span
                  key={t}
                  style={{
                    fontSize: 12,
                    color: C.dim,
                    background: C.bgSoft,
                    border: `1px solid ${C.border}`,
                    borderRadius: 20,
                    padding: "5px 12px",
                  }}
              >
            {t}
          </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" style={{ ...btnPrimary, background: project.accent }}>
                데모 열기 ↗
              </a>
          )}
          <a href={project.github} target="_blank" rel="noreferrer" style={btnGhost}>
            GitHub
          </a>
        </div>
      </div>
  );
}

// ── 연락처 ──
function Contact() {
  const { ref, visible } = useReveal();
  return (
      <section
          id="contact"
          ref={ref}
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "60px 24px 120px",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
      >
        <SectionLabel center>Contact</SectionLabel>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 24px" }}>
          함께 이야기해요
        </h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:[이메일]" style={btnPrimary}>
            이메일 보내기
          </a>
          <a href="https://github.com/soskjh5382" target="_blank" rel="noreferrer" style={btnGhost}>
            GitHub
          </a>
        </div>
        <p style={{ color: C.faint, fontSize: 13, marginTop: 60 }}>
          © 2026 [당신 이름]. Built with React.
        </p>
      </section>
  );
}

// ── 공통 컴포넌트/스타일 ──
function SectionLabel({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
      <div
          style={{
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.accent,
            marginBottom: 24,
            textAlign: center ? "center" : "left",
          }}
      >
        {children}
      </div>
  );
}

const btnPrimary: React.CSSProperties = {
  background: C.accent,
  color: "#0a0b0f",
  padding: "12px 24px",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
};

const btnGhost: React.CSSProperties = {
  background: "transparent",
  color: C.text,
  padding: "12px 24px",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 500,
  textDecoration: "none",
  border: `1px solid ${C.border}`,
  display: "inline-block",
};