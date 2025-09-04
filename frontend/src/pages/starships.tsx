import type React from 'react'
import type { Starship } from '../types/starship.dto'
import { StarshipList } from '../components/starship/startship-list'

export const StarshipsPage: React.FC = () => {
    return (
    <div className='max-w-[1200px] mx-auto px-4'>
      <h1 className='text-3xl font-bold underline mt-10 mb-10'>Starships</h1>

      <StarshipList starships={starships} />
    </div>
  )
}

// Mock data for demonstration
const starships: Starship[] = [
  {
    id: 1,
    name: "Millennium Falcon",
    model: "YT-1300",
    manufacturer: "Corellian Engineering Corporation",
    starshipClass: "Light freighter",
    costInCredits: "100000"
  },
  {
    id: 2,
    name: "X-wing",
    model: "T-65B",
    manufacturer: "Incom Corporation",
    starshipClass: "Starfighter",
    costInCredits: "149999"
  },
  {
    id: 3,
    name: "TIE Fighter",
    model: "Twin Ion Engine",
    manufacturer: "Sienar Fleet Systems",
    starshipClass: "Starfighter",
    costInCredits: "75000"
  }
  // ...add more starships as needed
]