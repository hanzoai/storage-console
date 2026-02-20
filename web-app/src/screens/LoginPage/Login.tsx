// Hanzo Space — Marketing Landing Page + OIDC Login
// Replaces MinIO Console login with branded landing experience

import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Loader } from "mds";
import { loginStrategyType } from "./login.types";
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

const HanzoLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M256 0L467.7 122.9V368.1L256 491L44.3 368.1V122.9L256 0Z"
      fill="#fd4444"
    />
    <path
      d="M176 160v192M336 160v192M176 256h160"
      stroke="white"
      strokeWidth="40"
      strokeLinecap="round"
    />
  </svg>
);

const S3Icon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const HistoryIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v5h5" />
    <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
    <path d="M12 7v5l4 2" />
  </svg>
);

const features = [
  {
    icon: <S3Icon />,
    title: "S3-Compatible API",
    desc: "Drop-in replacement for Amazon S3. Works with every S3 client, SDK, and tool.",
  },
  {
    icon: <ShieldIcon />,
    title: "SSO via Hanzo ID",
    desc: "Enterprise single sign-on through hanzo.id with OIDC. No separate credentials needed.",
  },
  {
    icon: <UsersIcon />,
    title: "Multi-Org Buckets",
    desc: "Isolated storage per organization with fine-grained access policies and quotas.",
  },
  {
    icon: <GlobeIcon />,
    title: "Global CDN Ready",
    desc: "Edge-cached delivery through Cloudflare for static assets and media files.",
  },
  {
    icon: <LockIcon />,
    title: "Server-Side Encryption",
    desc: "AES-256 encryption at rest with KMS integration for key management.",
  },
  {
    icon: <HistoryIcon />,
    title: "Object Versioning",
    desc: "Full version history for every object. Roll back changes and recover deleted files.",
  },
];

const stats = [
  { value: "S3", label: "Compatible" },
  { value: "Multi", label: "Tenant" },
  { value: "99.9%", label: "Uptime" },
  { value: "\u221E", label: "Scale" },
];

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
    // Use OIDC redirect from server-provided redirect rules
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
    // Fallback: try the /login/oauth endpoint directly
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
          backgroundColor: "#0a0a0a",
        }}
      >
        <Loader style={{ width: 40, height: 40 }} />
      </Box>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid #262626",
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <HanzoLogo />
            <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>
              Hanzo Space
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a
              href="https://docs.hanzo.ai/storage"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#a3a3a3",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: 8,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a3a3a3")}
            >
              Docs
            </a>
            <button
              onClick={handleSignIn}
              disabled={signingIn}
              style={{
                backgroundColor: "#fafafa",
                color: "#0a0a0a",
                border: "none",
                borderRadius: 8,
                padding: "8px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: signingIn ? "wait" : "pointer",
                transition: "opacity 0.2s",
                opacity: signingIn ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!signingIn) e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { if (!signingIn) e.currentTarget.style.opacity = "1"; }}
            >
              {signingIn ? "Redirecting..." : "Sign In"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "96px 24px 64px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            margin: "0 0 24px",
          }}
        >
          Hanzo{" "}
          <span style={{ color: "#fd4444" }}>Space</span>
        </h1>
        <p
          style={{
            fontSize: "clamp(18px, 2.5vw, 24px)",
            color: "#a3a3a3",
            fontWeight: 500,
            margin: "0 0 16px",
            letterSpacing: "-0.01em",
          }}
        >
          Unified Object Storage for AI Infrastructure
        </p>
        <p
          style={{
            fontSize: 16,
            color: "#737373",
            maxWidth: 600,
            margin: "0 auto 48px",
            lineHeight: 1.6,
          }}
        >
          S3-compatible object storage with enterprise SSO, multi-tenant isolation,
          and global CDN delivery. Built for teams that ship.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleSignIn}
            disabled={signingIn}
            style={{
              backgroundColor: "#fd4444",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "14px 32px",
              fontSize: 16,
              fontWeight: 600,
              cursor: signingIn ? "wait" : "pointer",
              transition: "opacity 0.2s, transform 0.2s",
              opacity: signingIn ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!signingIn) {
                e.currentTarget.style.opacity = "0.9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!signingIn) {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            {signingIn ? "Redirecting..." : "Sign In with Hanzo ID"}
          </button>
          <a
            href="https://docs.hanzo.ai/storage"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "transparent",
              color: "#fafafa",
              border: "1px solid #404040",
              borderRadius: 12,
              padding: "14px 32px",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
              transition: "border-color 0.2s",
              display: "inline-flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#737373")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#404040")}
          >
            Documentation
          </a>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 24,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: "24px 16px",
                borderRadius: 16,
                backgroundColor: "rgba(17, 17, 17, 0.95)",
                border: "1px solid #262626",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#fd4444",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: "#a3a3a3", marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 96px",
        }}
      >
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            textAlign: "center",
            margin: "0 0 48px",
            letterSpacing: "-0.03em",
          }}
        >
          Everything you need
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                padding: "32px 28px",
                borderRadius: 16,
                backgroundColor: "rgba(17, 17, 17, 0.95)",
                border: "1px solid #262626",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(253, 68, 68, 0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#262626")
              }
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: "rgba(253, 68, 68, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fd4444",
                  marginBottom: 16,
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  margin: "0 0 8px",
                  letterSpacing: "-0.01em",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#a3a3a3",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px 96px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "64px 32px",
            borderRadius: 24,
            backgroundColor: "rgba(17, 17, 17, 0.95)",
            border: "1px solid #262626",
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to get started?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#a3a3a3",
              margin: "0 0 32px",
            }}
          >
            Sign in with your Hanzo ID to access your storage.
          </p>
          <button
            onClick={handleSignIn}
            disabled={signingIn}
            style={{
              backgroundColor: "#fafafa",
              color: "#0a0a0a",
              border: "none",
              borderRadius: 12,
              padding: "14px 32px",
              fontSize: 16,
              fontWeight: 600,
              cursor: signingIn ? "wait" : "pointer",
              transition: "opacity 0.2s",
              opacity: signingIn ? 0.7 : 1,
            }}
            onMouseEnter={(e) => { if (!signingIn) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { if (!signingIn) e.currentTarget.style.opacity = "1"; }}
          >
            {signingIn ? "Redirecting..." : "Sign In"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #262626",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <HanzoLogo />
            <span style={{ fontSize: 14, color: "#737373" }}>
              Hanzo AI Inc.
            </span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[
              { label: "Hanzo AI", href: "https://hanzo.ai" },
              { label: "Documentation", href: "https://docs.hanzo.ai/storage" },
              { label: "GitHub", href: "https://github.com/hanzoai" },
              { label: "Status", href: "https://status.hanzo.ai" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#525252",
                  textDecoration: "none",
                  fontSize: 13,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a3a3a3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#525252")}
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
