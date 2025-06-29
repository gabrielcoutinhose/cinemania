<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useForm } from "vee-validate";
import SuccessModal from "@/components/SuccessModal.vue";

import { getValidationSchema, fields, handleCEPSearch } from "@/viewmodels/CheckoutViewModel";

const schema = getValidationSchema();

const { handleSubmit, errors, values, validateField, setFieldValue, setFieldError } = useForm({
  validationSchema: schema,
  initialValues: Object.fromEntries(fields.map((field) => [field.name, ""])),
});

const store = useStore();

const cart = computed(() => store.state.cart);
const total = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

const showModal = ref(false);

function removeItem(id) {
  store.commit("removeFromCart", id);
}

const onSubmit = handleSubmit(() => {
  showModal.value = true;
  store.commit("clearCart");
});
</script>
