import type { Starship } from "../../types/starship.dto"

export const StarshipItem: React.FC<{ starship: Starship }> = ({ starship }) => {
  return (
    <tr key={starship.id} className="hover:bg-gray-50">
      <td className="border px-4 py-2">{starship.name}</td>
      <td className="border px-4 py-2">{starship.model}</td>
      <td className="border px-4 py-2">{starship.manufacturer}</td>
      <td className="border px-4 py-2">{starship.starshipClass}</td>
      <td className="border px-4 py-2 text-right">{starship.costInCredits === 'unknown' ? starship.costInCredits : Number(starship.costInCredits).toLocaleString("en-US")}</td>
    </tr>
  )
}
