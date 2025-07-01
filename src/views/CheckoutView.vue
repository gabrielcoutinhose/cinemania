  <template>
    <div class="checkout-wrapper">
      <Header @toggle-favorites="toggleFavorites" @toggle-cart="toggleCart" />
      <SidebarFavorites v-if="showFavorites" @close="toggleFavorites" />
      <SidebarCart v-show="showCart" @close="toggleCart" class="sidebar cart" />
      <MainCheckoutBox>
        <h1 class="page-title">Finalizar Compra</h1>
        <div class="checkout-content">
          <Form @submit-success="handleSuccess" />
          <CheckoutCard />
        </div>
      </MainCheckoutBox>
      <SuccessModal :show="showModal" @close="showModal = false" autoClose />
    </div>
  </template>

  <script setup>
  import { ref } from "vue";
  import Header from "@/components/Header.vue";
  import MainCheckoutBox from "@/components/MainCheckoutBox.vue";
  import SidebarFavorites from "@/components/SidebarFavorites.vue";
  import SidebarCart from "@/components/SidebarCart.vue";
  import Form from "@/components/Form.vue";
  import CheckoutCard from "@/components/CheckoutCard.vue";
  import SuccessModal from "@/components/SuccessModal.vue";
  import { useHomeViewModel } from "@/viewmodels/HomeViewModel";

  const { showFavorites, showCart, toggleFavorites, toggleCart } = useHomeViewModel();
  const showModal = ref(false);
  const handleSuccess = () => (showModal.value = true);
  </script>

  <style scoped>
  .checkout-wrapper {
    min-height: 100vh;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;
  }

  .page-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
  }

  .checkout-content {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .checkout-content {
      flex-direction: column;
    }
  }
  </style>
