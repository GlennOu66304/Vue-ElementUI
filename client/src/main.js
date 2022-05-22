import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import VueQuillEditor from "vue-quill-editor";
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.prototype.$axios = axios;
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = window.sessionStorage.getItem("token");
    // console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
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
  MessageBox,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Col,
  Row,
  Pagination,
  Switch,
  Option,
  Tabs,
  TabPane,
  Dialog,
  Tag,
  Tree,
  Steps,
  Step,
  Alert,
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
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Alert);
Vue.config.productionTip = false;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;


Vue.use(VueQuillEditor /* { default global options } */);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
