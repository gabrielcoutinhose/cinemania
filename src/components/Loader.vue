<template>
  <div class="loader" role="status" aria-label="Carregando conteúdo..."></div>
</template>

<style lang="scss" scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #ccc;
  border-top-color: #2196f3;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 40px auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
