"use client"
import { useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function TestSupabase() {
  useEffect(() => {
    const fetchEvents = async () => {
      let { data, error } = await supabase.from('events').select('*')
      console.log(data, error)
    }
    fetchEvents()
  }, [])

  return <div>Check the console for data from Supabase!</div>
}