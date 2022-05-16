<template>
  <div id="app">
    <!-- title  -->
    <!-- sub titile css -->
    <h1 class="subtitle has-text-centered">Bucket List:</h1>
    <!-- underline -->
    <hr />

    <!-- static UI, input box-->
    <!-- 0).input the add content into the search bar, and click the add, will add the value;; -->
    <div class="field has-addons">
      <!-- input section -->
      <div class="control is-expand">
        <input
          class="input"
          v-model="description"
          type="text"
          placeholder="Go to mars..."
        />
      </div>

      <!-- add Button -->

      <div class="control">
        <!-- axios add post click -->
        <a class="button is-info" @click="addItem" :disabled="!description"
          >Add</a
        >
      </div>
    </div>

    <!-- drop down section -->
    <!-- lay out css for the listed item in the drop down -->
    <div class="notification" v-for="(item, i) in items" :Key="item._id">
      <div class="columns">
        <input
          class="column input"
          v-if="isSelected(item)"
          v-model="editedDescription"
        />

        <!-- 0.1) render the  dropdown content area -->
        <!-- left content , render the drop down content-->
        <p v-else class="column">
          <!-- number of the post -->
          <span class="tag is-primary"> {{ i + 1 }} </span>
          <!-- post description -->
          {{ item.description }}
        </p>

        <!-- right content -->

        <div class="column is-narrow">
          <!-- select icon then show edit area-->
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ? unselect() : select(item)"
          >
            <!-- selected icon, then show the code icon, other wise show the edit icon -->
            <!-- 
            1.pen icon is the edit
            2.close icon the is X -->
            <!-- 2) click the dropdown post pen icon:
a:have the x close icon can close the page
b:have the file icon save the change -->
            <i class="material-icons">
              {{ isSelected(item) ? "close" : "edit" }}</i
            >
          </span>

          <!-- click the item, then select the item, choose the update the post or remove item-->
         
         <!-- 3)click the trash bin delete icon, will remove this post -->
          <span
            class="icon has-text-info"
            @click="
              isSelected(item) ? updateItem(item, i) : removeItem(item, i)
            "
          >
            <!-- save or delted UI area -->
            <!-- 
              1.save icon is the folder 
              2. detete icon is the trash bin
              -->
            <i class="material-icons">{{
              isSelected(item) ? "save" : "delete"
            }}</i>
          </span>
        </div>
      </div>
    </div>
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

  // mouted:send the axios requests get the post data
  async mounted() {
    const response = await axios.get("api/bucketListItems/");
    this.items = response.data;
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

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>
