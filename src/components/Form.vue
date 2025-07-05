<template>
  <form @submit.prevent="onSubmit" class="checkout-form" novalidate>
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label :for="field.attrs.id">{{ field.label }}</label>

      <input
        v-if="field.mask"
        :value="values[field.name]"
        @input="(e) => setFieldValue(field.name, e.target.value)"
        v-bind="field.attrs"
        v-mask="field.mask"
        @blur="() => onBlur(field.name)"
      />

      <input
        v-else
        :value="values[field.name]"
        @input="(e) => setFieldValue(field.name, e.target.value)"
        v-bind="field.attrs"
        @blur="() => onBlur(field.name)"
      />

      <span v-if="touched[field.name] && errors[field.name]" class="error">
        {{ errors[field.name] }}
      </span>
    </div>

    <div class="form-buttons">
      <button @click="searchCEP" type="button" class="search-cep">Buscar CEP</button>
      <button type="submit" class="submit-button">Finalizar</button>
    </div>

    <SuccessModal :show="showModal" @close="handleModalClose" autoClose />
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import SuccessModal from "@/components/SuccessModal.vue";
import { getValidationSchema, fields, handleCEPSearch } from "@/viewmodels/CheckoutViewModel";

const router = useRouter();
const store = useStore();

const showModal = ref(false);
const touched = reactive({});

const schema = getValidationSchema();

const { handleSubmit, errors, values, validateField, setFieldValue, setFieldError, resetForm } =
  useForm({
    validationSchema: schema,
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: false,
    validateOnInput: true,
    initialValues: Object.fromEntries(fields.map((f) => [f.name, ""])),
  });

function onBlur(fieldName) {
  touched[fieldName] = true;
  validateField(fieldName);
}

function searchCEP() {
  handleCEPSearch(values, validateField, setFieldValue, setFieldError);
}

const onSubmit = handleSubmit(async () => {
  showModal.value = true;
  await new Promise((resolve) => setTimeout(resolve, 3000));

  await store.dispatch("finalizePurchase");

  resetForm();

  setTimeout(() => {
    showModal.value = false;
    Object.keys(touched).forEach((k) => (touched[k] = false));
    router.push("/");
  }, 100);
});

function handleModalClose() {
  showModal.value = false;
}
</script>

<style scoped>
.checkout-form {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.checkout-form .form-field {
  display: flex;
  flex-direction: column;
  grid-column: span 2;
}

.checkout-form .form-field.full-width {
  grid-column: span 2;
}

.submit-button {
  grid-column: span 2;
}

.form-field label {
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.form-field input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.3rem;
}

.search-cep {
  align-self: flex-start;
  background-color: #3b82f6;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.search-cep:hover {
  background-color: #2563eb;
}

.submit-button {
  background-color: #22c55e;
  color: white;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #16a34a;
}

.form-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  grid-column: span 2;
  width: 100%;
}

.search-cep,
.submit-button {
  flex: 1;
  width: 100%;
}

@media (max-width: 768px) {
  .checkout-form {
    display: flex;
    flex-direction: column;
  }
}

.form-buttons {
  flex-direction: row;
}

.search-cep,
.submit-button {
  width: auto;
}
</style>
