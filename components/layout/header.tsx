"use client"

import { useState } from "react"
import {
  MagnifyingGlassIcon,
  BellIcon,
  ShieldExclamationIcon,
  ChevronDownIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"

export function Header() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  return (
    <header className="bg-card/50 backdrop-blur-xl border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search repositories, vulnerabilities, CVEs..."
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-chart-4/20 border border-chart-4/30 rounded-lg">
            <ShieldExclamationIcon className="w-4 h-4 text-chart-4" />
            <span className="text-sm text-chart-4 font-medium">3 Critical</span>
          </div>

          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-chart-1 rounded-full glow-cyan"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Sarah Henia</p>
                <p className="text-xs text-muted-foreground">Security Engineer</p>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-xl z-50">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-700/50 rounded-lg transition-colors">
                    <UserCircleIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">Profile Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-700/50 rounded-lg transition-colors">
                    <Cog6ToothIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">Preferences</span>
                  </button>
                  <hr className="my-2 border-gray-700/50" />
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-700/50 rounded-lg transition-colors">
                    <ArrowRightOnRectangleIcon className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
