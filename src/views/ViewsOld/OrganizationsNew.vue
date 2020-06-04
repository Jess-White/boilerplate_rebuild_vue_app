<template>
  <div class="organizations-new">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Form to Add <span class="text-primary">Funding Organizations</span> for Grant Applications.
                </h2>
                <p class="lead text-white-gray">
                    Create organization listings to organize grant applications and requests for proposals. Cross-reference with successful grant applications and grant materials.  
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">07a</h3>
                    </div> 
                    <h4>Organization Builder</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="container my-4">
      
      <div class="row mb-4"></div>
      <form class="col-6 offset-3"
      v-on:submit.prevent="createOrganization()">
        <h1 class="text-center mb-5">New Organization</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Organization Name </label>
          <input class="form-control" type="text" v-model="name">
        </div>

        <input class="btn btn-info" type="submit" value="Add New Organization">
      </form>
    </div>

<!--     need method for user id, category id -->
  </div>
</template>

<style></style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        id: "",
        name: "",
        errors: []
      };
    },
    created: function() {},
    methods: {
      createOrganization: function() {
        var clientParams = {
        name: this.name
      };

      axios
        .post("/api/organizations/", clientParams)
        .then(response => {
          this.$router.push("/organizations");
        }).catch(error => {
          this.errors = error.response.data.
            errors;
          this.status = error.response.status;
        });
    }
  }
};


</script>