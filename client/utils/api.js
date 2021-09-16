import axios from "axios";

export default {
  firstRequest: () => {
    return axios.get("/get");
  },
};
