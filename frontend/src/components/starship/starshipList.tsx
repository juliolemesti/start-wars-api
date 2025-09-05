import { useState } from "react"
import type { Starship } from "../../types/starship.dto"
import { StarshipManufacturerSelect } from "./starshipManufacturerSelect"
import { StarshipItem } from "./starshipItem"

interface StarshipListProps {
  starships: Starship[] | undefined
}
export const StarshipList: React.FC<StarshipListProps> = ({ starships = [] }) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("All")

  // Filter starships by manufacturer
  const filteredStarships: Starship[] =
    selectedManufacturer === "All"
      ? starships
      : starships.filter((s) => s.manufacturer === selectedManufacturer)

  return (
    <>
      {/* Manufacturer sorting select */}
      <StarshipManufacturerSelect
        starships={starships}
        selectedManufacturer={selectedManufacturer}
        onManufacturerChange={setSelectedManufacturer}
      />

      {/* Starships table */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Model</th>
            <th className="border px-4 py-2 text-left">Manufacturer</th>
            <th className="border px-4 py-2 text-left">Class</th>
            <th className="border px-4 py-2 text-right">Cost in Credits</th>
          </tr>
        </thead>
        <tbody>
          {filteredStarships.map((starship) => <StarshipItem key={starship.id} starship={starship} />)}
        </tbody>
      </table>
    </>
  )
}
