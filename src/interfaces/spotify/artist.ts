import { Image } from "./image";

export interface Artist extends SimplifiedArtist {
  followers: any,
  genres: Array<string>,
  images: Array<Image>,
  popularity: number,
}

export interface SimplifiedArtist {
  external_urls: any,
  href: string,
  id: string,
  name: string,
  type: string,
  uri: string
}
