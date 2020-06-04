<template>
  <div class="organizations-edit">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to <span class="text-primary">Edit</span> Organizations.
                </h2>
                <p class="lead text-white-gray">
                    Edit and update saved organizations.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">07b</h3>
                    </div> 
                    <h4>Edit Organizations</h4>
                </div>
            </div>
        </div>
        </div>
    </div>
    
    <div class="container my-4">
      <div class="row">
        <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateOrganization()">
          <h1 class="text-center mb-5">Edit Organization</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>

          <div class="form-group">
            <label>Organization Name: </label>
            <input class="form-control" type="text" v-model="organization.name">
          </div>

          <input class="btn btn-info m-2" type="submit" value="Save">
          <button class="btn btn-info m-2" v-on:click="destroyOrganization()">Delete</button>
        </form>

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
      organization: {
        id: "",
        name: "",
      },
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/organizations/" + this.$route.params.id)
      .then(response => {
        this.organization = response.data;
      });
  },
  methods: {
    destroyOrganization: function() {
      axios
        .delete("/api/organizations/" + this.$route.params.id)
        .then(response => {
          this.$router.push("/organizations/");
        });
    },
    updateOrganization: function() {
      var clientParams = {
        name: this.organization.name
      };

    const jwt = localStorage.getItem("jwt")
    axios
    .patch("/api/organizations/" + this.$route.params.id, clientParams, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
    .then(response => {
      this.$router.push("/organizations/");
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