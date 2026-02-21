import React, { useEffect, useState } from "react";

const c = {
  bg: "#09090b",
  card: "#111113",
  cardHover: "#18181b",
  text: "#fafafa",
  muted: "#a1a1aa",
  dim: "#71717a",
  brand: "#fd4444",
  brandDim: "rgba(253, 68, 68, 0.12)",
  codeBg: "#0c0c0e",
  border: "rgba(255,255,255,0.06)",
};

const font = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const mono = "'Geist Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace";

const HanzoMark = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="8" fill="#000000" />
    <g transform="translate(8, 8) scale(0.716)">
      <path d="M22.21 67V44.6369H0V67H22.21Z" fill="#ffffff" />
      <path d="M66.7038 22.3184H22.2534L0.0878906 44.6367H44.4634L66.7038 22.3184Z" fill="#ffffff" />
      <path d="M22.21 0H0V22.3184H22.21V0Z" fill="#ffffff" />
      <path d="M66.7198 0H44.5098V22.3184H66.7198V0Z" fill="#ffffff" />
      <path d="M66.7198 67V44.6369H44.5098V67H66.7198Z" fill="#ffffff" />
    </g>
  </svg>
);

const inlineCode = { fontFamily: mono, fontSize: 12, color: c.text, backgroundColor: c.codeBg, padding: "2px 6px", borderRadius: 4 };

/* ─── Code block ─── */
const Code = ({ children, title }: { children: string; title?: string }) => (
  <div style={{ margin: "16px 0" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 14px",
        backgroundColor: "rgba(255,255,255,0.03)",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        border: `1px solid ${c.border}`,
        borderBottom: "none",
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 600, color: c.dim, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {title || "code"}
      </span>
      <span
        style={{
          fontSize: 11,
          color: c.dim,
          cursor: "pointer",
          padding: "2px 8px",
          borderRadius: 4,
          border: `1px solid ${c.border}`,
          userSelect: "none",
        }}
      >
        Copy
      </span>
    </div>
    <pre
      style={{
        margin: 0,
        padding: "16px 20px",
        backgroundColor: c.codeBg,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        border: `1px solid ${c.border}`,
        fontSize: 13,
        lineHeight: 1.7,
        overflow: "auto",
        color: c.muted,
        fontFamily: mono,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {children}
    </pre>
  </div>
);

/* ─── Callout ─── */
const Callout = ({ type, children }: { type: "info" | "warning" | "tip"; children: React.ReactNode }) => {
  const bg = type === "warning" ? "rgba(250,204,21,0.06)" : type === "tip" ? "rgba(34,197,94,0.06)" : c.brandDim;
  const border = type === "warning" ? "rgba(250,204,21,0.2)" : type === "tip" ? "rgba(34,197,94,0.2)" : "rgba(253,68,68,0.2)";
  const label = type === "warning" ? "Warning" : type === "tip" ? "Tip" : "Note";
  return (
    <div style={{ margin: "16px 0", padding: "14px 18px", backgroundColor: bg, border: `1px solid ${border}`, borderRadius: 8, fontSize: 13, lineHeight: 1.7, color: c.muted }}>
      <strong style={{ color: c.text, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</strong>
      <div style={{ marginTop: 6 }}>{children}</div>
    </div>
  );
};

/* ─── Table ─── */
const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div style={{ margin: "16px 0", overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={{ textAlign: "left", padding: "10px 14px", borderBottom: `1px solid ${c.border}`, color: c.text, fontWeight: 600, fontSize: 12 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: "10px 14px", borderBottom: `1px solid ${c.border}`, color: c.muted, fontFamily: j === 0 ? mono : font, fontSize: j === 0 ? 12 : 13 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─── Section badge colors ─── */
const sectionBadgeMap: Record<string, { label: string; color: string }> = {
  quickstart: { label: "GETTING STARTED", color: "#22c55e" },
  "console-overview": { label: "CONSOLE GUIDE", color: "#3b82f6" },
  "s3-compatibility": { label: "S3 API", color: "#a855f7" },
  "sdk-javascript": { label: "SDKs & TOOLS", color: "#f59e0b" },
  "auth-oidc": { label: "SECURITY", color: "#ef4444" },
  "admin-config": { label: "ADMINISTRATION", color: "#06b6d4" },
  "ops-erasure-coding": { label: "OPERATIONS", color: "#ec4899" },
};

/* ─── Headings ─── */
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const badge = sectionBadgeMap[id];
  return (
    <div style={{ marginTop: 64, paddingTop: 24, borderTop: `1px solid ${c.border}` }}>
      {badge && (
        <span
          style={{
            display: "inline-block",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: badge.color,
            backgroundColor: `${badge.color}14`,
            border: `1px solid ${badge.color}30`,
            borderRadius: 100,
            padding: "3px 10px",
            marginBottom: 12,
          }}
        >
          {badge.label}
        </span>
      )}
      <h2 id={id} style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px", color: c.text }}>{children}</h2>
    </div>
  );
};
const H3 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", margin: "32px 0 12px", color: c.text }}>{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 14, lineHeight: 1.75, color: c.muted, margin: "12px 0" }}>{children}</p>
);

/* ─── Hash-fragment routing map ─── */
/* Maps helpTopics.json hash patterns to our doc section anchors */
const hashRoutes: Record<string, string> = {
  "operations/troubleshooting": "ops-troubleshooting",
  "administration/identity-access-management": "auth-iam",
  "administration/identity-access-management/policy-based-access-control": "auth-iam",
  "administration/identity-access-management/oidc-access-management": "auth-oidc",
  "administration/identity-access-management/ldap-access-management": "auth-ldap",
  "administration/object-management": "console-objects",
  "administration/object-management/object-versioning": "admin-versioning",
  "administration/object-management/object-retention": "ops-locking",
  "administration/bucket-replication": "admin-replication",
  "administration/bucket-notifications": "admin-notifications",
  "administration/monitoring": "console-monitoring",
  "administration/server-side-encryption": "auth-encryption",
  "operations/install-deploy-manage/deploy-minio/deploy-minio-single-node-single-drive": "single-node",
  "operations/install-deploy-manage/deploy-minio/deploy-minio-single-node-multi-drive": "single-node-multi-drive",
  "operations/install-deploy-manage/deploy-minio/deploy-minio-multi-node-multi-drive": "deploy-distributed",
  "operations/monitoring": "ops-metrics",
  "operations/server-side-encryption": "auth-encryption",
  "operations/data-recovery": "ops-recovery",
  "operations/network-encryption": "ops-tls",
  "operations/concepts/erasure-coding": "ops-erasure-coding",
  "operations/concepts/healing": "ops-healing",
  "operations/scaling": "ops-scaling",
  "operations/decommissioning": "ops-scaling",
  "operations/manage-existing-deployments/migrate-fs-gateway": "admin-config",
  "operations/install-deploy-manage/upgrade-minio-deployment": "ops-upgrade",
  "integrations/event-notifications/event-notification-targets/publish-events-to-webhook": "admin-notifications",
  "integrations/event-notifications/event-notification-targets/publish-events-to-kafka": "admin-notifications",
  "integrations/event-notifications/event-notification-targets/publish-events-to-amqp": "admin-notifications",
  "integrations/event-notifications/event-notification-targets/publish-events-to-redis": "admin-notifications",
  "integrations/event-notifications/event-notification-targets/publish-events-to-postgresql": "admin-notifications",
  "integrations/event-notifications/event-notification-targets/publish-events-to-elasticsearch": "admin-notifications",
  "integrations/event-notifications/event-notification-targets/publish-events-to-nats": "admin-notifications",
  "administration/batch-framework": "ops-batch",
  "administration/object-management/transition-objects-to-a-remote-tier": "admin-tiering",
  "secure-hybrid-cloud-storage-iam": "auth-oidc",
  "kafka-and-storage": "admin-notifications",
  "supportability-storage-chain": "ops-troubleshooting",
  "regulatory-compliance-with-object-lambdas": "ops-locking",
};

/* ─── Sidebar nav ─── */
const sidebar = [
  {
    title: "Getting Started",
    items: [
      { id: "quickstart", label: "Quick Start" },
      { id: "deploy-docker", label: "Deploy with Docker" },
      { id: "deploy-binary", label: "Deploy Binary" },
      { id: "deploy-kubernetes", label: "Deploy on Kubernetes" },
      { id: "deploy-distributed", label: "Distributed Deployment" },
      { id: "first-steps", label: "First Steps" },
    ],
  },
  {
    title: "Console Guide",
    items: [
      { id: "console-overview", label: "Overview" },
      { id: "console-buckets", label: "Managing Buckets" },
      { id: "console-objects", label: "Browsing Objects" },
      { id: "console-access", label: "Access Keys" },
      { id: "console-monitoring", label: "Monitoring" },
    ],
  },
  {
    title: "S3 API",
    items: [
      { id: "s3-compatibility", label: "S3 Compatibility" },
      { id: "s3-buckets", label: "Bucket Operations" },
      { id: "s3-objects", label: "Object Operations" },
      { id: "s3-presigned", label: "Presigned URLs" },
      { id: "s3-multipart", label: "Multipart Upload" },
    ],
  },
  {
    title: "SDKs & Tools",
    items: [
      { id: "sdk-javascript", label: "JavaScript" },
      { id: "sdk-python", label: "Python" },
      { id: "sdk-go", label: "Go" },
      { id: "sdk-java", label: "Java" },
      { id: "sdk-cli", label: "mc CLI" },
      { id: "sdk-cli-admin", label: "mc Admin" },
      { id: "sdk-aws", label: "AWS CLI" },
    ],
  },
  {
    title: "Security",
    items: [
      { id: "auth-oidc", label: "OIDC / SSO" },
      { id: "auth-ldap", label: "LDAP / Active Directory" },
      { id: "auth-iam", label: "IAM Policies" },
      { id: "auth-encryption", label: "Encryption" },
      { id: "auth-bucket-policy", label: "Bucket Policies" },
    ],
  },
  {
    title: "Administration",
    items: [
      { id: "admin-config", label: "Server Configuration" },
      { id: "admin-lifecycle", label: "Lifecycle Rules" },
      { id: "admin-tiering", label: "Tiering & Transitions" },
      { id: "admin-replication", label: "Replication" },
      { id: "admin-notifications", label: "Event Notifications" },
      { id: "admin-versioning", label: "Versioning" },
    ],
  },
  {
    title: "Operations",
    items: [
      { id: "ops-erasure-coding", label: "Erasure Coding" },
      { id: "ops-healing", label: "Healing" },
      { id: "ops-locking", label: "Object Locking / WORM" },
      { id: "ops-metrics", label: "Metrics & Monitoring" },
      { id: "ops-tls", label: "TLS / Network Encryption" },
      { id: "ops-scaling", label: "Scaling & Expansion" },
      { id: "ops-upgrade", label: "Upgrade Procedures" },
      { id: "ops-batch", label: "Batch Operations" },
      { id: "ops-recovery", label: "Data Recovery" },
      { id: "ops-troubleshooting", label: "Troubleshooting" },
      { id: "ops-healthcheck", label: "Health Check API" },
    ],
  },
];

/* ─── Documentation Content ─── */
const DocsContent = () => (
  <div>
    {/* ═══ GETTING STARTED ═══ */}
    <H2 id="quickstart">Quick Start</H2>
    <div style={{ backgroundColor: c.card, borderRadius: 12, padding: "20px 24px", marginBottom: 8, border: `1px solid ${c.border}` }}>
      <P>
        Hanzo Space is a high-performance, S3-compatible object storage system. It runs as a single binary, supports distributed deployments with erasure coding, and is fully compatible with the Amazon S3 API. All existing S3 tools, SDKs, and integrations work out of the box.
      </P>
      <P>The fastest way to get started is with Docker:</P>
      <Code title="Docker — single node">{`docker run -d --name hanzo-space \\
  -p 9000:9000 -p 9001:9001 \\
  -e S3_ROOT_USER=admin \\
  -e S3_ROOT_PASSWORD=changeme123 \\
  -v /data:/data \\
  ghcr.io/hanzoai/storage:latest \\
  server /data --console-address ":9001"`}</Code>
      <P>
        After starting, access the console at <strong style={{ color: c.text }}>http://localhost:9001</strong> and the S3 API at <strong style={{ color: c.text }}>http://localhost:9000</strong>.
      </P>
      <Callout type="tip">
        For production, use a strong password (at least 12 characters) and configure TLS. See the <a href="#ops-tls" style={{ color: c.brand, transition: "opacity 0.15s", cursor: "pointer" }}>TLS / Network Encryption</a> section.
      </Callout>
    </div>

    <H3 id="deploy-docker">Deploy with Docker</H3>
    <P>Hanzo Space ships as a single container image at <code style={inlineCode}>ghcr.io/hanzoai/storage:latest</code>.</P>

    <H3 id="single-node">Single Node, Single Drive</H3>
    <P>For development, testing, or small workloads:</P>
    <Code>{`docker run -d --name hanzo-space \\
  -p 9000:9000 -p 9001:9001 \\
  -e S3_ROOT_USER=admin \\
  -e S3_ROOT_PASSWORD=changeme123 \\
  -v ~/hanzo-data:/data \\
  ghcr.io/hanzoai/storage:latest \\
  server /data --console-address ":9001"`}</Code>

    <H3 id="single-node-multi-drive">Single Node, Multi Drive</H3>
    <P>For production with erasure coding (requires at least 4 drives):</P>
    <Code>{`docker run -d --name hanzo-space \\
  -p 9000:9000 -p 9001:9001 \\
  -e S3_ROOT_USER=admin \\
  -e S3_ROOT_PASSWORD=changeme123 \\
  -v /mnt/disk1:/data1 \\
  -v /mnt/disk2:/data2 \\
  -v /mnt/disk3:/data3 \\
  -v /mnt/disk4:/data4 \\
  ghcr.io/hanzoai/storage:latest \\
  server /data{1...4} --console-address ":9001"`}</Code>
    <Callout type="info">
      Erasure coding provides data redundancy. With 4 drives, you can lose up to 2 drives and still recover all data. See <a href="#ops-erasure-coding" style={{ color: c.brand, transition: "opacity 0.15s", cursor: "pointer" }}>Erasure Coding</a> for details.
    </Callout>

    <H3 id="compose">Docker Compose</H3>
    <Code title="compose.yml">{`services:
  storage:
    image: ghcr.io/hanzoai/storage:latest
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      S3_ROOT_USER: admin
      S3_ROOT_PASSWORD: changeme123
    volumes:
      - storage-data:/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 5s
      retries: 3

volumes:
  storage-data:`}</Code>

    <H3 id="deploy-binary">Deploy Binary</H3>
    <P>Download and run directly on Linux, macOS, or Windows:</P>
    <Code title="Linux (amd64)">{`wget https://github.com/hanzoai/storage/releases/latest/download/s3-linux-amd64
chmod +x s3-linux-amd64
sudo mv s3-linux-amd64 /usr/local/bin/s3

# Start server
S3_ROOT_USER=admin S3_ROOT_PASSWORD=changeme123 \\
  s3 server /data --console-address ":9001"`}</Code>
    <Code title="macOS">{`brew install hanzoai/tap/s3

# Start server
S3_ROOT_USER=admin S3_ROOT_PASSWORD=changeme123 \\
  s3 server ~/hanzo-data --console-address ":9001"`}</Code>
    <Code title="systemd service">{`# /etc/systemd/system/hanzo-storage.service
[Unit]
Description=Hanzo Space Object Storage
After=network-online.target
Wants=network-online.target

[Service]
Type=notify
EnvironmentFile=/etc/default/s3
ExecStart=/usr/local/bin/s3 server $S3_VOLUMES --console-address ":9001"
Restart=always
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target`}</Code>

    <H3 id="deploy-kubernetes">Deploy on Kubernetes</H3>
    <P>Hanzo Space runs on any Kubernetes cluster. Here is a minimal deployment:</P>
    <Code title="storage.yaml">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: storage
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: storage
  template:
    metadata:
      labels:
        app: storage
    spec:
      containers:
        - name: storage
          image: ghcr.io/hanzoai/storage:latest
          args: ["server", "/data", "--console-address", ":9001"]
          ports:
            - containerPort: 9000
              name: s3
            - containerPort: 9001
              name: console
          env:
            - name: S3_ROOT_USER
              valueFrom:
                secretKeyRef:
                  name: storage-credentials
                  key: root-user
            - name: S3_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: storage-credentials
                  key: root-password
          volumeMounts:
            - name: data
              mountPath: /data
          readinessProbe:
            httpGet:
              path: /minio/health/ready
              port: 9000
            initialDelaySeconds: 10
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /minio/health/live
              port: 9000
            initialDelaySeconds: 30
            periodSeconds: 30
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: storage-data
---
apiVersion: v1
kind: Service
metadata:
  name: storage
spec:
  selector:
    app: storage
  ports:
    - port: 9000
      targetPort: 9000
      name: s3
    - port: 9001
      targetPort: 9001
      name: console`}</Code>

    <H3 id="deploy-distributed">Distributed Deployment</H3>
    <P>For production high-availability, deploy multiple nodes with erasure coding across all drives. This gives you both data redundancy and horizontal scalability.</P>
    <Code title="4-node distributed cluster">{`# On each of 4 nodes, start with the same command:
S3_ROOT_USER=admin S3_ROOT_PASSWORD=changeme123 \\
  s3 server \\
    http://node{1...4}.storage.example.com/data{1...4} \\
    --console-address ":9001"

# This creates a 4-node cluster with 16 drives total (4 per node).
# The cluster can tolerate loss of up to 2 nodes or 8 drives.`}</Code>
    <Callout type="warning">
      All nodes must use the same root credentials and see the same set of endpoints. Start all nodes within a short window — the cluster requires quorum to initialize.
    </Callout>
    <P><strong style={{ color: c.text }}>Requirements for distributed mode:</strong></P>
    <P>
      • Minimum 4 nodes (or 4 drives on 1 node) for erasure coding<br />
      • All nodes must have synchronized clocks (use NTP)<br />
      • All nodes must be reachable on the same port<br />
      • Use fast, local-attached storage (NVMe/SSD recommended) — avoid NAS/NFS<br />
      • All drives should be the same size for optimal space utilization
    </P>

    <H3 id="first-steps">First Steps</H3>
    <P>After deploying, here is what to do next:</P>
    <P><strong style={{ color: c.text }}>1. Log in to the console</strong> — Open the console URL (port 9001) in your browser. Sign in with your root credentials or via Hanzo ID SSO.</P>
    <P><strong style={{ color: c.text }}>2. Create a bucket</strong> — Click "Create Bucket", enter a name, and choose options (versioning, locking, quota).</P>
    <P><strong style={{ color: c.text }}>3. Upload objects</strong> — Drag and drop files into the bucket, or use the S3 API / CLI.</P>
    <P><strong style={{ color: c.text }}>4. Create access keys</strong> — Go to Access Keys → Create Access Key. These are your S3 credentials for API access.</P>
    <P><strong style={{ color: c.text }}>5. Connect with a client</strong> — Use any S3 SDK or the mc CLI (see <a href="#sdk-cli" style={{ color: c.brand, transition: "opacity 0.15s", cursor: "pointer" }}>SDKs</a> section).</P>
    <P><strong style={{ color: c.text }}>6. Configure TLS</strong> — For production, enable <a href="#ops-tls" style={{ color: c.brand, transition: "opacity 0.15s", cursor: "pointer" }}>TLS encryption</a> and <a href="#auth-oidc" style={{ color: c.brand, transition: "opacity 0.15s", cursor: "pointer" }}>OIDC SSO</a>.</P>

    {/* ═══ CONSOLE GUIDE ═══ */}
    <H2 id="console-overview">Console Guide</H2>
    <P>
      The Hanzo Space console is a web-based management interface built into the server. It provides a graphical way to manage buckets, objects, users, policies, and server configuration.
    </P>
    <P>
      Access the console at <strong style={{ color: c.text }}>https://hanzo.space</strong> (hosted) or on port 9001 of your self-hosted deployment. Authentication uses Hanzo ID (OIDC SSO) or local access key credentials.
    </P>

    <H3 id="console-buckets">Managing Buckets</H3>
    <P>The Buckets page shows all buckets in your deployment. From here you can:</P>
    <P><strong style={{ color: c.text }}>Create buckets</strong> — Click "Create Bucket". Options include:</P>
    <Table
      headers={["Option", "Description"]}
      rows={[
        ["Versioning", "Keep all versions of every object. Required for replication."],
        ["Object Locking", "Enable WORM (Write Once Read Many) compliance. Cannot be disabled after creation."],
        ["Quota", "Set a maximum size for the bucket."],
        ["Retention", "Set default retention period for new objects (governance or compliance mode)."],
      ]}
    />
    <P><strong style={{ color: c.text }}>Delete buckets</strong> — A bucket must be empty before deletion. Use lifecycle rules or <code style={inlineCode}>mc rm --recursive</code> to empty it first.</P>
    <P><strong style={{ color: c.text }}>Bucket settings</strong> — Click a bucket, then the Settings tab to configure: versioning, encryption (SSE-S3/SSE-KMS), access policies, replication rules, lifecycle rules, and event notifications.</P>

    <H3 id="console-objects">Browsing Objects</H3>
    <P>Click a bucket to browse its contents. The object browser supports:</P>
    <P>
      • <strong style={{ color: c.text }}>Upload</strong> — Drag and drop files or click "Upload" to select files. Supports multi-file and folder upload.<br />
      • <strong style={{ color: c.text }}>Download</strong> — Click any object to view details, then click "Download".<br />
      • <strong style={{ color: c.text }}>Preview</strong> — Images, PDFs, videos, and text files can be previewed inline.<br />
      • <strong style={{ color: c.text }}>Share</strong> — Generate a presigned URL for temporary public access (configurable expiry, 1 hour to 7 days).<br />
      • <strong style={{ color: c.text }}>Create folders</strong> — Click "Create Path" to create a folder (prefix) within the bucket.<br />
      • <strong style={{ color: c.text }}>Metadata</strong> — View and edit object metadata, tags, and legal hold status.<br />
      • <strong style={{ color: c.text }}>Versions</strong> — Toggle "Show Versions" to see all versions. Restore a previous version by copying it as the current version.
    </P>

    <H3 id="console-access">Access Keys</H3>
    <P>
      Access Keys are S3 API credentials. Each key consists of an Access Key (username) and Secret Key (password). Go to <strong style={{ color: c.text }}>Access Keys → Create Access Key</strong> to generate a new pair.
    </P>
    <P>You can restrict access keys with an inline policy:</P>
    <Code title="Example: Read-only access to one bucket">{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    }
  ]
}`}</Code>

    <H3 id="console-monitoring">Monitoring</H3>
    <P>
      The console dashboard shows real-time server metrics: total storage, number of objects, bucket count, uptime, network I/O, and drive health. For production monitoring, see <a href="#ops-metrics" style={{ color: c.brand, transition: "opacity 0.15s", cursor: "pointer" }}>Metrics & Monitoring</a>.
    </P>

    {/* ═══ S3 API ═══ */}
    <H2 id="s3-compatibility">S3 API Compatibility</H2>
    <P>
      Hanzo Space implements the Amazon S3 API. All S3 SDKs, CLIs, and tools work without modification. The S3 API endpoint is on port 9000 (default) or at <strong style={{ color: c.text }}>https://s3.hanzo.ai</strong> for the hosted service.
    </P>

    <H3 id="s3-buckets">Bucket Operations</H3>
    <Table
      headers={["Operation", "S3 API", "Description"]}
      rows={[
        ["Create Bucket", "PUT /bucket", "Create a new bucket"],
        ["List Buckets", "GET /", "List all buckets"],
        ["Delete Bucket", "DELETE /bucket", "Delete an empty bucket"],
        ["Head Bucket", "HEAD /bucket", "Check if a bucket exists"],
        ["Get Bucket Location", "GET /bucket?location", "Get the bucket region"],
        ["Get Bucket Versioning", "GET /bucket?versioning", "Get versioning status"],
        ["Put Bucket Versioning", "PUT /bucket?versioning", "Enable/suspend versioning"],
        ["Get Bucket Policy", "GET /bucket?policy", "Get the bucket policy JSON"],
        ["Put Bucket Policy", "PUT /bucket?policy", "Set the bucket policy"],
        ["Get Bucket Encryption", "GET /bucket?encryption", "Get default encryption config"],
        ["Put Bucket Encryption", "PUT /bucket?encryption", "Set default encryption (SSE-S3/SSE-KMS)"],
        ["Get Bucket Tagging", "GET /bucket?tagging", "Get bucket tags"],
        ["Put Bucket Tagging", "PUT /bucket?tagging", "Set bucket tags"],
        ["List Objects v2", "GET /bucket?list-type=2", "List objects with pagination"],
        ["Get Bucket Notification", "GET /bucket?notification", "Get event notification config"],
        ["Put Bucket Notification", "PUT /bucket?notification", "Set event notification rules"],
      ]}
    />

    <H3 id="s3-objects">Object Operations</H3>
    <Table
      headers={["Operation", "S3 API", "Description"]}
      rows={[
        ["Put Object", "PUT /bucket/key", "Upload an object (up to 5 TB)"],
        ["Get Object", "GET /bucket/key", "Download an object"],
        ["Head Object", "HEAD /bucket/key", "Get object metadata"],
        ["Delete Object", "DELETE /bucket/key", "Delete an object"],
        ["Delete Objects", "POST /bucket?delete", "Bulk delete up to 1000 objects"],
        ["Copy Object", "PUT /bucket/key (x-amz-copy-source)", "Copy an object"],
        ["List Object Versions", "GET /bucket?versions", "List all versions of objects"],
        ["Put Object Tags", "PUT /bucket/key?tagging", "Set object tags"],
        ["Get Object Tags", "GET /bucket/key?tagging", "Get object tags"],
        ["Put Object Retention", "PUT /bucket/key?retention", "Set object retention (WORM)"],
        ["Put Object Legal Hold", "PUT /bucket/key?legal-hold", "Set/remove legal hold"],
        ["Select Object Content", "POST /bucket/key?select", "Query CSV/JSON/Parquet with SQL"],
        ["Restore Object", "POST /bucket/key?restore", "Restore from tier/archive"],
      ]}
    />

    <H3 id="s3-presigned">Presigned URLs</H3>
    <P>Generate temporary URLs that allow unauthenticated access to private objects. Supported by all SDKs:</P>
    <Code title="JavaScript">{`import { S3Client } from 'hanzo-s3'

const client = new S3Client({
  endPoint: 's3.hanzo.ai',
  useSSL: true,
  accessKey: 'YOUR_ACCESS_KEY',
  secretKey: 'YOUR_SECRET_KEY',
})

// Generate a download URL valid for 1 hour
const url = await client.presignedGetObject('my-bucket', 'photo.jpg', 3600)

// Generate an upload URL valid for 1 hour
const uploadUrl = await client.presignedPutObject('my-bucket', 'upload.txt', 3600)`}</Code>
    <Code title="Python">{`from hanzo_s3 import S3Client
from datetime import timedelta

client = S3Client("s3.hanzo.ai", access_key="YOUR_ACCESS_KEY",
               secret_key="YOUR_SECRET_KEY", secure=True)

url = client.presigned_get_object("my-bucket", "photo.jpg", expires=timedelta(hours=1))
print(url)`}</Code>

    <H3 id="s3-multipart">Multipart Upload</H3>
    <P>
      For objects larger than 5 MB, use multipart upload. The SDKs handle this automatically — any <code style={inlineCode}>putObject</code> call with a large file will automatically split into parts, upload in parallel, and reassemble on the server.
    </P>
    <Table
      headers={["Limit", "Value"]}
      rows={[
        ["Minimum part size", "5 MB"],
        ["Maximum part size", "5 GB"],
        ["Maximum parts per upload", "10,000"],
        ["Maximum object size", "5 TB"],
      ]}
    />
    <Code title="Manual multipart (mc)">{`# Upload a 10 GB file — mc handles multipart automatically
mc cp large-file.zip hanzo/backups/

# Monitor in-progress uploads
mc ls --incomplete hanzo/backups/

# Abort stale multipart uploads older than 7 days
mc rm --incomplete --older-than 7d hanzo/backups/`}</Code>

    {/* ═══ SDKs ═══ */}
    <H2 id="sdk-javascript">JavaScript SDK</H2>
    <Code title="Install">{`npm install hanzo-s3`}</Code>
    <Code title="Usage">{`import { S3Client } from 'hanzo-s3'

const client = new S3Client({
  endPoint: 's3.hanzo.ai',
  port: 443,
  useSSL: true,
  accessKey: 'YOUR_ACCESS_KEY',
  secretKey: 'YOUR_SECRET_KEY',
})

// List buckets
const buckets = await client.listBuckets()
console.log(buckets)

// Upload a file
await client.fPutObject('my-bucket', 'hello.txt', '/path/to/hello.txt')

// Download a file
await client.fGetObject('my-bucket', 'hello.txt', '/tmp/hello.txt')

// Stream upload
await client.putObject('my-bucket', 'data.json', Buffer.from('{"key":"value"}'))

// List objects
const stream = client.listObjects('my-bucket', '', true)
stream.on('data', (obj) => console.log(obj))
stream.on('end', () => console.log('done'))

// Delete an object
await client.removeObject('my-bucket', 'hello.txt')`}</Code>

    <H2 id="sdk-python">Python SDK</H2>
    <Code title="Install">{`pip install hanzo-s3`}</Code>
    <Code title="Usage">{`from hanzo_s3 import S3Client
from hanzo_s3.error import S3Error

client = S3Client(
    "s3.hanzo.ai",
    access_key="YOUR_ACCESS_KEY",
    secret_key="YOUR_SECRET_KEY",
    secure=True,
)

# List buckets
for bucket in client.list_buckets():
    print(bucket.name, bucket.creation_date)

# Create a bucket
if not client.bucket_exists("my-bucket"):
    client.make_bucket("my-bucket")

# Upload a file
client.fput_object("my-bucket", "hello.txt", "/path/to/hello.txt")

# Upload bytes
from io import BytesIO
data = BytesIO(b"Hello, Hanzo Space!")
client.put_object("my-bucket", "greeting.txt", data, len(data.getvalue()))

# Download a file
client.fget_object("my-bucket", "hello.txt", "/tmp/hello.txt")

# List objects
for obj in client.list_objects("my-bucket", recursive=True):
    print(obj.object_name, obj.size)

# Delete an object
client.remove_object("my-bucket", "hello.txt")`}</Code>

    <H2 id="sdk-go">Go SDK</H2>
    <Code title="Install">{`go get github.com/hanzoai/s3-go/v7`}</Code>
    <Code title="Usage">{`package main

import (
    "context"
    "fmt"
    "log"
    "os"

    "github.com/hanzoai/s3-go/v7"
    "github.com/hanzoai/s3-go/v7/pkg/credentials"
)

func main() {
    client, err := s3.New("s3.hanzo.ai", &s3.Options{
        Creds:  credentials.NewStaticV4("YOUR_ACCESS_KEY", "YOUR_SECRET_KEY", ""),
        Secure: true,
    })
    if err != nil {
        log.Fatal(err)
    }

    ctx := context.Background()

    // List buckets
    buckets, _ := client.ListBuckets(ctx)
    for _, bucket := range buckets {
        fmt.Println(bucket.Name)
    }

    // Upload a file
    _, err = client.FPutObject(ctx, "my-bucket", "hello.txt", "/path/to/hello.txt",
        s3.PutObjectOptions{ContentType: "text/plain"})
    if err != nil {
        log.Fatal(err)
    }

    // Download a file
    err = client.FGetObject(ctx, "my-bucket", "hello.txt", "/tmp/hello.txt",
        s3.GetObjectOptions{})
    if err != nil {
        log.Fatal(err)
    }

    // Stream upload
    file, _ := os.Open("/path/to/large-file.zip")
    defer file.Close()
    stat, _ := file.Stat()
    _, err = client.PutObject(ctx, "my-bucket", "large-file.zip", file, stat.Size(),
        s3.PutObjectOptions{ContentType: "application/zip"})
}`}</Code>

    <H2 id="sdk-java">Java SDK</H2>
    <Code title="Maven dependency">{`<dependency>
    <groupId>ai.hanzo.s3</groupId>
    <artifactId>hanzo-s3</artifactId>
    <version>8.5.7</version>
</dependency>`}</Code>
    <Code title="Usage">{`import ai.hanzo.s3.*;

public class StorageExample {
    public static void main(String[] args) throws Exception {
        HanzoS3Client client = HanzoS3Client.builder()
            .endpoint("https://s3.hanzo.ai")
            .credentials("YOUR_ACCESS_KEY", "YOUR_SECRET_KEY")
            .build();

        // Create a bucket
        if (!client.bucketExists(BucketExistsArgs.builder().bucket("my-bucket").build())) {
            client.makeBucket(MakeBucketArgs.builder().bucket("my-bucket").build());
        }

        // Upload a file
        client.uploadObject(UploadObjectArgs.builder()
            .bucket("my-bucket")
            .object("hello.txt")
            .filename("/path/to/hello.txt")
            .build());

        // Download a file
        client.downloadObject(DownloadObjectArgs.builder()
            .bucket("my-bucket")
            .object("hello.txt")
            .filename("/tmp/hello.txt")
            .build());
    }
}`}</Code>

    <H2 id="sdk-cli">mc CLI</H2>
    <P>
      <code style={inlineCode}>mc</code> is the official command-line client for S3-compatible storage. It provides Unix-like commands (ls, cp, rm, cat, diff, mirror) for object storage.
    </P>
    <Code title="Install">{`# macOS
brew install hanzoai/tap/s3-mc

# Linux
curl -O https://github.com/hanzoai/storage/releases/latest/download/s3-mc-linux-amd64
chmod +x s3-mc-linux-amd64 && sudo mv s3-mc-linux-amd64 /usr/local/bin/mc

# Windows (PowerShell)
Invoke-WebRequest -Uri "https://github.com/hanzoai/storage/releases/latest/download/s3-mc-windows-amd64.exe" -OutFile "mc.exe"`}</Code>
    <Code title="Configure">{`# Add your Hanzo Space server
mc alias set hanzo https://s3.hanzo.ai YOUR_ACCESS_KEY YOUR_SECRET_KEY`}</Code>
    <Code title="Common commands">{`# List buckets
mc ls hanzo

# Create a bucket
mc mb hanzo/my-bucket

# Upload a file
mc cp file.txt hanzo/my-bucket/

# Upload a directory recursively
mc cp --recursive ./data/ hanzo/my-bucket/data/

# Download a file
mc cp hanzo/my-bucket/file.txt ./

# List objects
mc ls hanzo/my-bucket/

# Remove an object
mc rm hanzo/my-bucket/file.txt

# Mirror a directory (sync)
mc mirror ./local-dir/ hanzo/my-bucket/

# View object contents
mc cat hanzo/my-bucket/config.json

# Get bucket/object info
mc stat hanzo/my-bucket
mc stat hanzo/my-bucket/file.txt

# Set bucket policy to public read
mc anonymous set download hanzo/my-bucket

# Find objects matching a pattern
mc find hanzo/my-bucket --name "*.log" --older 30d

# Calculate disk usage
mc du hanzo/my-bucket`}</Code>

    <H2 id="sdk-cli-admin">mc Admin Commands</H2>
    <P>Administrative commands for server management:</P>
    <Code>{`# Server info
mc admin info hanzo

# View server configuration
mc admin config get hanzo

# Set a configuration key
mc admin config set hanzo compression enable=on

# Restart server (applies config changes)
mc admin service restart hanzo

# View real-time server logs
mc admin trace hanzo

# View audit logs
mc admin trace hanzo --call s3

# User management
mc admin user add hanzo newuser newpassword
mc admin user list hanzo
mc admin user remove hanzo newuser

# Group management
mc admin group add hanzo developers user1 user2
mc admin group list hanzo

# Policy management
mc admin policy create hanzo my-policy policy.json
mc admin policy attach hanzo my-policy --user=newuser

# Healing (data repair)
mc admin heal hanzo --recursive

# Prometheus metrics
mc admin prometheus generate hanzo`}</Code>

    <H2 id="sdk-aws">AWS CLI</H2>
    <P>Hanzo Space is fully compatible with the AWS CLI. Configure it to point to your Hanzo Space endpoint:</P>
    <Code title="Configure">{`aws configure
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region name: us-east-1
# Default output format: json

# Set endpoint
aws configure set default.s3.endpoint_url https://s3.hanzo.ai
aws configure set default.s3api.endpoint_url https://s3.hanzo.ai`}</Code>
    <Code title="Usage">{`# List buckets
aws s3 ls

# Create a bucket
aws s3 mb s3://my-bucket

# Upload
aws s3 cp file.txt s3://my-bucket/

# Download
aws s3 cp s3://my-bucket/file.txt ./

# Sync a directory
aws s3 sync ./local/ s3://my-bucket/remote/

# List objects
aws s3 ls s3://my-bucket/ --recursive

# Presigned URL
aws s3 presign s3://my-bucket/file.txt --expires-in 3600`}</Code>

    {/* ═══ SECURITY ═══ */}
    <H2 id="auth-oidc">OIDC / SSO Authentication</H2>
    <P>
      Hanzo Space supports OpenID Connect (OIDC) for single sign-on. On <strong style={{ color: c.text }}>hanzo.space</strong>, this is pre-configured with Hanzo ID — click "Sign In" and you are redirected to hanzo.id for authentication.
    </P>
    <P>For self-hosted deployments, configure OIDC with these environment variables:</P>
    <Table
      headers={["Variable", "Description"]}
      rows={[
        ["S3_IDENTITY_OPENID_CONFIG_URL", "OIDC discovery URL, e.g. https://hanzo.id/.well-known/openid-configuration"],
        ["S3_IDENTITY_OPENID_CLIENT_ID", "OAuth2 client ID"],
        ["S3_IDENTITY_OPENID_CLIENT_SECRET", "OAuth2 client secret"],
        ["S3_IDENTITY_OPENID_CLAIM_NAME", "JWT claim for policy mapping (default: policy)"],
        ["S3_IDENTITY_OPENID_SCOPES", "Scopes to request (default: openid,profile,email)"],
        ["S3_IDENTITY_OPENID_REDIRECT_URI", "Callback URL for the console"],
        ["S3_IDENTITY_OPENID_DISPLAY_NAME", "Display name on login page (e.g. Hanzo)"],
        ["S3_IDENTITY_OPENID_CLAIM_USERINFO", "Set to on to fetch claims from userinfo endpoint"],
        ["S3_IDENTITY_OPENID_ROLE_POLICY", "Default policy for all OIDC users (e.g. readwrite)"],
      ]}
    />
    <Code title="Example: Hanzo ID OIDC">{`S3_IDENTITY_OPENID_CONFIG_URL=https://hanzo.id/.well-known/openid-configuration
S3_IDENTITY_OPENID_CLIENT_ID=hanzo-storage-client-id
S3_IDENTITY_OPENID_CLIENT_SECRET=hanzo-storage-client-secret
S3_IDENTITY_OPENID_SCOPES=openid,profile,email
S3_IDENTITY_OPENID_REDIRECT_URI=https://hanzo.space/oauth_callback
S3_IDENTITY_OPENID_DISPLAY_NAME=Hanzo
S3_IDENTITY_OPENID_CLAIM_NAME=policy
S3_IDENTITY_OPENID_ROLE_POLICY=consoleAdmin`}</Code>
    <Callout type="info">
      Multiple OIDC providers are supported. Use a suffix: <code style={inlineCode}>S3_IDENTITY_OPENID_CONFIG_URL_PROVIDER2=...</code>
    </Callout>

    <H3 id="auth-ldap">LDAP / Active Directory</H3>
    <P>Hanzo Space supports LDAP and Active Directory for enterprise identity management:</P>
    <Table
      headers={["Variable", "Description"]}
      rows={[
        ["S3_IDENTITY_LDAP_SERVER_ADDR", "LDAP server address (e.g. ldap.example.com:636)"],
        ["S3_IDENTITY_LDAP_LOOKUP_BIND_DN", "Bind DN for lookups (e.g. cn=admin,dc=example,dc=com)"],
        ["S3_IDENTITY_LDAP_LOOKUP_BIND_PASSWORD", "Password for the lookup bind DN"],
        ["S3_IDENTITY_LDAP_USER_DN_SEARCH_BASE_DN", "Base DN for user searches (e.g. dc=example,dc=com)"],
        ["S3_IDENTITY_LDAP_USER_DN_SEARCH_FILTER", "LDAP filter for users (e.g. (uid=%s))"],
        ["S3_IDENTITY_LDAP_GROUP_SEARCH_BASE_DN", "Base DN for group searches"],
        ["S3_IDENTITY_LDAP_GROUP_SEARCH_FILTER", "Filter for group membership (e.g. (&(objectclass=groupOfNames)(member=%d)))"],
        ["S3_IDENTITY_LDAP_TLS_SKIP_VERIFY", "Skip TLS certificate verification (not for production)"],
      ]}
    />
    <Code title="Example: Active Directory">{`S3_IDENTITY_LDAP_SERVER_ADDR=ldaps://ad.example.com:636
S3_IDENTITY_LDAP_LOOKUP_BIND_DN="cn=svc-storage,ou=ServiceAccounts,dc=example,dc=com"
S3_IDENTITY_LDAP_LOOKUP_BIND_PASSWORD=service-account-password
S3_IDENTITY_LDAP_USER_DN_SEARCH_BASE_DN="dc=example,dc=com"
S3_IDENTITY_LDAP_USER_DN_SEARCH_FILTER="(&(objectCategory=person)(sAMAccountName=%s))"
S3_IDENTITY_LDAP_GROUP_SEARCH_BASE_DN="ou=Groups,dc=example,dc=com"
S3_IDENTITY_LDAP_GROUP_SEARCH_FILTER="(&(objectclass=group)(member=%d))"`}</Code>
    <P>After configuring LDAP, map LDAP groups to policies:</P>
    <Code>{`mc admin policy attach hanzo readwrite --group="cn=developers,ou=Groups,dc=example,dc=com"
mc admin policy attach hanzo consoleAdmin --group="cn=admins,ou=Groups,dc=example,dc=com"`}</Code>

    <H3 id="auth-iam">IAM Policies</H3>
    <P>
      Hanzo Space uses AWS IAM-compatible policies for access control. Policies are JSON documents that define allowed or denied actions on specific resources.
    </P>
    <P>Built-in policies:</P>
    <Table
      headers={["Policy", "Description"]}
      rows={[
        ["readonly", "Read-only access to all buckets and objects"],
        ["readwrite", "Full read/write access to all buckets and objects"],
        ["writeonly", "Write-only access (upload only, no list or download)"],
        ["diagnostics", "Access to server health and metrics endpoints"],
        ["consoleAdmin", "Full admin access including user/policy management"],
      ]}
    />
    <Code title="Custom policy example">{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::uploads",
        "arn:aws:s3:::uploads/*"
      ]
    },
    {
      "Effect": "Deny",
      "Action": ["s3:DeleteBucket"],
      "Resource": ["arn:aws:s3:::*"]
    }
  ]
}`}</Code>
    <Code title="Apply a custom policy">{`# Create policy
mc admin policy create hanzo upload-only upload-policy.json

# Attach to user
mc admin policy attach hanzo upload-only --user=uploader

# Attach to group
mc admin policy attach hanzo upload-only --group=uploaders`}</Code>
    <P><strong style={{ color: c.text }}>Supported IAM policy actions:</strong></P>
    <Table
      headers={["Action", "Description"]}
      rows={[
        ["s3:GetObject", "Download objects"],
        ["s3:PutObject", "Upload objects"],
        ["s3:DeleteObject", "Delete objects"],
        ["s3:ListBucket", "List objects in a bucket"],
        ["s3:ListAllMyBuckets", "List all buckets"],
        ["s3:CreateBucket", "Create new buckets"],
        ["s3:DeleteBucket", "Delete buckets"],
        ["s3:GetBucketLocation", "Get bucket region"],
        ["s3:GetBucketPolicy", "Read bucket policies"],
        ["s3:PutBucketPolicy", "Write bucket policies"],
        ["s3:GetBucketNotification", "Read notification config"],
        ["s3:PutBucketNotification", "Write notification config"],
        ["s3:ListMultipartUploadParts", "List multipart upload parts"],
        ["s3:AbortMultipartUpload", "Abort in-progress multipart uploads"],
      ]}
    />

    <H3 id="auth-encryption">Encryption</H3>
    <P>Hanzo Space supports server-side encryption (SSE) with three modes:</P>
    <Table
      headers={["Mode", "Description"]}
      rows={[
        ["SSE-S3", "Server manages encryption keys. Enable per-bucket via the console or API."],
        ["SSE-KMS", "Use an external KMS (e.g., HashiCorp Vault, AWS KMS) for key management."],
        ["SSE-C", "Client provides the encryption key with each request."],
      ]}
    />
    <Code title="Enable SSE-S3 on a bucket">{`mc encrypt set sse-s3 hanzo/my-bucket`}</Code>
    <Code title="Enable SSE-KMS">{`# Configure KMS
S3_KMS_KES_ENDPOINT=https://kes.example.com:7373
S3_KMS_KES_KEY_FILE=/path/to/client.key
S3_KMS_KES_CERT_FILE=/path/to/client.crt
S3_KMS_KES_CAPATH=/path/to/ca.crt
S3_KMS_KES_KEY_NAME=my-encryption-key

# Enable SSE-KMS on a bucket
mc encrypt set sse-kms my-encryption-key hanzo/secure-bucket`}</Code>
    <P>For TLS configuration, see <a href="#ops-tls" style={{ color: c.brand, transition: "opacity 0.15s", cursor: "pointer" }}>TLS / Network Encryption</a>.</P>

    <H3 id="auth-bucket-policy">Bucket Policies</H3>
    <P>Bucket policies control anonymous and cross-account access. Common use cases:</P>
    <Code title="Public read-only bucket">{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::public-assets/*"]
    }
  ]
}`}</Code>
    <Code title="IP-restricted access">{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": ["arn:aws:s3:::internal-data/*"],
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": ["10.0.0.0/8", "172.16.0.0/12"]
        }
      }
    }
  ]
}`}</Code>
    <Code title="Set via mc CLI">{`# Public download access
mc anonymous set download hanzo/public-assets

# Upload-only (drop box)
mc anonymous set upload hanzo/uploads

# Apply custom JSON policy
mc anonymous set-json policy.json hanzo/my-bucket`}</Code>

    {/* ═══ ADMINISTRATION ═══ */}
    <H2 id="admin-config">Server Configuration</H2>
    <P>Hanzo Space is configured via environment variables. Key settings:</P>
    <Table
      headers={["Variable", "Default", "Description"]}
      rows={[
        ["S3_ROOT_USER", "(required)", "Root username (minimum 3 characters)"],
        ["S3_ROOT_PASSWORD", "(required)", "Root password (minimum 8 characters)"],
        ["S3_VOLUMES", "/data", "Data directory or drive paths"],
        ["S3_SERVER_URL", "", "Public URL for the S3 API (for presigned URLs)"],
        ["S3_BROWSER_REDIRECT_URL", "", "Public URL for the console"],
        ["S3_REGION", "us-east-1", "Server region (used in S3 responses)"],
        ["S3_DOMAIN", "", "Virtual-hosted-style domain (e.g., s3.example.com)"],
        ["S3_COMPRESSION_ENABLE", "off", "Enable transparent compression"],
        ["S3_COMPRESSION_EXTENSIONS", ".txt,.log,.csv,.json,.xml", "File extensions to compress"],
        ["S3_COMPRESSION_MIME_TYPES", "text/*,application/json,application/xml", "MIME types to compress"],
        ["S3_PROMETHEUS_AUTH_TYPE", "jwt", "Prometheus metrics auth (jwt or public)"],
        ["S3_PROMETHEUS_URL", "", "Prometheus server URL for console dashboards"],
        ["S3_SCANNER_SPEED", "default", "Background scanner speed (fastest/fast/default/slow/slowest)"],
        ["S3_API_REQUESTS_MAX", "0", "Maximum concurrent API requests (0 = unlimited)"],
        ["S3_API_REQUESTS_DEADLINE", "10s", "Deadline for queued API requests"],
        ["S3_HEAL_BITROTSCAN", "on", "Enable bitrot scanning during healing"],
      ]}
    />
    <Code title="Config file (/etc/default/s3)">{`# Root credentials
S3_ROOT_USER=admin
S3_ROOT_PASSWORD=a-strong-password-here

# Volumes (4 drives for erasure coding)
S3_VOLUMES="/data{1...4}"

# Public URLs
S3_SERVER_URL=https://s3.example.com
S3_BROWSER_REDIRECT_URL=https://console.example.com

# Region
S3_REGION=us-east-1

# Enable compression
S3_COMPRESSION_ENABLE=on

# OIDC
S3_IDENTITY_OPENID_CONFIG_URL=https://hanzo.id/.well-known/openid-configuration
S3_IDENTITY_OPENID_CLIENT_ID=my-client-id
S3_IDENTITY_OPENID_DISPLAY_NAME=Hanzo`}</Code>
    <P>Runtime configuration changes via mc:</P>
    <Code>{`# View all configuration
mc admin config get hanzo

# Enable compression
mc admin config set hanzo compression enable=on

# Configure scanner speed
mc admin config set hanzo scanner speed=fast

# Set API rate limits
mc admin config set hanzo api requests_max=500

# Apply changes (requires restart)
mc admin service restart hanzo`}</Code>

    <H3 id="admin-lifecycle">Lifecycle Rules</H3>
    <P>Lifecycle rules automate object transitions and expiration:</P>
    <Code title="Expire objects after 90 days">{`mc ilm rule add hanzo/logs --expiry-days 90`}</Code>
    <Code title="Expire noncurrent versions after 30 days">{`mc ilm rule add hanzo/data --noncurrent-expire-days 30`}</Code>
    <Code title="Expire delete markers">{`mc ilm rule add hanzo/data --expire-delete-marker`}</Code>
    <Code title="Abort incomplete multipart uploads">{`mc ilm rule add hanzo/uploads --expire-all-object-size-less-than 1MB`}</Code>
    <Code title="List lifecycle rules">{`mc ilm rule list hanzo/my-bucket`}</Code>
    <P>Lifecycle rules can also transition objects to a remote tier. See <a href="#admin-tiering" style={{ color: c.brand, transition: "opacity 0.15s", cursor: "pointer" }}>Tiering</a>.</P>

    <H3 id="admin-tiering">Tiering & Transitions</H3>
    <P>Tier objects to cheaper storage (AWS S3, GCS, Azure Blob, or another Hanzo Space instance) after a specified number of days:</P>
    <Code title="Add a remote tier">{`# Add AWS S3 tier
mc ilm tier add s3 hanzo WARM-S3 \\
  --endpoint https://s3.amazonaws.com \\
  --access-key AWS_ACCESS_KEY \\
  --secret-key AWS_SECRET_KEY \\
  --bucket my-archive-bucket \\
  --region us-east-1

# Add Google Cloud Storage tier
mc ilm tier add gcs hanzo COLD-GCS \\
  --credentials-file /path/to/gcs-credentials.json \\
  --bucket my-gcs-archive

# Add Azure Blob tier
mc ilm tier add azure hanzo ARCHIVE-AZURE \\
  --account-name myaccount \\
  --account-key mykey \\
  --bucket my-container

# Add remote Hanzo Space tier
mc ilm tier add minio hanzo REMOTE-STORAGE \\
  --endpoint https://remote.example.com \\
  --access-key REMOTE_KEY \\
  --secret-key REMOTE_SECRET \\
  --bucket remote-archive`}</Code>
    <Code title="Create a transition rule">{`# Transition to WARM-S3 after 30 days
mc ilm rule add hanzo/my-bucket --transition-days 30 --storage-class WARM-S3

# Transition noncurrent versions after 7 days
mc ilm rule add hanzo/my-bucket --noncurrent-transition-days 7 --noncurrent-storage-class COLD-GCS`}</Code>
    <Callout type="info">
      Tiered objects appear in the bucket listing but their data is stored on the remote tier. Accessing a tiered object transparently retrieves it from the remote storage.
    </Callout>

    <H3 id="admin-replication">Replication</H3>
    <P>Hanzo Space supports bucket-level and site-level replication for disaster recovery and geographic distribution:</P>
    <P><strong style={{ color: c.text }}>Bucket Replication</strong> — Replicate objects between buckets on different servers. Requires versioning on both buckets.</P>
    <Code>{`# Enable versioning on both source and target
mc version enable source/my-bucket
mc version enable target/my-bucket

# Add replication target
mc replicate add source/my-bucket \\
  --remote-bucket my-bucket \\
  --remote-target https://ACCESS_KEY:SECRET_KEY@remote.example.com

# Check replication status
mc replicate status source/my-bucket

# View replication metrics
mc replicate backlog source/my-bucket`}</Code>
    <P><strong style={{ color: c.text }}>Site Replication</strong> — Synchronize everything (buckets, objects, policies, IAM) across multiple sites for active-active HA.</P>
    <Code>{`# Set up site replication between two clusters
mc admin replicate add site1 site2

# Check replication status
mc admin replicate info site1

# Remove site replication
mc admin replicate remove site1`}</Code>

    <H3 id="admin-notifications">Event Notifications</H3>
    <P>Hanzo Space can publish bucket events (object created, deleted, accessed) to external services:</P>
    <Table
      headers={["Target", "Config Key", "Use Case"]}
      rows={[
        ["Webhook", "notify_webhook", "HTTP POST to any URL"],
        ["Kafka", "notify_kafka", "Stream events to Kafka topics"],
        ["AMQP (RabbitMQ)", "notify_amqp", "Publish to message queues"],
        ["Redis", "notify_redis", "Push to Redis pub/sub channels"],
        ["PostgreSQL", "notify_postgres", "Insert events into a database table"],
        ["MySQL", "notify_mysql", "Insert events into MySQL"],
        ["Elasticsearch", "notify_elasticsearch", "Index events for search"],
        ["NATS", "notify_nats", "Cloud-native messaging"],
        ["NSQ", "notify_nsq", "Real-time distributed messaging"],
      ]}
    />
    <Code title="Configure webhook notifications">{`mc admin config set hanzo notify_webhook:primary \\
  endpoint="https://api.example.com/hooks/storage" \\
  queue_limit="10000"

# Restart to apply
mc admin service restart hanzo

# Subscribe bucket to events
mc event add hanzo/my-bucket arn:minio:sqs::primary:webhook \\
  --event put,delete

# List configured events
mc event list hanzo/my-bucket

# Remove event subscription
mc event remove hanzo/my-bucket arn:minio:sqs::primary:webhook`}</Code>
    <Code title="Configure Kafka notifications">{`mc admin config set hanzo notify_kafka:primary \\
  brokers="kafka1:9092,kafka2:9092" \\
  topic="storage-events" \\
  queue_limit="10000"

mc admin service restart hanzo
mc event add hanzo/my-bucket arn:minio:sqs::primary:kafka --event put`}</Code>

    <H3 id="admin-versioning">Versioning</H3>
    <P>Bucket versioning keeps all versions of an object, allowing you to recover from accidental deletes or overwrites.</P>
    <Code>{`# Enable versioning on a bucket
mc version enable hanzo/my-bucket

# Check versioning status
mc version info hanzo/my-bucket

# List object versions
mc ls --versions hanzo/my-bucket/file.txt

# Restore a previous version
mc cp --version-id VERSION_ID hanzo/my-bucket/file.txt hanzo/my-bucket/file.txt

# Permanently delete a specific version
mc rm --version-id VERSION_ID hanzo/my-bucket/file.txt

# Suspend versioning (existing versions are preserved)
mc version suspend hanzo/my-bucket`}</Code>
    <Callout type="info">
      Versioning is required for bucket replication and object locking. Once enabled, it can be suspended but not fully disabled. Use <a href="#admin-lifecycle" style={{ color: c.brand, transition: "opacity 0.15s", cursor: "pointer" }}>lifecycle rules</a> to expire old versions automatically.
    </Callout>

    {/* ═══ OPERATIONS ═══ */}
    <H2 id="ops-erasure-coding">Erasure Coding</H2>
    <P>
      Erasure coding is the data protection mechanism used in distributed Hanzo Space deployments. It splits each object into data and parity shards distributed across drives, providing redundancy without full replication.
    </P>
    <P><strong style={{ color: c.text }}>How it works:</strong></P>
    <P>
      When you write an object, it is split into <em>data shards</em> and <em>parity shards</em>. The parity shards allow the system to reconstruct the original data even if some drives fail. The default parity is EC:4 for 16 drives (can tolerate loss of 4 drives).
    </P>
    <Table
      headers={["Drives", "Data Shards", "Parity Shards", "Drives Tolerated"]}
      rows={[
        ["4", "2", "2", "2"],
        ["8", "4", "4", "4"],
        ["16", "12", "4", "4"],
        ["32", "28", "4", "4"],
      ]}
    />
    <Code title="Configure erasure coding parity">{`# Set standard parity (for normal objects)
mc admin config set hanzo storage_class standard=EC:4

# Set reduced redundancy (for less critical data)
mc admin config set hanzo storage_class rrs=EC:2

mc admin service restart hanzo`}</Code>
    <Callout type="warning">
      Erasure coding requires a minimum of 4 drives. Single-drive deployments have no data redundancy — use RAID or replicate to another server for protection.
    </Callout>
    <P><strong style={{ color: c.text }}>Storage overhead:</strong> With EC:4 on 16 drives, the overhead is 4/16 = 25%. This is much less than the 100% overhead of simple replication. The tradeoff is that CPU is used for encoding/decoding.</P>

    <H3 id="ops-healing">Healing</H3>
    <P>
      Healing is the process of repairing corrupted or missing data shards. Hanzo Space automatically detects and repairs data using the erasure coded parity shards.
    </P>
    <P><strong style={{ color: c.text }}>Automatic healing:</strong> A background scanner continuously checks data integrity (bitrot detection) and repairs any inconsistencies automatically.</P>
    <P><strong style={{ color: c.text }}>Manual healing:</strong></P>
    <Code>{`# Heal all objects in a bucket
mc admin heal hanzo/my-bucket --recursive

# Heal a specific object
mc admin heal hanzo/my-bucket/important-file.dat

# Heal the entire server
mc admin heal hanzo --recursive

# Dry-run to see what would be healed
mc admin heal hanzo --recursive --dry-run

# View healing status
mc admin heal hanzo --recursive --verbose`}</Code>
    <Callout type="info">
      After replacing a failed drive, healing runs automatically to reconstruct the missing shards onto the new drive. The scanner speed can be adjusted with <code style={inlineCode}>S3_SCANNER_SPEED</code>.
    </Callout>

    <H3 id="ops-locking">Object Locking / WORM</H3>
    <P>
      Object Locking enables Write-Once-Read-Many (WORM) compliance, preventing objects from being deleted or overwritten for a specified retention period. This is required for regulatory compliance (SEC 17a-4, FINRA, HIPAA).
    </P>
    <P><strong style={{ color: c.text }}>Prerequisites:</strong> Object locking must be enabled at bucket creation time and cannot be added later. Versioning is automatically enabled on locked buckets.</P>
    <Code title="Create a locked bucket">{`mc mb hanzo/compliance-data --with-lock`}</Code>
    <P><strong style={{ color: c.text }}>Retention modes:</strong></P>
    <Table
      headers={["Mode", "Description"]}
      rows={[
        ["Governance", "Users with s3:BypassGovernanceRetention permission can delete/modify objects before retention expires. Suitable for internal compliance."],
        ["Compliance", "No one — including root — can delete objects before retention expires. Irreversible. Required for strict regulatory compliance."],
      ]}
    />
    <Code title="Set default retention">{`# Set 365-day governance retention on a bucket
mc retention set --default governance 365d hanzo/compliance-data

# Set compliance retention on a specific object
mc retention set compliance 180d hanzo/compliance-data/audit-log.csv

# View retention settings
mc retention info hanzo/compliance-data/audit-log.csv

# Clear retention (governance mode only, with bypass permission)
mc retention clear --default hanzo/compliance-data`}</Code>
    <P><strong style={{ color: c.text }}>Legal Hold:</strong> Independently of retention, a legal hold prevents deletion indefinitely until explicitly removed. Used for litigation hold requirements.</P>
    <Code>{`# Enable legal hold
mc legalhold set hanzo/compliance-data/document.pdf

# Check legal hold status
mc legalhold info hanzo/compliance-data/document.pdf

# Remove legal hold
mc legalhold clear hanzo/compliance-data/document.pdf`}</Code>

    <H3 id="ops-metrics">Metrics & Monitoring</H3>
    <P>Hanzo Space exposes Prometheus-compatible metrics for monitoring:</P>
    <Table
      headers={["Endpoint", "Description"]}
      rows={[
        ["/minio/v2/metrics/cluster", "Cluster-wide aggregated metrics"],
        ["/minio/v2/metrics/node", "Per-node metrics"],
        ["/minio/v2/metrics/bucket", "Per-bucket metrics"],
        ["/minio/v2/metrics/resource", "Resource utilization metrics"],
      ]}
    />
    <Code title="Generate Prometheus config">{`# Auto-generate prometheus.yml scrape config
mc admin prometheus generate hanzo

# Or configure manually in prometheus.yml:
# scrape_configs:
#   - job_name: hanzo-storage
#     metrics_path: /minio/v2/metrics/cluster
#     bearer_token: <mc admin prometheus generate output>
#     static_configs:
#       - targets: ['storage.example.com:9000']`}</Code>
    <P>For public access to metrics (no auth required):</P>
    <Code>{`S3_PROMETHEUS_AUTH_TYPE=public`}</Code>
    <P><strong style={{ color: c.text }}>Key metrics:</strong></P>
    <Table
      headers={["Metric", "Description"]}
      rows={[
        ["minio_node_disk_total_bytes", "Total disk capacity"],
        ["minio_node_disk_used_bytes", "Used disk space"],
        ["minio_node_disk_free_bytes", "Free disk space"],
        ["minio_s3_requests_total", "Total S3 requests by API and status"],
        ["minio_s3_requests_errors_total", "Failed S3 requests"],
        ["minio_s3_traffic_received_bytes", "Total bytes received"],
        ["minio_s3_traffic_sent_bytes", "Total bytes sent"],
        ["minio_bucket_objects_count", "Number of objects per bucket"],
        ["minio_bucket_usage_total_bytes", "Total size per bucket"],
        ["minio_cluster_nodes_online_total", "Number of online nodes"],
        ["minio_cluster_nodes_offline_total", "Number of offline nodes"],
        ["minio_cluster_disk_online_total", "Number of online drives"],
        ["minio_cluster_disk_offline_total", "Number of offline drives"],
        ["minio_heal_objects_total", "Objects healed"],
        ["minio_node_scanner_objects_scanned", "Objects scanned for bitrot"],
      ]}
    />
    <Callout type="tip">
      Grafana dashboards are available at <strong style={{ color: c.text }}>https://grafana.com/grafana/dashboards/13502</strong> (cluster overview) and <strong style={{ color: c.text }}>13503</strong> (bucket metrics).
    </Callout>

    <H3 id="ops-tls">TLS / Network Encryption</H3>
    <P>Enable TLS for encryption in transit. Hanzo Space auto-detects TLS certificates:</P>
    <Code title="Certificate paths">{`~/.s3/certs/
├── public.crt    # Server certificate (PEM)
├── private.key   # Server private key (PEM)
└── CAs/          # Trusted CA certificates (optional)
    └── ca.crt`}</Code>
    <P>The server automatically uses HTTPS when certificates are present. For Kubernetes, mount TLS secrets:</P>
    <Code title="K8s TLS secret mount">{`volumes:
  - name: tls-certs
    secret:
      secretName: storage-tls
      items:
        - key: tls.crt
          path: public.crt
        - key: tls.key
          path: private.key
containers:
  - name: storage
    volumeMounts:
      - name: tls-certs
        mountPath: /root/.s3/certs
        readOnly: true`}</Code>
    <P><strong style={{ color: c.text }}>Let's Encrypt with cert-manager:</strong></P>
    <Code>{`apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: storage-tls
spec:
  secretName: storage-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
    - s3.example.com
    - console.example.com`}</Code>
    <Callout type="warning">
      For distributed deployments, all nodes must use the same TLS certificates or certificates from the same CA. Clients must trust the CA that signed the server certificates.
    </Callout>

    <H3 id="ops-scaling">Scaling & Expansion</H3>
    <P>Expand storage capacity by adding new server pools to an existing deployment. The original data stays on the existing pool; new data is distributed across all pools.</P>
    <Code title="Add a new server pool">{`# Original 4-node cluster
s3 server http://node{1...4}.example.com/data{1...4}

# Expand with 4 more nodes (add to the same command)
s3 server \\
  http://node{1...4}.example.com/data{1...4} \\
  http://node{5...8}.example.com/data{1...4}`}</Code>
    <P><strong style={{ color: c.text }}>Decommissioning</strong> — Safely remove a server pool by migrating its data:</P>
    <Code>{`# Start decommissioning a pool
mc admin decommission start hanzo http://node{1...4}.example.com/data{1...4}

# Check decommission status
mc admin decommission status hanzo

# Cancel decommission (if needed)
mc admin decommission cancel hanzo http://node{1...4}.example.com/data{1...4}`}</Code>
    <Callout type="info">
      Decommissioning migrates all data from the old pool to the remaining pools. The cluster stays online and serves requests during migration. Do not remove nodes until decommissioning completes.
    </Callout>

    <H3 id="ops-upgrade">Upgrade Procedures</H3>
    <P>Hanzo Space supports zero-downtime rolling upgrades for distributed deployments:</P>
    <Code title="Binary upgrade">{`# 1. Download new binary
wget https://github.com/hanzoai/storage/releases/latest/download/s3-linux-amd64

# 2. Stop the service
sudo systemctl stop hanzo-storage

# 3. Replace binary
chmod +x s3-linux-amd64
sudo mv s3-linux-amd64 /usr/local/bin/s3

# 4. Start the service
sudo systemctl start hanzo-storage

# 5. Verify
mc admin info hanzo`}</Code>
    <Code title="Docker upgrade">{`# Pull latest image
docker pull ghcr.io/hanzoai/storage:latest

# Restart container
docker stop hanzo-space
docker rm hanzo-space
docker run -d --name hanzo-space \\
  -p 9000:9000 -p 9001:9001 \\
  -e S3_ROOT_USER=admin \\
  -e S3_ROOT_PASSWORD=changeme123 \\
  -v /data:/data \\
  ghcr.io/hanzoai/storage:latest \\
  server /data --console-address ":9001"`}</Code>
    <Code title="Kubernetes upgrade">{`# Update image
kubectl -n storage set image deployment/storage storage=ghcr.io/hanzoai/storage:latest

# Or restart to pull :latest
kubectl -n storage rollout restart deployment/storage

# Monitor rollout
kubectl -n storage rollout status deployment/storage`}</Code>
    <Callout type="warning">
      For distributed deployments, upgrade one node at a time and verify cluster health between each. The cluster can serve requests with reduced capacity during rolling upgrades.
    </Callout>

    <H3 id="ops-batch">Batch Operations</H3>
    <P>The batch framework enables bulk operations on objects using declarative YAML job files:</P>
    <Code title="Batch replicate">{`# batch-replicate.yaml
replicate:
  apiVersion: v1
  source:
    type: minio
    bucket: source-bucket
    prefix: data/
  target:
    type: minio
    bucket: target-bucket
    endpoint: https://remote.example.com
    credentials:
      accessKey: REMOTE_ACCESS_KEY
      secretKey: REMOTE_SECRET_KEY
  flags:
    filter:
      newerThan: "7d"
      olderThan: "0d"
    notify:
      endpoint: https://hooks.example.com/batch
      token: my-webhook-token`}</Code>
    <Code title="Batch key rotation">{`# batch-keyrotate.yaml
keyrotate:
  apiVersion: v1
  bucket: secure-data
  prefix: ""
  encryption:
    type: sse-s3
  flags:
    filter:
      newerThan: "0d"
    notify:
      endpoint: https://hooks.example.com/batch
      token: my-webhook-token`}</Code>
    <Code title="Run batch jobs">{`# Start a batch job
mc batch start hanzo batch-replicate.yaml

# List running jobs
mc batch list hanzo

# Check job status
mc batch status hanzo JOB_ID

# Cancel a job
mc batch cancel hanzo JOB_ID`}</Code>

    <H3 id="ops-recovery">Data Recovery</H3>
    <P>Recovery procedures depend on the failure type:</P>
    <P><strong style={{ color: c.text }}>Single drive failure (erasure coded):</strong></P>
    <Code>{`# 1. Replace the failed drive with a new one (same mount point)
# 2. Healing starts automatically
# 3. Monitor healing progress
mc admin heal hanzo --recursive --verbose`}</Code>

    <P><strong style={{ color: c.text }}>Single node failure (distributed):</strong></P>
    <Code>{`# 1. The cluster continues serving requests (if quorum is maintained)
# 2. Replace/repair the node
# 3. Start the storage server with the same configuration
# 4. Healing reconstructs missing data automatically`}</Code>

    <P><strong style={{ color: c.text }}>Full cluster recovery from replication:</strong></P>
    <Code>{`# If site replication is configured, the surviving site has all data.
# Deploy a new cluster and add it as a replication peer:
mc admin replicate add surviving-site new-site

# Data syncs automatically from the surviving site.`}</Code>

    <Callout type="warning">
      For single-drive, single-node deployments, there is no built-in redundancy. Use regular backups with <code style={inlineCode}>mc mirror</code> to protect against data loss.
    </Callout>
    <Code title="Backup with mc mirror">{`# Full backup to another server
mc mirror hanzo/my-bucket backup/my-bucket

# Incremental backup (only changed objects)
mc mirror --watch hanzo/my-bucket backup/my-bucket`}</Code>

    <H3 id="ops-troubleshooting">Troubleshooting</H3>
    <P>Common issues and solutions:</P>
    <P><strong style={{ color: c.text }}>Server won't start:</strong></P>
    <Code>{`# Check logs
journalctl -u hanzo-storage -f

# Common causes:
# - Port already in use: check with 'lsof -i :9000'
# - Drive permissions: ensure s3 user owns data directories
# - Invalid credentials: S3_ROOT_USER min 3 chars, PASSWORD min 8 chars`}</Code>

    <P><strong style={{ color: c.text }}>Drive offline:</strong></P>
    <Code>{`# Check drive health
mc admin info hanzo --json | jq '.info.backend'

# Check disk usage
mc admin info hanzo

# Force heal if automatic healing is stalled
mc admin heal hanzo --recursive --force-start`}</Code>

    <P><strong style={{ color: c.text }}>Slow performance:</strong></P>
    <Code>{`# Check active connections and requests
mc admin trace hanzo --verbose

# Check network bandwidth
mc admin speedtest hanzo

# Check drive I/O performance
mc admin speedtest hanzo --drive

# Tune scanner speed for less background I/O
mc admin config set hanzo scanner speed=slow`}</Code>

    <P><strong style={{ color: c.text }}>Authentication errors:</strong></P>
    <Code>{`# Verify OIDC config
mc admin config get hanzo identity_openid

# Check access key permissions
mc admin user info hanzo USERNAME

# Verify bucket policy
mc anonymous get hanzo/my-bucket

# Debug S3 request signatures
mc admin trace hanzo --call s3 --verbose`}</Code>

    <P><strong style={{ color: c.text }}>Replication lag:</strong></P>
    <Code>{`# Check replication backlog
mc replicate backlog hanzo/my-bucket

# Check replication status
mc replicate status hanzo/my-bucket

# Force resync
mc replicate resync start hanzo/my-bucket`}</Code>

    <H3 id="ops-healthcheck">Health Check API</H3>
    <P>Built-in health check endpoints for monitoring and load balancer integration:</P>
    <Table
      headers={["Endpoint", "Method", "Description"]}
      rows={[
        ["/minio/health/live", "GET", "Returns 200 if the server process is running. Use as a liveness probe."],
        ["/minio/health/ready", "GET", "Returns 200 if the server is ready to accept requests. Use as a readiness probe."],
        ["/minio/health/cluster", "GET", "Returns 200 if the cluster has write quorum. Use for load balancer health checks."],
        ["/minio/health/cluster?maintenance=true", "GET", "Returns 200 if cluster can tolerate one node going down. Use before maintenance."],
      ]}
    />
    <Code title="Docker healthcheck">{`healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
  interval: 30s
  timeout: 5s
  retries: 3
  start_period: 30s`}</Code>
    <Code title="Kubernetes probes">{`readinessProbe:
  httpGet:
    path: /minio/health/ready
    port: 9000
  initialDelaySeconds: 10
  periodSeconds: 10
livenessProbe:
  httpGet:
    path: /minio/health/live
    port: 9000
  initialDelaySeconds: 30
  periodSeconds: 30
startupProbe:
  httpGet:
    path: /minio/health/live
    port: 9000
  failureThreshold: 30
  periodSeconds: 10`}</Code>
  </div>
);

/* ─── Main Docs Page ─── */
const Docs = () => {
  const [activeHash, setActiveHash] = useState(window.location.hash.replace(/^#/, ""));

  /* Hash-fragment routing: resolve helpTopics hash paths to doc section anchors */
  useEffect(() => {
    const resolveHash = () => {
      const raw = window.location.hash.replace(/^#/, "").replace(/\.html$/, "").replace(/\/$/, "");
      if (!raw) return;

      /* Direct anchor match (e.g., #quickstart, #auth-oidc) */
      if (document.getElementById(raw)) {
        document.getElementById(raw)?.scrollIntoView({ behavior: "smooth" });
        setActiveHash(raw);
        return;
      }

      /* Route map lookup (e.g., #operations/troubleshooting → #ops-troubleshooting) */
      const resolved = hashRoutes[raw];
      if (resolved && document.getElementById(resolved)) {
        window.history.replaceState(null, "", `#${resolved}`);
        document.getElementById(resolved)?.scrollIntoView({ behavior: "smooth" });
        setActiveHash(resolved);
        return;
      }

      /* Partial match: try progressively shorter prefixes */
      const parts = raw.split("/");
      for (let i = parts.length; i > 0; i--) {
        const prefix = parts.slice(0, i).join("/");
        const match = hashRoutes[prefix];
        if (match && document.getElementById(match)) {
          window.history.replaceState(null, "", `#${match}`);
          document.getElementById(match)?.scrollIntoView({ behavior: "smooth" });
          setActiveHash(match);
          return;
        }
      }
    };

    resolveHash();
    window.addEventListener("hashchange", resolveHash);
    return () => window.removeEventListener("hashchange", resolveHash);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: c.bg,
        color: c.text,
        fontFamily: font,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(9, 9, 11, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${c.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="/login" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: c.text }}>
            <HanzoMark size={24} />
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>Hanzo Space</span>
            <span style={{ fontSize: 12, color: c.dim, marginLeft: 4 }}>Docs</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="/login" style={{ color: c.muted, textDecoration: "none", fontSize: 13, fontWeight: 500 }}>Home</a>
            <a
              href="/login"
              style={{
                backgroundColor: c.text,
                color: c.bg,
                border: "none",
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign In
            </a>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            padding: "32px 0 64px 24px",
            borderRight: `1px solid ${c.border}`,
            position: "sticky",
            top: 56,
            height: "calc(100vh - 56px)",
            overflowY: "auto",
          }}
        >
          {sidebar.map((section, sectionIdx) => {
            const sectionIds = section.items.map((i) => i.id);
            const isSectionActive = sectionIds.includes(activeHash);
            return (
              <div key={section.title} style={{ marginBottom: 20, paddingBottom: sectionIdx < sidebar.length - 1 ? 16 : 0, borderBottom: sectionIdx < sidebar.length - 1 ? `1px solid ${c.border}` : "none" }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isSectionActive ? c.text : c.dim,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 8,
                    transition: "color 0.15s",
                  }}
                >
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const isActive = activeHash === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActiveHash(item.id)}
                      style={{
                        display: "block",
                        padding: "5px 12px",
                        fontSize: 13,
                        color: isActive ? c.text : c.muted,
                        textDecoration: "none",
                        borderRadius: 6,
                        lineHeight: 1.5,
                        backgroundColor: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                        borderLeft: isActive ? `2px solid ${c.brand}` : "2px solid transparent",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = c.text;
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = c.muted;
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            );
          })}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "32px 48px 96px", maxWidth: 800, minWidth: 0 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.035em", margin: "0 0 8px" }}>
            Hanzo Space Documentation
          </h1>
          <p style={{ fontSize: 15, color: c.dim, margin: "0 0 8px", lineHeight: 1.6 }}>
            S3-compatible object storage. Deploy anywhere, use any AWS S3 SDK, CLI, or integration.
          </p>
          <p style={{ fontSize: 12, color: c.dim, margin: "0 0 32px", letterSpacing: "0.01em" }}>
            7 sections &middot; 40+ topics
          </p>

          {/* Quick connect */}
          <div
            style={{
              backgroundColor: c.card,
              borderRadius: 12,
              padding: "24px 28px",
              marginBottom: 32,
              borderLeft: `3px solid ${c.brand}`,
              boxShadow: `0 0 24px ${c.brandDim}`,
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", letterSpacing: "-0.01em" }}>Quick Connect</h3>
            <Code>{`# Configure mc CLI
mc alias set hanzo https://s3.hanzo.ai ACCESS_KEY SECRET_KEY

# Or use AWS CLI
aws configure set default.s3.endpoint_url https://s3.hanzo.ai
aws s3 ls

# JavaScript
import { S3Client } from 'hanzo-s3'
const client = new S3Client({
  endPoint: 's3.hanzo.ai',
  useSSL: true,
  accessKey: 'YOUR_ACCESS_KEY',
  secretKey: 'YOUR_SECRET_KEY',
})`}</Code>
          </div>

          <DocsContent />
        </main>
      </div>
    </div>
  );
};

export default Docs;
