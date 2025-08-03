"use client"
import { useUser } from "@clerk/nextjs"

const TIERS = ["free", "silver", "gold", "platinum"]

export default function UpgradeTier() {
  const { user, isLoaded } = useUser()
  if (!isLoaded) return null
  const currentTier = (user?.publicMetadata?.tier as string) || "free"
  const currentIndex = TIERS.indexOf(currentTier)

  function handleUpgrade() {
    if (currentIndex < TIERS.length - 1) {
      const next = TIERS[currentIndex + 1]
      user?.update({ publicMetadata: { tier: next } }).then(() => window.location.reload())
    }
  }

  if (currentIndex === TIERS.length - 1) return null
  return (
    <button
      onClick={handleUpgrade}
      className="bg-blue-600 text-white px-3 py-1 rounded mb-4"
    >
      Upgrade to {TIERS[currentIndex + 1].toUpperCase()}
    </button>
  )
} 