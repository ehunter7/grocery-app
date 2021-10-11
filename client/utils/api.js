import axios from "axios";

export default {
  getCartItems: () => {
    return axios.get("http://10.201.1.76:3000/api/cart/items");
  },
  AddItem: (data) => {
    return axios.post("http://10.201.1.76:3000/api/cart/addItem", data);
  },
};
