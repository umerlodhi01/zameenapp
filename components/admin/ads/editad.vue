<template>
  <div class="pa-5">
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
            <v-btn dark text @click.prevent="editAd"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form ref="form" lazy-validation v-if="dialog">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    :rules="[
                      () =>
                        $v.form.title.required || 'Please add Title of this AD',
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
                    ref="mainImageField"
                    show-size
                    counter
                    multiple
                    accept="image/*"
                    @change="onMainImageSelected"
                    label="Upload Main Ad Image"
                  ></v-file-input>
                  <v-tooltip right v-if="selectedNewMainImageUrl">
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        height="120"
                        width="160"
                        :src="selectedNewMainImageUrl"
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
                  <v-img
                    v-else
                    height="120"
                    width="160"
                    :src="imageUrl + form.mainImage"
                  >
                  </v-img>
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
                      v-for="(image, i) in form.sliderImages"
                      :key="i"
                    >
                      <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                          <v-img
                            height="120"
                            width="160"
                            :src="imageUrl + image"
                          >
                            <v-icon
                              v-bind="attrs"
                              v-on="on"
                              class="mt-1"
                              style="float: right; cursor: pointer"
                              @click="deleteOldSliderImages(image)"
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
                  <div v-if="selectedNewImagesUrl.length > 0">
                    <v-flex
                      class="
                        text-caption text-center text-uppercase text-no-wrap
                        primary
                        mt-6
                      "
                    >
                      <h2 class="white--text">New Slider Images</h2>
                    </v-flex>
                    <v-row class="mt-1">
                      <v-col
                        cols="4"
                        v-for="(image, i) in selectedNewImagesUrl"
                        :key="i"
                      >
                        <v-tooltip right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-img
                              height="120"
                              width="160"
                              class="mt-2"
                              :src="image.url"
                            >
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
                  </div>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-switch
                    class="mt-8"
                    v-model="buttonConfirmationVideo"
                    inset
                    :label="`Does Slider have a video?`"
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="12" md="12" v-if="buttonConfirmationVideo">
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
                  <v-container
                    class="mt-8"
                    v-if="!form.newSliderVideo && this.form.sliderVideo"
                  >
                    <v-row>
                      <v-col cols="auto">
                        <div class="videoWidth">
                          <vue-core-video-player
                            :src="imageUrl + form.sliderVideo"
                          ></vue-core-video-player>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
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
                      v-for="(image, i) in form.installementDet"
                      :key="i"
                    >
                      <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                          <v-img
                            height="120"
                            width="160"
                            :src="imageUrl + image"
                          >
                            <v-icon
                              v-bind="attrs"
                              v-on="on"
                              class="mt-1"
                              style="float: right; cursor: pointer"
                              @click="deleteOldInstallementDetailImage(image)"
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
                  <div v-if="selectedNewInstallementDetailImagesUrl.length > 0">
                    <v-flex
                      class="
                        text-caption text-center text-uppercase text-no-wrap
                        primary
                      "
                      mt-8
                    >
                      <h2 class="white--text">
                        New Installement Details Images
                      </h2>
                    </v-flex>
                    <v-row class="mt-1">
                      <v-col
                        cols="4"
                        v-for="(
                          image, i
                        ) in selectedNewInstallementDetailImagesUrl"
                        :key="i"
                      >
                        <v-tooltip right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-img
                              height="120"
                              width="160"
                              class="mt-2"
                              :src="image.url"
                            >
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
                  </div>
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
                    <v-col cols="4" v-for="(image, i) in form.nocDoc" :key="i">
                      <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                          <v-img
                            height="120"
                            width="160"
                            :src="imageUrl + image"
                          >
                            <v-icon
                              v-bind="attrs"
                              v-on="on"
                              class="mt-1"
                              style="float: right; cursor: pointer"
                              @click="deleteOldNocDocumentImage(image)"
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
                  <div v-if="selectedNewNocDocumentImagesUrl.length > 0">
                    <v-flex
                      class="
                        text-caption text-center text-uppercase text-no-wrap
                        primary
                      "
                      mt-8
                    >
                      <h2 class="white--text">New Noc Document Images</h2>
                    </v-flex>
                    <v-row class="mt-1">
                      <v-col
                        cols="4"
                        v-for="(image, i) in selectedNewNocDocumentImagesUrl"
                        :key="i"
                      >
                        <v-tooltip right>
                          <template v-slot:activator="{ on, attrs }">
                            <v-img
                              height="120"
                              width="160"
                              class="mt-2"
                              :src="image.url"
                            >
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
                  </div>
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
                        v-model="form.societyId"
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
                        v-model="oldPropertyTypeId"
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
                        v-model="form.projectId"
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
                          $v.form.propertyTypeIdForProject.checkPropertyType ||
                            'Please select Property Type',
                        ]"
                        v-model="oldPropertyTypeId"
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
              @click.prevent="editAd"
              :disabled="isFormValid || isCommissionEntered"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
      imageUrl: process.env.IMG_URL,
      form: {
        title: null,
        downPrice: null,
        totalAmount: null,
        commision: null,
        remainingQty: null,
        sliderImages: [],
        newSliderImages: [],
        sliderVideo: null,
        newSliderVideo: null,
        installementDet: [],
        newInstallementDet: [],
        nocDoc: [],
        newNocDoc: [],
        societyId: null,
        propertyTypeId: null,
        newPropertyTypeId: null,
        projectId: null,
        description: null,
        category: null,
        priority: false,
        mainImage: null,
        newMainImage: null,
      },
      selectedNewMainImageUrl: null,
      selectedNewInstallementDetailImagesUrl: [],
      selectedNewNocDocumentImagesUrl: [],
      selectedNewImagesUrl: [],
      selectedNewVideoUrl: null,
      buttonConfirmation: false,
      buttonConfirmationVideo: false,
      buttonConfirmationInstallementDetails: false,
      buttonConfirmationNocDocuments: false,
      preferences: [
        { prefrenceName: "Top Selling", id: 1 },
        { prefrenceName: "Hot Famous", id: 2 },
        { prefrenceName: "Recently Added", id: 3 },
      ],
      adCategories: [
        { id: 1, category: "Society Ad" },
        { id: 2, category: "Project Ad" },
      ],
      adCategory: null,
      oldAdCategoryId: null,
      getSocietyId: null,
      getProjectId: null,
      oldPropertyTypeId: null,
    };
  },
  methods: {
    ...mapActions({
      getSocieties: "society/getSocieties",
      getProjects: "project/getProjects",
    }),
    findCurrentCategory(id) {
      if (id === 1) {
        return "Top Selling";
      }
      if (id === 2) {
        return "Hot Famous";
      }
      if (id === 3) {
        return "Recently Added";
      }
    },
    onImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.newSliderImages.push(e[0]);
            let selectedImages = [];
            selectedImages.push(this.form.newSliderImages.slice(-1)[0]);
            selectedImages.forEach((image) => {
              this.selectedNewImagesUrl.push({
                url: URL.createObjectURL(image),
                image: image,
              });
            });
          }
        }
      }
    },
    deleteSelectedImage(imageObject) {
      const imageIndex = this.form.newSliderImages.findIndex(
        (image) => imageObject.image === image
      );
      const urlIndex = this.selectedNewImagesUrl.findIndex(
        (url) => imageObject.url === url.url
      );
      this.form.newSliderImages.splice(imageIndex, 1);
      this.selectedNewImagesUrl.splice(urlIndex, 1);
    },
    deleteOldSliderImages(imageName) {
      const imageIndex = this.form.sliderImages.findIndex(
        (image) => imageName === image
      );
      this.form.sliderImages.splice(imageIndex, 1);
    },
    onVideoSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.newSliderVideo = e[0];
            this.selectedNewVideoUrl = URL.createObjectURL(
              this.form.newSliderVideo
            );
          } else {
            this.form.newSliderVideo = null;
            this.selectedNewVideoUrl = null;
          }
        }
      }
    },
    onMainImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.newMainImage = e[0];
            this.selectedNewMainImageUrl = URL.createObjectURL(
              this.form.newMainImage
            );
          } else {
            this.form.newMainImage = null;
            this.selectedNewMainImageUrl = null;
          }
        }
      }
    },
    deleteSelectedMainImage() {
      if (this.dialog) {
        this.form.newMainImage = null;
        this.selectedNewMainImageUrl = null;
        this.$refs["mainImageField"].reset();
      }
    },
    onInstallementDetailsImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.newInstallementDet.push(e[0]);
            let selectedImages = [];
            selectedImages.push(this.form.newInstallementDet.slice(-1)[0]);
            selectedImages.forEach((image) => {
              this.selectedNewInstallementDetailImagesUrl.push({
                url: URL.createObjectURL(image),
                image: image,
              });
            });
          }
        }
      }
    },
    deleteSelectedInstallementDetailImage(imageObject) {
      const imageIndex = this.form.newInstallementDet.findIndex(
        (image) => imageObject.image === image
      );
      const urlIndex = this.selectedNewInstallementDetailImagesUrl.findIndex(
        (url) => imageObject.url === url.url
      );
      this.form.newInstallementDet.splice(imageIndex, 1);
      this.selectedNewInstallementDetailImagesUrl.splice(urlIndex, 1);
    },
    deleteOldInstallementDetailImage(imageName) {
      const imageIndex = this.form.installementDet.findIndex(
        (image) => imageName === image
      );
      this.form.installementDet.splice(imageIndex, 1);
    },
    onNocDocumentsImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.newNocDoc.push(e[0]);
            let selectedImages = [];
            selectedImages.push(this.form.newNocDoc.slice(-1)[0]);
            selectedImages.forEach((image) => {
              this.selectedNewNocDocumentImagesUrl.push({
                url: URL.createObjectURL(image),
                image: image,
              });
            });
          }
        }
      }
    },
    deleteOldNocDocumentImage(imageName) {
      const imageIndex = this.form.nocDoc.findIndex(
        (image) => imageName === image
      );
      this.form.nocDoc.splice(imageIndex, 1);
    },
    deleteSelectedNocDocumentImage(imageObject) {
      const imageIndex = this.form.newNocDoc.findIndex(
        (image) => imageObject.image === image
      );
      const urlIndex = this.selectedNewNocDocumentImagesUrl.findIndex(
        (url) => imageObject.url === url.url
      );
      this.form.newNocDoc.splice(imageIndex, 1);
      this.selectedNewNocDocumentImagesUrl.splice(urlIndex, 1);
    },
    editAd() {
      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("downPrice", this.form.downPrice);
      formData.append("totalAmount", this.form.totalAmount);
      formData.append("commision", this.form.commision);
      formData.append("remainingQty", this.form.remainingQty);
      formData.append("description", this.form.description);
      formData.append("category", this.form.category);
      formData.append("id", this.form._id);
      formData.append("priority", this.form.priority);
      if (this.form.newPropertyTypeId) {
        formData.append("propertyTypeId", this.form.newPropertyTypeId);
      } else {
        formData.append("propertyTypeId", this.form.propertyTypeId);
      }
      if (this.form.newMainImage) {
        formData.append("newMainImage", false);
        formData.append("newMainImage", this.form.newMainImage);
      } else {
        formData.append("mainImage", this.form.mainImage);
      }
      if (this.form.newSliderVideo) {
        if (this.buttonConfirmationVideo) {
          formData.append("newSliderVideo", true);
          formData.append("newSliderVideo", this.form.newSliderVideo);
        }
      } else if (this.form.sliderVideo) {
        if (this.buttonConfirmationVideo) {
          formData.append("sliderVideo", this.form.sliderVideo);
        }
      }
      if (this.form.societyId) {
        formData.append("societyId", this.form.societyId);
      }
      if (this.form.projectId) {
        formData.append("projectId", this.form.projectId);
      }
      if (this.form.sliderImages.length > 0) {
        this.form.sliderImages.forEach((image) => {
          formData.append("sliderImages", image);
        });
      }
      if (this.form.newSliderImages.length > 0) {
        formData.append("newSliderImages", true);
        this.form.newSliderImages.forEach((image) => {
          formData.append("newSliderImages", image);
        });
      }
      if (this.form.installementDet.length > 0) {
        this.form.installementDet.forEach((image) => {
          formData.append("installementDet", image);
        });
      }
      if (this.form.newInstallementDet.length > 0) {
        formData.append("newInstallementDet", true);
        this.form.newInstallementDet.forEach((image) => {
          formData.append("newInstallementDet", image);
        });
      }
      if (this.form.nocDoc.length > 0) {
        this.form.nocDoc.forEach((image) => {
          formData.append("nocDoc", image);
        });
      }
      if (this.form.newNocDoc.length > 0) {
        formData.append("newNocDoc", true);
        this.form.newNocDoc.forEach((image) => {
          formData.append("newNocDoc", image);
        });
      }
      this.$store
        .dispatch("ads/updateAd", formData)
        .then((response) => {
          if (response.data.success) {
            this.$emit("success");
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
  },
  computed: {
    ...mapGetters({
      ad: "ads/getSingleAd",
      societies: "society/getSocieties",
      propertyTypes: "propertytype/getPropertyTypesOfSpecificSociety",
      projects: "project/getProjects",
      propertyTypesOfProjects: "propertytype/getPropertyTypesOfSpecificProject",
    }),
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
    isFormValid() {
      return this.$v.form.$invalid;
    },
  },
  created() {
    this.$store
      .dispatch("ads/editAd", this.id)
      .then((response) => {
        Object.assign(this.form, response);
      })
      .then(() => {
        if (this.form.sliderVideo) {
          this.buttonConfirmationVideo = true;
        }
        if (this.form.nocDoc.length > 0) {
          this.buttonConfirmationNocDocuments = true;
        }
        if (this.form.installementDet.length > 0) {
          this.buttonConfirmationInstallementDetails = true;
        }
        if (this.form.societyId) {
          this.adCategory = 1;
        }
        if (this.form.projectId) {
          this.adCategory = 2;
        }
        this.oldPropertyTypeId = this.form.propertyTypeId;
        this.oldAdCategoryId = this.adCategory;
        this.dialog = true;
      });
    this.getSocieties();
    this.getProjects();
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
          if (
            this.form.sliderImages.length > 0 ||
            this.form.newSliderImages.length > 0
          ) {
            return true;
          } else {
            return false;
          }
        },
      },
      video: {
        checkVideo() {
          if (this.buttonConfirmationVideo) {
            if (this.form.sliderVideo || this.form.newSliderVideo) {
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
            if (
              this.form.installementDet.length > 0 ||
              this.form.newInstallementDet.length > 0
            ) {
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
            if (this.form.nocDoc.length > 0 || this.form.newNocDoc.length > 0) {
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
      handler: function (value) {
        if (value === false) {
          this.form.newSliderVideo = null;
          this.form.sliderVideo = null;
        }
      },
      deep: true,
    },
    buttonConfirmationInstallementDetails: {
      handler: function (value) {
        if (value === false) {
          this.form.installementDet = [];
          this.form.newInstallementDet = [];
        }
      },
      deep: true,
    },
    buttonConfirmationNocDocuments: {
      handler: function (value) {
        if (value === false) {
          this.form.nocDoc = [];
          this.form.newNocDoc = [];
        }
      },
      deep: true,
    },
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.$emit("editDialogClosed");
        }
      },
      deep: true,
    },
    oldPropertyTypeId: {
      handler: function () {
        if (this.oldPropertyTypeId != this.form.propertyTypeId) {
          this.form.newPropertyTypeId = this.oldPropertyTypeId;
        }
        if (this.oldPropertyTypeId === this.form.propertyTypeId) {
          this.form.newPropertyTypeId = null;
        }
      },
      deep: true,
    },
    adCategory: {
      handler: function (value) {
        if (this.oldAdCategoryId === this.adCategory) {
          this.$store
            .dispatch("ads/editAd", this.id)
            .then((response) => {
              if (response.societyId) {
                this.form.societyId = response.societyId;
              }
              if (response.projectId) {
                this.form.projectId = response.projectId;
              }
              this.form.propertyTypeId = response.propertyTypeId;
            })
            .then(() => {
              this.oldPropertyTypeId = this.form.propertyTypeId;
              this.dialog = true;
            });
        }
      },
      deep: true,
    },
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.$emit("editDialogClosed");
          this.form.title = null;
          this.form.downPrice = null;
          this.form.totalAmount = null;
          this.form.commision = null;
          this.form.remainingQty = null;
          this.form.sliderImages = [];
          this.form.newSliderImages = [];
          this.form.sliderVideo = null;
          this.form.newSliderVideo = null;
          this.form.installementDet = [];
          this.form.newInstallementDet = [];
          this.form.nocDoc = [];
          this.form.newNocDoc = [];
          this.selectedNewImagesUrl = [];
          this.selectedNewMainImageUrl = null;
          this.selectedNewInstallementDetailImagesUrl = [];
          this.selectedNewNocDocumentImagesUrl = [];
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
    "form.projectId": {
      handler: function () {
        if (this.form.projectId) {
          this.form.societyId = null;
          this.form.newPropertyTypeId = null;
          this.$store.dispatch(
            "propertytype/getPropertyTypesOfSpecificProject",
            this.form.projectId
          );
        }
      },
      deep: true,
    },
    "form.societyId": {
      handler: function () {
        this.form.newPropertyTypeId = null;
        if (this.form.societyId) {
          this.form.projectId = null;
          this.$store.dispatch(
            "propertytype/getPropertyTypesOfSpecificSociety",
            this.form.societyId
          );
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.videoWidth {
  width: 400px;
}
</style>