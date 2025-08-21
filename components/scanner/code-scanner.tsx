"use client"

import { useState, useEffect } from "react"
import {
  PlayIcon,
  DocumentTextIcon,
  FolderIcon,
  CloudIcon,
  CubeIcon,
  ClockIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"

export function CodeScanner() {
  const [activeTab, setActiveTab] = useState("code")
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [currentEngine, setCurrentEngine] = useState("")
  const [scanSession, setScanSession] = useState("")
  const [showAIChat, setShowAIChat] = useState(false)
  const [aiMessages, setAiMessages] = useState([])
  const [aiInput, setAiInput] = useState("")
  const [dockerBenchResults, setDockerBenchResults] = useState(null)
  const [realTimeFindings, setRealTimeFindings] = useState([])

  const [engines, setEngines] = useState([
    { name: "ESLint", status: "pending", duration: "2s", findings: 3, realTimeResults: [] },
    { name: "Semgrep", status: "pending", duration: "4s", findings: 1, realTimeResults: [] },
    { name: "Secret Scanner", status: "pending", duration: "3s", findings: 0, realTimeResults: [] },
    { name: "Trivy", status: "pending", duration: "5s", findings: 2, realTimeResults: [] },
    { name: "SonarQube", status: "pending", duration: "6s", findings: 4, realTimeResults: [] },
    { name: "CodeRabbit AI", status: "pending", duration: "8s", findings: 2, realTimeResults: [] },
    { name: "Hadolint", status: "pending", duration: "4s", findings: 1, realTimeResults: [] },
  ])

  const simulateRealTimeFindings = (engineName) => {
    const findings = {
      ESLint: [
        { type: "error", message: "SQL injection vulnerability detected", line: 3, severity: "critical" },
        { type: "warning", message: "Missing input validation", line: 2, severity: "medium" },
        { type: "info", message: "Consider using const instead of var", line: 1, severity: "low" },
      ],
      Semgrep: [{ type: "error", message: "Hardcoded credentials found", line: 5, severity: "critical" }],
      "Secret Scanner": [{ type: "error", message: "AWS API key detected in code", line: 8, severity: "critical" }],
      Trivy: [
        { type: "error", message: "CVE-2024-1234: Critical vulnerability in dependency", severity: "critical" },
        { type: "warning", message: "Outdated package version detected", severity: "medium" },
      ],
      SonarQube: [
        { type: "error", message: "Code complexity exceeds threshold", severity: "medium" },
        { type: "warning", message: "Duplicate code blocks detected", severity: "low" },
      ],
      "CodeRabbit AI": [
        { type: "error", message: "Potential race condition in async function", severity: "high" },
        { type: "info", message: "Consider using more descriptive variable names", severity: "low" },
      ],
      Hadolint: [{ type: "warning", message: "Missing HEALTHCHECK instruction", severity: "medium" }],
    }
    return findings[engineName] || []
  }

  const handleScan = () => {
    const sessionId = `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setScanSession(sessionId)
    setIsScanning(true)
    setScanProgress(0)
    setRealTimeFindings([])

    setEngines(engines.map((e) => ({ ...e, status: "pending", realTimeResults: [] })))

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < engines.length) {
        const currentEngineName = engines[currentIndex].name
        setCurrentEngine(currentEngineName)

        const findings = simulateRealTimeFindings(currentEngineName)
        setRealTimeFindings((prev) => [...prev, ...findings.map((f) => ({ ...f, engine: currentEngineName }))])

        setEngines((prev) =>
          prev.map((engine, idx) =>
            idx === currentIndex
              ? { ...engine, status: "running", realTimeResults: findings }
              : idx < currentIndex
                ? { ...engine, status: "completed" }
                : engine,
          ),
        )
        setScanProgress(((currentIndex + 1) / engines.length) * 100)
        currentIndex++
      } else {
        setEngines((prev) => prev.map((e) => ({ ...e, status: "completed" })))
        setIsScanning(false)
        setCurrentEngine("")

        setTimeout(() => {
          setAiMessages([
            {
              type: "ai",
              content:
                "🤖 Scan complete! I found 1 critical SQL injection vulnerability and 2 medium-risk issues. The main concern is the direct string concatenation in your authentication function. Would you like me to explain the fix?",
              timestamp: new Date().toLocaleTimeString(),
            },
          ])
          setShowAIChat(true)
        }, 1000)

        clearInterval(interval)
      }
    }, 1500)
  }

  const handleAIChat = () => {
    if (!aiInput.trim()) return

    const userMessage = { type: "user", content: aiInput, timestamp: new Date().toLocaleTimeString() }
    setAiMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const responses = [
        "Here's how to fix the SQL injection: Use parameterized queries like `SELECT * FROM users WHERE username = ? AND password = ?` instead of string concatenation.",
        "The vulnerability has a CVSS score of 9.8. It's critical because attackers can bypass authentication or extract sensitive data.",
        "I recommend implementing input validation, using prepared statements, and adding rate limiting to your authentication endpoint.",
        "Based on the scan, your code fails OWASP Top 10 compliance. The main issues are A03:2021 – Injection and A07:2021 – Identification and Authentication Failures.",
      ]
      const aiResponse = {
        type: "ai",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString(),
      }
      setAiMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setAiInput("")
  }

  useEffect(() => {
    if (activeTab === "docker" && !dockerBenchResults) {
      setDockerBenchResults({
        totalChecks: 73,
        passed: 45,
        warnings: 18,
        failed: 10,
        categories: [
          { name: "Host Configuration", passed: 8, warnings: 2, failed: 1 },
          { name: "Docker Daemon", passed: 12, warnings: 3, failed: 2 },
          { name: "Container Images", passed: 15, warnings: 8, failed: 4 },
          { name: "Container Runtime", passed: 10, warnings: 5, failed: 3 },
        ],
      })
    }
  }, [activeTab])

  const tabs = [
    { id: "code", label: "Code Analysis", icon: DocumentTextIcon },
    { id: "repository", label: "Repository", icon: FolderIcon },
    { id: "s3", label: "S3 Bucket", icon: CloudIcon },
    { id: "docker", label: "Container", icon: CubeIcon },
  ]

  return (
    <div className="space-y-6">
      {scanSession && (
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-400 font-medium">Active Scan Session</p>
              <p className="text-gray-300 text-sm font-mono">{scanSession}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAIChat(!showAIChat)}
                className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg text-sm hover:bg-purple-500/30 transition-colors"
              >
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                <span>Gemma AI</span>
              </button>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Started {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="border-b border-gray-700/50">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-cyan-500 text-cyan-400"
                          : "border-transparent text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "code" && (
                <div className="space-y-4">
                  <textarea
                    className="w-full h-32 p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white font-mono text-sm resize-none focus:outline-none focus:border-cyan-500/50"
                    placeholder="Paste your code here for security analysis..."
                    defaultValue={`// Example vulnerable code
function authenticateUser(username, password) {
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  return database.query(query);
}`}
                  />
                </div>
              )}

              {activeTab === "repository" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="https://github.com/username/repository"
                    className="w-full p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                  />
                  <div className="text-sm text-gray-400">
                    <p>• Supports GitHub, GitLab, and Bitbucket repositories</p>
                    <p>• Scans entire codebase including dependencies</p>
                  </div>
                </div>
              )}

              {activeTab === "s3" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="s3://bucket-name/path"
                    className="w-full p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                  />
                  <div className="text-sm text-gray-400">
                    <p>• Scans S3 bucket configurations and permissions</p>
                    <p>• Checks for exposed sensitive data</p>
                  </div>
                </div>
              )}

              {activeTab === "docker" && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="docker.io/library/nginx:latest"
                    className="w-full p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-500/50"
                  />
                  <div className="text-sm text-gray-400">
                    <p>• Scans container images for vulnerabilities</p>
                    <p>• Uses Trivy and Hadolint security</p>
                  </div>

                  {dockerBenchResults && (
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                        <ShieldCheckIcon className="w-4 h-4" />
                        <span>Docker Bench Security Preview</span>
                      </h4>
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{dockerBenchResults.passed}</div>
                          <div className="text-xs text-gray-400">Passed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">{dockerBenchResults.warnings}</div>
                          <div className="text-xs text-gray-400">Warnings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">{dockerBenchResults.failed}</div>
                          <div className="text-xs text-gray-400">Failed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-300">{dockerBenchResults.totalChecks}</div>
                          <div className="text-xs text-gray-400">Total</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {dockerBenchResults.categories.map((cat, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">{cat.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-green-400">{cat.passed}</span>
                              <span className="text-yellow-400">{cat.warnings}</span>
                              <span className="text-red-400">{cat.failed}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <PlayIcon className="w-5 h-5" />
                <span>{isScanning ? "Scanning..." : "Start Security Scan"}</span>
              </button>
            </div>
          </div>

          {isScanning && realTimeFindings.length > 0 && (
            <div className="mt-6 bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-white font-medium mb-4 flex items-center space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />
                <span>Real-time Findings</span>
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {realTimeFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border-l-4 ${
                      finding.severity === "critical"
                        ? "bg-red-500/10 border-red-500"
                        : finding.severity === "high"
                          ? "bg-orange-500/10 border-orange-500"
                          : finding.severity === "medium"
                            ? "bg-yellow-500/10 border-yellow-500"
                            : "bg-blue-500/10 border-blue-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{finding.message}</span>
                      <span className="text-xs text-gray-400">{finding.engine}</span>
                    </div>
                    {finding.line && <div className="text-xs text-gray-400 mt-1">Line {finding.line}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {isScanning && (
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Scan Progress</h3>
                <span className="text-cyan-400 font-mono">{Math.round(scanProgress)}%</span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {engines.map((engine, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-900/50 rounded-lg">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        engine.status === "completed"
                          ? "bg-green-500"
                          : engine.status === "running"
                            ? "bg-cyan-500 animate-pulse"
                            : "bg-gray-600"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{engine.name}</p>
                      <p className="text-gray-400 text-xs">{engine.duration}</p>
                    </div>
                    {engine.status === "completed" && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
                  </div>
                ))}
              </div>

              {currentEngine && (
                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm">
                    Currently running: <span className="text-cyan-400">{currentEngine}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {!isScanning && scanSession && (
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-medium">Scan Results</h3>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors">
                    Export Report
                  </button>
                  <button className="px-4 py-2 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-lg text-sm hover:bg-gray-600/50 transition-colors">
                    View in Reports
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="text-red-400 font-medium">Critical: SQL Injection Vulnerability</span>
                      </div>
                      <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-mono">
                        CVE-2024-1234
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">
                      Direct string concatenation in SQL query detected. This allows attackers to inject malicious SQL
                      code.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>• Line 3: authenticateUser function</span>
                      <span>• Detected by: ESLint + Semgrep</span>
                      <span>• CVSS Score: 9.8</span>
                    </div>
                    <div className="mt-3 p-3 bg-gray-900/50 rounded border-l-4 border-cyan-500">
                      <p className="text-cyan-400 text-sm font-medium mb-1">🤖 AI Recommendation:</p>
                      <p className="text-gray-300 text-sm">
                        Use parameterized queries or prepared statements. Replace string concatenation with proper SQL
                        parameter binding.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="text-yellow-400 font-medium">Medium: Missing Input Validation</span>
                      </div>
                      <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-mono">
                        CWE-20
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">
                      Function parameters are not validated before use, potentially allowing malicious input.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>• Parameters: username, password</span>
                      <span>• Detected by: SonarQube</span>
                      <span>• CVSS Score: 5.3</span>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      <span className="text-blue-400 font-medium">Info: Code Quality Issues</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>• Missing JSDoc comments (ESLint)</p>
                      <p>• Inconsistent naming conventions (SonarQube)</p>
                      <p>• Unused variable declarations (ESLint)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-4">Security Score</h4>
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
                            stroke="rgb(239 68 68)"
                            strokeWidth="2"
                            strokeDasharray="25, 100"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-red-400">25%</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex justify-between">
                        <span>Critical Issues:</span>
                        <span className="text-red-400 font-medium">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>High Issues:</span>
                        <span className="text-orange-400 font-medium">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medium Issues:</span>
                        <span className="text-yellow-400 font-medium">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Low Issues:</span>
                        <span className="text-blue-400 font-medium">3</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Scan Metadata</h4>
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex justify-between">
                        <span>Session ID:</span>
                        <span className="font-mono text-cyan-400">{scanSession.slice(-8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Engines Used:</span>
                        <span className="text-white">6</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Duration:</span>
                        <span className="text-white">28s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lines Analyzed:</span>
                        <span className="text-white">87</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Analysis:</span>
                        <span className="text-green-400">✓ Complete</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Compliance Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">OWASP Top 10</span>
                        <span className="text-red-400 text-xs">❌ Failed</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">NIST Framework</span>
                        <span className="text-yellow-400 text-xs">⚠️ Partial</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">ISO 27001</span>
                        <span className="text-yellow-400 text-xs">⚠️ Partial</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {showAIChat && (
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden">
              <div className="bg-purple-500/20 border-b border-purple-500/30 p-4">
                <h3 className="text-purple-400 font-medium flex items-center space-x-2">
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  <span>Gemma AI Assistant</span>
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                  {aiMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        msg.type === "ai" ? "bg-purple-500/10 border border-purple-500/30" : "bg-gray-700/50"
                      }`}
                    >
                      <div className="text-sm text-white">{msg.content}</div>
                      <div className="text-xs text-gray-400 mt-1">{msg.timestamp}</div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAIChat()}
                    placeholder="Ask about vulnerabilities..."
                    className="flex-1 p-2 bg-gray-900/50 border border-gray-700/50 rounded text-white text-sm focus:outline-none focus:border-purple-500/50"
                  />
                  <button
                    onClick={handleAIChat}
                    className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
