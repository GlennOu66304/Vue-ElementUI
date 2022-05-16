import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { Form, FormItem, Input, Button, Select } from "element-ui";

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);

Vue.use(Button);
Vue.use(Select);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
