interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
}

export default function PokemonCard({ name, image, types }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Template pour la carte Pokemon */}
    </div>
  );
} 