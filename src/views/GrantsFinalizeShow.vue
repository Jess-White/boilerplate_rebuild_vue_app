<template>
	<div class="grants-finalize-show">
		<div class="pt100 pb50 bg-dark">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-lg-8 mr-auto pb50 ml-auto">
						<h2 class="h1 font300 text-white">
							Use This Section to
							<span class="text-primary">Finalize</span> Your Grant.
						</h2>
						<p class="lead text-white-gray">
							Review and edit all sections; save your finished grant, review a
							printable version, or create a pdf.
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
			<div class="row" id="pdfMaterials">
				<div class="col-md-6 offset-md-3">
					<h4 class="text-center">Grant Name: {{ grant.title }}</h4>
					<h4 class="text-center">Purpose: {{ grant.purpose }}</h4>
					<h4 class="text-center">
						Funding Organization: {{ grant.funding_org_name }}
					</h4>
					<h4 class="text-center">
						Funding Organization RFP Webpage: {{ grant.rfp_url }}
					</h4>
					<h4 class="text-center">Deadline: {{ grant.deadline }}</h4>
					<h4 class="text-center">Date Submitted: {{ grant.submitted }}</h4>
					<h4 class="text-center">Organization: {{ grant.organization_id }}</h4>
				</div>
			</div>
			<div>
				<div>
					<div class="card text-center">
						<div class="card-header">
							<div class="nav-item" v-for="section in grant.sections">
								<div class="card-body">
									<h5 class="card-title">{{ section.id }}</h5>
									<h5 class="card-title">{{ section.title }}</h5>
									<h5 class="card-title">{{ section.text }}</h5>
									<h5 class="card-title">{{ countWords(section.text) }}</h5>
									<div>
										<button v-on:click="showEditSectionFormMethod(section)">
											Edit Section
										</button>
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
												<form
													class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1"
													v-on:submit.prevent="updateSection(section)"
												>
													<h1 class="text-center mb-5">Edit Section</h1>
													<ul>
														<li class="text-danger" v-for="error in errors">
															{{ error }}
														</li>
													</ul>

													<div class="form-group">
														<label>Section Title: </label>
														<input
															class="form-control"
															type="text"
															v-model="section.title"
														/>
													</div>

													<div class="form-group">
														<label>Section Text: </label>
														<textarea
															class="form-control"
															rows="7"
															type="text"
															v-model="section.text"
														></textarea>
													</div>

													<h5 class="card-title">
														Word Count: {{ countWords(section.text) }}
													</h5>

													<div class="form-group">
														<label>Section Sort Order: </label>
														<input
															class="form-control"
															type="text"
															v-model="section.sort_order"
														/>
													</div>

													<button class="btn btn-info m-2">Save Section</button>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- export to pdf -->

					<div ref="content">
						<div>
							<h4>Grant Name: {{ grant.title }}</h4>
							<h4>Purpose: {{ grant.purpose }}</h4>
							<h4>Funding Organization: {{ grant.funding_org_name }}</h4>
							<h4>Funding Organization RFP Webpage: {{ grant.rfp_url }}</h4>
							<h4>Deadline: {{ grant.deadline }}</h4>
							<h4>Date Submitted: {{ grant.submitted }}</h4>
							<h4>Organization: {{ grant.organization_id }}</h4>
						</div>
						<br />
						<div v-for="section in grant.sections">
							<p>{{ section.id }}</p>
							<p>{{ section.title }}</p>
							<p>{{ section.text }}</p>
							<p>{{ countWords(section.text) }}</p>
							<br />
							<br />
						</div>
						<div>
							<h4>Grant Name: {{ grant.title }}</h4>
							<h4>Purpose: {{ grant.purpose }}</h4>
							<h4>Funding Organization: {{ grant.funding_org_name }}</h4>
							<h4>Funding Organization RFP Webpage: {{ grant.rfp_url }}</h4>
							<h4>Deadline: {{ grant.deadline }}</h4>
							<h4>Date Submitted: {{ grant.submitted }}</h4>
							<h4>Organization: {{ grant.organization_id }}</h4>
						</div>
						<br />
						<div v-for="section in grant.sections">
							<p>{{ section.id }}</p>
							<p>{{ section.title }}</p>
							<p>{{ section.text }}</p>
							<p>{{ countWords(section.text) }}</p>
							<br />
							<br />
						</div>
					</div>

					<div>
						<button @click="download">Download as PDF</button>
					</div>

					<div>
						<router-link
							class="btn btn-info m-2"
							v-bind:to="'/grants/' + grant.id + '/edit'"
							>Edit</router-link
						>

						<button class="btn btn-info m-2" v-on:click="destroyGrant()">
							Delete
						</button>

						<!-- <button class="btn btn-info m-2" v-on:click="updateAllSections()">Save Grant</button> -->

						<router-link
							class="btn btn-info m-2"
							v-bind:to="'/grants/' + grant.id + '/printable'"
							>Printable Grant</router-link
						>

						<!-- <button class="btn btn-info m-2" v-on:click="reuseGrant()">Reuse Grant</button> -->

						<router-link class="btn btn-info m-2" v-bind:to="'/reports/new'"
							>Generate Report</router-link
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.changed-red {
	border: solid red 1px;
}
</style>

<script>
var axios = require('axios');
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import htmlToText from 'html-to-text';

export default {
	data: function() {
		return {
			grant: {
				id: '',
				organization_id: '',
				title: '',
				funding_org_id: '',
				funding_org_url: '',
				funding_org_name: '',
				rfp_url: '',
				deadline: '',
				submitted: '',
				successful: '',
				purpose: '',
				errors: [],
				sections: [],
			},
			currentBoilerplate: {},
			boilerplates: [],
			organizations: [],
			funding_orgs: [],
			sections: [],
			currentSection: { text: '' },
			currentBoilerplate: '',
			boilerplates: [],
			id: '',
			sort_order: '',
			text: '',
			wordcount: '',
			title: '',
			errors: [],
		};
	},
	created: function() {
		axios.get('/api/grants/' + this.$route.params.id).then((response) => {
			response.data.sections.forEach((section) => {
				section.showEditSectionForm = false;
			});
			this.grant = response.data;
		});
		axios.get('/api/boilerplates').then((response) => {
			this.boilerplates = response.data;
		});
		axios.get('/api/organizations/').then((response) => {
			this.organizations = response.data;
			console.log(response.data);
		});
		axios.get('/api/funding_orgs/').then((response) => {
			this.funding_orgs = response.data;
			console.log(response.data);
		});
	},
	methods: {
		destroyGrant: function() {
			axios.delete('/api/grants/' + this.$route.params.id).then((response) => {
				this.$router.push('/');
			});
		},

		updateSection: function(section) {
			var clientParams = {
				title: section.title,
				text: section.text,
				wordcount: section.text.split(' ').length,
				sort_order: section.sort_order,
			};

			axios
				.patch('/api/sections/' + section.id, clientParams)
				.then((response) => {
					console.log(response.data);
				});
		},
		download: function() {
			const doc = new jspdf();
			const html = this.$refs.content.innerHTML;
			const newText = htmlToText.fromString(html);
			const pageHeight = doc.internal.pageSize.height;

			// doc.fromHTML(html, 15, 15);
			doc.text(x, y, newText, 15, 15);
			if (y >= pageHeight) {
				doc.addPage();
			}

			doc.save('grant.pdf');
			// console.log(firstText);
			console.log(newText);
		},

		// updateAllSections: function () {
		//   this.grant.sections.forEach((section) => {
		//     this.updateSection(section);
		//   });

		//   this.$router.push("/grants");
		// },

		// finalizeGrant: function () {
		//   axios.get("/api/grants/" + this.$route.params.id).then((response) => {
		//     this.$router.push("/grants/" + this.$route.params.id + "/finalize");
		//   });
		// },
		// reuseGrant: function () {
		//   axios
		//     .get("/api/grants/" + this.$route.params.id + "/copy")
		//     .then((response) => {
		//       this.$router.push("/grants/" + response.data.id + "/finalize");
		//     })
		//     .catch((error) => {
		//       console.log(error.response.data.errors);
		//       console.log((this.status = error.response.status));
		//     });
		// },
		// createPDF: function() {
		//   var doc = new jsPDF();
		//   doc.fromHTML(document.getElementById('pdfMaterials'), 20, 20);
		//   doc.save('grant.pdf');
		// },

		showEditSectionFormMethod: function(section) {
			section.showEditSectionForm = !section.showEditSectionForm;
		},
		countWords: function(string) {
			if (string) {
				return string.split(' ').length;
			} else {
				return 0;
			}
		},
	},
	watch: {
		$route: function() {
			axios.get('/api/grants/' + this.$route.params.id).then((response) => {
				this.grant = response.data;
			});
		},
	},
};
</script>
