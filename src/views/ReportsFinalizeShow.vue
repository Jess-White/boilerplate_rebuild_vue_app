<template>
  <div class="reports-finalize-show">
    
    <div class="pt100 pb50 bg-dark">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8 mr-auto pb50 ml-auto">
            <h2 class="h1 font300 text-white">
                Use This Section to <span class="text-primary">Finalize</span> Your Report.
            </h2>
            <p class="lead text-white-gray">
              Review and edit all sections; save your finished report, review a printable version, or create a pdf. 
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

    <div class="card-header">
      <div class="nav-item" v-for="report_section in report.report_sections" >
          <div class="card-body">
            <h5 class="card-title">{{ report_section.id }}</h5>
            <h5 class="card-title">{{ report_section.title }}</h5>
            <h5 class="card-title">{{ report_section.text }}</h5>
            <h5 class="card-title">{{ report_section.sort_order }}</h5>
          

            <div>
              <button v-on:click="showEditReportSectionFormMethod(report_section)">Edit Section</button>
            </div>

              <div v-if="report_section.showEditReportSectionForm">
              <div class="pt100 pb50 bg-dark">
                  <div class="container">
                    <div class="row align-items-center">
                      <div class="col-lg-8 mr-auto pb50 ml-auto">
                        <div class="experience-card clearfix">
                          <h4>Edit Report Section</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              <div class="container my-4">
                <div class="row">
                  <form class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <h1 class="text-center mb-5">Edit Section</h1>
                    <ul>
                      <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>

                    <div class="form-group">
                      <label>Section Title: </label>
                      <input class="form-control" type="text" v-model="report_section.title">
                    </div>

                    <div class="form-group">
                      <label>Section Text: </label>
                      <input class="form-control" type="text" v-model="report_section.text">
                    </div>

                    <div class="form-group">
                      <label>Section Sort Order: </label>
                      <input class="form-control" type="text" v-model="report_section.sort_order">
                    </div>

                    <button class="btn btn-info m-2" v-on:click="updateReportSection(report_section)">Save Section</button>

                  </form>

            </div>

          </div>
          </div>
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
      report: {},
      boilerplates: [],
      errors: [],
    };
  },
  created: function () {
    axios.get("/api/reports/" + this.$route.params.id).then((response) => {
      response.data.report_sections.forEach((report_section) => {
        report_section.showEditReportSectionForm = false;
      });
      this.report = response.data;
    });
    axios.get("/api/boilerplates").then((response) => {
      this.boilerplates = response.data;
      // console.log(response.data);
    });
  },
  methods: {
    updateReportSection: function (report_section) {
      var clientParams = {
        title: report_section.title,
        text: report_section.text,
        sort_order: report_section.sort_order,
      };

      axios
        .patch("/api/report_sections/" + report_section.id, clientParams)
        .then((response) => {
          console.log(response.data);
          this.report.report_section.showEditReportSectionForm = false;
        });
    },
    showEditReportSectionFormMethod: function (report_section) {
      report_section.showEditReportSectionForm = !report_section.showEditReportSectionForm;
    },
  },
};
</script>