import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  BugAntIcon,
  KeyIcon,
  ServerIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline"

const metrics = [
  {
    title: "Repositories Scanned",
    value: "47",
    change: "+12 this week",
    icon: ShieldCheckIcon,
    trend: "up",
    details: "Active monitoring on 47 repos",
  },
  {
    title: "Critical Vulnerabilities",
    value: "3",
    change: "CVE-2024-1234, CVE-2024-5678",
    icon: ExclamationTriangleIcon,
    trend: "critical",
    details: "Requires immediate attention",
  },
  {
    title: "Security Score",
    value: "87%",
    change: "+12% from last month",
    icon: ChartBarIcon,
    trend: "up",
    details: "Above industry average (74%)",
  },
  {
    title: "Secrets Detected",
    value: "0",
    change: "All clear",
    icon: KeyIcon,
    trend: "secure",
    details: "No exposed API keys or tokens",
  },
]

const additionalMetrics = [
  {
    title: "Container Images",
    value: "23",
    status: "2 vulnerable",
    icon: ServerIcon,
    color: "chart-2",
  },
  {
    title: "Dependencies",
    value: "1,247",
    status: "15 outdated",
    icon: CpuChipIcon,
    color: "chart-3",
  },
  {
    title: "Code Quality",
    value: "A+",
    status: "SonarQube grade",
    icon: BugAntIcon,
    color: "chart-4",
  },
]

export function DashboardMetrics() {
  return (
    <div className="space-y-6">
      {/* Main Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-card backdrop-blur-xl border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 glass"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-lg ${
                  metric.trend === "critical"
                    ? "bg-destructive/20"
                    : metric.trend === "up"
                      ? "bg-chart-4/20"
                      : metric.trend === "secure"
                        ? "bg-chart-4/20"
                        : "bg-primary/20"
                }`}
              >
                <metric.icon
                  className={`w-6 h-6 ${
                    metric.trend === "critical"
                      ? "text-destructive"
                      : metric.trend === "up"
                        ? "text-chart-4"
                        : metric.trend === "secure"
                          ? "text-chart-4"
                          : "text-primary"
                  }`}
                />
              </div>
              {metric.trend === "critical" && (
                <div className="w-3 h-3 bg-destructive rounded-full animate-pulse glow-red"></div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
              <p className="text-3xl font-bold text-foreground mt-1">{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{metric.change}</p>
              <p className="text-xs text-muted-foreground/70 mt-2">{metric.details}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {additionalMetrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-card/50 border border-border rounded-lg p-4 flex items-center space-x-4"
          >
            <div className={`p-2 rounded-lg bg-${metric.color}/20`}>
              <metric.icon className={`w-5 h-5 text-${metric.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{metric.title}</p>
              <p className="text-lg font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
