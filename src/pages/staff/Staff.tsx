import { useState } from 'react'
import { StaffMember } from '@/types/comprehensive'
import { cn } from '@/utils/cn'

export default function Staff() {
  const [activeTab, setActiveTab] = useState<'members' | 'schedule' | 'performance'>('members')

  // Mock staff data
  const staff: StaffMember[] = [
    {
      id: '1',
      email: 'maria.garcia@pvthostel.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      role: 'staff',
      permissions: [],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b792?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+1-555-0101',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-07-31T00:00:00Z',
      isActive: true,
      employeeId: 'EMP001',
      department: 'housekeeping',
      position: 'Head Housekeeper',
      hireDate: '2024-01-15',
      salary: 45000,
      workSchedule: [],
      skills: ['Deep Cleaning', 'Room Inspection', 'Team Leadership'],
      languages: ['English', 'Spanish'],
      emergencyContact: {
        name: 'Carlos Garcia',
        phone: '+1-555-0102',
        relationship: 'Spouse'
      },
      documents: []
    },
    {
      id: '2',
      email: 'john.smith@pvthostel.com',
      firstName: 'John',
      lastName: 'Smith',
      role: 'staff',
      permissions: [],
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+1-555-0201',
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: '2024-07-31T00:00:00Z',
      isActive: true,
      employeeId: 'EMP002',
      department: 'reception',
      position: 'Front Desk Manager',
      hireDate: '2024-02-01',
      salary: 48000,
      workSchedule: [],
      skills: ['Customer Service', 'Reservation Management', 'Problem Solving'],
      languages: ['English', 'French'],
      emergencyContact: {
        name: 'Sarah Smith',
        phone: '+1-555-0202',
        relationship: 'Sister'
      },
      documents: []
    },
    {
      id: '3',
      email: 'anna.chen@pvthostel.com',
      firstName: 'Anna',
      lastName: 'Chen',
      role: 'manager',
      permissions: [],
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      phone: '+1-555-0301',
      createdAt: '2023-12-01T00:00:00Z',
      updatedAt: '2024-07-31T00:00:00Z',
      isActive: true,
      employeeId: 'EMP003',
      department: 'management',
      position: 'Operations Manager',
      hireDate: '2023-12-01',
      salary: 65000,
      workSchedule: [],
      skills: ['Team Management', 'Business Analytics', 'Strategic Planning'],
      languages: ['English', 'Mandarin', 'Japanese'],
      emergencyContact: {
        name: 'Michael Chen',
        phone: '+1-555-0302',
        relationship: 'Brother'
      },
      documents: []
    }
  ]

  const getDepartmentColor = (department: StaffMember['department']) => {
    switch (department) {
      case 'reception':
        return 'bg-blue-100 text-blue-800'
      case 'housekeeping':
        return 'bg-green-100 text-green-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      case 'security':
        return 'bg-purple-100 text-purple-800'
      case 'management':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActiveStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="sm:flex sm:items-center justify-between mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Staff Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage team members, schedules, and performance
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
          <button className="btn-secondary">
            Import Staff
          </button>
          <button className="btn-primary">
            Add Staff Member
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'members', name: 'Team Members', count: staff.length },
            { id: 'schedule', name: 'Schedule', count: 24 },
            { id: 'performance', name: 'Performance', count: 5 },
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

      {activeTab === 'members' && (
        <div>
          {/* Department Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-5 mb-8">
            {[
              { department: 'Reception', count: 3, color: 'bg-blue-500' },
              { department: 'Housekeeping', count: 5, color: 'bg-green-500' },
              { department: 'Maintenance', count: 2, color: 'bg-yellow-500' },
              { department: 'Security', count: 2, color: 'bg-purple-500' },
              { department: 'Management', count: 2, color: 'bg-red-500' },
            ].map((dept) => (
              <div key={dept.department} className="card">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${dept.color} mr-3`}></div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">{dept.department}</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">{dept.count}</dd>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Staff Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((member) => (
              <div key={member.id} className="card">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={member.avatar}
                    alt={`${member.firstName} ${member.lastName}`}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{member.position}</p>
                  </div>
                  <span className={cn(
                    'px-2 py-1 text-xs font-semibold rounded-full',
                    getActiveStatusColor(member.isActive)
                  )}>
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Department:</span>
                    <span className={cn(
                      'px-2 py-1 text-xs font-semibold rounded-full capitalize',
                      getDepartmentColor(member.department)
                    )}>
                      {member.department}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Employee ID:</span>
                    <span className="text-sm font-medium text-gray-900">{member.employeeId}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Hire Date:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(member.hireDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Phone:</span>
                    <span className="text-sm font-medium text-gray-900">{member.phone}</span>
                  </div>

                  {/* Skills */}
                  <div>
                    <span className="text-sm text-gray-500">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          +{member.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <span className="text-sm text-gray-500">Languages:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {member.languages.map((language) => (
                        <span key={language} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 btn-secondary text-sm py-2">
                    View Profile
                  </button>
                  <button className="flex-1 btn-primary text-sm py-2">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-6">
          {/* Schedule Overview */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">This Week's Schedule</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Staff Member</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Mon</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Tue</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Wed</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Thu</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Fri</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Sat</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Sun</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((member) => (
                    <tr key={member.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={member.avatar}
                            alt={`${member.firstName} ${member.lastName}`}
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              {member.firstName} {member.lastName}
                            </div>
                            <div className="text-xs text-gray-500">{member.department}</div>
                          </div>
                        </div>
                      </td>
                      {Array.from({ length: 7 }, (_, i) => (
                        <td key={i} className="py-3 px-4 text-center">
                          <div className="text-xs">
                            <div className="bg-green-100 text-green-800 rounded px-2 py-1 mb-1">
                              9:00-17:00
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((member) => (
              <div key={member.id} className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={member.avatar}
                    alt={`${member.firstName} ${member.lastName}`}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{member.position}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Task Completion</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Guest Rating</span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Punctuality</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-sm text-gray-500">This Month</div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">48</div>
                        <div className="text-xs text-gray-500">Tasks Completed</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">2</div>
                        <div className="text-xs text-gray-500">Late Days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}