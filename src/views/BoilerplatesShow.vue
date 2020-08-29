<template>
  <div class="boilerplates-show">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to View Saved <span class="text-primary"> Boilerplates</span>For Your Organization.
                </h2>
                <p class="lead text-white-gray">
                    View saved boilerplates for your organization.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05b</h3>
                    </div> 
                    <h4>View Saved Boilerplate</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

     <div class="row">
       <div class="col-md-6">
        <h4 class="text-center">Title: {{boilerplate.title}}</h4>
        <h4 class="text-center">Text: {{boilerplate.text}}</h4>
        <h4 class="text-center">Organization: {{boilerplate.organization.name}}</h4>
        <h4 class="text-center">Category: {{boilerplate.category.name}}</h4>
       </div>

        <button v-on:click="showEditBoilerplateFormMethod()">Edit Boilerplate</button>
      
        <div v-if="showEditBoilerplateForm">
              <div class="container my-4">
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
                      <label>Text: </label>
                      <input class="form-control" type="text" v-model="boilerplate.text">
                    </div>

                    <div class="form-group">
                      <label>Organization: </label>
                      <input class="form-control" type="text" v-model="boilerplate.organization.name">
                    </div>

                    <div class="form-group">
                      <label>Category: </label>
                      <input class="form-control" type="text" v-model="boilerplate.category.name">
                    </div>

                    <input class="btn btn-info m-2" type="submit" value="Save">
                    <button class="btn btn-info m-2" v-on:click="destroyBoilerplate()">Delete</button>
                  </form>

                </div>
              </div>
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
        boilerplate: {
          id: "",
          title: "",
          text: "",
          organizationId: "",
          categoryId: "",
          errors: [] 
        },
        showEditBoilerplateForm: false
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
      destroyBoilerplate: function() {
        axios
          .delete("/api/boilerplates/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/boilerplates");
          });
      },
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
          },
        showEditBoilerplateFormMethod: function () {
          this.showEditBoilerplateForm = !this.showEditBoilerplateForm;
        }
    },
    watch: {
      $route: function() {
        axios
        .get("/api/boilerplates/" + this.$route.params.id)
        .then(response => {
          this.boilerplates = response.data;
        });
      }  
    }
};
</script>