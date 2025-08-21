"use client"

import { useState } from "react"
import { UserIcon, LinkIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", name: "Profile", icon: UserIcon },
    { id: "integrations", name: "Integrations", icon: LinkIcon },
    { id: "ai", name: "AI Configuration", icon: ChatBubbleLeftRightIcon },
    { id: "platform", name: "Platform", icon: Cog6ToothIcon },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="lg:col-span-3 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">User Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue="Sarah Henia"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="sarah@sentinelhub.dev"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                <select className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                  <option>Security Engineer</option>
                  <option>DevOps Engineer</option>
                  <option>Developer</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Integrations</h3>
            <div className="space-y-4">
              {[
                {
                  name: "GitHub",
                  status: "connected",
                  description: "Repository scanning and analysis",
                  config: "✓ OAuth configured • ✓ Webhooks active • 247 repos accessible",
                  lastSync: "2 minutes ago",
                },
                {
                  name: "AWS",
                  status: "connected",
                  description: "Infrastructure security scanning",
                  config: "✓ IAM roles configured • ✓ S3 access • ✓ CloudTrail enabled",
                  lastSync: "15 minutes ago",
                },
                {
                  name: "Docker Hub",
                  status: "connected",
                  description: "Container vulnerability scanning",
                  config: "✓ Registry access • ✓ Trivy integration • 156 images scanned",
                  lastSync: "1 hour ago",
                },
                {
                  name: "Grafana",
                  status: "connected",
                  description: "Security metrics and monitoring",
                  config: "✓ Dashboards deployed • ✓ Alerts configured • ✓ Data source active",
                  lastSync: "5 minutes ago",
                },
                {
                  name: "Slack",
                  status: "connected",
                  description: "Security alerts and notifications",
                  config: "✓ Bot installed • ✓ Channels configured • #security-alerts active",
                  lastSync: "Real-time",
                },
                {
                  name: "SonarQube",
                  status: "connected",
                  description: "Code quality and security analysis",
                  config: "✓ Server connected • ✓ Quality gates active • ✓ Rules updated",
                  lastSync: "30 minutes ago",
                },
                {
                  name: "VirusTotal API",
                  status: "connected",
                  description: "Malware and threat intelligence",
                  config: "✓ API key active • ✓ Rate limits: 1000/day • ✓ Premium features enabled",
                  lastSync: "Real-time",
                },
                {
                  name: "Shodan API",
                  status: "connected",
                  description: "Internet-connected device scanning",
                  config: "✓ API key active • ✓ Credits: 847 remaining • ✓ Historical data access",
                  lastSync: "1 hour ago",
                },
                {
                  name: "CVE Details API",
                  status: "connected",
                  description: "Vulnerability database access",
                  config: "✓ Database synced • ✓ 180,000+ CVEs indexed • ✓ Auto-updates enabled",
                  lastSync: "6 hours ago",
                },
                {
                  name: "AbuseIPDB",
                  status: "connected",
                  description: "IP reputation and abuse detection",
                  config: "✓ API key active • ✓ Confidence threshold: 75% • ✓ Whitelist configured",
                  lastSync: "Real-time",
                },
                {
                  name: "Prometheus",
                  status: "connected",
                  description: "Metrics collection and monitoring",
                  config: "✓ Scraping active • ✓ 15s intervals • ✓ 30-day retention",
                  lastSync: "15 seconds ago",
                },
              ].map((integration) => (
                <div key={integration.name} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-white font-medium">{integration.name}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            integration.status === "connected"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {integration.status === "connected" ? "● Connected" : "○ Disconnected"}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{integration.description}</p>
                      <p className="text-gray-500 text-xs">{integration.config}</p>
                      <p className="text-cyan-400 text-xs mt-1">Last sync: {integration.lastSync}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-3 py-1 bg-gray-600/50 text-gray-300 border border-gray-500/50 rounded text-xs hover:bg-gray-500/50 transition-colors">
                        Configure
                      </button>
                      <button
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          integration.status === "connected"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                            : "bg-cyan-500 hover:bg-cyan-600 text-white"
                        }`}
                      >
                        {integration.status === "connected" ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "ai" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">AI Configuration</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Primary AI Model</label>
                  <select className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                    <option>Gemma 270M (Recommended)</option>
                    <option>CodeRabbit AI</option>
                    <option>GPT-4 Turbo</option>
                    <option>Claude 3.5 Sonnet</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">✓ Connected • Response time: 1.2s avg</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Analysis Depth</label>
                  <select className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                    <option>Deep Analysis (Recommended)</option>
                    <option>Standard Analysis</option>
                    <option>Quick Scan</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Includes vulnerability explanations and remediation</p>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                <h4 className="text-white font-medium mb-3">AI Features</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Automatic Vulnerability Explanations</p>
                      <p className="text-gray-500 text-xs">AI explains each vulnerability in plain language</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Smart Remediation Suggestions</p>
                      <p className="text-gray-500 text-xs">Context-aware fix recommendations</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Code Pattern Learning</p>
                      <p className="text-gray-500 text-xs">Improve detection based on your codebase</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Risk Prioritization</p>
                      <p className="text-gray-500 text-xs">AI ranks vulnerabilities by business impact</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-cyan-400 font-medium">🤖 AI Usage Statistics</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Explanations Generated</p>
                    <p className="text-white font-bold">1,247</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Avg Response Time</p>
                    <p className="text-white font-bold">1.2s</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Accuracy Score</p>
                    <p className="text-white font-bold">94.7%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Monthly Queries</p>
                    <p className="text-white font-bold">8,934</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "platform" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Platform Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Dark Mode</h4>
                  <p className="text-gray-400 text-sm">Use dark theme across the platform</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Email Notifications</h4>
                  <p className="text-gray-400 text-sm">Receive security alerts via email</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Auto-scan on Push</h4>
                  <p className="text-gray-400 text-sm">Automatically scan repositories on new commits</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
