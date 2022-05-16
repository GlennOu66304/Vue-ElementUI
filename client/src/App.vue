<template>
  <div id="app">
<keep-alive>
      <router-view />
</keep-alive>
  </div>
</template>

<script>
// axios import package
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      items: [],
      description: " ",
      editedDescription: " ",
      selected: {},
    };
  },

  // methods
  methods: {
    // add post axios request data
    async addItem() {
      const response = await axios.post("api/bucketListItems/", {
        description: this.description,
      });
      this.items.push(response.data);
      this.description = "";
    },

    // delet post axios request data
    async removeItem(item, i) {
      await axios.delete("api/bucketListItems/" + item._id);
      this.items.splice(i, 1);
    },

    select(item) {
      this.selected = item;

      this.editedDescription = item.description;
    },

    // state update the id content
    isSelected(item) {
      return item._id === this.selected._id;
    },

    // state update the content"retturn the content to zero
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },

    // update the post axios reques
    async updateItem(item, i) {
      const response = await axios.put("api/bucketListItems/" + item._id, {
        description: this.editedDescription,
      });
      this.items[i] = response.data;
      this.unselect();
    },
  },
};
</script>

<style lang="less" scoped>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>
