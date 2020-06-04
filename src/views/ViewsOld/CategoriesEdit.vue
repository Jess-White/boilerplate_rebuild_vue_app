<template>
  <div class="categories-edit">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to Edit Saved <span class="text-primary">Categories</span> for Boilerplates.
                </h2>
                <p class="lead text-white-gray">
                    Edit and update saved categories. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05b</h3>
                    </div> 
                    <h4>Edit Categories</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="row">
      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateBio()">
        <h1 class="text-center mb-5">Edit Category</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Name: </label>
          <input class="form-control" type="text" v-model="category.name">
        </div>

      </form>

      <button v-on:click="updateCategory()">Edit Category</button>
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
      category: {
        id: "",
        organization_id: "",
        name: ""
      },
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/categories/" + this.$route.params.id)
      .then(response => {
        this.category = response.data;
      });
  },
  methods: {
    updateCategory: function() {
      var clientParams = {
        organization_id: this.category.organization_id,
        name: this.category.name
        
      };

    const jwt = localStorage.getItem("jwt")
    axios
    .patch("/api/bios/" + this.$route.params.id, clientParams, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
    .then(response => {
      this.$router.push("/bios/" + this.$route.params.id);
    }).catch(error => {
      if (error.response.status === 401) {
        this.$router.push("/login");
      }
      this.errors = error.response.data.errors;
    });
    }
  }
};
</script>