<template>
  <table class="cart-table">
    <thead>
      <tr>
        <th>Imagem</th>
        <th>Nome</th>
        <th>Qtd</th>
        <th>Preço</th>
        <th>Remover</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>
          <img
            :src="item.image || 'https://via.placeholder.com/48x48?text=Img'"
            alt="Imagem"
            class="item-img"
          />
        </td>
        <td>{{ item.title }}</td>
        <td>{{ item.quantity || 1 }}</td>
        <td>R$ {{ Number(item.price).toFixed(2) }}</td>
        <td>
          <button @click="$emit('remove', item.id)" class="remove-btn">🗑️</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  items: Array,
});
defineEmits(["remove"]);
</script>

<style scoped>
.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.cart-table th,
.cart-table td {
  padding: 0.6rem;
  text-align: left;
  font-size: 0.95rem;
  vertical-align: middle;
}

.item-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  background: #e5e7eb;
  border-radius: 6px;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1.1rem;
}

.remove-btn:hover {
  color: #dc2626;
}

@media (max-width: 768px) {
}
</style>
