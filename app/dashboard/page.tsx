import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentRepositories } from "@/components/dashboard/recent-repositories"
import { AIInsights } from "@/components/dashboard/ai-insights"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
          <p className="text-gray-400 mt-1">Monitor your security posture in real-time</p>
        </div>
      </div>

      {/* Top Row - Security Metrics */}
      <DashboardMetrics />

      {/* Middle Row - Activity & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <QuickActions />
      </div>

      {/* Bottom Row - Repositories & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentRepositories />
        <AIInsights />
      </div>

      {/* Grafana & Prometheus Integration */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">System Metrics (Prometheus)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">98.5%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">2.3s</div>
                <div className="text-sm text-gray-400">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">45%</div>
                <div className="text-sm text-gray-400">CPU Usage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">1.2GB</div>
                <div className="text-sm text-gray-400">Memory</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Grafana Dashboard</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Security Alerts</span>
              <span className="text-red-400 font-semibold">3 Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Scan Queue</span>
              <span className="text-cyan-400 font-semibold">12 Pending</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">API Calls/min</span>
              <span className="text-green-400 font-semibold">847</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
