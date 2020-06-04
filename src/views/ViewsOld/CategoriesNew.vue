<template>
  <div class="categories-new">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    View Saved<span class="text-primary">Categories</span>for Your Organization.
                </h2>
                <p class="lead text-white-gray">
                    View a library of saved staff categories.
                </p>                
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">06</h3>
                    </div> 
                    <h4>Categories Library</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container pt100 pb50">

    <h1 class="text-center mb-5">Categories</h1>
    <div class="row">



      <div class="col-md-4 mb50" v-for="category in categories">

      <router-link v-bind:to="'/categories/' + category.id">

        <div class="testimonial-card testimonial testimonial-col">

        <div class="card">

          <div class="card-body text-info">
            <h5 class="card-name">{{category.name}}</h5>
          {{category.organization_id}}</p>
          </div>
        </div>

      </div>
        </router-link>
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
        categories: []
      };
    },
  created: function() {
    axios
    .get("/api/categories")
    .then(response => {
      this.categories = response.data;
    });
  },
  methods: {}
};


</script>