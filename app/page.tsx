"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Home,
  BarChart3,
  Settings,
  Users,
  DollarSign,
  UserPlus,
  Moon,
  Sun,
  TrendingUp,
  Bell,
  PieChart,
  Activity,
  User,
  Shield,
  Palette,
  Database,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const sidebarItems = [
  { icon: Home, label: "Home", active: true },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
]

const initialMetrics = [
  {
    title: "Active Users",
    value: 2847,
    description: "+12% from last month",
    icon: Users,
    trend: "up",
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-700",
    darkColor: "bg-blue-950 text-blue-300",
    progress: 75,
    target: 3800,
  },
  {
    title: "Revenue",
    value: 45231,
    description: "+8% from last month",
    icon: DollarSign,
    trend: "up",
    color: "bg-green-500",
    lightColor: "bg-green-50 text-green-700",
    darkColor: "bg-green-950 text-green-300",
    progress: 68,
    target: 66000,
  },
  {
    title: "New Signups",
    value: 1234,
    description: "+23% from last month",
    icon: UserPlus,
    trend: "up",
    color: "bg-purple-500",
    lightColor: "bg-purple-50 text-purple-700",
    darkColor: "bg-purple-950 text-purple-300",
    progress: 92,
    target: 1340,
  },
]

const recentActivities = [
  { id: 1, user: "Sarah Chen", action: "upgraded to Pro plan", time: "2 minutes ago", type: "upgrade" },
  { id: 2, user: "Mike Johnson", action: "completed onboarding", time: "5 minutes ago", type: "signup" },
  { id: 3, user: "Emma Davis", action: "made a purchase", time: "12 minutes ago", type: "purchase" },
  { id: 4, user: "Alex Rodriguez", action: "left feedback", time: "18 minutes ago", type: "feedback" },
  { id: 5, user: "Lisa Wang", action: "invited team member", time: "25 minutes ago", type: "invite" },
]

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState("Home")
  const [metrics, setMetrics] = useState(initialMetrics)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const [displayName, setDisplayName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [filteredActivities, setFilteredActivities] = useState(recentActivities)
  const [searchResults, setSearchResults] = useState<string>("")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + Math.floor(Math.random() * 10) - 5,
          progress: Math.min(100, metric.progress + (Math.random() * 2 - 1)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredActivities(recentActivities)
      setSearchResults("")
    } else {
      const filtered = recentActivities.filter(
        (activity) =>
          activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.type.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredActivities(filtered)
      setSearchResults(`Found ${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${searchQuery}"`)
      console.log("[v0] Search results:", filtered.length, "activities found for query:", searchQuery)
    }
  }, [searchQuery])

  const formatValue = (value: number, type: string) => {
    if (type === "Revenue") return `$${value.toLocaleString()}`
    return value.toLocaleString()
  }

  const getActivityBadge = (type: string) => {
    const styles = {
      upgrade: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      signup: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      purchase: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      feedback: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      invite: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    }
    return styles[type as keyof typeof styles] || "bg-gray-100 text-gray-800"
  }

  const handleSearch = () => {
    console.log("[v0] Search triggered with query:", searchQuery)
    if (searchQuery.trim() === "") {
      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
      setSearchResults("Please enter a search term")
      setTimeout(() => setSearchResults(""), 2000)
    } else {
      const resultCount = filteredActivities.length
      setSearchResults(`Showing ${resultCount} result${resultCount !== 1 ? "s" : ""} for "${searchQuery}"`)
    }
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (!showNotifications && notifications > 0) {
      setTimeout(() => setNotifications(0), 1000)
    }
  }

  const handleSaveProfile = () => {
    console.log("[v0] Saving profile:", { displayName, email })
    if (!displayName.trim() || !email.trim()) {
      alert("Please fill in all fields")
      return
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address")
      return
    }
    setTimeout(() => {
      alert("Profile saved successfully!")
      console.log("[v0] Profile saved successfully")
    }, 500)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    console.log("[v0] Switching theme from", theme, "to", newTheme)
    setTheme(newTheme)
  }

  const renderHomeContent = () => (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h2>
        <p className="text-muted-foreground">Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            className="bg-card shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.color}`}>
                <metric.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground mb-1">
                {formatValue(metric.value, metric.title)}
              </div>
              <CardDescription className="text-xs text-muted-foreground mb-3">{metric.description}</CardDescription>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress to target</span>
                  <span className="font-medium">{Math.round(metric.progress)}%</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
                <div className="text-xs text-muted-foreground">Target: {formatValue(metric.target, metric.title)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
                <CardDescription>Latest user actions and events</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {searchResults && (
                  <Badge variant="outline" className="text-xs">
                    {searchResults}
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Live
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getActivityBadge(activity.type)}`}>{activity.type}</Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    {searchQuery.trim() ? `No activities found matching "${searchQuery}"` : "No activities to display"}
                  </p>
                  {searchQuery.trim() && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                      onClick={() => {
                        setSearchQuery("")
                        setSearchResults("")
                      }}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground">Performance Overview</CardTitle>
                <CardDescription>Key metrics at a glance</CardDescription>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Conversion Rate</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">4.2%</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">+0.8%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Avg. Session</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">3m 42s</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">+12s</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Bounce Rate</p>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">24.1%</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">-2.3%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )

  const renderAnalyticsContent = () => (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Deep dive into your business metrics and performance data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">+15.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.1%</div>
            <p className="text-xs text-muted-foreground">-2.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 42s</div>
            <p className="text-xs text-muted-foreground">+12s from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card shadow-sm">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: "Organic Search", percentage: 45, color: "bg-blue-500" },
                { source: "Direct", percentage: 30, color: "bg-green-500" },
                { source: "Social Media", percentage: 15, color: "bg-purple-500" },
                { source: "Referrals", percentage: 10, color: "bg-orange-500" },
              ].map((item) => (
                <div key={item.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { page: "/dashboard", views: "12,345", percentage: 35 },
                { page: "/analytics", views: "8,901", percentage: 25 },
                { page: "/settings", views: "5,432", percentage: 15 },
                { page: "/profile", views: "3,210", percentage: 9 },
                { page: "/help", views: "2,109", percentage: 6 },
              ].map((item) => (
                <div key={item.page} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.page}</p>
                    <p className="text-xs text-muted-foreground">{item.views} views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.percentage}%</p>
                    <div className="w-16 bg-muted rounded-full h-1 mt-1">
                      <div className="h-1 bg-blue-500 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )

  const renderSettingsContent = () => (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-user.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{displayName}</h3>
                <p className="text-sm text-muted-foreground">{email}</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Change Avatar
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Login Sessions</p>
                <p className="text-sm text-muted-foreground">Manage active sessions</p>
              </div>
              <Button variant="outline">View All</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize your dashboard appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <Button variant="outline" onClick={toggleTheme}>
                {theme === "dark" ? "Light" : "Dark"} Mode
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Compact Mode</p>
                <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
              </div>
              <Button variant="outline">Toggle</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <CardTitle>Data & Privacy</CardTitle>
            </div>
            <CardDescription>Control your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Export</p>
                <p className="text-sm text-muted-foreground">Download your data</p>
              </div>
              <Button variant="outline">Export</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Analytics Tracking</p>
                <p className="text-sm text-muted-foreground">Help improve our service</p>
              </div>
              <Button variant="outline">Disable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-600">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account</p>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-sidebar-foreground">Dashboard</h1>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => {
                    console.log("[v0] Navigating to:", item.label)
                    setActiveItem(item.label)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeItem === item.label
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities, users, or actions..."
                  className="pl-10 bg-background"
                  value={searchQuery}
                  onChange={(e) => {
                    console.log("[v0] Search query changed:", e.target.value)
                    setSearchQuery(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      console.log("[v0] Enter pressed, triggering search")
                      handleSearch()
                    }
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSearchResults("")
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                )}
              </div>
              <Button variant="outline" size="icon" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="ghost" size="icon" onClick={toggleNotifications}>
                  <Bell className="h-4 w-4" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">New user registered</p>
                          <p className="text-xs text-muted-foreground">Sarah Chen just signed up</p>
                          <p className="text-xs text-muted-foreground">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">Payment received</p>
                          <p className="text-xs text-muted-foreground">$299 from Mike Johnson</p>
                          <p className="text-xs text-muted-foreground">5 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium">System update</p>
                          <p className="text-xs text-muted-foreground">Dashboard v2.1 deployed</p>
                          <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-border">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Avatar
                className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
                onClick={() => {
                  console.log("[v0] Profile avatar clicked, navigating to Settings")
                  setActiveItem("Settings")
                }}
              >
                <AvatarImage src="/placeholder-user.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeItem === "Home" && renderHomeContent()}
          {activeItem === "Analytics" && renderAnalyticsContent()}
          {activeItem === "Settings" && renderSettingsContent()}
        </main>
      </div>
    </div>
  )
}
