"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  MagnifyingGlassIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Scanner", href: "/scanner", icon: MagnifyingGlassIcon },
  { name: "Security Reports", href: "/reports", icon: DocumentChartBarIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar backdrop-blur-xl border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-1 rounded-lg flex items-center justify-center glow-cyan">
            <ShieldCheckIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">SentinelHub</h1>
            <p className="text-xs text-sidebar-accent-foreground">DevSecOps Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground border border-primary/30 glow-cyan"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {isActive && <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">© 2025 SentinelHub</p>
          <p className="text-xs text-sidebar-accent-foreground">Made by Sarah Henia</p>
        </div>
      </div>
    </div>
  )
}
