import { fetchCEP } from "@/services/viacep";
import * as yup from "yup";

export function getValidationSchema() {
  return yup.object({
    nome: yup.string().required("Nome é obrigatório"),
    cpf: yup
      .string()
      .required("CPF é obrigatório")
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
    celular: yup
      .string()
      .required("Celular é obrigatório")
      .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular inválido"),
    email: yup.string().required("Email é obrigatório").email("Email inválido"),
    cep: yup
      .string()
      .required("CEP é obrigatório")
      .matches(/^\d{5}-\d{3}$/, "CEP inválido"),
    endereco: yup.string().required("Endereço é obrigatório"),
    cidade: yup.string().required("Cidade é obrigatória"),
    estado: yup.string().required("Estado é obrigatório").length(2, "Estado inválido"),
  });
}

export async function handleCEPSearch(values, validateField, setFieldValue, errors) {
  const valid = await validateField("cep");
  if (!valid) return;

  try {
    const data = await fetchCEP(values.cep.replace("-", ""));
    if (data.erro) {
      setFieldValue("endereco", "");
      setFieldValue("cidade", "");
      setFieldValue("estado", "");
      errors.cep = "CEP não encontrado";
    } else {
      setFieldValue("endereco", data.logradouro || "");
      setFieldValue("cidade", data.localidade || "");
      setFieldValue("estado", data.uf || "");
      errors.cep = null;
    }
  } catch {
    errors.cep = "Erro ao buscar CEP";
  }
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
  { name: "email", label: "Email", attrs: { id: "email", type: "email", required: true } },
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
