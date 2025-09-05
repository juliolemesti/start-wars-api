import { useCallback, useState } from "react"
import type { Starship } from "../types/starship.dto"
import starshipsApi from "../services/starshipService"

export const useFetchStarships = () => {
  const [starships, setStarships] = useState<Starship[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStarships = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const starships = await starshipsApi.getStarships()
      setStarships(starships)
    } catch (err: any) {
      setError(err.message || "Failed to fetch starships")
    } finally {
      setLoading(false)
    }
  }, [])

  return { starships, loading, error, fetchStarships }
}
