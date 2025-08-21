import {
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  BugAntIcon,
  KeyIcon,
  ServerIcon,
} from "@heroicons/react/24/outline"

const activities = [
  {
    action: "Critical vulnerability detected",
    result: "CVE-2024-1234 in react-dashboard",
    time: "23 minutes ago",
    status: "critical",
    icon: ShieldExclamationIcon,
    severity: "CRITICAL",
    cve: "CVE-2024-1234",
  },
  {
    action: "Secret scan completed",
    result: "No exposed credentials found",
    time: "1 hour ago",
    status: "success",
    icon: KeyIcon,
    severity: "INFO",
  },
  {
    action: "Container vulnerability fixed",
    result: "Updated nginx:1.21 → nginx:1.25",
    time: "2 hours ago",
    status: "success",
    icon: ServerIcon,
    severity: "RESOLVED",
  },
  {
    action: "SQL injection vulnerability",
    result: "Fixed in user-auth module",
    time: "4 hours ago",
    status: "success",
    icon: BugAntIcon,
    severity: "HIGH",
  },
  {
    action: "AWS S3 bucket misconfiguration",
    result: "Public read access removed",
    time: "6 hours ago",
    status: "warning",
    icon: ExclamationTriangleIcon,
    severity: "MEDIUM",
  },
  {
    action: "Dependency scan completed",
    result: "15 outdated packages found",
    time: "8 hours ago",
    status: "warning",
    icon: InformationCircleIcon,
    severity: "LOW",
  },
]

export function ActivityFeed() {
  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-xl p-6 glass">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Security Activity Feed</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/20 transition-colors">
            <div
              className={`p-2 rounded-lg ${
                activity.status === "success"
                  ? "bg-chart-4/20"
                  : activity.status === "warning"
                    ? "bg-secondary/20"
                    : activity.status === "critical"
                      ? "bg-destructive/20"
                      : "bg-primary/20"
              }`}
            >
              <activity.icon
                className={`w-4 h-4 ${
                  activity.status === "success"
                    ? "text-chart-4"
                    : activity.status === "warning"
                      ? "text-secondary"
                      : activity.status === "critical"
                        ? "text-destructive"
                        : "text-primary"
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.severity === "CRITICAL"
                      ? "status-critical"
                      : activity.severity === "HIGH"
                        ? "status-high"
                        : activity.severity === "MEDIUM"
                          ? "status-medium"
                          : activity.severity === "LOW"
                            ? "status-low"
                            : activity.severity === "RESOLVED"
                              ? "status-low"
                              : "status-info"
                  }`}
                >
                  {activity.severity}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.result}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">{activity.time}</p>
                {activity.cve && (
                  <a
                    href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${activity.cve}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:text-primary/80 font-mono"
                  >
                    {activity.cve}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium">View All Activity →</button>
      </div>
    </div>
  )
}
