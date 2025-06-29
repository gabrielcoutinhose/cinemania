import { ref } from "vue";
import { useRouter } from "vue-router";

export function useHomeViewModel() {
  const router = useRouter();
  const showFavorites = ref(false);
  const showCart = ref(false);

  const toggleFavorites = () => {
    if (!showFavorites.value && showCart.value) showCart.value = false;
    showFavorites.value = !showFavorites.value;
  };

  const toggleCart = () => {
    if (!showCart.value && showFavorites.value) showFavorites.value = false;
    showCart.value = !showCart.value;
  };

  const goCheckout = () => {
    showCart.value = false;
    router.push({ name: "checkout" });
  };

  return { showFavorites, showCart, toggleFavorites, toggleCart, goCheckout };
}
