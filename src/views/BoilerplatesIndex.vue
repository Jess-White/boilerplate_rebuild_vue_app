<template>

  <div class="boilerplates-index">

    <div class="pt100 pb50 bg-dark">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8 mr-auto pb50 ml-auto">
            <h2 class="h1 font300 text-white">
                Add a New <span class="text-primary">Boilerplate </span>and View Saved Boilerplates.
            </h2>
            <p class="lead text-white-gray">
                Click on any tile to open a saved boilerplate, view, and edit.
            </p>
            <div class="experience-card clearfix">
              <div class="experience-inner">
                <h3 class="experience-text">04</h3>
              </div> 
              <h4>Boilerplates Index</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-4">
      <div class="container">
        <form class="col-6 offset-3"
          v-on:submit.prevent="createBoilerplate()">
          <h1 class="text-center mb-5">New Boilerplate</h1>

          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>

          <div class="form-group">
            <label>Title: </label>
            <input class="form-control" type="text" v-model="title">
          </div>

          <div class="form-group">
            <label>Text: </label>
            <input class="form-control" type="text" v-model="text">
          </div>

          <div class="form-group">
            <p>Word Count: </p>
            {{countWords(text)}}
            <!-- <input class="form-control" type="text" v-bind:value="wordcount"> -->
          </div>

          <div class="form-group col-md-6">
            Category
            <select v-model="category_id">
              <option value="">Select a Category</option>
              <option v-bind:value="category.id" v-for="category in categories">{{category.name}}
              </option>
            </select>
          </div>

          <div class="form-group col-md-6">
            Organization
            <select v-model="organization_id">
              <option value="">Select an Organization</option>
              <option v-bind:value="organization.id" v-for="organization in organizations">{{organization.name}}
              </option>
            </select>
          </div>

          <input class="btn btn-info m-4" type="submit" value="Add New Boilerplate">

        </form>
      </div>
    </div>

    <div class="container">
      <h1 class="text-center my-5">Boilerplates</h1>
      <div class="row">
        <div class="col-sm-4 mb-2" v-for="boilerplate in boilerplates">
          <router-link v-bind:to="'/boilerplates/' + boilerplate.id">
            <div class="card">
              <div class="card-body text-info">
                <h5 class="card-name">{{boilerplate.title}}</h5>
                <p class="card-text">Text: {{boilerplate.text}}</p>
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
        organization_id: "",
        category_id: "",
        title: "",
        text: "",
        wordcount: "",
        errors: [],

        currentBoilerplate: {},
        boilerplates: [],
        organizations: [],
        categories: [],
      };
    },
    created: function () {
      axios.get("/api/boilerplates").then((response) => {
        this.boilerplates = response.data;
      });

      axios.get("/api/users").then((response) => {
        this.users = response.data;
      });
      axios.get("/api/organizations/").then((response) => {
        this.organizations = response.data;
        console.log(response.data);
      });
      axios.get("/api/categories/").then((response) => {
        this.categories = response.data;
        console.log(response.data);
      });
    },
    methods: {
      createBoilerplate: function () {
        var clientParams = {
          organization_id: this.organization_id,
          category_id: this.category_id,
          title: this.title,
          text: this.text,
          wordcount: this.text.split(" ").length
        };
        axios
          .post("/api/boilerplates/", clientParams)
          .then((response) => {
            this.boilerplates.push(response.data);
            this.title = "";
            this.category_id = "";
            this.organization_id = "";
            this.wordcount = "";
            this.text = "";
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      },
      countWords: function (string) { 
          if (string) {
            return (string.split(" ").length);
          } else {
            return 0; 
          }
        }
      }
    }
</script>