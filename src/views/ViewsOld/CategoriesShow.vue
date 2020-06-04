<template>
  <div class="categories-show">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to View Each Saved<span class="text-primary">Category</span>For Your Organization.
                </h2>
                <p class="lead text-white-gray">
                    View saved categories for your organization.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05b</h3>
                    </div> 
                    <h4>View Saved Category</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

     <div class="row">
       <div class="col-md-6">
        <h4 class="text-center">Name: {{category.name}}</h4>
        <h4 class="text-center">Organization: {{category.organization_id}}</h4>
       </div>
       <div>
          <router-link class="btn btn-info m-2" v-bind:to="'/categories/' + category.id + '/edit'">Edit</router-link>
          <button class="btn btn-info m-2" v-on:click="destroyCategory()">Delete</button>
        </div>
     </div> 


  </div>
</div>
</template>

<style></style>

<script>
var axios = require('axios');

  export default {
    data: function() {
      return {
        category: {
          id: "",
          name: "",
          organization_id: "",
          errors: []
        }
      };
    },
    created: function() {
      axios 
        .get("/api/categories/" + this.$route.params.id)
        .then(response => {
          this.category = response.data
        });
    },
    methods: {
      destroyCategory: function() {
        axios
          .delete("/api/categories/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/categories");
          });
      }
    },
    watch: {
      $route: function() {
        axios
        .get("/api/categories/" + this.$route.params.id)
        .then(response => {
          this.categories = response.data;
        });
      }  
    }
};
</script>