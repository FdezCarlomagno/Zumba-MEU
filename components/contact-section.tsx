"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Send, Ticket, Info, Sparkles, Music } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    enquiryType: "",
    date: "",
    message: "",
  })

  // Logic helpers
  const isPublicParty = formData.enquiryType === "public-party"
  
  // Only show date for specific booking types (not general questions or public parties)
  const showDateInput = [
    "private-birthday", 
    "school-community", 
    "equipment-hire"
  ].includes(formData.enquiryType)

  const handleEnquiry = () => {
    // Construct the mailto link for the single CTA
    const subject = `Enquiry: ${formatEventType(formData.enquiryType)}`
    const body = `Name: ${formData.name}\nType: ${formatEventType(formData.enquiryType)}\nPreferred Date: ${formData.date || "N/A"}\n\nMessage:\n${formData.message}`
    
    window.location.href = `mailto:info@zumbameu.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  // Helper to make the email subject look nice
  const formatEventType = (type: string) => {
    switch(type) {
      case "private-birthday": return "Private Birthday / Kids Disco"
      case "school-community": return "School / Community Event"
      case "equipment-hire": return "Equipment Hire"
      case "general-question": return "General Question"
      default: return type
    }
  }

  return (
    <section id="contact" className="py-8 overflow-hidden relative">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-4 drop-shadow-sm">
              Let's plan your Zumba MEU experience!
            </h2>
            <p className="text-lg text-muted-foreground">
              Got a question or planning a private event? We'd love to hear from you.
            </p>
            
            {/* Global Note about Public Parties */}
            <div className="mt-6 inline-flex items-center gap-2 bg-white/60 border border-purple-100 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-700 font-medium shadow-sm">
              <Ticket className="w-4 h-4" />
              <span>Note: Public parties are booked via TryBooking only.</span>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md ring-1 ring-white/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="text-pink-500 w-6 h-6" />
                Start your enquiry
              </CardTitle>
              <CardDescription>
                Select an enquiry type below to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold text-gray-700">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="What should we call you?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 text-base rounded-xl border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                {/* Event Type Select */}
                <div className="space-y-2">
                  <Label htmlFor="event-type" className="text-base font-semibold text-gray-700">
                    Enquiry Type
                  </Label>
                  <Select
                    value={formData.enquiryType}
                    onValueChange={(value) => setFormData({ ...formData, enquiryType: value, date: "" })}
                  >
                    <SelectTrigger id="event-type" className="h-12 text-base rounded-xl border-gray-200 focus:ring-pink-500">
                      <SelectValue placeholder="What are you looking for?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public-party" className="font-medium text-pink-600 focus:text-pink-700 focus:bg-pink-50">
                        🎉 Public Party (TryBooking)
                      </SelectItem>
                      <SelectItem value="private-birthday">🎈 Private Birthday / Kids Disco</SelectItem>
                      <SelectItem value="school-community">🏫 School / Community Event</SelectItem>
                      <SelectItem value="equipment-hire">🔊 Equipment Hire</SelectItem>
                      <SelectItem value="general-question">❓ General Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* --- CONDITIONAL: Public Party Warning --- */}
                {isPublicParty && (
                  <div className="bg-pink-50 border-2 border-pink-100 rounded-xl p-6 text-center animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Ticket className="w-6 h-6 text-pink-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Book Public Parties Online!</h4>
                    <p className="text-gray-600 mb-6">
                      Great choice! Our public Zumba parties are super popular. To secure your spot instantly, please use our official booking page.
                    </p>
                    <Button 
                      className="w-full h-12 rounded-full text-lg font-bold bg-pink-600 hover:bg-pink-700 hover:scale-105 transition-all shadow-lg shadow-pink-200"
                      onClick={() => window.open("https://www.trybooking.com", "_blank")} // Replace with actual URL
                    >
                      Book on TryBooking <Ticket className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* --- CONDITIONAL: Date Picker --- */}
                {showDateInput && !isPublicParty && (
                  <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                    <Label htmlFor="date" className="text-base font-semibold text-gray-700">
                      Preferred Date
                    </Label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="h-12 text-base rounded-xl border-gray-200 focus:border-pink-500 focus:ring-pink-500 pl-10"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Message Box (Always visible unless public party) */}
                {!isPublicParty && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <Label htmlFor="message" className="text-base font-semibold text-gray-700">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={
                        formData.enquiryType === "general-question" 
                        ? "How can we help you?" 
                        : "Tell us a bit about the age group, number of kids, or specific requirements..."
                      }
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="text-base rounded-xl border-gray-200 focus:border-pink-500 focus:ring-pink-500 resize-none"
                    />
                  </div>
                )}

                {/* --- CONDITIONAL: Submit Button --- */}
                {!isPublicParty && (
                  <Button
                    onClick={handleEnquiry}
                    className="w-full h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg shadow-xl shadow-purple-200 hover:scale-[1.02] transition-all animate-in fade-in slide-in-from-bottom-2"
                  >
                    Send Enquiry <Send className="ml-2 h-5 w-5" />
                  </Button>
                )}
                
              </div>
            </CardContent>
          </Card>

          {/* Footer Info */}
          {!isPublicParty && (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Info className="w-4 h-4" />
              <span>We usually reply within 24 hours!</span>
            </div>
          )}
          
        </div>
      </div>
    </section>
  )
}