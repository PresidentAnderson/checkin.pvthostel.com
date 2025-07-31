export default function Reports() {
  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="mt-2 text-sm text-gray-700">
            Analytics and financial reports
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Today</span>
              <span className="font-medium">$1,240</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">This Week</span>
              <span className="font-medium">$8,450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">This Month</span>
              <span className="font-medium">$32,180</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Occupancy Rate</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Current</span>
              <span className="font-medium">80%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Average (30 days)</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Peak Season Average</span>
              <span className="font-medium">92%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button className="btn-secondary">
            Download Monthly Report
          </button>
          <button className="btn-secondary">
            Export Guest List
          </button>
          <button className="btn-secondary">
            Financial Summary
          </button>
        </div>
      </div>
    </div>
  )
}