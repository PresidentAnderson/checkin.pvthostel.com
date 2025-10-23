import { useState } from 'react'
import { HousekeepingTask } from '@/types/comprehensive'
import { cn } from '@/utils/cn'

export default function Housekeeping() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'rooms' | 'schedule'>('tasks')

  // Mock data - replace with real housekeeping data
  const tasks: HousekeepingTask[] = [
    {
      id: '1',
      roomId: '101',
      assignedTo: 'Maria Garcia',
      type: 'cleaning',
      priority: 'high',
      status: 'in_progress',
      description: 'Deep clean after checkout - sanitize all surfaces',
      estimatedDuration: 45,
      actualDuration: 35,
      beforePhotos: [],
      afterPhotos: [],
      checklistItems: [
        { id: '1', name: 'Strip and make beds', completed: true, required: true },
        { id: '2', name: 'Clean bathroom', completed: true, required: true },
        { id: '3', name: 'Vacuum floors', completed: false, required: true },
        { id: '4', name: 'Dust surfaces', completed: false, required: true },
        { id: '5', name: 'Restock amenities', completed: false, required: true },
      ],
      scheduledFor: '2024-08-01T10:00:00Z',
      startedAt: '2024-08-01T10:15:00Z',
      createdAt: '2024-08-01T09:00:00Z',
    },
    {
      id: '2',
      roomId: '102',
      assignedTo: 'Carlos Rodriguez',
      type: 'maintenance',
      priority: 'urgent',
      status: 'pending',
      description: 'Fix leaky faucet in bathroom',
      estimatedDuration: 30,
      beforePhotos: [],
      afterPhotos: [],
      checklistItems: [
        { id: '1', name: 'Assess the issue', completed: false, required: true },
        { id: '2', name: 'Replace washers/seals', completed: false, required: true },
        { id: '3', name: 'Test for leaks', completed: false, required: true },
      ],
      scheduledFor: '2024-08-01T14:00:00Z',
      createdAt: '2024-08-01T08:00:00Z',
    },
    {
      id: '3',
      roomId: '103',
      assignedTo: 'Anna Chen',
      type: 'inspection',
      priority: 'medium',
      status: 'completed',
      description: 'Quality check before guest arrival',
      estimatedDuration: 15,
      actualDuration: 12,
      beforePhotos: [],
      afterPhotos: [],
      checklistItems: [
        { id: '1', name: 'Check room cleanliness', completed: true, required: true },
        { id: '2', name: 'Verify amenities', completed: true, required: true },
        { id: '3', name: 'Test equipment', completed: true, required: true },
      ],
      scheduledFor: '2024-08-01T11:00:00Z',
      startedAt: '2024-08-01T11:00:00Z',
      completedAt: '2024-08-01T11:12:00Z',
      createdAt: '2024-08-01T09:30:00Z',
    },
  ]

  const getStatusColor = (status: HousekeepingTask['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: HousekeepingTask['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCompletionPercentage = (items: HousekeepingTask['checklistItems']) => {
    const completed = items.filter(item => item.completed).length
    return Math.round((completed / items.length) * 100)
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center justify-between mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Housekeeping</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage cleaning tasks, maintenance, and room inspections
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button className="btn-primary">
            New Task
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'tasks', name: 'Tasks', count: tasks.length },
            { id: 'rooms', name: 'Room Status', count: 12 },
            { id: 'schedule', name: 'Schedule', count: 8 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab.name}
              <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-900">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="card">
              <dt className="text-sm font-medium text-gray-500">Pending Tasks</dt>
              <dd className="mt-1 text-3xl font-semibold text-yellow-600">
                {tasks.filter(t => t.status === 'pending').length}
              </dd>
            </div>
            <div className="card">
              <dt className="text-sm font-medium text-gray-500">In Progress</dt>
              <dd className="mt-1 text-3xl font-semibold text-blue-600">
                {tasks.filter(t => t.status === 'in_progress').length}
              </dd>
            </div>
            <div className="card">
              <dt className="text-sm font-medium text-gray-500">Completed Today</dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">
                {tasks.filter(t => t.status === 'completed').length}
              </dd>
            </div>
            <div className="card">
              <dt className="text-sm font-medium text-gray-500">Urgent Tasks</dt>
              <dd className="mt-1 text-3xl font-semibold text-red-600">
                {tasks.filter(t => t.priority === 'urgent').length}
              </dd>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        Room {task.roomId} - {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                      </h3>
                      <span className={cn(
                        'px-2 py-1 text-xs font-semibold rounded-full',
                        getStatusColor(task.status)
                      )}>
                        {task.status.replace('_', ' ')}
                      </span>
                      <span className={cn(
                        'px-2 py-1 text-xs font-semibold rounded-full',
                        getPriorityColor(task.priority)
                      )}>
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{task.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Assigned to:</span>
                        <p className="font-medium">{task.assignedTo}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Scheduled:</span>
                        <p className="font-medium">
                          {new Date(task.scheduledFor).toLocaleTimeString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Duration:</span>
                        <p className="font-medium">
                          {task.actualDuration || task.estimatedDuration} min
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar and Checklist */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium text-gray-900">
                          {getCompletionPercentage(task.checklistItems)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getCompletionPercentage(task.checklistItems)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Checklist Items */}
                    <div className="space-y-2">
                      {task.checklistItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            readOnly
                          />
                          <span className={cn(
                            'text-sm',
                            item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          )}>
                            {item.name}
                            {item.required && <span className="text-red-500 ml-1">*</span>}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col space-y-2">
                    {task.status === 'pending' && (
                      <button className="btn-primary text-sm py-1 px-3">
                        Start Task
                      </button>
                    )}
                    {task.status === 'in_progress' && (
                      <button className="btn-secondary text-sm py-1 px-3">
                        Complete
                      </button>
                    )}
                    <button className="text-primary-600 hover:text-primary-800 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rooms' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }, (_, i) => {
            const roomNumber = (101 + i).toString()
            const statuses = ['clean', 'dirty', 'maintenance', 'out_of_order']
            const status = statuses[Math.floor(Math.random() * statuses.length)]
            
            return (
              <div key={roomNumber} className="card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">Room {roomNumber}</h3>
                  <span className={cn(
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    status === 'clean' ? 'bg-green-100 text-green-800' :
                    status === 'dirty' ? 'bg-red-100 text-red-800' :
                    status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  )}>
                    {status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Last cleaned: {new Date(Date.now() - Math.random() * 86400000).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-xs py-1 px-2">
                    Clean
                  </button>
                  <button className="btn-secondary text-xs py-1 px-2">
                    Inspect
                  </button>
                  <button className="btn-secondary text-xs py-1 px-2">
                    Maintain
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-medium text-gray-900">
                    {new Date(task.scheduledFor).toLocaleTimeString()} - Room {task.roomId}
                  </div>
                  <div className="text-sm text-gray-500">
                    {task.assignedTo} • {task.type} • {task.estimatedDuration} min
                  </div>
                </div>
                <span className={cn(
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  getStatusColor(task.status)
                )}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}