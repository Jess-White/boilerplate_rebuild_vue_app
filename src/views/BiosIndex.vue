<template>
  <div class="bios-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Add a New <span class="text-primary">Bio</span> and View Saved Bios.
                </h2>
                <p class="lead text-white-gray">
                    Create new bio or see bios index.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">06</h3>
                    </div> 
                    <h4>Bios Index</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

    <div class="row my-4">
      <form class="col-6 offset-3"
        v-on:submit.prevent="createBio()">
        <h1 class="text-center mb-5">New Bio</h1>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>First Name: </label>
          <input class="form-control" type="text" v-model="firstName">
        </div>

        <div class="form-group">
          <label>Last Name: </label>
          <input class="form-control" type="text" v-model="lastName">
        </div>

        <div class="form-group">
          <label>Title: </label>
          <input class="form-control" type="text" v-model="title">
        </div>

         <div class="form-group">
          <label>Bio Text: </label>
          <input class="form-control" type="text" v-model="text">
        </div>

        <div class="form-group">
          <label>Organization: </label>
          <input class="form-control" type="text" v-model="organizationId">
        </div>
        
        <input class="btn btn-info" type="submit" value="Add New Bio">
      </form>
    </div>

    <div class="container pt100 pb50">

    <h1 class="text-center mb-5">Bios</h1>
    <div class="row">
      <div class="col-md-4 mb50" v-for="bio in bios">

      <router-link v-bind:to="'/bios/' + bio.id">

        <div class="testimonial-card testimonial testimonial-col">

        <div class="card">

          <div class="card-body text-info">
            <h5 class="card-name">{{bio.first_name}} {{bio.last_name}}</h5>
            <p class="card-text">{{bio.text}}</p>
            <p class="card-text">{{bio.organization_id}}</p>
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
  data: function () {
    return {
      id: "",
      firstName: "",
      lastName: "",
      title: "",
      text: "",
      organizationId: "",
      errors: [],
      bios: [],
    };
  },
  created: function () {
    axios.get("/api/bios").then((response) => {
      this.bios = response.data;
    });
  },
  methods: {
    createBio: function () {
      var clientParams = {
        first_name: this.firstName,
        last_name: this.lastName,
        title: this.title,
        text: this.text,
        organization_id: this.organizationId,
      };

      axios
        .post("/api/bios/", clientParams)
        .then((response) => {
          // this.$router.push("/bios");
          this.bios.push(response.data);
          (this.firstName = ""),
            (this.lastName = ""),
            (this.title = ""),
            (this.text = ""),
            (this.organizationId = "");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>