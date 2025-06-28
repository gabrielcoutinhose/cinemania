<template>
  <transition name="fade-slide">
    <div v-if="show" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h2>Compra realizada com sucesso!</h2>
        <p>
          <slot>Obrigado por comprar conosco. Seu pedido está sendo processado.</slot>
        </p>
        <button @click="close">Fechar</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onBeforeUnmount, watch } from "vue";

const props = defineProps({
  show: Boolean,
  autoClose: Boolean,
  duration: {
    type: Number,
    default: 3000,
  },
});

const emit = defineEmits(["close"]);

let timer;

function close() {
  emit("close");
}

function handleEsc(e) {
  if (e.key === "Escape") close();
}

watch(
  () => props.show,
  (val) => {
    if (val) {
      document.addEventListener("keydown", handleEsc);
      if (props.autoClose) {
        clearTimeout(timer);
        timer = setTimeout(close, props.duration);
      }
    } else {
      document.removeEventListener("keydown", handleEsc);
      clearTimeout(timer);
    }
  },
);

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEsc);
  clearTimeout(timer);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: pop 0.3s ease-out;
}

button {
  margin-top: 1rem;
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #16a34a;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes pop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
