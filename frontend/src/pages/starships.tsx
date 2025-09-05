import { StarshipList } from "../components/starship/starshipList"
import { useAuthContext } from "../context/AuthContext"
import { useFetchStarships } from "../hooks/useFetchStarships"
import { useEffect } from "react"

export const StarshipsPage: React.FC = () => {
  const { starships, loading, error, fetchStarships } = useFetchStarships()
  const { logout } = useAuthContext()

  useEffect(() => {
    fetchStarships()
  }, [fetchStarships])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-2">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-500" />
        <span className="text-gray-500 text-base">Fetching starships...</span>
      </div>
    )
  }

  if (error) return <p>Error: {error}</p>

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
