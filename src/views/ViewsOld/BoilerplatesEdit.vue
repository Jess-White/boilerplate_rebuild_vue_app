<template>
  <div class="boilerplates-edit">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to Edit Saved <span class="text-primary">Boilerplates</span>.
                </h2>
                <p class="lead text-white-gray">
                    Edit and update saved boilerplates.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">03c</h3>
                    </div> 
                    <h4>Years of Experience</h4>
                </div>
            </div>
        </div>
        </div>
    </div>
    
    <div class="row">
      <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateBoilerplate()">
        <h1 class="text-center mb-5">Edit Boilerplate</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Title: </label>
          <input class="form-control" type="text" v-model="boilerplate.title">
        </div>

        <div class="form-group">
          <label>Boilerplate Text: </label>
          <input class="form-control" type="text" v-model="boilerplate.text">
        </div>

      </form>

      <button v-on:click="updateBoilerplate()">Save Boilerplate Edits</button>
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
      boilerplate: {
        id: "",
        organization_id: "",
        category_id: "",
        title: "",
        text: "",
        word_count: ""
      },
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/boilerplates/" + this.$route.params.id)
      .then(response => {
        this.boilerplate = response.data;
      });
  },
  methods: {
    updateBoilerplate: function() {
      var clientParams = {
        organization_id: this.boilerplate.organization_id,
        category_id: this.boilerplate.category_id,
        title: this.boilerplate.title,
        text: this.boilerplate.text,
        wordcount: this.boilerplate.wordcount
      };

    const jwt = localStorage.getItem("jwt")
    axios
    .patch("/api/boilerplates/" + this.$route.params.id, clientParams, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    })
    .then(response => {
      this.$router.push("/boilerplates/");
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