import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/style/global.css";
import { requestForData } from "@/utils/common.js";

requestForData("https://api.megaport.com/v2/locations123", "get")
  .then((res) => {
    console.log("123123");
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
createApp(App).mount("#app");
