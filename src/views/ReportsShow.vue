<template>
  <div class="reports-show">
    
    <div class="pt100 pb50 bg-dark">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8 mr-auto pb50 ml-auto">
            <h2 class="h1 font300 text-white">
                Use This Section to <span class="text-primary">Generate Sections</span> For Your Grant Report.
            </h2>
            <p class="lead text-white-gray">
              Review and edit all sections; save your finished grant, review a printable version, or create a pdf. 
            </p>
            <div class="experience-card clearfix">
              <div class="experience-inner">
                <h3 class="experience-text">01c</h3>
              </div> 
              <h4>Grant Builder:</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container my-4">
      <div class="row">
        <div class="col-md-6 offset-md-3 mb-4">
          <h3>Report</h3>
          <h4 class="text-center">Grant Id: {{report.grant_id}}</h4>
          <h4 class="text-center">Report Name: {{report.title}}</h4>
          <h4 class="text-center">Deadline: {{report.deadline}}</h4>
          <h4 class="text-center">Submitted: {{report.submitted}}</h4>
        </div>
      </div>
    </div>

    <div>
      <button v-on:click="showEditReportFormMethod()">Edit Report</button>
    </div>


    <div v-if="showEditReportForm">
            <div class="pt100 pb50 bg-dark">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-lg-8 mr-auto pb50 ml-auto">
                    <div class="experience-card clearfix">
                      <h4>Edit Report</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container my-4">
              <div class="row">
                <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1" v-on:submit.prevent="updateReport()">
                  <h1 class="text-center mb-5">Edit Report</h1>
                  <ul>
                    <li class="text-danger" v-for="error in errors">{{ error }}</li>
                  </ul>
                  <div class="form-group">
                    <label>Report Title: </label>
                    <input class="form-control" type="text" v-model="report.title">
                  </div>
                  <div class="form-group">
                    <label>Deadline: </label>
                    <input class="form-control" type="text" v-model="report.deadline">
                  </div>
                  <div class="form-group">
                    <label>Submitted: </label>
                    <input class="form-control" type="text" v-model="report.submitted">
                  </div>
                  <input class="btn btn-info m-2" type="submit" value="Save">
                </form>
             </div>
          </div>
        </div>



    <h4>Sections</h4>
    <ul >
      <li v-for="report_section in report.report_sections" :key="report_section.id">{{report_section}}</li>
    </ul>

    <div>
      <div class="card text-center section-editor">
      <div class="card-header">
        <h1>Add Sections</h1>
        <!-- <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item" v-for="section in grant.sections" >
            <span class="nav-link tab-text" :class="{active: section == currentSection}" @click="currentSection = section">{{ section.display_category }}</span>
            {{section}}
          </li>
        </ul> -->
      </div>
        <div class="card-body row">
        <div class="col-md-3 offset-md-1">
          <h4 class="text-center mb-5">Choose a Boilerplate</h4>
        <div>
        <div class="form-group">
          <select class="form-control" v-model="currentBoilerplate" @change="handleChange">
            <option v-for="boilerplate in boilerplates" :value="boilerplate"> {{ boilerplate.text}} </option>
          </select>
        </div>
      </div>
      <p class="text-justify">
        {{ currentBoilerplate.text }}
      </p>
      <div>
        <button class="btn btn-info m-2" v-on:click="addBoilerplate(currentSection)">Add Boilerplate</button>
      </div>
    </div>
    <div class="col-md-8">
      <form v-on:submit.prevent="createReportSection()">
        <div class="form-group">
          <label>Report Section Title </label>
          <input class="form-control" type="text" v-model="title">
        </div>
        <div class="form-group">
          <label>Report Section Text </label>
          <textarea class="form-control" type="text" v-model="text"></textarea>
          {{text}}
          {{title}}
        </div>
        <div class="form-group">
          <label>Section Sort Order </label>
          <input class="form-control" type="integer" v-model="sort_order">
        </div>
        <input class="btn btn-info" type="submit" value="Add New Section">
      </form>
      <!-- <form>
        <h1>Top Text Box</h1>
        <h4 class="text-center mb-5">{{ currentSection.display_category }}</h4>
        <div class="form-group">
          <textarea class="form-control" v-model="currentSection.content" rows="15"></textarea>
        </div>
      </form>
      <h5 class="card-title">{{ currentSection.display_category }}</h5>
      <div>
        <h1>Bottom Text Box</h1>
        <textarea 
        class="card-text" 
        v-on:input="currentSection.changed = true"  
        v-model="currentSection.content" 
        rows="15" 
        >
        </textarea>
      </div> -->
      <!-- <div>
        <button class="btn" :class="{'btn-danger': currentSection.changed, 'btn-primary': !currentSection.changed}" @click="updateSection(currentSection)">
          Save This Section
        </button>
      </div> -->
    </div>
    </div>
    </div>
    </div>
    <router-link class="btn btn-info m-2" v-bind:to="'/reports/' + report.id + '/finalize'">Report Finalize</router-link>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      report: {},
      boilerplates: [],
      currentBoilerplate: "",
      title: "",
      text: "",
      sort_order: "",
      showEditReportForm: false,
      errors: [],
    };
  },
  created: function () {
    axios.get("/api/reports/" + this.$route.params.id).then((response) => {
      this.report = response.data;
      console.log(response.data);
      // console.log(this.grant);
      // console.log(this.grant.sections);
      // this.currentSection = response.data.sections[0];
    });
    axios.get("/api/boilerplates").then((response) => {
      this.boilerplates = response.data;
      // console.log(response.data);
    });
  },
  methods: {
    createReportSection: function () {
      var clientParams = {
        report_id: this.report.id,
        title: this.title,
        text: this.text,
        sort_order: this.sort_order,
      };
      axios
        .post("/api/report_sections/", clientParams)
        .then((response) => {
          this.report.report_sections.push(response.data);
          this.title = "";
          this.text = "";
          this.sort_order = "";
          console.log(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    addBoilerplate: function (inputReportSection) {
      var clientParams = {
        text: inputReportSection.text,
      };
      axios
        .patch("/api/report_sections/" + inputReportSection.id, clientParams)
        .then((response) => {
          console.log(response.data);
          if (this.currentReportSection.text === null) {
            this.currentReportSection.text = this.currentBoilerplate.text;
          } else {
            this.currentReportSection.text += this.currentBoilerplate.text;
          }
        });
    },
    updateReport: function () {
      var clientParams = {
        title: this.report.title,
        deadine: this.report.deadline,
        submitted: this.report.submitted,
      };
      const jwt = localStorage.getItem("jwt");
      axios
        .patch("/api/reports/" + this.$route.params.id, clientParams, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          this.showEditReportForm = false;
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$router.push("/login/");
          }
          this.grant.errors = error.response.data.errors;
        });
    },
    handleChange: function () {
      this.text += this.currentBoilerplate.text;
    },
    showEditReportFormMethod: function () {
      this.showEditReportForm = !this.showEditReportForm;
    },
  },
};
</script>