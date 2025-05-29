"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Plus } from "lucide-react"
import { toast } from "sonner"

export function AddCards() {
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save to your database
    console.log("Card data:", formData)
    toast.success("Your credit card has been securely saved.")
    setFormData({
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Add New Card
        </CardTitle>
        <CardDescription>Securely store your credit card information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Card Name</Label>
            <Input
              id="cardName"
              placeholder="My Main Card"
              value={formData.cardName}
              onChange={(e) => handleInputChange("cardName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="John Doe"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              maxLength={19}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryMonth">Month</Label>
              <Select value={formData.expiryMonth} onValueChange={(value: string) => handleInputChange("expiryMonth", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryYear">Year</Label>
              <Select value={formData.expiryYear} onValueChange={(value: string) => handleInputChange("expiryYear", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="YYYY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i} value={String(new Date().getFullYear() + i)}>
                      {new Date().getFullYear() + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                maxLength={4}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
