<template>
  <div class="bios-edit">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to Edit Saved <span class="text-primary">Staff Bios</span> for Your Organization.
                </h2>
                <p class="lead text-white-gray">
                    Edit and update saved staff bios. 
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05b</h3>
                    </div> 
                    <h4>Edit Staff Bios</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="row">
      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateBio()">
        <h1 class="text-center mb-5">Edit Bio</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>First Name: </label>
          <input class="form-control" type="text" v-model="bio.first_name">
        </div>

        <div class="form-group">
          <label>Last Name: </label>
          <input class="form-control" type="text" v-model="bio.last_name">
        </div>

        <div class="form-group">
          <label>Text: </label>
          <input class="form-control" type="text" v-model="bio.text">
        </div>

      </form>

      <button v-on:click="updateBio()">Edit Bio</button>
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
      bio: {
        id: "",
        organization_id: "",
        first_name: "",
        last_name: "",
        text: ""
      },
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/bios/" + this.$route.params.id)
      .then(response => {
        this.bio = response.data;
      });
  },
  methods: {
    updateBio: function() {
      var clientParams = {
        organization_id: this.organizationId,
        first_name: this.bio.firstName,
        last_name: this.bio.lastName,
        text: this.bio.text
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