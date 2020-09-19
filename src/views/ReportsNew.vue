<template>
  <div class="reports-new">

    <div class="pt100 pb50 bg-dark">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8 mr-auto pb50 ml-auto">
            <h2 class="h1 font300 text-white">
                Use This Section to <span class="text-primary">Generate Reports</span> For Your Grant.
            </h2>
            <p class="lead text-white-gray">
              Review and edit all sections; save your finished grant, review a printable version, or create a pdf. 
            </p>
            <div class="experience-card clearfix">
              <div class="experience-inner">
                <h3 class="experience-text">01c</h3>
              </div> 
              <h4>Grant Builder: Review and Finalize Your Grant.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container my-4" >

      <div class="row" id="pdfMaterials">
        <div class="col-md-6 offset-md-3">
          <h4 class="text-center">Grant Name: </h4>
        </div>
      </div>

      <div class="container my-4">

      <div class="row mb-4"></div>
      <form class="col-6 offset-3"
        v-on:submit.prevent="createReport()">
        <h1 class="text-center mb-5">New Report</h1>

        <!-- <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul> -->
        <div class="form-group">
          <select class="form-control" v-model="grant_id">
            <option value="" disabled>Choose a grant</option>
            <option v-for="grant in grants" :value="grant.id"> {{ grant.title }} </option>
          </select>
        </div>
        <p>{{grant_id}}</p>

        <div class="form-group">
          <label>Report Title </label>
          <input class="form-control" type="text" v-model="title">
        </div>

        <div class="form-group">
          <label>Deadline</label>
          <input class="form-control" type="text" v-model="deadline">
        </div>

        <div class="form-group">
          <label>Submitted</label>
          <input class="form-control" type="text" v-model="submitted">
        </div>

        <input class="btn btn-info" type="submit" value="Add New Report">
      </form>
    </div>
     
  
      <!-- <div class="card text-center">
        <div class="card-header">
          <div class="nav-item" v-for="section in grant.sections" >
            <div class="card-body">
              <h5 class="card-title">{{ section.id }}</h5>
              <h5 class="card-title">{{ section.title }}</h5>
              <h5 class="card-title">{{ section.text }}</h5>
              <div class="form-group">
                <textarea 
                  class="form-control" 
                  v-model="section.text" 
                  
                  rows="7"
                >
                </textarea>
              </div>

              <div>
                <button v-on:click="showEditSectionFormMethod(section)">Edit Section</button>
              </div>

              <div v-if="section.showEditSectionForm">
                <div class="pt100 pb50 bg-dark">
                  <div class="container">
                    <div class="row align-items-center">
                      <div class="col-lg-8 mr-auto pb50 ml-auto">
                        <div class="experience-card clearfix">
                          <h4>Edit Section</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="container my-4">
                  <div class="row">
                    <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateSection()">
                      <h1 class="text-center mb-5">Edit Section</h1>
                      <ul>
                        <li class="text-danger" v-for="error in errors">{{ error }}</li>
                      </ul>

                      <div class="form-group">
                        <label>Section Title: </label>
                        <input class="form-control" type="text" v-model="section.title">
                      </div>

                      <div class="form-group">
                        <label>Section Text: </label>
                        <input class="form-control" type="text" v-model="section.text">
                      </div>

                      <div class="form-group">
                        <label>Section Sort Order: </label>
                        <input class="form-control" type="text" v-model="section.sort_order">
                      </div>

                      <button class="btn btn-info m-2" v-on:click="updateSection(section)">Save Section</button>

                    </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div> -->

            <!-- <div>
                <router-link class="btn btn-info m-2" v-bind:to="'/grants/' + grant.id + '/edit'">Edit</router-link>

                <button class="btn btn-info m-2" v-on:click="destroyGrant()">Delete</button>

                <button class="btn btn-info m-2" v-on:click="updateAllSections()">Save Grant</button>

                <router-link class="btn btn-info m-2" v-bind:to="'/grants/' + grant.id + '/printable'">Printable Grant</router-link>

                <button class="btn btn-info m-2" v-on:click="reuseGrant()">Reuse Grant</button>

                <router-link class="btn btn-info m-2" v-bind:to="'/reports/new'">Generate Report</router-link>


              </div> -->

        </div>
      </div> 
    </div>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      grants: [],
      grant_id: "",
      title: "",
      deadline: "",
      submitted: false,
    };
  },
  created: function () {
    axios.get("/api/grants").then((response) => {
      this.grants = response.data;
      console.log(response.data);
    });
  },
  methods: {
    createReport: function () {
      var clientParams = {
        grant_id: this.grant_id,
        title: this.title,
        deadline: this.deadline,
        submitted: this.submitted,
      };
      axios.post("api/reports", clientParams).then((response) => {
        this.$router.push("/reports/" + response.data.id);
        console.log(response.data);
      });
    },
  },
};
</script>
