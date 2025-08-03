"use client"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const TIERS = ["free", "silver", "gold", "platinum"]

export default function EventsList() {
  const { user, isLoaded } = useUser()
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const userTier = (user?.publicMetadata?.tier as string) || "free"
  const allowedTiers = TIERS.slice(0, TIERS.indexOf(userTier) + 1)

  useEffect(() => {
    if (!isLoaded) return
    setLoading(true)
    supabase
      .from("events")
      .select("*")
      .in("tier", allowedTiers)
      .order("event_date", { ascending: true })
      .then(({ data }) => {
        setEvents(data || [])
        setLoading(false)
      })
  }, [isLoaded, userTier])

  if (!isLoaded || loading) return <div>Loading events...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {events.map(event => (
        <div key={event.id} className="bg-white rounded shadow p-4 flex flex-col">
          <img
            src={event.image_url || "/placeholder.jpg"}
            alt=""
            className="w-full h-32 object-cover rounded mb-2"
          />
          <span className={`inline-block px-3 py-1 text-xs rounded-full mb-2 ${
            event.tier === "free" ? "bg-green-200 text-green-800"
            : event.tier === "silver" ? "bg-gray-200 text-gray-800"
            : event.tier === "gold" ? "bg-yellow-200 text-yellow-800"
            : "bg-gradient-to-r from-gray-900 to-blue-400 text-white"
          }`}>
            {event.tier.toUpperCase()}
          </span>
          <h4 className="font-bold mb-2">{event.title}</h4>
          <p className="text-sm mb-3 flex-grow">{event.description}</p>
          <p className="text-xs text-gray-500">
            {new Date(event.event_date).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}