import axios from "axios";

axios.defaults.baseURL = "https://fitandfine-drf-be560b223a3b.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;