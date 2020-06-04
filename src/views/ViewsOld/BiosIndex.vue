<template>
  <div class="bios-index">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    We're a small <span class="text-primary">Archi</span>tecture Studio.
                </h2>
                <p class="lead text-white-gray">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">06</h3>
                    </div> 
                    <h4>Bios Library</h4>
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
          <label>Organization: </label>
          <input class="form-control" type="text" v-model="organizationId">
        </div>

        <div class="form-group">
          <label>First Name: </label>
          <input class="form-control" type="text" v-model="firstName">
        </div>

        <div class="form-group">
          <label>Last Name: </label>
          <input class="form-control" type="text" v-model="lastName">
        </div>

        <div class="form-group">
          <label>Wordcount: </label>
          <!-- <input class="form-control" type="text" v-model="lastName"> -->
        </div>

        <div class="form-group">
          <label>Organization: </label>
          <!-- <input class="form-control" type="text" v-model="lastName"> -->
        </div>

        <div class="form-group">
          <label>Text: </label>
          <input class="form-control" type="text" v-model="text">
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
    data: function() {
      return {
        id: "",
        organizationId: "",
        firstName: "",
        lastName: "",
        text: "",
        errors: [],
        bios: []
      };
    },
  created: function() {
    axios
    .get("/api/bios")
    .then(response => {
      this.bios = response.data;
    });
  },
  methods: {
      createBio: function() {
        var clientParams = {
        organization_id: this.organizationId,
        first_name: this.firstName,
        last_name: this.lastName,
        text: this.text
      };

      axios
        .post("/api/bios/", clientParams)
        .then(response => {
          this.$router.push("/bios");
        }).catch(error => {
          this.errors = error.response.data.
            errors;
        });
    }
  }
};


</script>