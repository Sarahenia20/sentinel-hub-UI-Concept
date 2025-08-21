import {
  PlayIcon,
  LinkIcon,
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  CogIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline"

const actions = [
  {
    title: "Scan Repository",
    description: "Full security analysis with AI insights",
    icon: PlayIcon,
    color: "bg-primary hover:bg-primary/90",
    shortcut: "⌘+S",
  },
  {
    title: "Connect Integration",
    description: "GitHub, AWS, Docker Hub, SonarQube",
    icon: LinkIcon,
    color: "bg-secondary hover:bg-secondary/90",
    shortcut: "⌘+I",
  },
  {
    title: "Infrastructure Audit",
    description: "AWS, Azure, GCP security scan",
    icon: ShieldCheckIcon,
    color: "bg-chart-4 hover:bg-chart-4/90",
    shortcut: "⌘+A",
  },
  {
    title: "Generate Report",
    description: "Export compliance & vulnerability report",
    icon: DocumentMagnifyingGlassIcon,
    color: "bg-chart-2 hover:bg-chart-2/90",
    shortcut: "⌘+R",
  },
  {
    title: "Configure Policies",
    description: "Set security rules & thresholds",
    icon: CogIcon,
    color: "bg-muted hover:bg-muted/90",
    shortcut: "⌘+P",
  },
  {
    title: "Deploy Webhook",
    description: "Real-time security notifications",
    icon: CloudArrowUpIcon,
    color: "bg-chart-3 hover:bg-chart-3/90",
    shortcut: "⌘+W",
  },
]

export function QuickActions() {
  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-xl p-6 glass">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action) => (
          <button
            key={action.title}
            className={`group flex items-center justify-between p-4 rounded-lg ${action.color} transition-all duration-200 text-white hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className="flex items-center space-x-3">
              <action.icon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">{action.title}</p>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
            <div className="text-xs opacity-70 font-mono bg-black/20 px-2 py-1 rounded">{action.shortcut}</div>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last scan:</span>
          <span className="text-foreground font-medium">2 hours ago</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Next scheduled:</span>
          <span className="text-foreground font-medium">In 6 hours</span>
        </div>
      </div>
    </div>
  )
}
