import type { Starship } from "../../types/starship.dto"

export const StarshipManufacturerSelect: React.FC<{
  starships: Starship[]
  selectedManufacturer: string
  onManufacturerChange: (manufacturer: string) => void
}> = ({ starships, selectedManufacturer, onManufacturerChange }) => {
  const manufacturers: string[] = ["All", ...getManufacturers(starships)]

  return (
    <div className="my-4 mb-10">
      <label htmlFor="manufacturer-select" className="mr-2 font-semibold">
        Filter by manufacturer:
      </label>
      <select
        id="manufacturer-select"
        value={selectedManufacturer}
        onChange={(e) => onManufacturerChange(e.target.value)}
        className="border px-2 py-1"
      >
        {manufacturers.map((manufacturer) => (
          <option key={manufacturer} value={manufacturer}>
            {manufacturer}
          </option>
        ))}
      </select>
    </div>
  )
}

// Get unique manufacturers for the select options
const getManufacturers = (starshipsList: Starship[]): string[] => {
  const manufacturers = starshipsList.map((s) => s.manufacturer)
  return Array.from(new Set(manufacturers))
}
