import { CodeScanner } from "@/components/scanner/code-scanner"

export default function ScannerPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Code Scanner</h1>
          <p className="text-gray-400 mt-1">Analyze code for security vulnerabilities</p>
        </div>
      </div>

      <CodeScanner />
    </div>
  )
}
