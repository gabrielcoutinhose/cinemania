<template>
  <ul class="cart-list">
    <li v-for="item in items" :key="item.id" class="cart-item">
      <span class="title">{{ item.title }}:</span>
      <span v-if="showPrice" class="price">
         <p>R$ {{ item.price ? Number(item.price).toFixed(2) : '0,00' }}</p>
      </span>
      <button @click="$emit('remove', item.id)" class="remove">Remover</button>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  items: Array,
  showPrice: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["remove"]);
</script>

<style scoped>
.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.title {
  flex: 1;
  font-weight: 500;
  margin-right: 1rem;
}

.price {
  margin-right: 1rem;
  white-space: nowrap;
}

.remove {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
}

.remove:hover {
  background: #dc2626;
}
</style>
