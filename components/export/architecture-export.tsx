export const SENTINELHUB_EXPORT = {
  // 🏗️ Final Architecture (6 Microservices)
  microservices: {
    "api-gateway": {
      tech: "Node.js",
      purpose: "Request routing + Clerk authentication",
      port: 3001,
      endpoints: ["/api/scan", "/api/auth", "/api/reports"],
    },
    "code-scanner": {
      tech: "Node.js",
      purpose: "ESLint + Semgrep + SonarQube integration",
      port: 3002,
      tools: ["eslint-plugin-security", "semgrep", "sonarqube-scanner"],
    },
    "secret-scanner": {
      tech: "Python",
      purpose: "API keys, tokens, credentials detection",
      port: 3003,
      tools: ["truffleHog", "gitleaks", "detect-secrets"],
    },
    "infrastructure-scanner": {
      tech: "Python",
      purpose: "AWS S3 + cloud security scanning",
      port: 3004,
      tools: ["checkov", "prowler", "scoutsuite"],
    },
    "docker-scanner": {
      tech: "Python",
      purpose: "Container security + docker-bench integration",
      port: 3005,
      tools: ["trivy", "hadolint", "docker-bench-security"],
    },
    "ai-service": {
      tech: "Python",
      purpose: "Gemma 270M + CodeRabbit AI explanations",
      port: 3006,
      models: ["google/gemma-3-270m", "coderabbit-ai"],
    },
  },

  // 🔗 Core Integrations
  integrations: {
    github: {
      oauth_scopes: ["repo", "read:org", "read:user"],
      api_base: "https://api.github.com",
      endpoints: {
        repos: "/user/repos",
        contents: "/repos/{owner}/{repo}/contents/{path}",
        commits: "/repos/{owner}/{repo}/commits",
      },
    },
    aws: {
      services: ["s3", "iam", "cloudtrail", "config"],
      regions: ["us-east-1", "us-west-2", "eu-west-1"],
      security_checks: ["bucket-permissions", "encryption", "logging"],
    },
    docker: {
      registry: "hub.docker.com",
      api_base: "https://hub.docker.com/v2",
      scan_types: ["vulnerabilities", "malware", "secrets"],
    },
  },

  // 🛠️ Security Tools Stack
  tools: {
    code_analysis: [
      { name: "ESLint Security", repo: "https://github.com/eslint-community/eslint-plugin-security" },
      { name: "Semgrep", repo: "https://github.com/returntocorp/semgrep" },
      { name: "SonarQube CE", repo: "https://github.com/SonarSource/sonarqube" },
    ],
    secret_detection: [
      { name: "TruffleHog", repo: "https://github.com/trufflesecurity/trufflehog" },
      { name: "GitLeaks", repo: "https://github.com/gitleaks/gitleaks" },
      { name: "Detect-Secrets", repo: "https://github.com/Yelp/detect-secrets" },
    ],
    container_security: [
      { name: "Trivy", repo: "https://github.com/aquasecurity/trivy" },
      { name: "Hadolint", repo: "https://github.com/hadolint/hadolint" },
      { name: "Docker Bench", repo: "https://github.com/Sarahenia20/docker-bench" },
    ],
    cloud_security: [
      { name: "Checkov", repo: "https://github.com/bridgecrewio/checkov" },
      { name: "Prowler", repo: "https://github.com/prowler-cloud/prowler" },
      { name: "ScoutSuite", repo: "https://github.com/nccgroup/ScoutSuite" },
    ],
  },

  // 🤖 AI Stack
  ai_models: {
    primary: {
      name: "Gemma 270M",
      model_id: "google/gemma-3-270m",
      url: "https://huggingface.co/google/gemma-3-270m",
      use_case: "Vulnerability explanations",
    },
    secondary: {
      name: "CodeRabbit AI",
      url: "https://coderabbit.ai",
      use_case: "Code review and analysis",
    },
  },

  // 🔗 Security APIs (8 Essential)
  security_apis: {
    threat_intel: [
      { name: "VirusTotal", url: "https://www.virustotal.com/vtapi/v2/", free_limit: "4 req/min" },
      { name: "AbuseIPDB", url: "https://api.abuseipdb.com/api/v2/", free_limit: "1000 req/day" },
      { name: "CVE Details", url: "https://cve.circl.lu/api/", free_limit: "unlimited" },
      { name: "Shodan", url: "https://api.shodan.io/", free_limit: "100 queries/month" },
    ],
    development: [
      { name: "GitHub API", url: "https://api.github.com/", free_limit: "5000 req/hour" },
      { name: "Docker Hub", url: "https://hub.docker.com/v2/", free_limit: "unlimited" },
      { name: "News API", url: "https://newsapi.org/", free_limit: "1000 req/day" },
      { name: "ipstack", url: "https://api.ipstack.com/", free_limit: "10k req/month" },
    ],
  },

  // 📱 4-Page UI Structure
  pages: {
    dashboard: {
      purpose: "Security overview + metrics",
      components: ["SecurityMetrics", "RecentActivity", "QuickActions", "AIProfile"],
      content: "Repositories scanned, vulnerabilities found, security scores, recent scans",
    },
    scanner: {
      purpose: "Main scanning interface",
      components: ["CodeEditor", "RepoSelector", "S3Scanner", "DockerAnalyzer"],
      content: "Monaco Editor, GitHub repos, AWS S3 buckets, container analysis",
    },
    reports: {
      purpose: "Scan history + results",
      components: ["ScanHistory", "VulnerabilityTrends", "ComplianceReports"],
      content: "Past scans, vulnerability breakdowns, security trends, export options",
    },
    settings: {
      purpose: "Connections + configuration",
      components: ["UserProfile", "Integrations", "APIKeys", "Notifications"],
      content: "GitHub/AWS connections, API keys, team settings, alert preferences",
    },
  },

  // ⏰ 10-Day Implementation Priority
  timeline: {
    "Days 1-2": ["GitHub OAuth", "Basic code scanner", "ESLint integration"],
    "Days 3-4": ["Secret scanner", "AWS S3 scanner", "Repository analysis"],
    "Days 5-6": ["Docker-bench integration", "AI service setup", "Gemma integration"],
    "Days 7-8": ["SonarQube connector", "Real-time updates", "Professional UI"],
    "Days 9-10": ["Performance optimization", "Security hardening", "Production deploy"],
  },

  // 🔑 Environment Variables
  env_vars: [
    "CLERK_SECRET_KEY",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GITHUB_PERSONAL_ACCESS_TOKEN",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_REGION",
    "HUGGINGFACE_API_TOKEN",
    "CODERABBIT_API_KEY",
    "VIRUSTOTAL_API_KEY",
    "ABUSEIPDB_API_KEY",
    "SHODAN_API_KEY",
    "REDIS_URL",
    "PROMETHEUS_URL",
  ],
}

// 🚀 Claude Code Starter Prompt
export const CLAUDE_CODE_PROMPT = `
I'm building SentinelHub - a professional security platform with 6 microservices:

1. api-gateway (Node.js) - routing + Clerk auth
2. code-scanner (Node.js) - ESLint + Semgrep + SonarQube  
3. secret-scanner (Python) - credential detection
4. infrastructure-scanner (Python) - AWS S3 security
5. docker-scanner (Python) - container security + docker-bench
6. ai-service (Python) - Gemma 270M + AI explanations

Frontend: Next.js + Tailwind + Clerk auth (already working)
Database: Redis Stack
Monitoring: Prometheus + Grafana
Timeline: 10 days to production

Current repos:
- SentinelHub: https://github.com/Sarahenia20/SentinelHub
- docker-bench: https://github.com/Sarahenia20/docker-bench  
- grafana-For-SH: https://github.com/Sarahenia20/grafana-For-SH

I need help implementing [specific service]. Start with GitHub OAuth integration for repository scanning.
`
