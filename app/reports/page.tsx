import { SecurityReports } from "@/components/reports/security-reports"

export default function ReportsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Reports</h1>
          <p className="text-gray-400 mt-1">View scan history and vulnerability trends</p>
        </div>
      </div>

      <SecurityReports />
    </div>
  )
}
