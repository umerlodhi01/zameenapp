<template>
  <div class="pa-5">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="12">
        <v-flex
          class="text-caption text-center text-uppercase text-no-wrap primary"
        >
          <h2 class="white--text">Select Ad Category</h2>
        </v-flex>
      </v-col>
      <v-col cols="12" sm="12" md="12" class="mt-n4">
        <v-radio-group v-model="adCategory">
          <v-row>
            <v-col v-for="(category, i) in adCategories" :key="i">
              <v-radio
                :label="category.category"
                :value="category.id"
              ></v-radio>
            </v-col>
            <v-col v-if="isCategorySelected">
              <v-chip color="red" dark>
                Please select atleast one category
              </v-chip>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>
      <v-col cols="12" sm="12" md="12" v-if="adCategory === 1">
        <v-row>
          <v-col cols="4" sm="10" xs="12" md="4" class="px-3">
            <v-select
              v-if="societies"
              v-model="getSocietyId"
              :items="societies"
              item-text="society_name"
              item-value="_id"
              label="Select Society"
              chips
              hint="Select Society which will belong to this Ad"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col
            cols="4"
            xs="12"
            sm="10"
            md="4"
            class="px-3"
            v-if="propertyTypes && form.societyId"
          >
            <v-select
              v-model="form.propertyTypeId"
              :items="propertyTypes"
              item-text="propertyType"
              item-value="_id"
              label="Select Property Type"
              chips
              hint="Select Property Type which will belong to this Ad"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col
            cols="2"
            xs="12"
            sm="10"
            md="2"
            class="px-3"
            v-if="form.societyId && form.propertyTypeId"
          >
            <v-btn color="green" dark class="ma-2 white--text">
              Find Ads
              <v-icon right> mdi-store-search </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="12" v-if="adCategory === 2">
        <v-row>
          <v-col cols="4" xs="12" sm="10" md="4">
            <v-select
              v-if="projects"
              v-model="getProjectId"
              :items="projects"
              item-text="projectName"
              item-value="_id"
              label="Select Project"
              chips
              hint="Select Project which will belong to this Ad"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col
            cols="4"
            xs="12"
            sm="10"
            md="4"
            v-if="propertyTypesOfProjects && form.projectId"
          >
            <v-select
              v-model="form.propertyTypeId"
              :items="propertyTypesOfProjects"
              item-text="propertyType"
              item-value="_id"
              label="Select Property Type"
              chips
              hint="Select Property Type which will belong to this Ad"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col
            cols="2"
            xs="12"
            sm="10"
            md="2"
            class="px-3"
            v-if="form.projectId && form.propertyTypeId"
          >
            <v-btn color="green" dark class="ma-2 white--text">
              Find Ads
              <v-icon right> mdi-store-search </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-simple-table class="mt-12">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">AD Title</th>
            <th class="text-left">Total Amount</th>
            <th class="text-left">Down Price</th>
            <th class="text-left">Commision Percentage</th>
            <th class="text-left">Status</th>
            <th class="text-left">View AD</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody v-if="ads">
          <tr v-for="ad in ads" :key="ad._id">
            <td>{{ ad.title }}</td>
            <td>{{ ad.totalAmount }}</td>
            <td>{{ ad.downPrice }}</td>
            <td>{{ ad.commision }}</td>
            <td>
              <v-chip
                dark
                class="ma-2"
                :color="
                  ad.status === 1 ? 'green' : ad.status === 2 ? 'red' : 'orange'
                "
              >
                {{
                  ad.status === 1
                    ? "Active"
                    : ad.status === 2
                    ? "Disabled"
                    : "Quantity Finished"
                }}
              </v-chip>
            </td>
            <td>
              <v-btn color="green" dark @click.prevent="viewAD(ad._id)"
                >View AD
                <v-icon right dark> mdi-eye-arrow-left-outline </v-icon></v-btn
              >
            </td>
            <td>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    right
                    v-on="on"
                    v-bind="attrs"
                    dark
                    color="green"
                    @click.prevent="activateAd(ad._id)"
                  >
                    mdi-book-check
                  </v-icon>
                </template>
                <span>Activate AD</span>
              </v-tooltip>
              <v-icon color="primary" @click.prevent="editAD(ad._id)">
                mdi-pencil
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center" v-if="pages">
      <v-pagination v-model="page" :length="pages" circle></v-pagination>
    </div>
    <v-snackbar rounded="pill" v-model="snackbar.snackbar">
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar.color"
          text
          v-bind="attrs"
          @click="snackbar.snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <ViewDialog
      v-if="currentADId"
      :id="currentADId"
      @dialogClosed="handleViewDialogClosed()"
    ></ViewDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ViewDialog from "~/components/admin/ads/viewdialog.vue";
export default {
  layout: "admin",
  middleware: ["auth"],
  components: {
    ViewDialog,
  },
  data() {
    return {
      imageUrl: process.env.IMG_URL,
      snackbar: {
        snackbar: false,
        text: null,
        color: "dark",
      },
      form: {
        title: null,
        downPrice: null,
        totalAmount: null,
        commision: null,
        remainingQty: null,
        sliderImages: [],
        sliderVideo: null,
        installementDet: [],
        nocDoc: [],
        societyId: null,
        propertyTypeId: null,
        projectId: null,
        description: null,
        category: null,
        priority: false,
        mainImage: null,
      },
      preferences: [
        { prefrenceName: "Top Selling", id: 1 },
        { prefrenceName: "Hot Famous", id: 2 },
        { prefrenceName: "Recently Added", id: 3 },
      ],
      adCategory: null,
      adCategories: [
        { id: 1, category: "Society Ad" },
        { id: 2, category: "Project Ad" },
      ],
      getSocietyId: null,
      getProjectId: null,
      selectedMainImageUrl: null,
      viewDialog: false,
      currentADId: null,
      editADId: null,
      page: 1,
    };
  },
  methods: {
    ...mapActions({
      getSocieties: "society/getSocieties",
      getProjects: "project/getProjects",
      getADs: "ads/getEQuantityADs",
      countTotalAds: "ads/countEQuantityADs",
    }),
    addAD() {
      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("downPrice", this.form.downPrice);
      formData.append("totalAmount", this.form.totalAmount);
      formData.append("commision", this.form.commision);
      formData.append("remainingQty", this.form.remainingQty);
      formData.append("propertyTypeId", this.form.propertyTypeId);
      formData.append("description", this.form.description);
      formData.append("category", this.form.category);
      formData.append("priority", this.form.priority);
      formData.append("mainImage", this.form.mainImage);
      if (this.form.sliderVideo) {
        formData.append("sliderVideo", this.form.sliderVideo);
      }
      if (this.form.societyId) {
        formData.append("societyId", this.form.societyId);
      }
      if (this.form.projectId) {
        formData.append("projectId", this.form.projectId);
      }
      this.form.sliderImages.forEach((image) => {
        formData.append("sliderImages", image);
      });
      if (this.form.installementDet.length > 0) {
        this.form.installementDet.forEach((image) => {
          formData.append("installementDet", image);
        });
      }
      if (this.form.nocDoc.length > 0) {
        this.form.nocDoc.forEach((image) => {
          formData.append("nocDoc", image);
        });
      }
      this.$store
        .dispatch("ads/addAD", formData)
        .then((response) => {
          if (response.data.success) {
            this.snackbar.snackbar = true;
            this.snackbar.text = "AD Added Successfully";
            this.snackbar.color = "success";
            this.countTotalAds();
            this.getADs(this.page);
            this.dialog = false;
          }
        })
        .catch((err) => {
          this.dialog = true;
          this.snackbar.snackbar = true;
          this.snackbar.text = err;
          this.snackbar.color = "error";
        });
    },
    viewAD(id) {
      this.currentADId = null;
      this.currentADId = id;
    },
    handleViewDialogClosed() {
      this.currentADId = null;
    },
  },
  computed: {
    ...mapGetters({
      societies: "society/getSocieties",
      propertyTypes: "propertytype/getPropertyTypesOfSpecificSociety",
      projects: "project/getProjects",
      propertyTypesOfProjects: "propertytype/getPropertyTypesOfSpecificProject",
      ads: "ads/getADs",
      ad: "ads/getSingleAd",
      pages: "ads/getTotalPages",
    }),
  },
  created() {
    this.getSocieties();
    this.getProjects();
  },
  watch: {
    getSocietyId: {
      handler: function () {
        this.form.propertyTypeId = null;
        if (this.getSocietyId) {
          this.form.societyId = this.getSocietyId;
          this.$store.dispatch(
            "propertytype/getPropertyTypesOfSpecificSociety",
            this.form.societyId
          );
        }
      },
      deep: true,
    },
    getProjectId: {
      handler: function () {
        this.form.propertyTypeId = null;
        if (this.getProjectId) {
          this.form.projectId = this.getProjectId;
          this.$store.dispatch(
            "propertytype/getPropertyTypesOfSpecificProject",
            this.form.projectId
          );
        }
      },
      deep: true,
    },
    adCategory: {
      handler: function () {
        this.form.propertyTypeId = null;
        this.form.societyId = null;
        this.getSocietyId = null;
        this.form.projectId = null;
        this.getProjectId = null;
      },
      deep: true,
    },
    page: {
      handler: function () {
        this.getADs(this.page);
      },
      deep: true,
    },
  },
};
</script>

