"use client"

import { useState } from "react"
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ClockIcon,
  CpuChipIcon,
  XMarkIcon,
  EyeIcon,
} from "@heroicons/react/24/outline"

const scanSessions = [
  {
    id: "scan_1737123456_abc123def",
    source: "GitHub: Sarahenia20/SentinelHub",
    sourceType: "repository",
    date: "2025-01-19 14:32:15",
    duration: "2m 34s",
    engines: ["ESLint", "Semgrep", "Secret Scanner", "SonarQube", "CodeRabbit AI", "Trivy", "VirusTotal", "Shodan"],
    vulnerabilities: { critical: 0, high: 2, medium: 1, low: 3 },
    score: 87,
    status: "completed",
    filesScanned: 247,
    linesOfCode: 15420,
    compliance: { owasp: "passed", nist: "passed", iso27001: "partial" },
    aiInsights: 12,
    branch: "main",
    commit: "a1b2c3d",
    apiCalls: { virusTotal: 45, shodan: 12, cveDetails: 23, abuseIPDB: 8 },
  },
  {
    id: "scan_1737037056_def456ghi",
    source: "s3://sentinelhub-prod/configs",
    sourceType: "s3",
    date: "2025-01-18 09:15:42",
    duration: "1m 18s",
    engines: ["AWS Config", "Secret Scanner", "Trivy"],
    vulnerabilities: { critical: 1, high: 0, medium: 2, low: 1 },
    score: 74,
    status: "completed",
    filesScanned: 89,
    linesOfCode: 0,
    compliance: { owasp: "failed", nist: "partial", iso27001: "failed" },
    aiInsights: 4,
    region: "us-east-1",
    bucketSize: "2.3GB",
  },
  {
    id: "scan_1736950656_ghi789jkl",
    source: "docker.io/sentinelhub/api:latest",
    sourceType: "container",
    date: "2025-01-17 16:45:28",
    duration: "4m 12s",
    engines: ["Trivy", "docker-bench", "Hadolint"],
    vulnerabilities: { critical: 0, high: 1, medium: 3, low: 2 },
    score: 82,
    status: "completed",
    filesScanned: 156,
    linesOfCode: 0,
    compliance: { owasp: "passed", nist: "passed", iso27001: "passed" },
    aiInsights: 8,
    imageSize: "1.2GB",
    layers: 12,
  },
  {
    id: "scan_1736864256_jkl012mno",
    source: "Code Paste: auth-service.js",
    sourceType: "code",
    date: "2025-01-16 11:22:33",
    duration: "45s",
    engines: ["ESLint", "Semgrep", "CodeRabbit AI", "Hadolint", "CVE Details API"],
    vulnerabilities: { critical: 2, high: 1, medium: 0, low: 1 },
    score: 45,
    status: "completed",
    filesScanned: 1,
    linesOfCode: 87,
    compliance: { owasp: "failed", nist: "failed", iso27001: "failed" },
    aiInsights: 6,
    language: "JavaScript",
    framework: "Express.js",
    apiCalls: { cveDetails: 15, abuseIPDB: 3 },
  },
]

const getSourceIcon = (type: string) => {
  switch (type) {
    case "repository":
      return "🔗"
    case "s3":
      return "☁️"
    case "container":
      return "📦"
    case "code":
      return "📝"
    default:
      return "📄"
  }
}

const getEngineColor = (engine: string) => {
  const colors: Record<string, string> = {
    ESLint: "bg-yellow-500/20 text-yellow-400",
    Semgrep: "bg-purple-500/20 text-purple-400",
    "Secret Scanner": "bg-red-500/20 text-red-400",
    SonarQube: "bg-blue-500/20 text-blue-400",
    "CodeRabbit AI": "bg-green-500/20 text-green-400",
    Trivy: "bg-cyan-500/20 text-cyan-400",
    "docker-bench": "bg-indigo-500/20 text-indigo-400",
    Hadolint: "bg-orange-500/20 text-orange-400",
    "AWS Config": "bg-amber-500/20 text-amber-400",
    VirusTotal: "bg-red-600/20 text-red-300",
    Shodan: "bg-pink-500/20 text-pink-400",
    "CVE Details API": "bg-violet-500/20 text-violet-400",
    AbuseIPDB: "bg-rose-500/20 text-rose-400",
  }
  return colors[engine] || "bg-gray-500/20 text-gray-400"
}

export function SecurityReports() {
  const [selectedSession, setSelectedSession] = useState(null)
  const [showGrafana, setShowGrafana] = useState(false)

  const openSessionDetails = (session) => {
    setSelectedSession(session)
  }

  const closeSessionDetails = () => {
    setSelectedSession(null)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-gray-400 text-sm">Total Scans</p>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
            <div>
              <p className="text-gray-400 text-sm">Critical Issues</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Avg Security Score</p>
              <p className="text-2xl font-bold text-white">72%</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <CpuChipIcon className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Engines Used</p>
              <p className="text-2xl font-bold text-white">9</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Real-time Monitoring</h3>
          <button
            onClick={() => setShowGrafana(!showGrafana)}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-500/30 transition-colors"
          >
            <ChartBarIcon className="w-4 h-4" />
            <span>View Grafana Dashboard</span>
          </button>
        </div>

        {showGrafana && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="text-orange-400 font-medium mb-3">Grafana Metrics (Last 24h)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-red-400">127</div>
                  <div className="text-xs text-gray-400">Critical Alerts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">342</div>
                  <div className="text-xs text-gray-400">Warnings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">1,247</div>
                  <div className="text-xs text-gray-400">Scans Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">98.7%</div>
                  <div className="text-xs text-gray-400">Uptime</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="text-cyan-400 font-medium mb-3">Prometheus System Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">CPU Usage:</span>
                  <span className="text-green-400">23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory:</span>
                  <span className="text-yellow-400">67%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Scan Queue:</span>
                  <span className="text-cyan-400">12 pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">API Calls/min:</span>
                  <span className="text-purple-400">847</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* External API Monitoring */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">VirusTotal API</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <div className="text-lg font-bold text-white">847 calls</div>
            <div className="text-xs text-gray-400">Last 24h</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Shodan API</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <div className="text-lg font-bold text-white">234 calls</div>
            <div className="text-xs text-gray-400">Last 24h</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">CVE Details</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <div className="text-lg font-bold text-white">156 calls</div>
            <div className="text-xs text-gray-400">Last 24h</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">AbuseIPDB</span>
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            </div>
            <div className="text-lg font-bold text-white">89 calls</div>
            <div className="text-xs text-gray-400">Rate limited</div>
          </div>
        </div>
      </div>

      {/* Detailed Scan Sessions */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h3 className="text-lg font-semibold text-white">Scan Session History</h3>
          <p className="text-gray-400 text-sm mt-1">
            Complete audit trail with engine attribution and session metadata
          </p>
        </div>

        <div className="divide-y divide-gray-700/50">
          {scanSessions.map((session) => (
            <div key={session.id} className="p-6 hover:bg-gray-700/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{getSourceIcon(session.sourceType)}</span>
                    <h4 className="text-white font-medium">{session.source}</h4>
                    <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs font-mono">
                      {session.id}
                    </span>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <span>Duration: {session.duration}</span>
                    <span>{session.filesScanned} files</span>
                    {session.linesOfCode > 0 && <span>{session.linesOfCode.toLocaleString()} LOC</span>}
                    {session.sourceType === "s3" && <span>Region: {session.region}</span>}
                    {session.sourceType === "s3" && <span>Bucket Size: {session.bucketSize}</span>}
                    {session.sourceType === "container" && <span>Image Size: {session.imageSize}</span>}
                    {session.sourceType === "container" && <span>Layers: {session.layers}</span>}
                    {session.sourceType === "code" && <span>Language: {session.language}</span>}
                    {session.sourceType === "code" && <span>Framework: {session.framework}</span>}
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-16 bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          session.score >= 80 ? "bg-green-500" : session.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${session.score}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-bold">{session.score}%</span>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                    {session.status}
                  </span>
                </div>
              </div>

              {/* Engines Used */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Security Engines:</p>
                <div className="flex flex-wrap gap-2">
                  {session.engines.map((engine, idx) => (
                    <span key={idx} className={`px-2 py-1 rounded text-xs font-medium ${getEngineColor(engine)}`}>
                      {engine}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vulnerabilities */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">Findings:</span>
                  {session.vulnerabilities.critical > 0 && (
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                      {session.vulnerabilities.critical} Critical
                    </span>
                  )}
                  {session.vulnerabilities.high > 0 && (
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">
                      {session.vulnerabilities.high} High
                    </span>
                  )}
                  {session.vulnerabilities.medium > 0 && (
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">
                      {session.vulnerabilities.medium} Medium
                    </span>
                  )}
                  {session.vulnerabilities.low > 0 && (
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">
                      {session.vulnerabilities.low} Low
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openSessionDetails(session)}
                    className="flex items-center space-x-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <span className="text-gray-400 text-xs">AI Insights:</span>
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                    {session.aiInsights}
                  </span>
                </div>
              </div>

              {/* Compliance Status */}
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Compliance:</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">OWASP</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          session.compliance.owasp === "passed"
                            ? "bg-green-500"
                            : session.compliance.owasp === "partial"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">NIST</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          session.compliance.nist === "passed"
                            ? "bg-green-500"
                            : session.compliance.nist === "partial"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-400">ISO27001</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          session.compliance.iso27001 === "passed"
                            ? "bg-green-500"
                            : session.compliance.iso27001 === "partial"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Calls */}
              {session.apiCalls && (
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">API Calls:</span>
                    <div className="flex items-center space-x-3">
                      {Object.entries(session.apiCalls).map(([api, count]) => (
                        <div key={api} className="flex items-center space-x-1">
                          <span className="text-xs text-gray-400 capitalize">{api.replace(/_/g, " ")}</span>
                          <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs font-mono">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal for Session Details */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Scan Session Details</h3>
              <button onClick={closeSessionDetails} className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Session Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Session ID:</span>
                      <span className="font-mono text-cyan-400">{selectedSession.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Source:</span>
                      <span className="text-white">{selectedSession.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{selectedSession.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Files Scanned:</span>
                      <span className="text-white">{selectedSession.filesScanned}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Security Score</h4>
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgb(75 85 99)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={
                            selectedSession.score >= 80
                              ? "rgb(34 197 94)"
                              : selectedSession.score >= 60
                                ? "rgb(234 179 8)"
                                : "rgb(239 68 68)"
                          }
                          strokeWidth="2"
                          strokeDasharray={`${selectedSession.score}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{selectedSession.score}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
