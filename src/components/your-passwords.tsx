"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Key, Eye, EyeOff, Copy, Trash2, ExternalLink } from "lucide-react"
import { toast } from "sonner"

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const mockPasswords = [
  {
    id: 1,
    title: "Gmail Account",
    website: "https://gmail.com",
    username: "john@example.com",
    password: "MySecurePassword123!",
    notes: "Main email account",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "GitHub",
    website: "https://github.com",
    username: "johndoe",
    password: "GitHubPass456@",
    notes: "Development account",
    createdAt: "2024-01-10",
  },
  {
    id: 3,
    title: "Netflix",
    website: "https://netflix.com",
    username: "john.doe@email.com",
    password: "NetflixFun789#",
    notes: "Family subscription",
    createdAt: "2024-01-05",
  },
]

export function YourPasswords() {
  const [passwords, setPasswords] = useState(mockPasswords)
  const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set())

  const togglePasswordVisibility = (passwordId: number) => {
    setVisiblePasswords((prev) => {
      const newSet = new Set(prev)
      newSet.has(passwordId) ? newSet.delete(passwordId) : newSet.add(passwordId)
      return newSet
    })
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast(`${label} copied to clipboard`)
  }

  const openWebsite = (url: string) => {
    if (url) window.open(url, "_blank")
  }

  const deletePassword = (passwordId: number) => {
    setPasswords((prev) => prev.filter((p) => p.id !== passwordId))
    toast.error("Password has been removed from your vault")
  }

  const maskPassword = (password: string) => "•".repeat(password.length)

  if (passwords.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Key className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">No passwords saved yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {passwords.map((password) => {
        const isVisible = visiblePasswords.has(password.id)
        return (
          <Card key={password.id} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{password.title}</CardTitle>
                <div className="flex gap-2">
                  {password.website && (
                    <Button variant="ghost" size="sm" onClick={() => openWebsite(password.website)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => togglePasswordVisibility(password.id)}>
                    {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deletePassword(password.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {password.website && <CardDescription className="truncate">{password.website}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Username:</span>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded max-w-[200px] truncate">{password.username}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(password.username, "Username")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Password:</span>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {isVisible ? password.password : maskPassword(password.password)}
                  </code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(password.password, "Password")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {password.notes && (
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium">Notes:</span>
                  <p className="text-sm text-muted-foreground max-w-[200px] text-right">{password.notes}</p>
                </div>
              )}

              <div className="flex justify-end">
                <Badge variant="outline" className="text-xs">
                  Added {formatDate(password.createdAt)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
