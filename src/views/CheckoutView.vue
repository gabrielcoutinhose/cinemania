<template>
  <div class="checkout-container">
    <form @submit.prevent="onSubmit" novalidate>
      <h2>Dados do Cliente</h2>

      <div v-for="field in fields" :key="field.name" class="form-group">
        <label :for="field.name">{{ field.label }}</label>
        <input
          v-bind="field.attrs"
          v-maska="field.mask || null"
          v-model="values[field.name]"
          :class="{ invalid: errors[field.name] }"
          @blur="field.name === 'cep' ? handleCEPSearch() : null"
        />
        <small v-if="errors[field.name]" class="error-msg">{{ errors[field.name] }}</small>

        <a
          v-if="field.name === 'cep'"
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
          class="cep-help-link"
        >
          Não sabe o CEP?
        </a>
      </div>

      <button type="submit" class="btn-primary">Finalizar Compra</button>
    </form>

    <aside class="order-summary">
      <h2>Resumo do Pedido</h2>
      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Qtd</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td><img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`" alt="Poster" /></td>
            <td>{{ item.title }}</td>
            <td>{{ item.quantity }}</td>
            <td>R$ {{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button @click="removeItem(item.id)" class="btn-trash" title="Remover">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total</td>
            <td>R$ {{ total.toFixed(2) }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </aside>

    <SuccessModal :show="showModal" autoClose @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import { useForm } from "vee-validate";
import * as yup from "yup";

import maska from "maska";
defineDirective("maska", maska);

import { fetchCEP } from "@/services/viacep";
import SuccessModal from "@/components/SuccessModal.vue";

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  celular: yup
    .string()
    .required("Celular é obrigatório")
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular inválido"),
  email: yup
    .string()
    .required("Email é obrigatório")
    .trim("Sem espaços em branco no início ou fim")
    .min(5, "Email deve ter no mínimo 5 caracteres")
    .max(100, "Email deve ter no máximo 100 caracteres")
    .email("Email inválido"),
  cep: yup
    .string()
    .required("CEP é obrigatório")
    .matches(/^\d{5}-\d{3}$/, "CEP inválido"),
  endereco: yup.string().required("Endereço é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatória"),
  estado: yup.string().required("Estado é obrigatório").length(2, "Estado inválido"),
});

const { handleSubmit, errors, values, validateField, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    nome: "",
    cpf: "",
    celular: "",
    email: "",
    cep: "",
    endereco: "",
    cidade: "",
    estado: "",
  },
});

const fields = [
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

async function handleCEPSearch() {
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

const store = useStore();
const cart = computed(() => store.state.cart);
const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

function removeItem(id) {
  store.commit("removeFromCart", id);
}

const showModal = ref(false);
const onSubmit = handleSubmit(() => {
  showModal.value = true;
  store.commit("clearCart");
});
</script>

<style scoped lang="scss">
.checkout-container {
  display: flex;
  gap: 2rem;
  padding: 2rem;

  form {
    flex: 1;
    max-width: 400px;

    h2 {
      margin-bottom: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.3rem;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;

        &.invalid {
          border-color: #e53935;
        }
      }

      .error-msg {
        color: #e53935;
        font-size: 0.8rem;
        margin-top: 0.2rem;
      }
    }

    .cep-help-link {
      display: inline-block;
      margin-top: 0.3rem;
      font-size: 0.8rem;
      color: #4caf50;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: #388e3c;
      }
    }

    .btn-primary {
      padding: 0.7rem 1.2rem;
      background-color: #4caf50;
      border: none;
      border-radius: 6px;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #388e3c;
      }
    }
  }

  .order-summary {
    width: 400px;

    h2 {
      margin-bottom: 1rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      thead {
        background: #1f1f1f;
        color: white;
      }

      th,
      td {
        padding: 0.5rem;
        border: 1px solid #ddd;
        text-align: center;
        vertical-align: middle;
      }

      img {
        max-width: 60px;
        border-radius: 6px;
      }

      .btn-trash {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.3rem;
        color: #e53935;
        transition: color 0.2s ease;

        &:hover {
          color: #b71c1c;
        }
      }

      tfoot {
        font-weight: 700;
        background: #ddd;
      }
    }
  }
}
</style>
