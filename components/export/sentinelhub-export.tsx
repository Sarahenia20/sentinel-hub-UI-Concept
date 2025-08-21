// 🚀 SentinelHub Complete Architecture Export
// Copy this entire file content to your Claude Code conversation

export const SENTINELHUB_ARCHITECTURE = {
  // 🏗️ Final Microservices Architecture (6 Services)
  microservices: {
    "api-gateway": {
      tech: "Node.js + Express",
      purpose: "Request routing + Clerk authentication",
      port: 3001,
      endpoints: ["/api/scan", "/api/auth", "/api/reports", "/api/github", "/api/aws"],
      dependencies: ["@clerk/nextjs", "express", "cors", "helmet"],
    },
    "code-scanner": {
      tech: "Node.js",
      purpose: "ESLint + Semgrep + SonarQube integration",
      port: 3002,
      tools: [
        "eslint-plugin-security",
        "eslint-plugin-sonarjs",
        "@typescript-eslint/eslint-plugin",
        "semgrep",
        "sonarqube-scanner",
      ],
      scan_types: ["javascript", "typescript", "python", "java", "go"],
    },
    "secret-scanner": {
      tech: "Python + FastAPI",
      purpose: "API keys, tokens, credentials detection",
      port: 3003,
      tools: ["truffleHog", "gitleaks", "detect-secrets", "regex-patterns"],
      patterns: ["aws-keys", "github-tokens", "api-keys", "passwords", "certificates"],
    },
    "infrastructure-scanner": {
      tech: "Python + FastAPI",
      purpose: "AWS S3 + cloud security scanning",
      port: 3004,
      tools: ["boto3", "checkov", "prowler", "scoutsuite"],
      aws_services: ["s3", "iam", "cloudtrail", "config", "vpc", "ec2"],
    },
    "docker-scanner": {
      tech: "Python + FastAPI",
      purpose: "Container security + docker-bench integration",
      port: 3005,
      tools: ["trivy", "hadolint", "docker-bench-security", "dive"],
      your_repo: "https://github.com/Sarahenia20/docker-bench",
    },
    "ai-service": {
      tech: "Python + FastAPI",
      purpose: "Gemma 270M + CodeRabbit AI explanations",
      port: 3006,
      models: [
        {
          name: "Gemma 270M",
          id: "google/gemma-3-270m",
          url: "https://huggingface.co/google/gemma-3-270m",
          use: "Vulnerability explanations",
        },
        {
          name: "CodeRabbit AI",
          url: "https://coderabbit.ai",
          use: "Code review and analysis",
        },
      ],
    },
  },

  // 🔗 Core Integrations & APIs
  integrations: {
    github: {
      oauth_config: {
        client_id: "process.env.GITHUB_CLIENT_ID",
        client_secret: "process.env.GITHUB_CLIENT_SECRET",
        scopes: ["repo", "read:org", "read:user"],
        redirect_uri: "/api/auth/github/callback",
      },
      api_endpoints: {
        base: "https://api.github.com",
        repos: "/user/repos",
        contents: "/repos/{owner}/{repo}/contents/{path}",
        commits: "/repos/{owner}/{repo}/commits",
        branches: "/repos/{owner}/{repo}/branches",
        tree: "/repos/{owner}/{repo}/git/trees/{sha}?recursive=1",
      },
      rate_limits: {
        authenticated: "5000 requests/hour",
        unauthenticated: "60 requests/hour",
      },
    },
    aws: {
      config: {
        access_key: "process.env.AWS_ACCESS_KEY_ID",
        secret_key: "process.env.AWS_SECRET_ACCESS_KEY",
        region: "process.env.AWS_REGION || 'us-east-1'",
      },
      services: ["s3", "iam", "cloudtrail", "config", "vpc", "ec2"],
      security_checks: [
        "s3-bucket-permissions",
        "s3-encryption-at-rest",
        "s3-public-access-block",
        "iam-password-policy",
        "cloudtrail-enabled",
        "vpc-flow-logs",
      ],
    },
    docker: {
      registry: "hub.docker.com",
      api_base: "https://hub.docker.com/v2",
      endpoints: {
        repositories: "/repositories/{namespace}",
        tags: "/repositories/{namespace}/{repository}/tags",
        vulnerability: "/repositories/{namespace}/{repository}/scan",
      },
    },
  },

  // 🛠️ Security Tools Stack (Open Source)
  security_tools: {
    code_analysis: [
      {
        name: "ESLint Security Plugin",
        repo: "https://github.com/eslint-community/eslint-plugin-security",
        install: "npm install eslint-plugin-security",
        purpose: "JavaScript/TypeScript security linting",
      },
      {
        name: "Semgrep",
        repo: "https://github.com/returntocorp/semgrep",
        install: "pip install semgrep",
        purpose: "Static analysis for 20+ languages",
      },
      {
        name: "SonarQube Community",
        repo: "https://github.com/SonarSource/sonarqube",
        install: "docker run -d sonarqube:community",
        purpose: "Enterprise code quality analysis",
      },
    ],
    secret_detection: [
      {
        name: "TruffleHog",
        repo: "https://github.com/trufflesecurity/trufflehog",
        install: "pip install truffleHog",
        purpose: "Git secret scanner",
      },
      {
        name: "GitLeaks",
        repo: "https://github.com/gitleaks/gitleaks",
        install: "go install github.com/gitleaks/gitleaks/v8@latest",
        purpose: "Git secret detection",
      },
      {
        name: "Detect-Secrets",
        repo: "https://github.com/Yelp/detect-secrets",
        install: "pip install detect-secrets",
        purpose: "Secret baseline management",
      },
    ],
    container_security: [
      {
        name: "Trivy",
        repo: "https://github.com/aquasecurity/trivy",
        install: "curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh",
        purpose: "Container vulnerability scanner",
      },
      {
        name: "Hadolint",
        repo: "https://github.com/hadolint/hadolint",
        install: "docker pull hadolint/hadolint",
        purpose: "Dockerfile linter",
      },
      {
        name: "Docker Bench Security (Your Fork)",
        repo: "https://github.com/Sarahenia20/docker-bench",
        install: "git clone https://github.com/Sarahenia20/docker-bench.git",
        purpose: "CIS Docker Benchmark",
      },
    ],
    cloud_security: [
      {
        name: "Checkov",
        repo: "https://github.com/bridgecrewio/checkov",
        install: "pip install checkov",
        purpose: "Infrastructure as Code security",
      },
      {
        name: "Prowler",
        repo: "https://github.com/prowler-cloud/prowler",
        install: "pip install prowler",
        purpose: "AWS security assessment",
      },
      {
        name: "ScoutSuite",
        repo: "https://github.com/nccgroup/ScoutSuite",
        install: "pip install scoutsuite",
        purpose: "Multi-cloud security auditing",
      },
    ],
  },

  // 🔗 External Security APIs (8 Essential)
  external_apis: {
    threat_intelligence: [
      {
        name: "VirusTotal",
        url: "https://www.virustotal.com/vtapi/v2/",
        free_limit: "4 requests/minute",
        env_var: "VIRUSTOTAL_API_KEY",
        purpose: "File/URL malware scanning",
      },
      {
        name: "AbuseIPDB",
        url: "https://api.abuseipdb.com/api/v2/",
        free_limit: "1000 requests/day",
        env_var: "ABUSEIPDB_API_KEY",
        purpose: "IP reputation checking",
      },
      {
        name: "CVE Details",
        url: "https://cve.circl.lu/api/",
        free_limit: "unlimited",
        env_var: "none",
        purpose: "Vulnerability database",
      },
      {
        name: "Shodan",
        url: "https://api.shodan.io/",
        free_limit: "100 queries/month",
        env_var: "SHODAN_API_KEY",
        purpose: "Internet-connected device scanning",
      },
    ],
    development_apis: [
      {
        name: "GitHub API",
        url: "https://api.github.com/",
        free_limit: "5000 requests/hour (authenticated)",
        env_var: "GITHUB_PERSONAL_ACCESS_TOKEN",
        purpose: "Repository analysis",
      },
      {
        name: "Docker Hub API",
        url: "https://hub.docker.com/v2/",
        free_limit: "unlimited",
        env_var: "none",
        purpose: "Container image information",
      },
      {
        name: "News API",
        url: "https://newsapi.org/",
        free_limit: "1000 requests/day",
        env_var: "NEWS_API_KEY",
        purpose: "Security news aggregation",
      },
      {
        name: "ipstack",
        url: "https://api.ipstack.com/",
        free_limit: "10,000 requests/month",
        env_var: "IPSTACK_API_KEY",
        purpose: "IP geolocation",
      },
    ],
  },

  // 📱 4-Page UI Structure (Current Implementation)
  ui_pages: {
    dashboard: {
      route: "/dashboard",
      purpose: "Security overview + real-time metrics",
      components: [
        "DashboardMetrics - Security scores, vulnerabilities, scan counts",
        "ActivityFeed - Recent scans, alerts, system events",
        "QuickActions - Scan code, connect repo, run audit",
        "RecentRepositories - Latest analyzed repos with scores",
        "AIInsights - AI-powered security recommendations",
      ],
      key_metrics: [
        "Total repositories scanned",
        "Critical/High/Medium vulnerabilities",
        "Security score percentage",
        "Last scan timestamp",
        "Scan success rate",
      ],
    },
    scanner: {
      route: "/scanner",
      purpose: "Main scanning interface - core feature",
      components: [
        "CodeEditor - Monaco Editor for direct code input",
        "RepoSelector - GitHub repository browser/selector",
        "S3Scanner - AWS S3 bucket security analysis",
        "DockerAnalyzer - Container image vulnerability scanning",
        "ScanProgress - Real-time scanning status",
        "ResultsPanel - Vulnerability findings display",
      ],
      scan_types: [
        "Direct code paste/upload",
        "GitHub repository analysis",
        "AWS S3 bucket security audit",
        "Docker container scanning",
        "File upload analysis",
      ],
    },
    reports: {
      route: "/reports",
      purpose: "Scan history + vulnerability tracking",
      components: [
        "ScanHistory - Chronological list of all scans",
        "VulnerabilityTrends - Charts showing security trends",
        "ComplianceReports - OWASP, NIST, ISO 27001 compliance",
        "ExportOptions - PDF, CSV, JSON report exports",
        "FilterControls - Date range, severity, scan type filters",
      ],
      report_types: [
        "Executive summary reports",
        "Technical vulnerability details",
        "Compliance framework mapping",
        "Trend analysis charts",
        "Remediation tracking",
      ],
    },
    settings: {
      route: "/settings",
      purpose: "Integrations + user configuration",
      components: [
        "UserProfile - Account settings, preferences",
        "GitHubIntegration - OAuth setup, repository access",
        "AWSIntegration - Access keys, region configuration",
        "APIKeys - External service API key management",
        "NotificationSettings - Alert preferences, webhooks",
        "TeamManagement - User roles, permissions",
      ],
      integrations: [
        "GitHub OAuth + repository access",
        "AWS credentials + service permissions",
        "External API keys (VirusTotal, Shodan, etc.)",
        "Slack/Discord webhook notifications",
        "Email alert configuration",
      ],
    },
  },

  // ⏰ 10-Day Implementation Timeline
  implementation_timeline: {
    "Days 1-2: Foundation": [
      "Set up 6 microservices with Docker Compose",
      "Implement GitHub OAuth integration",
      "Basic code scanner with ESLint",
      "Redis database setup",
      "API Gateway with Clerk authentication",
    ],
    "Days 3-4: Core Security": [
      "Secret scanner implementation (TruffleHog + GitLeaks)",
      "AWS S3 security scanner with boto3",
      "GitHub repository analysis workflow",
      "Basic vulnerability database integration",
    ],
    "Days 5-6: AI & Advanced Features": [
      "Gemma 270M model integration for explanations",
      "CodeRabbit AI service setup",
      "Docker-bench security integration",
      "Real-time WebSocket updates",
    ],
    "Days 7-8: Professional Features": [
      "SonarQube integration for enterprise scanning",
      "Grafana dashboard setup (your existing repo)",
      "External API integrations (VirusTotal, Shodan)",
      "Comprehensive reporting system",
    ],
    "Days 9-10: Production Ready": [
      "Performance optimization",
      "Security hardening",
      "Production deployment with Docker",
      "Monitoring and alerting setup",
    ],
  },

  // 🔑 Required Environment Variables
  environment_variables: [
    // Authentication
    "CLERK_SECRET_KEY",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",

    // GitHub Integration
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GITHUB_PERSONAL_ACCESS_TOKEN",

    // AWS Integration
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_REGION",

    // AI Services
    "HUGGINGFACE_API_TOKEN",
    "CODERABBIT_API_KEY",
    "OPENAI_API_KEY", // Optional

    // Security APIs
    "VIRUSTOTAL_API_KEY",
    "ABUSEIPDB_API_KEY",
    "SHODAN_API_KEY",
    "NEWS_API_KEY",
    "IPSTACK_API_KEY",

    // Infrastructure
    "REDIS_URL",
    "PROMETHEUS_URL",
    "DATABASE_URL", // If using PostgreSQL later
  ],

  // 🐳 Docker Compose Structure
  docker_services: {
    "sentinelhub-frontend": {
      build: "./",
      ports: ["3000:3000"],
      environment: ["NODE_ENV=production"],
    },
    "api-gateway": {
      build: "./services/api-gateway",
      ports: ["3001:3001"],
    },
    "code-scanner": {
      build: "./services/code-scanner",
      ports: ["3002:3002"],
    },
    "secret-scanner": {
      build: "./services/secret-scanner",
      ports: ["3003:3003"],
    },
    "infrastructure-scanner": {
      build: "./services/infrastructure-scanner",
      ports: ["3004:3004"],
    },
    "docker-scanner": {
      build: "./services/docker-scanner",
      ports: ["3005:3005"],
    },
    "ai-service": {
      build: "./services/ai-service",
      ports: ["3006:3006"],
    },
    redis: {
      image: "redis/redis-stack:latest",
      ports: ["6379:6379", "8001:8001"],
    },
    prometheus: {
      image: "prom/prometheus:latest",
      ports: ["9090:9090"],
    },
  },

  // 🚀 Your Existing Repositories
  existing_repos: {
    main: "https://github.com/Sarahenia20/SentinelHub",
    docker_bench: "https://github.com/Sarahenia20/docker-bench",
    grafana: "https://github.com/Sarahenia20/grafana-For-SH",
  },
}

// 🎯 Claude Code Starter Prompt
export const CLAUDE_CODE_PROMPT = `
I'm building SentinelHub - a professional DevSecOps security platform with 6 microservices:

ARCHITECTURE:
1. api-gateway (Node.js) - Request routing + Clerk authentication
2. code-scanner (Node.js) - ESLint + Semgrep + SonarQube integration  
3. secret-scanner (Python) - TruffleHog + GitLeaks credential detection
4. infrastructure-scanner (Python) - AWS S3 + cloud security scanning
5. docker-scanner (Python) - Container security + docker-bench integration
6. ai-service (Python) - Gemma 270M + CodeRabbit AI explanations

CURRENT STATUS:
✅ Frontend: Next.js + Tailwind + Clerk auth (working)
✅ UI: 4-page structure (Dashboard, Scanner, Reports, Settings)
✅ Database: Redis Stack planned
✅ Monitoring: Prometheus + Grafana setup ready

EXISTING REPOS:
- Main: https://github.com/Sarahenia20/SentinelHub
- Docker-bench: https://github.com/Sarahenia20/docker-bench  
- Grafana: https://github.com/Sarahenia20/grafana-For-SH

TIMELINE: 10 days to production

PRIORITY: Start with GitHub OAuth integration for repository scanning, then implement the code-scanner microservice with ESLint security analysis.

I need help implementing [specific service/feature]. Let's begin!
`

console.log("🚀 SentinelHub Architecture Export Ready!")
console.log("📋 Copy CLAUDE_CODE_PROMPT to start your implementation")
