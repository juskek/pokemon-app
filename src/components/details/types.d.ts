type PokemonStats = {
    name: string,
    url: string,
    height: number,
    weight: number,
    abilities: Ability[],
    moves: Move[],
}

interface Ability {
    ability: {
        name: string;
        url: string;
    };
}

interface Move {
    move: {
      name: string;
      url: string;
    };
  }
  