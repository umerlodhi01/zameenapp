<template>
  <div class="pa-5">
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        max-width="700px"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar flat dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Property Ads</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click.prevent="addAD"> Save </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-form ref="form" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :rules="[
                        () =>
                          $v.form.title.required ||
                          'Please add Title of this AD',
                      ]"
                      label="Ad Title"
                      required
                      v-model="form.title"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :rules="[
                        () =>
                          $v.form.downPrice.required ||
                          'Please down price of this AD',
                      ]"
                      label="Down Price"
                      type="number"
                      required
                      v-model="form.downPrice"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :rules="[
                        () =>
                          $v.form.totalAmount.required ||
                          'Please add Total Amount of this AD',
                      ]"
                      label="Total Amount"
                      type="number"
                      required
                      v-model="form.totalAmount"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-row>
                      <v-col
                        :cols="isCommissionEntered ? '8' : '10'"
                        :sm="isCommissionEntered ? '8' : '10'"
                        :md="isCommissionEntered ? '8' : '10'"
                      >
                        <v-slider
                          class="mt-3"
                          v-model="form.commision"
                          label="Commision "
                          :error="isCommissionEntered"
                          :thumb-color="isCommissionEntered ? 'red' : 'primary'"
                        ></v-slider>
                      </v-col>
                      <v-col cols="2" sm="2" md="2">
                        <v-chip
                          class="ma-2"
                          :color="isCommissionEntered ? 'red' : 'primary'"
                          dark
                        >
                          {{ form.commision ? form.commision + "%" : "0 %" }}
                        </v-chip>
                      </v-col>
                      <v-col cols="2" sm="2" md="2" v-if="isCommissionEntered">
                        <v-chip class="ma-2" color="red" dark>
                          Commission Required
                        </v-chip>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :rules="[
                        () =>
                          $v.form.remainingQty.required ||
                          'Please Add remining quantity of this AD',
                      ]"
                      label="Remaining Quantity"
                      type="number"
                      required
                      v-model="form.remainingQty"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      :rules="[
                        () =>
                          $v.form.description.required ||
                          'Please Add Description of this AD',
                      ]"
                      clearable
                      clear-icon="mdi-close-circle"
                      label="Ad Description"
                      v-model="form.description"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-checkbox
                      v-model="form.priority"
                      label="Does it have a recomended Logo?"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      :rules="[
                        () =>
                          $v.form.category.required ||
                          'Please Select prefrence of this AD',
                      ]"
                      v-model="form.category"
                      :items="preferences"
                      item-text="prefrenceName"
                      item-value="id"
                      label="Select Ad Prefrence"
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      :rules="[
                        () =>
                          $v.form.mainImage.required ||
                          'Please Select main image of this AD',
                      ]"
                      ref="mainImageField"
                      show-size
                      counter
                      multiple
                      accept="image/*"
                      @change="onMainImageSelected"
                      label="Upload Main Ad Image"
                    ></v-file-input>
                    <v-tooltip right v-if="selectedMainImageUrl">
                      <template v-slot:activator="{ on, attrs }">
                        <v-img
                          height="120"
                          width="160"
                          :src="selectedMainImageUrl"
                        >
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            class="mt-1"
                            style="float: right; cursor: pointer"
                            @click="deleteSelectedMainImage()"
                            color="red"
                            size="30"
                          >
                            mdi-delete
                          </v-icon></v-img
                        >
                      </template>
                      <span>Delete This Image</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      :rules="[
                        $v.form.images.imagesLength ||
                          'Please add atleast one image',
                      ]"
                      ref="fileField"
                      multiple
                      show-size
                      label="Add Multiple Slider Images"
                      @change="onImageSelected"
                    ></v-file-input>
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(image, i) in selectedImagesUrl"
                        :key="i"
                      >
                        <v-tooltip right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-img height="120" width="160" :src="image.url">
                              <v-icon
                                v-bind="attrs"
                                v-on="on"
                                class="mt-1"
                                style="float: right; cursor: pointer"
                                @click="deleteSelectedImage(image)"
                                color="red"
                                size="30"
                              >
                                mdi-delete
                              </v-icon></v-img
                            >
                          </template>
                          <span>Delete This Image</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      class="mt-8"
                      v-model="buttonConfirmationVideo"
                      inset
                      :label="`Does Slider have a video?`"
                    ></v-switch>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="buttonConfirmationVideo"
                  >
                    <v-file-input
                      :rules="[
                        $v.form.video.checkVideo ||
                          'Please add a video or uncheck the video question',
                      ]"
                      ref="videoField"
                      multiple
                      show-size
                      label="Add Video"
                      @change="onVideoSelected"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      class="mt-8"
                      v-model="buttonConfirmationInstallementDetails"
                      inset
                      :label="`Does This Ad have a installement details pictures`"
                    ></v-switch>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="buttonConfirmationInstallementDetails"
                  >
                    <v-file-input
                      :rules="[
                        $v.form.installementDet.checkInstallementDet ||
                          'Please add atleast one image of installement detail or uncheck the installement details question',
                      ]"
                      ref="fileField"
                      multiple
                      show-size
                      label="Add Multiple Installement Details Images"
                      @change="onInstallementDetailsImageSelected"
                    ></v-file-input>
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(
                          image, i
                        ) in selectedInstallementDetailImagesUrl"
                        :key="i"
                      >
                        <v-tooltip right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-img height="120" width="160" :src="image.url">
                              <v-icon
                                v-bind="attrs"
                                v-on="on"
                                class="mt-1"
                                style="float: right; cursor: pointer"
                                @click="
                                  deleteSelectedInstallementDetailImage(image)
                                "
                                color="red"
                                size="30"
                              >
                                mdi-delete
                              </v-icon></v-img
                            >
                          </template>
                          <span>Delete This Image</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      class="mt-8"
                      v-model="buttonConfirmationNocDocuments"
                      inset
                      :label="`Does This Ad have a NOC Documents pictures?`"
                    ></v-switch>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="buttonConfirmationNocDocuments"
                  >
                    <v-file-input
                      :rules="[
                        $v.form.nocDoc.checkNocDoc ||
                          'Please add atleast one image of NOC document or uncheck the NOC document question',
                      ]"
                      ref="fileField"
                      multiple
                      show-size
                      label="Add Multiple NOC Document Images"
                      @change="onNocDocumentsImageSelected"
                    ></v-file-input>
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(image, i) in selectedNocDocumentImagesUrl"
                        :key="i"
                      >
                        <v-tooltip right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-img height="120" width="160" :src="image.url">
                              <v-icon
                                v-bind="attrs"
                                v-on="on"
                                class="mt-1"
                                style="float: right; cursor: pointer"
                                @click="deleteSelectedNocDocumentImage(image)"
                                color="red"
                                size="30"
                              >
                                mdi-delete
                              </v-icon></v-img
                            >
                          </template>
                          <span>Delete This Image</span>
                        </v-tooltip>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-flex
                      class="
                        text-caption text-center text-uppercase text-no-wrap
                        primary
                      "
                    >
                      <h2 class="white--text">Select Ad Category</h2>
                    </v-flex>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
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
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          :rules="[
                            $v.form.societyId.checkSociety ||
                              'Please select society',
                          ]"
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
                        cols="12"
                        sm="12"
                        md="12"
                        v-if="propertyTypes && form.societyId"
                      >
                        <v-select
                          :rules="[
                            $v.form.propertyTypeId.checkPropertyType ||
                              'Please select Property Type',
                          ]"
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
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="adCategory === 2">
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          :rules="[
                            $v.form.projectId.checkProject ||
                              'Please select project',
                          ]"
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
                        cols="12"
                        sm="12"
                        md="12"
                        v-if="propertyTypesOfProjects && form.projectId"
                      >
                        <v-select
                          :rules="[
                            $v.form.propertyTypeIdForProject
                              .checkPropertyType ||
                              'Please select Property Type',
                          ]"
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
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click.prevent="addAD"
                :disabled="
                  isFormValid || isCommissionEntered || isCategorySelected
                "
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
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
                    dark
                    v-on="on"
                    v-bind="attrs"
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
    <EditDialog
      v-if="editADId"
      :id="editADId"
      @editDialogClosed="editDialogClosed()"
      @success="handleEditSuccess()"
    ></EditDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import ViewDialog from "~/components/admin/ads/viewdialog.vue";
import EditDialog from "~/components/admin/ads/editad.vue";
export default {
  layout: "admin",
  middleware: ["auth"],
  components: {
    ViewDialog,
    EditDialog,
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
      dialog: false,
      buttonConfirmation: false,
      selectedImagesUrl: [],
      selectedInstallementDetailImagesUrl: [],
      selectedNocDocumentImagesUrl: [],
      buttonConfirmationVideo: false,
      buttonConfirmationInstallementDetails: false,
      buttonConfirmationNocDocuments: false,
      selectedVideoUrl: null,
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
      getADs: "ads/getDisableADs",
      countTotalAds: "ads/countDisableADs",
    }),
    onImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.sliderImages.push(e[0]);
            let selectedImages = [];
            selectedImages.push(this.form.sliderImages.slice(-1)[0]);
            selectedImages.forEach((image) => {
              this.selectedImagesUrl.push({
                url: URL.createObjectURL(image),
                image: image,
              });
            });
          }
        }
      }
    },
    deleteSelectedImage(imageObject) {
      const imageIndex = this.form.sliderImages.findIndex(
        (image) => imageObject.image === image
      );
      const urlIndex = this.selectedImagesUrl.findIndex(
        (url) => imageObject.url === url.url
      );
      this.form.sliderImages.splice(imageIndex, 1);
      this.selectedImagesUrl.splice(urlIndex, 1);
    },
    onVideoSelected(e) {
      if (this.dialog && this.buttonConfirmationVideo) {
        if (e) {
          if (e[0]) {
            this.form.sliderVideo = e[0];
            this.selectedVideoUrl = URL.createObjectURL(this.form.sliderVideo);
          } else {
            this.form.sliderVideo = null;
            this.selectedVideoUrl = null;
          }
        }
      }
    },
    onMainImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.mainImage = e[0];
            this.selectedMainImageUrl = URL.createObjectURL(
              this.form.mainImage
            );
          } else {
            this.form.mainImage = null;
            this.selectedMainImageUrl = null;
          }
        }
      }
    },
    deleteSelectedMainImage() {
      if (this.dialog) {
        this.form.mainImage = null;
        this.selectedMainImageUrl = null;
        this.$refs["mainImageField"].reset();
      }
    },
    onInstallementDetailsImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.installementDet.push(e[0]);
            let selectedImages = [];
            selectedImages.push(this.form.installementDet.slice(-1)[0]);
            selectedImages.forEach((image) => {
              this.selectedInstallementDetailImagesUrl.push({
                url: URL.createObjectURL(image),
                image: image,
              });
            });
          }
        }
      }
    },
    deleteSelectedInstallementDetailImage(imageObject) {
      const imageIndex = this.form.installementDet.findIndex(
        (image) => imageObject.image === image
      );
      const urlIndex = this.selectedInstallementDetailImagesUrl.findIndex(
        (url) => imageObject.url === url.url
      );
      this.form.installementDet.splice(imageIndex, 1);
      this.selectedInstallementDetailImagesUrl.splice(urlIndex, 1);
    },
    onNocDocumentsImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.nocDoc.push(e[0]);
            let selectedImages = [];
            selectedImages.push(this.form.nocDoc.slice(-1)[0]);
            selectedImages.forEach((image) => {
              this.selectedNocDocumentImagesUrl.push({
                url: URL.createObjectURL(image),
                image: image,
              });
            });
          }
        }
      }
    },
    deleteSelectedNocDocumentImage(imageObject) {
      const imageIndex = this.form.nocDoc.findIndex(
        (image) => imageObject.image === image
      );
      const urlIndex = this.selectedNocDocumentImagesUrl.findIndex(
        (url) => imageObject.url === url.url
      );
      this.form.nocDoc.splice(imageIndex, 1);
      this.selectedNocDocumentImagesUrl.splice(urlIndex, 1);
    },
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
    editDialogClosed() {
      this.editADId = null;
    },
    editAD(id) {
      this.editADId = null;
      this.editADId = id;
    },
    handleEditSuccess() {
      this.snackbar.snackbar = true;
      this.snackbar.text = "AD Updated Successfully";
      this.snackbar.color = "success";
    },
    activateAd(id) {
      this.$store.dispatch("ads/activateAd", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "AD Activated Successfully";
          this.snackbar.color = "error";
          this.countTotalAds();
          this.getADs(this.page);
        }
      });
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
    isFormValid() {
      return this.$v.form.$invalid;
    },
    isCommissionEntered() {
      if (this.form.commision) {
        return false;
      } else {
        return true;
      }
    },
    isCategorySelected() {
      if (this.adCategory) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    this.getSocieties();
    this.getProjects();
    this.getADs(this.page);
    this.countTotalAds();
  },
  validations: {
    form: {
      title: {
        required,
      },
      downPrice: {
        required,
      },
      totalAmount: {
        required,
      },
      remainingQty: {
        required,
      },
      description: {
        required,
      },
      category: {
        required,
      },
      mainImage: {
        required,
      },
      images: {
        imagesLength() {
          if (this.form.sliderImages.length > 0) {
            return true;
          } else {
            return false;
          }
        },
      },
      video: {
        checkVideo() {
          if (this.buttonConfirmationVideo) {
            if (this.form.sliderVideo) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        },
      },
      installementDet: {
        checkInstallementDet() {
          if (this.buttonConfirmationInstallementDetails) {
            if (this.form.installementDet.length > 0) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        },
      },
      nocDoc: {
        checkNocDoc() {
          if (this.buttonConfirmationNocDocuments) {
            if (this.form.nocDoc.length > 0) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        },
      },
      societyId: {
        checkSociety() {
          if (this.adCategory === 1) {
            if (this.form.societyId) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        },
      },
      propertyTypeId: {
        checkPropertyType() {
          if (this.adCategory === 1) {
            if (this.form.propertyTypeId) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        },
      },
      propertyTypeIdForProject: {
        checkPropertyType() {
          if (this.adCategory === 2) {
            if (this.form.propertyTypeId) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        },
      },
      projectId: {
        checkProject() {
          if (this.adCategory === 2) {
            if (this.form.projectId) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        },
      },
    },
  },
  watch: {
    buttonConfirmationVideo: {
      handler: function () {
        this.form.sliderVideo = null;
        this.selectedVideoUrl = null;
      },
      deep: true,
    },
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
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.form.title = null;
          this.form.downPrice = null;
          this.form.totalAmount = null;
          this.form.commision = null;
          this.form.remainingQty = null;
          this.form.sliderImages = [];
          this.form.sliderVideo = null;
          this.form.installementDet = [];
          this.form.nocDoc = [];
          this.selectedImagesUrl = [];
          this.selectedMainImageUrl = null;
          this.selectedInstallementDetailImagesUrl = [];
          this.selectedNocDocumentImagesUrl = [];
          this.form.societyId = null;
          this.form.propertyTypeId = null;
          this.form.projectId = null;
          this.form.description = null;
          this.form.category = null;
          this.form.priority = null;
          this.form.mainImage = null;
          this.getProjectId = null;
          this.getSocietyId = null;
          this.$refs.form.reset();
        }
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

