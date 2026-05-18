'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

// Mock data — replace with real API call later
const users = [
  {
    id: 'usr_1',
    name: 'Aisha A. Siddiqui',
    email: 'aisha@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 'usr_2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 'usr_3',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'User',
    status: 'Inactive',
  },
]

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen py-8 px-4 max-w-6xl mx-auto bg-[#09090B]">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#FAFAFA]">User Management</h1>
            <p className="text-[#A1A1AA] mt-1">Manage platform users and permissions</p>
          </div>
          <motion.button 
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 bg-[#14B8A6] hover:bg-[#0D9488] text-[#09090B] font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            + Invite New User
          </motion.button>
        </div>
      </header>

      <Card variant="glass">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#FFFFFF]/10">
            <thead>
              <tr className="text-left text-sm font-semibold text-[#FAFAFA]">
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FFFFFF]/5">
              {users.map((user) => (
                <motion.tr 
                  key={user.id}
                  whileHover={{ backgroundColor: '#18181B/30' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#FAFAFA]">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#A1A1AA]">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <select className="bg-[#18181B]/50 border border-[#FFFFFF]/10 rounded-lg px-3 py-1.5 text-xs font-medium text-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30">
                      <option value="Admin" selected={user.role === 'Admin'}>Admin</option>
                      <option value="User" selected={user.role === 'User'}>User</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${user.status === 'Active' ? 'bg-[#14B8A6]/20 text-[#14B8A6]' : 'bg-[#A1A1AA]/20 text-[#A1A1AA]'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <motion.button 
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        className="text-[#6366F1] hover:text-[#818CF8]"
                      >
                        Edit
                      </motion.button>
                      <motion.button 
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg ${user.status === 'Active' ? 'bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20' : 'bg-[#14B8A6]/10 text-[#14B8A6] hover:bg-[#14B8A6]/20'}`}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}