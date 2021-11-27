import axios from "axios";

export default {
  //Family
  newFamily: () => {
    return axios.post("http://10.201.1.76:3000/api/family/newFamily");
  },

  //Cart
  getCartItems: () => {
    return axios.get("http://10.201.1.76:3000/api/cart/items");
  },
  AddItem: (data) => {
    console.log(data);
    return axios.put("http://10.201.1.76:3000/api/cart/addItem", { data });
  },
  Checkoff: (data, cart) => {
    return axios.put("http://10.201.1.76:3000/api/cart/checkoff", {
      data,
      cart,
    });
  },
};
