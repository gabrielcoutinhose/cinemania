<template>
  <div class="table-wrapper">
    <table class="cart-table">
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
        <tr v-for="item in items" :key="item.id">
          <td>
            <img
              :src="item.image ? getFullImageUrl(item.image) : 'https://via.placeholder.com/32x32?text=Img'"
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
  </div>
</template>

<script setup>
defineProps({
  items: Array,
});
defineEmits(["remove"]);
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cart-table {
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
}

.cart-table th,
.cart-table td {
  padding: 0.6rem;
  text-align: left;
  font-size: 0.95rem;
  vertical-align: middle;
}

.item-img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  background: transparent;
  border-radius: 6px;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: 1.1rem;
}

.remove-btn:hover {
  opacity: 0.8;
}
</style>
