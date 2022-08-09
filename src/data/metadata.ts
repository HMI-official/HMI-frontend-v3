import { HMI_HEROS_BG, HMI_HEROS_BG_SHOWCASE } from "./../constants/image";
interface IMetadata {
  name: string;
  image: string;
  crown: "Diamond" | "Gold" | "Silver";
  planet: string;
}

export const fakeMetadata: IMetadata[] = [
  {
    name: "HI-PLANET #1",
    image: HMI_HEROS_BG.earth,
    crown: "Gold",
    planet: "Earth",
  },
  {
    name: "HI-PLANET #2",
    image: HMI_HEROS_BG.jupiter,
    crown: "Gold",
    planet: "Jupiter",
  },
  {
    name: "HI-PLANET #3",
    image: HMI_HEROS_BG.mars,
    crown: "Gold",
    planet: "Mars",
  },
  {
    name: "HI-PLANET #4",
    image: HMI_HEROS_BG_SHOWCASE.dia1,
    crown: "Diamond",
    planet: "Saturn",
  },
  {
    name: "HI-PLANET #5",
    image: HMI_HEROS_BG.mercury,
    crown: "Silver",
    planet: "Mercury",
  },
  {
    name: "HI-PLANET #6",
    image: HMI_HEROS_BG.moon,
    crown: "Silver",
    planet: "Moon",
  },
  {
    name: "HI-PLANET #6",
    image: HMI_HEROS_BG_SHOWCASE.dia2,
    crown: "Diamond",
    planet: "Saturn",
  },
  {
    name: "HI-PLANET #7",
    image: HMI_HEROS_BG.neptune,
    crown: "Gold",
    planet: "Neptune",
  },
  {
    name: "HI-PLANET #8",
    image: HMI_HEROS_BG_SHOWCASE.dia3,
    crown: "Diamond",
    planet: "Earth",
  },
  {
    name: "HI-PLANET #9",
    image: HMI_HEROS_BG.pluto,
    crown: "Gold",
    planet: "Pluto",
  },

  {
    name: "HI-PLANET #10",
    image: HMI_HEROS_BG.saturn,
    crown: "Gold",
    planet: "Saturn",
  },

  {
    name: "HI-PLANET #11",
    image: HMI_HEROS_BG_SHOWCASE.dia4,
    crown: "Diamond",
    planet: "Venus",
  },

  {
    name: "HI-PLANET #12",
    image: HMI_HEROS_BG.sun,
    crown: "Gold",
    planet: "Sun",
  },

  {
    name: "HI-PLANET #13",
    image: HMI_HEROS_BG.uranus,
    crown: "Silver",
    planet: "Uranus",
  },

  {
    name: "HI-PLANET #14",
    image: HMI_HEROS_BG_SHOWCASE.dia5,
    crown: "Diamond",
    planet: "Venus",
  },
  {
    name: "HI-PLANET #15",
    image: HMI_HEROS_BG.venus,
    crown: "Silver",
    planet: "Venus",
  },
];

export const fakeDataRanks = fakeMetadata.reduce(
  (acc: any, curr) => {
    if (!acc.ranks[curr.crown.toLowerCase()])
      acc.ranks[curr.crown.toLowerCase()] = 0;
    if (!acc.planets[curr.planet.toLocaleLowerCase()])
      acc.planets[curr.planet.toLocaleLowerCase()] = 0;
    acc.ranks[curr.crown.toLowerCase()]++;
    acc.planets[curr.planet.toLocaleLowerCase()]++;

    return acc;
  },
  { ranks: {}, planets: {} }
) as { ranks: { [key: string]: number }; planets: { [key: string]: number } };

// console.log(fakeDataRanks);
