<template>
  <form @submit.prevent="onSubmit" class="checkout-form">
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label :for="field.attrs.id">{{ field.label }}</label>

      <input
        v-if="field.mask"
        v-model="values[field.name]"
        v-bind="field.attrs"
        v-mask="field.mask"
        @blur="() => validateField(field.name)"
      />

      <input
        v-else
        v-model="values[field.name]"
        v-bind="field.attrs"
        @blur="() => validateField(field.name)"
      />

      <span v-if="errors[field.name]" class="error">{{ errors[field.name] }}</span>
    </div>

    <button type="button" @click="searchCEP" class="search-cep">Buscar CEP</button>
    <button type="submit" class="submit-button">Finalizar Compra</button>

    <SuccessModal :show="showModal" @close="showModal = false" autoClose />
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import SuccessModal from "@/components/SuccessModal.vue";
import { getValidationSchema, fields, handleCEPSearch } from "@/viewmodels/CheckoutViewModel";

const schema = getValidationSchema();
const store = useStore();
const showModal = ref(false);

const { handleSubmit, errors, values, validateField, setFieldValue, setFieldError } = useForm({
  validationSchema: schema,
  initialValues: Object.fromEntries(fields.map((field) => [field.name, ""])),
});

const searchCEP = () => handleCEPSearch(values, validateField, setFieldValue, setFieldError);

const onSubmit = handleSubmit(() => {
  showModal.value = true;
  store.commit("clearCart");
});
</script>

<style scoped>
.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-field {
  display: flex;
  flex-direction: column;
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
</style>
