import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faShoppingCart, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export function installFontAwesome(app) {
  library.add(faHeart, faShoppingCart, faSearch, faTrash);
  app.component("font-awesome-icon", FontAwesomeIcon);
}
