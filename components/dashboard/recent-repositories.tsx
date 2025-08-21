import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline"

const repositories = [
  {
    name: "sentinelhub-frontend",
    score: 94,
    status: "secure",
    lastScan: "2h ago",
    vulnerabilities: { critical: 0, high: 0, medium: 1, low: 2 },
    language: "TypeScript",
    size: "2.3MB",
  },
  {
    name: "api-gateway-service",
    score: 87,
    status: "secure",
    lastScan: "1d ago",
    vulnerabilities: { critical: 0, high: 1, medium: 2, low: 3 },
    language: "Node.js",
    size: "1.8MB",
  },
  {
    name: "user-authentication",
    score: 72,
    status: "warning",
    lastScan: "2d ago",
    vulnerabilities: { critical: 1, high: 2, medium: 4, low: 1 },
    language: "Python",
    size: "3.1MB",
  },
  {
    name: "payment-processor",
    score: 98,
    status: "secure",
    lastScan: "3d ago",
    vulnerabilities: { critical: 0, high: 0, medium: 0, low: 1 },
    language: "Go",
    size: "4.2MB",
  },
  {
    name: "docker-infrastructure",
    score: 65,
    status: "critical",
    lastScan: "5d ago",
    vulnerabilities: { critical: 2, high: 3, medium: 5, low: 2 },
    language: "Docker",
    size: "856KB",
  },
]

export function RecentRepositories() {
  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-xl p-6 glass">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Repository Security Status</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">View All →</button>
      </div>

      <div className="space-y-4">
        {repositories.map((repo) => (
          <div
            key={repo.name}
            className="group p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-all duration-200 border border-transparent hover:border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    repo.status === "secure"
                      ? "bg-chart-4/20"
                      : repo.status === "warning"
                        ? "bg-secondary/20"
                        : "bg-destructive/20"
                  }`}
                >
                  {repo.status === "secure" ? (
                    <ShieldCheckIcon className="w-4 h-4 text-chart-4" />
                  ) : repo.status === "warning" ? (
                    <ExclamationTriangleIcon className="w-4 h-4 text-secondary" />
                  ) : (
                    <ExclamationTriangleIcon className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground">{repo.name}</p>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{repo.language}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <ClockIcon className="w-3 h-3" />
                      <span>{repo.lastScan}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{repo.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      repo.status === "secure"
                        ? "bg-chart-4/20 text-chart-4"
                        : repo.status === "warning"
                          ? "bg-secondary/20 text-secondary"
                          : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {repo.score}%
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground transition-all">
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vulnerability breakdown */}
            <div className="flex items-center space-x-4 text-xs">
              {repo.vulnerabilities.critical > 0 && (
                <span className="text-destructive font-medium">{repo.vulnerabilities.critical} Critical</span>
              )}
              {repo.vulnerabilities.high > 0 && (
                <span className="text-chart-2 font-medium">{repo.vulnerabilities.high} High</span>
              )}
              {repo.vulnerabilities.medium > 0 && (
                <span className="text-secondary font-medium">{repo.vulnerabilities.medium} Medium</span>
              )}
              {repo.vulnerabilities.low > 0 && (
                <span className="text-muted-foreground">{repo.vulnerabilities.low} Low</span>
              )}
              {Object.values(repo.vulnerabilities).every((v) => v === 0) && (
                <span className="text-chart-4 font-medium">No vulnerabilities</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
