interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
}

export default function PokemonCard({ name, image, types }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-center">
        <img src={image} alt={name} className="w-32 h-32" />
        <h2 className="text-lg font-bold">{name}</h2>
        <div className="flex">
          {types.map((type) => (
            <span key={type} className="px-2 py-1 bg-gray-200 rounded-full">
              {type}
            </span>
          ))}
      </div>
    </div>
  );
} 