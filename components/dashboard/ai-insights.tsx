import {
  SparklesIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"

const insights = [
  {
    type: "recommendation",
    title: "Update Dependencies",
    description: "15 packages have security updates available. Priority: react@18.2.0 → 18.3.1",
    severity: "medium",
    action: "Update Now",
    icon: LightBulbIcon,
  },
  {
    type: "trend",
    title: "Security Score Improving",
    description: "Your overall security score increased by 12% this month. Great progress!",
    severity: "positive",
    action: "View Trends",
    icon: ArrowTrendingUpIcon,
  },
  {
    type: "alert",
    title: "New CVE Detected",
    description: "CVE-2024-1234 affects your nginx containers. Patch available.",
    severity: "high",
    action: "Review CVE",
    icon: ExclamationTriangleIcon,
  },
  {
    type: "compliance",
    title: "OWASP Compliance",
    description: "You're meeting 94% of OWASP Top 10 security requirements.",
    severity: "positive",
    action: "View Report",
    icon: ShieldCheckIcon,
  },
]

export function AIInsights() {
  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-xl p-6 glass">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary to-chart-1 rounded-lg glow-cyan">
          <SparklesIcon className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Security Insights</h3>
          <p className="text-sm text-muted-foreground">Powered by Gemma 270M & CodeRabbit</p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-200 group"
          >
            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  insight.severity === "high"
                    ? "bg-destructive/20"
                    : insight.severity === "medium"
                      ? "bg-secondary/20"
                      : insight.severity === "positive"
                        ? "bg-chart-4/20"
                        : "bg-primary/20"
                }`}
              >
                <insight.icon
                  className={`w-4 h-4 ${
                    insight.severity === "high"
                      ? "text-destructive"
                      : insight.severity === "medium"
                        ? "text-secondary"
                        : insight.severity === "positive"
                          ? "text-chart-4"
                          : "text-primary"
                  }`}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{insight.title}</h4>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      insight.severity === "high"
                        ? "status-high"
                        : insight.severity === "medium"
                          ? "status-medium"
                          : insight.severity === "positive"
                            ? "status-low"
                            : "status-info"
                    }`}
                  >
                    {insight.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <button className="text-sm text-primary hover:text-primary/80 font-medium group-hover:underline">
                  {insight.action} →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-chart-4 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">AI Analysis Active</span>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">Configure AI →</button>
        </div>
      </div>
    </div>
  )
}
