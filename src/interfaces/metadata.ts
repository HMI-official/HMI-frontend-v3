export interface IMetadata {
  name: string;
  image: string;
  crown: crown;
  planet: string;
}

export type crown = "Diamond" | "Gold" | "Silver";
