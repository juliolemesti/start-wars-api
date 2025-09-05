import { useState, useCallback } from 'react'
import type { Starship } from '../types/starship.dto'
import starshipsApi from '../services/starshipService'
import { getWithExpiry, setWithExpiry } from '../util/storage'

const STORAGE_KEY = 'starships_cache'
const CACHE_TTL = 1000 * 60 * 15

export const useFetchStarships = () => {
  const [starships, setStarships] = useState<Starship[]>(() => {
    return getWithExpiry(STORAGE_KEY) || []
  })
  const [loading, setLoading] = useState(starships.length === 0)
  const [error, setError] = useState<string | null>(null)

  const fetchStarships = useCallback(async () => {
    const cached = getWithExpiry(STORAGE_KEY)
    if (cached) {
      setStarships(cached)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const data = await starshipsApi.getStarships()
      setStarships(data)
      setWithExpiry(STORAGE_KEY, data, CACHE_TTL)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  return { starships, loading, error, fetchStarships }
}