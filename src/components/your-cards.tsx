"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Eye, EyeOff, Copy, Trash2 } from "lucide-react"
import { toast } from "sonner"

const mockCards = [
  {
    id: 1,
    cardName: "Main Credit Card",
    cardholderName: "John Doe",
    cardNumber: "4532 1234 5678 9012",
    expiryMonth: "12",
    expiryYear: "2027",
    cvv: "123",
  },
  {
    id: 2,
    cardName: "Business Card",
    cardholderName: "John Doe",
    cardNumber: "5555 4444 3333 2222",
    expiryMonth: "08",
    expiryYear: "2026",
    cvv: "456",
  },
]

export function YourCards() {
  const [cards, setCards] = useState(mockCards)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  const toggleCardVisibility = (cardId: number) => {
    setVisibleCards((prev) => {
      const newSet = new Set(prev)
      newSet.has(cardId) ? newSet.delete(cardId) : newSet.add(cardId)
      return newSet
    })
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast(`${label} copied to clipboard`)
  }

  const maskCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/\d(?=\d{4})/g, "*")
  }

  const deleteCard = (cardId: number) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId))
    toast.error("Card has been removed from your vault")
  }

  if (cards.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">No cards saved yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const isVisible = visibleCards.has(card.id)
        return (
          <Card key={card.id} className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{card.cardName}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => toggleCardVisibility(card.id)}>
                    {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteCard(card.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{card.cardholderName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Card Number:</span>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {isVisible ? card.cardNumber : maskCardNumber(card.cardNumber)}
                  </code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(card.cardNumber, "Card number")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Expiry:</span>
                <Badge variant="secondary">
                  {card.expiryMonth}/{card.expiryYear}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CVV:</span>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">{isVisible ? card.cvv : "***"}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(card.cvv, "CVV")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
