// Hanzo Space — Landing Page + OIDC Login

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Loader } from "mds";
import { AppState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { getFetchConfigurationAsync } from "./loginThunks";
import { resetForm } from "./loginSlice";
import { setHelpName } from "../../systemSlice";

export const getTargetPath = () => {
  let targetPath = "/browser";
  if (
    localStorage.getItem("redirect-path") &&
    localStorage.getItem("redirect-path") !== ""
  ) {
    targetPath = `${localStorage.getItem("redirect-path")}`;
    localStorage.setItem("redirect-path", "");
  }
  return targetPath;
};

/* ─── icons ─── */

const HanzoMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="none">
    <rect width="512" height="512" rx="96" fill="#fd4444" />
    <path
      d="M160 144v224M352 144v224M160 256h192"
      stroke="#fff"
      strokeWidth="48"
      strokeLinecap="round"
    />
  </svg>
);

const BucketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const LayersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ZapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ─── data ─── */

const stats = [
  { value: "S3", label: "API Compatible", sub: "Every tool, SDK, and client" },
  { value: "11×9s", label: "Durability", sub: "99.999999999% data protection" },
  { value: "<50ms", label: "Latency", sub: "Low-latency reads and writes" },
  { value: "∞", label: "Scalable", sub: "Bytes to petabytes" },
];

const features = [
  {
    icon: <BucketIcon />,
    title: "S3-Compatible API",
    desc: "Drop-in replacement for Amazon S3. Use the same SDKs, CLI tools, and integrations you already rely on — zero migration friction.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Enterprise SSO",
    desc: "Authenticate with Hanzo ID via OIDC. Centralized identity, fine-grained access policies, and audit logging out of the box.",
  },
  {
    icon: <LayersIcon />,
    title: "Multi-Tenant Isolation",
    desc: "Per-organization buckets with independent access controls, quotas, and lifecycle policies. Built for teams and platforms.",
  },
  {
    icon: <ZapIcon />,
    title: "AI-Optimized Workloads",
    desc: "Purpose-built for model weights, training datasets, embeddings, and inference artifacts. High-throughput parallel uploads.",
  },
  {
    icon: <LockIcon />,
    title: "Encryption & Compliance",
    desc: "AES-256 server-side encryption at rest, TLS in transit, and KMS-managed keys. SOC 2 and GDPR ready.",
  },
  {
    icon: <GlobeIcon />,
    title: "Edge Delivery",
    desc: "Serve assets globally through Cloudflare's edge network. Automatic caching, custom domains, and signed URLs.",
  },
];

const useCases = [
  { title: "AI & ML", desc: "Store and version training data, model checkpoints, and embeddings at any scale." },
  { title: "Media & Assets", desc: "Host images, video, and documents with CDN delivery and on-the-fly transforms." },
  { title: "Data Lakes", desc: "Centralize structured and unstructured data for analytics and batch processing." },
  { title: "Backup & Archive", desc: "Durable, cost-effective long-term storage with lifecycle management." },
];

/* ─── styles ─── */

const colors = {
  bg: "#09090b",
  card: "#111113",
  cardHover: "#18181b",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(255,255,255,0.12)",
  text: "#fafafa",
  muted: "#a1a1aa",
  dim: "#71717a",
  brand: "#fd4444",
  brandDim: "rgba(253, 68, 68, 0.12)",
  brandGlow: "rgba(253, 68, 68, 0.06)",
};

const font =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ─── component ─── */

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);

  const loginStrategy = useSelector(
    (state: AppState) => state.login.loginStrategy,
  );
  const loadingFetchConfiguration = useSelector(
    (state: AppState) => state.login.loadingFetchConfiguration,
  );
  const navigateTo = useSelector((state: AppState) => state.login.navigateTo);

  useEffect(() => {
    if (navigateTo !== "") {
      dispatch(resetForm());
      navigate(navigateTo);
    }
  }, [navigateTo, dispatch, navigate]);

  useEffect(() => {
    if (loadingFetchConfiguration) {
      dispatch(getFetchConfigurationAsync());
    }
  }, [loadingFetchConfiguration, dispatch]);

  useEffect(() => {
    dispatch(setHelpName("login"));
  }, [dispatch]);

  const handleSignIn = () => {
    setSigningIn(true);
    if (
      loginStrategy.redirectRules &&
      loginStrategy.redirectRules.length > 0
    ) {
      const oidcRule = loginStrategy.redirectRules[0];
      if (oidcRule.redirect) {
        window.location.href = oidcRule.redirect;
        return;
      }
    }
    window.location.href = "/login/oauth";
  };

  if (loadingFetchConfiguration) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: colors.bg,
        }}
      >
        <Loader style={{ width: 40, height: 40 }} />
      </Box>
    );
  }

  const btnPrimary: React.CSSProperties = {
    backgroundColor: colors.text,
    color: colors.bg,
    border: "none",
    borderRadius: 8,
    padding: "10px 22px",
    fontSize: 14,
    fontWeight: 600,
    fontFamily: font,
    cursor: signingIn ? "wait" : "pointer",
    transition: "all 0.15s ease",
    opacity: signingIn ? 0.6 : 1,
    letterSpacing: "-0.01em",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  };

  const btnHero: React.CSSProperties = {
    ...btnPrimary,
    padding: "12px 28px",
    fontSize: 15,
    borderRadius: 10,
  };

  const btnOutline: React.CSSProperties = {
    ...btnHero,
    backgroundColor: "transparent",
    color: colors.text,
    border: `1px solid ${colors.border}`,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.bg,
        color: colors.text,
        fontFamily: font,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ─── Nav ─── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: "rgba(9, 9, 11, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 24px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <HanzoMark size={24} />
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Hanzo Space
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <a
              href="https://docs.hanzo.ai/storage"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: colors.muted,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                padding: "6px 12px",
                borderRadius: 6,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.muted)
              }
            >
              Docs
            </a>
            <a
              href="https://hanzo.ai/pricing"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: colors.muted,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                padding: "6px 12px",
                borderRadius: 6,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = colors.muted)
              }
            >
              Pricing
            </a>
            <div
              style={{
                width: 1,
                height: 20,
                backgroundColor: colors.border,
                margin: "0 8px",
              }}
            />
            <button
              onClick={handleSignIn}
              disabled={signingIn}
              style={btnPrimary}
              onMouseEnter={(e) => {
                if (!signingIn) e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                if (!signingIn) e.currentTarget.style.opacity = "1";
              }}
            >
              {signingIn ? "Redirecting..." : "Sign In"}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 600,
            background: `radial-gradient(ellipse at center, ${colors.brandGlow} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: 1120,
            margin: "0 auto",
            padding: "100px 24px 80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px 5px 8px",
              borderRadius: 100,
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.card,
              fontSize: 12,
              fontWeight: 500,
              color: colors.muted,
              marginBottom: 32,
              letterSpacing: "0.01em",
            }}
          >
            <span
              style={{
                backgroundColor: colors.brandDim,
                color: colors.brand,
                padding: "2px 8px",
                borderRadius: 100,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              S3
            </span>
            Fully compatible with Amazon S3 API
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              margin: "0 0 20px",
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Object storage built for
            <br />
            <span style={{ color: colors.muted }}>scale, speed, and security</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              color: colors.dim,
              maxWidth: 540,
              margin: "0 auto 40px",
              lineHeight: 1.65,
            }}
          >
            Store and retrieve any amount of data, anytime, from anywhere.
            S3-compatible, enterprise-grade, with SSO and multi-tenant
            isolation built in.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleSignIn}
              disabled={signingIn}
              style={btnHero}
              onMouseEnter={(e) => {
                if (!signingIn) e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                if (!signingIn) e.currentTarget.style.opacity = "1";
              }}
            >
              {signingIn ? "Redirecting..." : "Get started"}
              {!signingIn && <ArrowRightIcon />}
            </button>
            <a
              href="https://docs.hanzo.ai/storage"
              target="_blank"
              rel="noopener noreferrer"
              style={btnOutline}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = colors.borderHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = colors.border)
              }
            >
              Documentation
            </a>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            backgroundColor: colors.border,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                backgroundColor: colors.card,
                padding: "28px 20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: colors.text,
                  fontFamily:
                    "'Geist Mono', 'SF Mono', 'Fira Code', monospace",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: colors.muted,
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: colors.dim,
                  marginTop: 2,
                }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: "0 0 12px",
            }}
          >
            Everything you need to store data at scale
          </h2>
          <p
            style={{
              fontSize: 15,
              color: colors.dim,
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Industry-leading durability, security, and performance —
            without the complexity.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            backgroundColor: colors.border,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                backgroundColor: colors.card,
                padding: "28px 24px",
                transition: "background-color 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = colors.cardHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = colors.card)
              }
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: colors.brandDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.brand,
                  marginBottom: 14,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  margin: "0 0 6px",
                  letterSpacing: "-0.01em",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: colors.dim,
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Use Cases ─── */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: "0 0 12px",
            }}
          >
            Built for any workload
          </h2>
          <p
            style={{
              fontSize: 15,
              color: colors.dim,
              maxWidth: 440,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            From training data to production assets,
            Hanzo Space handles it all.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {useCases.map((uc) => (
            <div
              key={uc.title}
              style={{
                padding: "20px",
                borderRadius: 10,
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.card,
                transition: "border-color 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = colors.borderHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = colors.border)
              }
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  margin: "0 0 6px",
                  letterSpacing: "-0.01em",
                }}
              >
                {uc.title}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: colors.dim,
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                {uc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px 96px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "56px 32px",
            borderRadius: 16,
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.card,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -100,
              left: "50%",
              transform: "translateX(-50%)",
              width: 500,
              height: 300,
              background: `radial-gradient(ellipse at center, ${colors.brandGlow} 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              position: "relative",
              fontSize: 24,
              fontWeight: 700,
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            Start storing data in seconds
          </h2>
          <p
            style={{
              position: "relative",
              fontSize: 14,
              color: colors.dim,
              margin: "0 0 28px",
            }}
          >
            Sign in with your Hanzo ID. No credit card, no setup wizard.
          </p>
          <button
            onClick={handleSignIn}
            disabled={signingIn}
            style={{
              ...btnHero,
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (!signingIn) e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              if (!signingIn) e.currentTarget.style.opacity = "1";
            }}
          >
            {signingIn ? "Redirecting..." : "Get started"}
            {!signingIn && <ArrowRightIcon />}
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <HanzoMark size={18} />
            <span style={{ fontSize: 12, color: colors.dim }}>
              Hanzo AI
            </span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Platform", href: "https://hanzo.ai" },
              { label: "Docs", href: "https://docs.hanzo.ai/storage" },
              { label: "GitHub", href: "https://github.com/hanzoai" },
              { label: "Status", href: "https://status.hanzo.ai" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: colors.dim,
                  textDecoration: "none",
                  fontSize: 12,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = colors.muted)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = colors.dim)
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
