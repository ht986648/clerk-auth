"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, Key, Plus, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export function AddPasswords() {
  const [formData, setFormData] = useState({
    title: "",
    website: "",
    username: "",
    password: "",
    notes: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData((prev) => ({ ...prev, password }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save to your database
    console.log("Password data:", formData)
    toast.success("Your password has been securely saved.")
    setFormData({
      title: "",
      website: "",
      username: "",
      password: "",
      notes: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Add New Password
        </CardTitle>
        <CardDescription>Store your login credentials securely</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Gmail Account"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              placeholder="https://gmail.com"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username/Email</Label>
            <Input
              id="username"
              placeholder="john@example.com"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-8 w-8 p-0"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={generatePassword} className="h-8 w-8 p-0">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
