<template>
  <div class="bios-show">

    <div class="pt100 pb50 bg-dark">
        <div class="container">
            <div class="row align-items-center">
            <div class="col-lg-8 mr-auto pb50 ml-auto">
                <h2 class="h1 font300 text-white">
                    Use This Page to View Saved <span class="text-primary">Staff Bios</span>For Your Organization.
                </h2>
                <p class="lead text-white-gray">
                    View saved staff bios for your organization.
                </p>
                <div class="experience-card clearfix">
                    <div class="experience-inner">
                        <h3 class="experience-text">05b</h3>
                    </div> 
                    <h4>View Saved Bio</h4>
                </div>
            </div>
        </div>
        </div>
    </div>

     <div class="row">
       <div class="col-md-6">
        <h4 class="text-center">Name: {{bio.first_name}} {{bio.last_name}}</h4>
        <h4 class="text-center">Title: {{bio.title}}</h4>
        <h4 class="text-center">Bio: {{bio.text}}</h4>
        <h4 class="text-center">Word Count: {{countWords(bio.text)}}</h4>
        <h4 class="text-center">Organization: {{bio.organization_id}}</h4>
       </div>

        <button v-on:click="showEditBioFormMethod()">Edit Bio</button>
      
        <div v-if="showEditBioForm">
              <div class="container my-4">
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
                      <label>Title: </label>
                      <input class="form-control" type="text" v-model="bio.title">
                    </div>

                    <div class="form-group">
                      <label>Bio Text: </label>
                      <input class="form-control" type="text" v-model="bio.text">
                    </div>

                    <div class="form-group">
                      <label>Organization ID: </label>
                      <input class="form-control" type="text" v-model="bio.organization_id">
                    </div>

                    <input class="btn btn-info m-2" type="submit" value="Save">
                    <button class="btn btn-info m-2" v-on:click="destroyBio()">Delete</button>
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
        bio: {
          id: "",
          organizationId: "",
          firstName: "",
          lastName: "",
          text: "",
          title: "",
          wordcount: "",
          errors: [] 
        },
        showEditBioForm: false
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
      destroyBio: function() {
        axios
          .delete("/api/bios/" + this.$route.params.id)
          .then(response => {
            this.$router.push("/bios");
          });
      },
      updateBio: function() {
        var clientParams = {
          first_name: this.bio.first_name,
          last_name: this.bio.last_name,
          title: this.bio.title,
          text: this.bio.text,
          wordcount: this.bio.text.split(" ").length,
          organization_id: this.bio.organization_id
        };

          const jwt = localStorage.getItem("jwt")
          axios
          .patch("/api/bios/" + this.$route.params.id, clientParams, {
            headers: {
              "Authorization": `Bearer ${jwt}`
            }
          })
          .then(response => {
            this.$router.push("/bios/");
          }).catch(error => {
            if (error.response.status === 401) {
              this.$router.push("/login/");
            }
            this.errors = error.response.data.errors;
          });
          },
        showEditBioFormMethod: function() {
          this.showEditBioForm = !this.showEditBioForm;
        },
        countWords: function (string) { 
          if (string) {
            return (string.split(" ").length);
          } else {
            return 0; 
          }
        }
    },
    watch: {
      $route: function() {
        axios
        .get("/api/bios/" + this.$route.params.id)
        .then(response => {
          this.bios = response.data;
        });
      }  
    }
};
</script>