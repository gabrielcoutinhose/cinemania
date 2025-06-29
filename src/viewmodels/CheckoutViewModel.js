import * as yup from "yup";
import { fetchCEP } from "@/services/viacep";

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const CELULAR_REGEX = /^\(\d{2}\) \d{5}-\d{4}$/;
const CEP_REGEX = /^\d{5}-\d{3}$/;

export function getValidationSchema() {
  return yup.object({
    nome: yup.string().required("Nome é obrigatório"),
    cpf: yup.string().required("CPF é obrigatório").matches(CPF_REGEX, "CPF inválido"),
    celular: yup
      .string()
      .required("Celular é obrigatório")
      .matches(CELULAR_REGEX, "Celular inválido"),
    email: yup
      .string()
      .required("Email é obrigatório")
      .min(5, "Email deve ter no mínimo 5 caracteres")
      .max(100, "Email deve ter no máximo 100 caracteres")
      .email("Email inválido"),
    cep: yup.string().required("CEP é obrigatório").matches(CEP_REGEX, "CEP inválido"),
    endereco: yup.string().required("Endereço é obrigatório"),
    cidade: yup.string().required("Cidade é obrigatória"),
    estado: yup.string().required("Estado é obrigatório").length(2, "Estado inválido"),
  });
}

export const fields = [
  { name: "nome", label: "Nome Completo", attrs: { id: "nome", type: "text", required: true } },
  {
    name: "cpf",
    label: "CPF",
    attrs: { id: "cpf", placeholder: "000.000.000-00", required: true },
    mask: "###.###.###-##",
  },
  {
    name: "celular",
    label: "Celular",
    attrs: { id: "celular", placeholder: "(00) 00000-0000", required: true },
    mask: "(##) #####-####",
  },
  {
    name: "email",
    label: "Email",
    attrs: { id: "email", type: "email", required: true, placeholder: "exemplo@dominio.com" },
  },
  {
    name: "cep",
    label: "CEP",
    attrs: { id: "cep", placeholder: "00000-000", required: true },
    mask: "#####-###",
  },
  { name: "endereco", label: "Endereço", attrs: { id: "endereco", type: "text", required: true } },
  { name: "cidade", label: "Cidade", attrs: { id: "cidade", type: "text", required: true } },
  {
    name: "estado",
    label: "Estado",
    attrs: { id: "estado", type: "text", maxlength: 2, required: true },
  },
];

export async function handleCEPSearch(values, validateField, setFieldValue, setFieldError) {
  const isValid = await validateField("cep");
  if (!isValid) return;

  const rawCep = values.cep.replace("-", "");

  try {
    const data = await fetchCEP(rawCep);

    if (data?.erro) {
      ["endereco", "cidade", "estado"].forEach((field) => setFieldValue(field, ""));
      setFieldError("cep", "CEP não encontrado");
      return;
    }

    setFieldValue("endereco", data.logradouro || "");
    setFieldValue("cidade", data.localidade || "");
    setFieldValue("estado", data.uf || "");
    setFieldError("cep", null);
  } catch (err) {
    setFieldError("cep", "Erro ao buscar CEP");
    console.error("Erro ao buscar CEP:", err);
  }
}
