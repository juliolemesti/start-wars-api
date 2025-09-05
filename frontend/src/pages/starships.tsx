import type React from 'react'
import { StarshipList } from '../components/starship/starshipList'
import { useFetchStarships } from '../hooks/useFetchStarships'
import { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'

export const StarshipsPage: React.FC = () => {
  const { starships, fetchStarships } = useFetchStarships()
  const { logout } = useAuthContext()

  useEffect(() => {
    fetchStarships()
  }, [fetchStarships])

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold underline">Starships</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <StarshipList starships={starships} />
    </div>
  )
}