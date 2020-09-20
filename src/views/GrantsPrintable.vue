<template>
	<div class="grants-printable">
		<div>
			<vue-html2pdf
				:show-layout="false"
				:float-layout="true"
				:enable-download="true"
				:preview-modal="true"
				:paginate-elements-by-height="1400"
				filename="hee hee"
				:pdf-quality="2"
				:manual-pagination="false"
				pdf-format="a4"
				pdf-orientation="landscape"
				pdf-content-width="800px"
				@progress="onProgress($event)"
				@hasStartedGeneration="hasStartedGeneration()"
				@hasGenerated="hasGenerated($event)"
				ref="html2Pdf"
			>
				<section slot="pdf-content">
					<h1>Yo</h1>
					<!-- <div ref="content">
						<div class="col-md-6 offset-md-3">
							<h4 class="text-center">Grant Name: {{ grant.title }}</h4>
							<h4 class="text-center">Purpose: {{ grant.purpose }}</h4>
							<h4 class="text-center">
								Funding Organization: {{ grant.funding_org_name }}
							</h4>
							<h4 class="text-center">
								Funding Organization RFP Webpage:
								{{ grant.rfp_url }}
							</h4>
							<h4 class="text-center">Deadline: {{ grant.deadline }}</h4>
							<h4 class="text-center">Date Submitted: {{ grant.submitted }}</h4>
							<h4 class="text-center">
								Organization: {{ grant.organization_id }}
							</h4>
						</div>

						<div class="card-body" v-for="section in grant.sections">
							<h5 class="card-title">{{ section.id }}</h5>
							<h5 class="card-title">{{ section.title }}</h5>
							<h5 class="card-title">{{ section.text }}</h5>
							<h5 class="card-title">
								{{ countWords(section.text) }}
							</h5>
						</div> -->
					<!-- <button v-on:click="generateReport()">
							Download as PDF
						</button>
					</div> -->
				</section>
			</vue-html2pdf>
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
// import jspdf from 'jspdf';
// import html2canvas from 'html2canvas';
import VueHtml2pdf from 'vue-html2pdf';

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
		// download: function() {
		// 	const doc = new jspdf();
		// 	const html = this.$refs.content.innerHTML;
		// 	doc.fromHTML(html, 15, 15);
		// 	doc.save('grant.pdf');
		// },

		generateReport() {
			this.$ref.html2Pdf.generatePdf();
		},
		countWords: function(string) {
			if (string) {
				return string.split(' ').length;
			} else {
				return 0;
			}
		},
	},
	components: {
		VueHtml2pdf,
	},
};
</script>
