import React, { useState } from "react";

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

/* ─── Code block ─── */
const Code = ({ children, title }: { children: string; title?: string }) => (
  <div style={{ margin: "16px 0" }}>
    {title && (
      <div style={{ fontSize: 11, fontWeight: 600, color: c.dim, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {title}
      </div>
    )}
    <pre
      style={{
        margin: 0,
        padding: "16px 20px",
        backgroundColor: c.codeBg,
        borderRadius: 8,
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

/* ─── Heading ─── */
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", margin: "48px 0 16px", paddingTop: 16, borderTop: `1px solid ${c.border}`, color: c.text }}>{children}</h2>
);

const H3 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", margin: "32px 0 12px", color: c.text }}>{children}</h3>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 14, lineHeight: 1.75, color: c.muted, margin: "12px 0" }}>{children}</p>
);

/* ─── Sidebar nav ─── */
const sidebar = [
  {
    title: "Getting Started",
    items: [
      { id: "quickstart", label: "Quick Start" },
      { id: "deploy-docker", label: "Deploy with Docker" },
      { id: "deploy-binary", label: "Deploy Binary" },
      { id: "deploy-kubernetes", label: "Deploy on Kubernetes" },
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
      { id: "sdk-cli", label: "mc CLI" },
      { id: "sdk-aws", label: "AWS CLI" },
    ],
  },
  {
    title: "Security",
    items: [
      { id: "auth-oidc", label: "OIDC / SSO" },
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
      { id: "admin-replication", label: "Replication" },
      { id: "admin-notifications", label: "Event Notifications" },
      { id: "admin-versioning", label: "Versioning" },
    ],
  },
];

/* ─── Documentation Content ─── */
const DocsContent = () => (
  <div>
    {/* ═══ GETTING STARTED ═══ */}
    <H2 id="quickstart">Quick Start</H2>
    <P>
      Hanzo Space is a high-performance, S3-compatible object storage system. It runs as a single binary, supports distributed deployments, and is fully compatible with the Amazon S3 API. All existing S3 tools, SDKs, and integrations work out of the box.
    </P>
    <P>
      The fastest way to get started is with Docker:
    </P>
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
      For production, use a strong password (at least 12 characters) and configure TLS. See the <a href="#auth-encryption" style={{ color: c.brand }}>Encryption</a> section.
    </Callout>

    <H3 id="deploy-docker">Deploy with Docker</H3>
    <P>Hanzo Space ships as a single container image at <code style={{ fontFamily: mono, fontSize: 12, color: c.text, backgroundColor: c.codeBg, padding: "2px 6px", borderRadius: 4 }}>ghcr.io/hanzoai/storage:latest</code>.</P>

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
      Erasure coding provides data redundancy. With 4 drives, you can lose up to 2 drives and still recover all data. The default parity setting is EC:2.
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
      test: ["CMD", "curl", "-f", "http://localhost:9000/s3/health/live"]
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

    <Code title="macOS">{`brew install hanzoai/tap/storage

# Start server
S3_ROOT_USER=admin S3_ROOT_PASSWORD=changeme123 \\
  s3 server ~/hanzo-data --console-address ":9001"`}</Code>

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

    <H3 id="first-steps">First Steps</H3>
    <P>After deploying, here is what to do next:</P>
    <P><strong style={{ color: c.text }}>1. Log in to the console</strong> — Open the console URL (port 9001) in your browser. Sign in with your root credentials or via Hanzo ID SSO.</P>
    <P><strong style={{ color: c.text }}>2. Create a bucket</strong> — Click "Create Bucket", enter a name, and choose options (versioning, locking, quota).</P>
    <P><strong style={{ color: c.text }}>3. Upload objects</strong> — Drag and drop files into the bucket, or use the S3 API / CLI.</P>
    <P><strong style={{ color: c.text }}>4. Create access keys</strong> — Go to Access Keys → Create Access Key. These are your S3 credentials for API access.</P>
    <P><strong style={{ color: c.text }}>5. Connect with a client</strong> — Use any S3 SDK or the mc CLI (see SDKs section below).</P>

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
    <P>
      <strong style={{ color: c.text }}>Create buckets</strong> — Click "Create Bucket". Options include:
    </P>
    <Table
      headers={["Option", "Description"]}
      rows={[
        ["Versioning", "Keep all versions of every object. Required for replication."],
        ["Object Locking", "Enable WORM (Write Once Read Many) compliance. Cannot be disabled after creation."],
        ["Quota", "Set a maximum size for the bucket."],
        ["Retention", "Set default retention period for new objects (governance or compliance mode)."],
      ]}
    />
    <P><strong style={{ color: c.text }}>Delete buckets</strong> — A bucket must be empty before deletion. Use lifecycle rules or mc rm --recursive to empty it first.</P>

    <H3 id="console-objects">Browsing Objects</H3>
    <P>Click a bucket to browse its contents. The object browser supports:</P>
    <P>
      • <strong style={{ color: c.text }}>Upload</strong> — Drag and drop files or click "Upload" to select files. Supports multi-file and folder upload.<br />
      • <strong style={{ color: c.text }}>Download</strong> — Click any object to view details, then click "Download".<br />
      • <strong style={{ color: c.text }}>Preview</strong> — Images, PDFs, videos, and text files can be previewed inline.<br />
      • <strong style={{ color: c.text }}>Share</strong> — Generate a presigned URL for temporary public access (configurable expiry, 1 hour to 7 days).<br />
      • <strong style={{ color: c.text }}>Create folders</strong> — Click "Create Path" to create a folder (prefix) within the bucket.<br />
      • <strong style={{ color: c.text }}>Metadata</strong> — View and edit object metadata and tags.
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
      The console dashboard shows real-time server metrics: total storage, number of objects, bucket count, uptime, network I/O, and drive health. For production monitoring, export Prometheus metrics from the <code style={{ fontFamily: mono, fontSize: 12, color: c.text, backgroundColor: c.codeBg, padding: "2px 6px", borderRadius: 4 }}>/s3/v2/metrics/cluster</code> endpoint.
    </P>

    {/* ═══ S3 API ═══ */}
    <H2 id="s3-compatibility">S3 API Compatibility</H2>
    <P>
      Hanzo Space implements the Amazon S3 API. All S3 SDKs, CLIs, and tools work without modification. The S3 API endpoint is on port 9000 (default) or at <strong style={{ color: c.text }}>https://s3.hanzo.space</strong> for the hosted service.
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
        ["List Objects v2", "GET /bucket?list-type=2", "List objects with pagination"],
      ]}
    />

    <H3 id="s3-objects">Object Operations</H3>
    <Table
      headers={["Operation", "S3 API", "Description"]}
      rows={[
        ["Put Object", "PUT /bucket/key", "Upload an object"],
        ["Get Object", "GET /bucket/key", "Download an object"],
        ["Head Object", "HEAD /bucket/key", "Get object metadata"],
        ["Delete Object", "DELETE /bucket/key", "Delete an object"],
        ["Copy Object", "PUT /bucket/key (x-amz-copy-source)", "Copy an object"],
        ["List Object Versions", "GET /bucket?versions", "List all versions of objects"],
        ["Put Object Tags", "PUT /bucket/key?tagging", "Set object tags"],
        ["Get Object Tags", "GET /bucket/key?tagging", "Get object tags"],
        ["Select Object Content", "POST /bucket/key?select", "Query CSV/JSON with SQL"],
      ]}
    />

    <H3 id="s3-presigned">Presigned URLs</H3>
    <P>Generate temporary URLs that allow unauthenticated access to private objects. Supported by all SDKs:</P>
    <Code title="JavaScript">{`import { S3Client } from 'hanzo-s3'

const client = new S3Client({
  endPoint: 's3.hanzo.space',
  useSSL: true,
  accessKey: 'YOUR_ACCESS_KEY',
  secretKey: 'YOUR_SECRET_KEY',
})

// Generate a URL valid for 1 hour (3600 seconds)
const url = await client.presignedGetObject('my-bucket', 'photo.jpg', 3600)
console.log(url)`}</Code>

    <Code title="Python">{`from hanzo.s3 import S3Client
from datetime import timedelta

client = S3Client(
    "s3.hanzo.space",
    access_key="YOUR_ACCESS_KEY",
    secret_key="YOUR_SECRET_KEY",
    secure=True,
)

url = client.presigned_get_object("my-bucket", "photo.jpg", expires=timedelta(hours=1))
print(url)`}</Code>

    <H3 id="s3-multipart">Multipart Upload</H3>
    <P>
      For objects larger than 5 MB, use multipart upload. The SDKs handle this automatically — any <code style={{ fontFamily: mono, fontSize: 12, color: c.text, backgroundColor: c.codeBg, padding: "2px 6px", borderRadius: 4 }}>putObject</code> call with a large file will automatically split into 5 MB parts, upload in parallel, and reassemble on the server.
    </P>
    <P>Maximum object size is 5 TB. Maximum number of parts per upload is 10,000.</P>

    {/* ═══ SDKs ═══ */}
    <H2 id="sdk-javascript">JavaScript SDK</H2>
    <Code title="Install">{`npm install hanzo-s3`}</Code>
    <Code title="Usage">{`import { S3Client } from 'hanzo-s3'

const client = new S3Client({
  endPoint: 's3.hanzo.space',
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

// List objects
const stream = client.listObjects('my-bucket', '', true)
stream.on('data', (obj) => console.log(obj))
stream.on('end', () => console.log('done'))

// Delete an object
await client.removeObject('my-bucket', 'hello.txt')`}</Code>

    <H2 id="sdk-python">Python SDK</H2>
    <Code title="Install">{`pip install hanzo-s3`}</Code>
    <Code title="Usage">{`from hanzo.s3 import S3Client

client = S3Client(
    "s3.hanzo.space",
    access_key="YOUR_ACCESS_KEY",
    secret_key="YOUR_SECRET_KEY",
    secure=True,
)

# List buckets
buckets = client.list_buckets()
for bucket in buckets:
    print(bucket.name)

# Create a bucket
client.make_bucket("my-bucket")

# Upload a file
client.fput_object("my-bucket", "hello.txt", "/path/to/hello.txt")

# Download a file
client.fget_object("my-bucket", "hello.txt", "/tmp/hello.txt")

# List objects
objects = client.list_objects("my-bucket", recursive=True)
for obj in objects:
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

    "github.com/hanzoai/s3-go/v7"
    "github.com/hanzoai/s3-go/v7/pkg/credentials"
)

func main() {
    client, err := s3.New("s3.hanzo.space", &s3.Options{
        Creds:  credentials.NewStaticV4("YOUR_ACCESS_KEY", "YOUR_SECRET_KEY", ""),
        Secure: true,
    })
    if err != nil {
        log.Fatal(err)
    }

    // List buckets
    buckets, _ := client.ListBuckets(context.Background())
    for _, bucket := range buckets {
        fmt.Println(bucket.Name)
    }

    // Upload a file
    _, err = client.FPutObject(context.Background(),
        "my-bucket", "hello.txt", "/path/to/hello.txt",
        s3.PutObjectOptions{ContentType: "text/plain"})
    if err != nil {
        log.Fatal(err)
    }
}`}</Code>

    <H2 id="sdk-cli">mc CLI</H2>
    <P>
      <code style={{ fontFamily: mono, fontSize: 12, color: c.text, backgroundColor: c.codeBg, padding: "2px 6px", borderRadius: 4 }}>mc</code> is the official command-line client for S3-compatible storage. It provides Unix-like commands (ls, cp, rm, cat, diff, mirror) for object storage.
    </P>
    <Code title="Install">{`# macOS
brew install hanzoai/tap/mc

# Linux
curl -fsSL https://github.com/hanzoai/storage/releases/latest/download/mc-linux-amd64 -o mc
chmod +x mc && sudo mv mc /usr/local/bin/`}</Code>
    <Code title="Configure">{`# Add your Hanzo Space server
mc alias set hanzo https://s3.hanzo.space YOUR_ACCESS_KEY YOUR_SECRET_KEY`}</Code>
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

# Get bucket info
mc stat hanzo/my-bucket

# Set bucket policy to public read
mc anonymous set download hanzo/my-bucket`}</Code>

    <H2 id="sdk-aws">AWS CLI</H2>
    <P>Hanzo Space is fully compatible with the AWS CLI. Configure it to point to your Hanzo Space endpoint:</P>
    <Code title="Configure">{`aws configure
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region name: us-east-1
# Default output format: json

# Set endpoint
aws configure set default.s3.endpoint_url https://s3.hanzo.space
aws configure set default.s3api.endpoint_url https://s3.hanzo.space`}</Code>
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
aws s3 ls s3://my-bucket/ --recursive`}</Code>

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
        ["S3_IDENTITY_OPENID_REDIRECT_URI", "Callback URL for the console (e.g. https://storage.example.com/oauth_callback)"],
        ["S3_IDENTITY_OPENID_DISPLAY_NAME", "Display name shown on the login page (e.g. Hanzo)"],
      ]}
    />
    <Code title="Example: Hanzo ID OIDC">{`S3_IDENTITY_OPENID_CONFIG_URL=https://hanzo.id/.well-known/openid-configuration
S3_IDENTITY_OPENID_CLIENT_ID=hanzo-storage-client-id
S3_IDENTITY_OPENID_CLIENT_SECRET=hanzo-storage-client-secret
S3_IDENTITY_OPENID_SCOPES=openid,profile,email
S3_IDENTITY_OPENID_REDIRECT_URI=https://hanzo.space/oauth_callback
S3_IDENTITY_OPENID_DISPLAY_NAME=Hanzo`}</Code>

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

    <H3 id="auth-encryption">Encryption</H3>
    <P>Hanzo Space supports server-side encryption (SSE) with three modes:</P>
    <Table
      headers={["Mode", "Description"]}
      rows={[
        ["SSE-S3", "Server manages encryption keys. Enable per-bucket via the console or API."],
        ["SSE-KMS", "Use an external KMS (e.g., Vault, AWS KMS) for key management."],
        ["SSE-C", "Client provides the encryption key with each request."],
      ]}
    />
    <P>For TLS (encryption in transit), place a TLS certificate at <code style={{ fontFamily: mono, fontSize: 12, color: c.text, backgroundColor: c.codeBg, padding: "2px 6px", borderRadius: 4 }}>~/.s3/certs/public.crt</code> and <code style={{ fontFamily: mono, fontSize: 12, color: c.text, backgroundColor: c.codeBg, padding: "2px 6px", borderRadius: 4 }}>~/.s3/certs/private.key</code>. The server will automatically use HTTPS.</P>

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
    <Code title="Set via mc CLI">{`mc anonymous set download hanzo/public-assets`}</Code>

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
        ["S3_PROMETHEUS_AUTH_TYPE", "jwt", "Prometheus metrics auth (jwt or public)"],
      ]}
    />
    <Callout type="warning">
      Use a config file for complex deployments. Create <code style={{ fontFamily: mono, fontSize: 12 }}>/etc/default/s3</code> with one <code style={{ fontFamily: mono, fontSize: 12 }}>KEY=VALUE</code> per line.
    </Callout>

    <H3 id="admin-lifecycle">Lifecycle Rules</H3>
    <P>Lifecycle rules automate object transitions and expiration:</P>
    <Code title="Expire objects after 90 days">{`mc ilm rule add hanzo/logs --expiry-days 90`}</Code>
    <Code title="Expire noncurrent versions after 30 days">{`mc ilm rule add hanzo/data --noncurrent-expire-days 30`}</Code>
    <P>Lifecycle rules can also transition objects to a remote tier (e.g., AWS S3, GCS, Azure Blob) for cost optimization.</P>

    <H3 id="admin-replication">Replication</H3>
    <P>Hanzo Space supports bucket-level and site-level replication for disaster recovery and geographic distribution:</P>
    <P>
      <strong style={{ color: c.text }}>Bucket Replication</strong> — Replicate objects between buckets on different servers. Requires versioning on both buckets.
    </P>
    <Code>{`# Add replication target
mc replicate add hanzo/my-bucket \\
  --remote-bucket my-bucket \\
  --remote-target https://ACCESS_KEY:SECRET_KEY@remote.example.com`}</Code>
    <P>
      <strong style={{ color: c.text }}>Site Replication</strong> — Synchronize everything (buckets, objects, policies, IAM) across multiple sites.
    </P>
    <Code>{`mc admin replicate add site1 site2`}</Code>

    <H3 id="admin-notifications">Event Notifications</H3>
    <P>Hanzo Space can publish bucket events (object created, deleted, accessed) to external services:</P>
    <Table
      headers={["Target", "Use Case"]}
      rows={[
        ["Webhook", "HTTP POST to any URL"],
        ["Kafka", "Stream events to Kafka topics"],
        ["AMQP (RabbitMQ)", "Publish to message queues"],
        ["Redis", "Push to Redis pub/sub channels"],
        ["PostgreSQL", "Insert events into a database table"],
        ["Elasticsearch", "Index events for search"],
        ["NATS", "Cloud-native messaging"],
      ]}
    />
    <Code title="Configure webhook notifications">{`mc admin config set hanzo notify_webhook:primary \\
  endpoint="https://api.example.com/hooks/storage" \\
  queue_limit="10000"

mc event add hanzo/my-bucket arn:s3:sqs::primary:webhook \\
  --event put,delete`}</Code>

    <H3 id="admin-versioning">Versioning</H3>
    <P>
      Bucket versioning keeps all versions of an object, allowing you to recover from accidental deletes or overwrites.
    </P>
    <Code>{`# Enable versioning on a bucket
mc version enable hanzo/my-bucket

# List object versions
mc ls --versions hanzo/my-bucket/file.txt

# Restore a previous version (copy it as the current version)
mc cp --version-id VERSION_ID hanzo/my-bucket/file.txt hanzo/my-bucket/file.txt`}</Code>
    <Callout type="info">
      Versioning is required for bucket replication and object locking. Once enabled, it can be suspended but not fully disabled.
    </Callout>
  </div>
);

/* ─── Main Docs Page ─── */
const Docs = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
          {sidebar.map((section) => (
            <div key={section.title} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                {section.title}
              </div>
              {section.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    display: "block",
                    padding: "5px 12px",
                    fontSize: 13,
                    color: c.muted,
                    textDecoration: "none",
                    borderRadius: 6,
                    lineHeight: 1.5,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = c.text; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = c.muted; e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "32px 48px 96px", maxWidth: 800, minWidth: 0 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.035em", margin: "0 0 8px" }}>
            Hanzo Space Documentation
          </h1>
          <p style={{ fontSize: 15, color: c.dim, margin: "0 0 32px", lineHeight: 1.6 }}>
            S3-compatible object storage. Use any AWS S3 SDK, CLI, or integration.
          </p>

          {/* Quick connect */}
          <div style={{ backgroundColor: c.card, borderRadius: 12, padding: "24px 28px", marginBottom: 32 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 12px", letterSpacing: "-0.01em" }}>Quick Connect</h3>
            <Code>{`# Configure mc CLI
mc alias set hanzo https://s3.hanzo.space ACCESS_KEY SECRET_KEY

# Or use AWS CLI
aws configure set default.s3.endpoint_url https://s3.hanzo.space
aws s3 ls

# JavaScript
import { S3Client } from 'hanzo-s3'
const client = new S3Client({
  endPoint: 's3.hanzo.space',
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
