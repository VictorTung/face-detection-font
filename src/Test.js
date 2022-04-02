import React, { useEffect } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

export default function Test() {
  const fetchCharacters = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
  };

  const data = useQuery("characters", fetchCharacters);
  console.log(data);
  return <>123</>;
}
