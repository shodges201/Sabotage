import axios from "axios";
const BASEURL = "https://dog.ceo/api/breeds/image/random";
// const APIKEY = "&apikey=trilogy";

export default {
  search: function() {
    return axios.get(BASEURL);
  }
};
