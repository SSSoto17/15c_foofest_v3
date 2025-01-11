import { endpointAPI } from "./endpoints";

export async function getArtists() {
  const response = await fetch(`${endpointAPI}/bands`, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}

export async function getArtistBySlug(slug) {
  const response = await fetch(`${endpointAPI}/bands/${slug}`, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}

export async function getStages() {
  const response = await fetch(`${endpointAPI}/schedule`, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}
