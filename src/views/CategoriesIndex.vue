<template>
  <div class="categories-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Library to View and Edit <span class="text-primary">Saved</span> Categories.
                </h2>
                <p class="lead text-white-gray">
                    Click on any tile to open a saved category, view, and edit.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">08</h3>
                    </div> 
                    <h4>Categories</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container my-4">
      
      <div class="row mb-4"></div>
      <form class="col-6 offset-3"
      v-on:submit.prevent="createCategory()">
        <h1 class="text-center mb-5">New Category</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Category Name </label>
          <input class="form-control" type="text" v-model="name">
        </div>

        <div class="form-group col-md-6">
          Organization
          <select v-model="organization_id">
            <option value="">Select an Organization</option>
            <option v-bind:value="organization.id" v-for="organization in organizations">{{organization.name}}
            </option>
          </select>
        </div>


        <input class="btn btn-info" type="submit" value="Add New Category">
      </form>
    </div>

    <div class="container my-4">
      <h1 class="text-center mb-5">Categories</h1>
      <div class="row">
        <div class="col-sm-4 mb-2" v-for="category in categories">
          <router-link v-bind:to="'/categories/' + category.id">
            <div class="card">
              <div class="card-body text-info">
                <h5 class="card-name">{{category.name}}</h5>
              </div>
            </div>
          </router-link>
          <div>
            <button v-on:click="category.showEditCategoryForm = !category.showEditCategoryForm">Edit Category</button>

            <div v-if="category.showEditCategoryForm">
                  <div class="container my-4">
                    <div class="row">
                      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateCategory()">
                        <h1 class="text-center mb-5">Edit Category</h1>
                        <ul>
                          <li class="text-danger" v-for="error in errors">{{ error }}</li>
                        </ul>

                        <div class="form-group">
                          <label>Category Name: </label>
                          <input class="form-control" type="text" v-model="category.name">
                        </div>

                        <input class="btn btn-info m-2" type="submit" value="Save">
                        <button class="btn btn-info m-2" v-on:click="destroyCategory()">Delete</button>
                      </form>

                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
</style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        categories: [],
        organizations: [],
        id: "",
        name: "",
        organization_id: "",
        errors: [], 
      };
      showEditCategoryForm: false
    },

  created: function() {
    axios
    .get("/api/categories/")
    .then(response => {
      this.categories = response.data.forEach(category => {category.showEditCategoryForm = false});
      console.log(response.data);
      this.categories = response.data;
    });
    axios
    .get("/api/organizations/")
    .then(response => {
      this.organizations = response.data;
      console.log(response.data);
    })
  },
  methods: {
    createCategory: function() {
        var clientParams = {
        name: this.name,
        organization_id: this.organization_id
      };
      console.log(this.organization_id);
      axios
        .post("/api/categories/", clientParams)
        .then(response => {
          this.categories.push(response.data);
          this.name = "";
          this.organization_id = "";
        }).catch(error => {
          this.errors = error.response.data.
            errors;
          this.status = error.response.status;
        });
      },
    destroyCategory: function() {
      axios
        .delete("/api/categories/" + this.$route.params.id)
        .then(response => {
          this.$router.push("/categories/");
        });
    },
    updateCategory: function() {
      var clientParams = {
        name: this.category.name
      };

        const jwt = localStorage.getItem("jwt")
        axios
        .patch("/api/categories/" + this.$route.params.id, clientParams, {
          headers: {
            "Authorization": `Bearer ${jwt}`
          }
        })
        .then(response => {
          this.$router.push("/categories/");
        }).catch(error => {
          if (error.response.status === 401) {
            this.$router.push("/login/");
          }
          this.errors = error.response.data.errors;
        });
        }
      }
    };


</script>
