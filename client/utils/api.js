import axios from "axios";

export default {
  getItems: () => {
    return axios.get("http://10.201.1.76:3000/api/cart/items");
  },
};
