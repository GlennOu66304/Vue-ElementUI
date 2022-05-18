import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
Vue.prototype.$axios = axios
import {
  Form,
  FormItem,
  Input,
  Button,
  Select,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  Main,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Message,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Col,
  Row,
  Pagination,
  Switch,
  Option,
  Tabs,
  TabPane
} from "element-ui";

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);

Vue.use(MenuItem);
Vue.use(Main);
Vue.use(Header);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(Card);
Vue.use(BreadcrumbItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(Option);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.config.productionTip = false;
Vue.prototype.$message = Message
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
