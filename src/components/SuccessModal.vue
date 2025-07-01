<template>
  <div v-if="show">
    <transition name="fade-slide" @after-leave="$emit('closed')">
      <div class="modal-overlay" @click.self="close">
        <div class="modal-content">
          <h2>Compra realizada com sucesso!</h2>
          <p><slot>Obrigado por comprar conosco. Seu pedido está sendo processado.</slot></p>
          <button class="close-button" @click="close">Fechar</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { watch, onBeforeUnmount } from 'vue';

const props = defineProps({
  show: Boolean,
  autoClose: Boolean,
  duration: { type: Number, default: 3000 },
});

const emit = defineEmits(['close', 'closed']);

let timer = null;

function close() {
  emit('close');
}

function handleEscape(e) {
  if (e.key === 'Escape') close();
}

function cleanup() {
  document.removeEventListener('keydown', handleEscape);
  clearTimeout(timer);
}

watch(
  () => props.show,
  (visible) => {
    if (visible) {
      document.addEventListener('keydown', handleEscape);
      if (props.autoClose) {
        clearTimeout(timer);
        timer = setTimeout(close, props.duration);
      }
    } else {
      cleanup();
    }
  },
);

onBeforeUnmount(cleanup);
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
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: pop 0.3s ease-out;
}

.close-button {
  margin-top: 1rem;
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.close-button:hover {
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
