import axios from "axios";
import config from "@/config";

const api = axios.create({
  baseURL: config.api.baseURL,
});

export const fetchPopularMovies = async () => {
  const { data } = await api.get("/movie/popular", {
    params: {
      api_key: config.api.key,
      language: "pt-BR",
    },
  });
  return data.results;
};
