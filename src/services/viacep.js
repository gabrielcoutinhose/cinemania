import axios from "axios";

export async function fetchCEP(cep) {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return data;
  } catch (error) {
    console.error("Failed to fetch CEP:", error);
    throw error;
  }
}
