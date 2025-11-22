
export interface PokemonType {
  name: string;
  url: string;
  pokemon?: { pokemon: { name: string; url: string } }[]; 
}