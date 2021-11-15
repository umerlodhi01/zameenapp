<template>
  <div class="pa-5">
    <v-btn
      @click="dialog = !dialog"
      color="green"
      dark
      class="ma-2 white--text"
    >
      Add Property Types
      <v-icon right> mdi-playlist-plus </v-icon>
    </v-btn>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Property Type</span>
          </v-card-title>
          <v-form ref="form" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      @blur="$v.form.propertyType.$touch"
                      :rules="[
                        () =>
                          $v.form.propertyType.required ||
                          'Property Type Title is Required',
                      ]"
                      label="Project Type Title"
                      required
                      v-model="form.propertyType"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      ref="fileField"
                      :rules="[
                        $v.form.images.checkImageLength ||
                          'Please select atleast one picture',
                      ]"
                      multiple
                      show-size
                      label="Add Multiple Images"
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
                    <v-select
                      @blur="$v.form.societyId.$touch"
                      :rules="[
                        () =>
                          $v.form.societyId.required ||
                          'Please Select Atleast One Society',
                      ]"
                      v-if="societies"
                      v-model="form.societyId"
                      :items="societies"
                      item-text="society_name"
                      item-value="_id"
                      label="Select Society"
                      multiple
                      chips
                      hint="Select societies which will have this project type"
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      v-if="projects"
                      v-model="form.projectId"
                      :items="projects"
                      item-text="projectName"
                      item-value="_id"
                      label="Select Project"
                      multiple
                      chips
                      hint="Select projects which will have this property type"
                      persistent-hint
                    ></v-select>
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
                @click.prevent="addPropertyType"
                :disabled="isFormValid"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog v-model="editDialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Project Type</span>
          </v-card-title>
          <v-form ref="editForm" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Project Type Title"
                      required
                      @blur="$v.editMode.form.propertyType.$touch"
                      :rules="[
                        () =>
                          $v.editMode.form.propertyType.required ||
                          'Property Type Title is Required',
                      ]"
                      v-model="editMode.form.propertyType"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      ref="fileFieldEdit"
                      :rules="[
                        $v.editMode.form.images.checkImageLength ||
                          'Please select atleast one picture',
                      ]"
                      multiple
                      label="Add Multiple Images"
                      @change="onImageSelectedForEdit"
                    ></v-file-input>
                    <v-row v-if="editMode.form.images">
                      <v-col
                        cols="4"
                        v-for="(image, i) in editMode.form.images"
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
                                @click="deleteDBImage(image)"
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
                    <div v-if="editMode.selectedImagesUrl.length > 0">
                      <v-flex
                        class="
                          text-caption text-center text-uppercase text-no-wrap
                          primary
                        "
                        mt-3
                      >
                        <h2 class="white--text">New Images</h2>
                      </v-flex>
                      <v-row>
                        <v-col
                          cols="4"
                          v-for="(image, i) in editMode.selectedImagesUrl"
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
                                  @click="deletenewSelectedImage(image)"
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
                    <v-select
                      @blur="$v.editMode.form.societyId.$touch"
                      :rules="[
                        () =>
                          $v.editMode.form.societyId.required ||
                          'Please Select atleast one society',
                      ]"
                      v-if="societies"
                      v-model="editMode.form.societyId"
                      :items="societies"
                      item-text="society_name"
                      item-value="_id"
                      label="Select Society"
                      multiple
                      chips
                      hint="Select societies which will have this project type"
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      v-if="projects"
                      v-model="editMode.form.projectId"
                      :items="projects"
                      item-text="projectName"
                      item-value="_id"
                      label="Select Project"
                      multiple
                      chips
                      hint="Select projects which will have this property type"
                      persistent-hint
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="editDialog = false">
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="isEditFormValid"
                @click.prevent="editPropertyType"
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
            <th class="text-left">Property Type Title</th>
            <th class="text-left">Images</th>
            <th class="text-left">Societies</th>
            <th class="text-left">Projects</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody v-if="propertyTypes">
          <tr v-for="type in propertyTypes" :key="type._id">
            <td>{{ type.propertyType }}</td>
            <td>
              <v-row :no-gutters="true">
                <v-col
                  cols="auto"
                  hide-details
                  v-for="(image, i) in type.images"
                  :key="i"
                >
                  <v-img
                    class="ma-2"
                    style="cursor: pointer"
                    height="50"
                    width="100"
                    :src="imageUrl + image"
                  ></v-img>
                </v-col>
              </v-row>
            </td>
            <td>
              <v-row :no-gutters="true">
                <v-col cols="auto">
                  <v-chip
                    class="ma-2"
                    v-for="(society, i) in type.societyId"
                    :key="i"
                    color="primary"
                  >
                    {{ society.society_name }}
                  </v-chip>
                </v-col>
              </v-row>
            </td>
            <td v-if="type.projectId.length > 0">
              <v-row :no-gutters="true">
                <v-col cols="auto">
                  <v-chip
                    class="ma-2"
                    v-for="(project, i) in type.projectId"
                    :key="i"
                    color="primary"
                  >
                    {{
                      project.projectName
                        ? project.projectName
                        : "No Projects Found"
                    }}
                  </v-chip>
                </v-col>
              </v-row>
            </td>
            <td v-else>
              <v-row :no-gutters="true">
                <v-col cols="auto">
                  <v-chip class="ma-2" color="red" dark>
                    No Project Found
                  </v-chip>
                </v-col>
              </v-row>
            </td>
            <td>
              <v-icon
                color="error"
                @click.prevent="deleteProjectType(type._id)"
              >
                mdi-delete
              </v-icon>
              <v-icon
                color="primary"
                @click.prevent="editProjectType(type._id)"
              >
                mdi-pencil
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      imageUrl: process.env.IMG_URL,
      snackbar: {
        snackbar: false,
        text: null,
        color: "dark",
      },
      form: {
        propertyType: null,
        images: [],
        societyId: [],
        projectId: [],
      },
      selectedImagesUrl: [],
      dialog: false,
      editDialog: false,
      editMode: {
        form: {
          propertyType: null,
          images: [],
          societyId: null,
          projectId: null,
          newImages: [],
        },
        selectedImagesUrl: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      societies: "society/getSocieties",
      propertyTypes: "propertytype/getPropertyTypes",
      projects: "project/getProjects",
    }),
    isFormValid() {
      return this.$v.form.$invalid;
    },
    isEditFormValid() {
      return this.$v.editMode.form.$invalid;
    },
  },
  validations: {
    form: {
      images: {
        checkImageLength() {
          if (this.form.images.length > 0) {
            return true;
          } else {
            return false;
          }
        },
      },
      propertyType: {
        required,
      },
      societyId: {
        required,
      },
    },
    editMode: {
      form: {
        images: {
          checkImageLength() {
            if (
              this.editMode.form.images.length > 0 ||
              this.editMode.form.newImages.length > 0
            ) {
              return true;
            } else {
              return false;
            }
          },
        },
        propertyType: {
          required,
        },
        societyId: {
          required,
        },
      },
    },
  },
  methods: {
    ...mapActions({
      getSocieties: "society/getSocieties",
      getPropertyTypes: "propertytype/getPropertyTypes",
      getProjects: "project/getProjects",
    }),
    onImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.images.push(e[0]);
            let selectedImages = [];
            selectedImages.push(this.form.images.slice(-1)[0]);
            selectedImages.forEach((image) => {
              this.selectedImagesUrl.push({
                url: URL.createObjectURL(image),
                image: image,
              });
            });
            this.$refs["fileField"].reset();
          }
        }
      }
    },
    deleteSelectedImage(imageObject) {
      const imageIndex = this.form.images.findIndex(
        (image) => imageObject.image === image
      );
      const urlIndex = this.selectedImagesUrl.findIndex(
        (url) => imageObject.url === url.url
      );
      this.form.images.splice(imageIndex, 1);
      this.selectedImagesUrl.splice(urlIndex, 1);
    },
    addPropertyType() {
      const formData = new FormData();
      formData.append("propertyType", this.form.propertyType);
      this.form.images.forEach((image) => {
        formData.append("images", image);
      });
      this.form.societyId.forEach((id) => {
        formData.append("societyId", id);
      });
      if (this.form.projectId) {
        this.form.projectId.forEach((id) => {
          formData.append("projectId", id);
        });
      }
      this.$store
        .dispatch("propertytype/addPropertyType", formData)
        .then((response) => {
          if (response.data.success) {
            this.dialog = false;
            this.snackbar.snackbar = true;
            this.snackbar.text = "Property Type Added Successfully";
            this.snackbar.color = "success";
            this.getPropertyTypes();
          }
        });
    },
    editProjectType(id) {
      this.$store
        .dispatch("propertytype/getPropertyTypeById", id)
        .then((response) => {
          Object.assign(this.editMode.form, response);
        })
        .then(() => {
          this.editDialog = true;
        });
    },
    onImageSelectedForEdit(e) {
      if (this.editDialog) {
        if (e) {
          if (e[0]) {
            this.editMode.form.newImages.push(e[0]);
            let selectedImages = [];
            selectedImages.push(this.editMode.form.newImages.slice(-1)[0]);
            selectedImages.forEach((image) => {
              this.editMode.selectedImagesUrl.push({
                url: URL.createObjectURL(image),
                image: image,
              });
            });
            this.$refs["fileFieldEdit"].reset();
          }
        }
      }
    },
    deletenewSelectedImage(imageObject) {
      const imageIndex = this.editMode.form.newImages.findIndex(
        (image) => imageObject.image === image
      );
      const urlIndex = this.editMode.selectedImagesUrl.findIndex(
        (url) => imageObject.url === url.url
      );
      this.editMode.form.newImages.splice(imageIndex, 1);
      this.editMode.selectedImagesUrl.splice(urlIndex, 1);
    },
    deleteDBImage(image) {
      const index = this.editMode.form.images.indexOf(image);
      this.editMode.form.images.splice(index, 1);
      // console.log(this.editMode.form.images);
    },
    editPropertyType() {
      const formData = new FormData();
      formData.append("propertyType", this.editMode.form.propertyType);
      formData.append("_id", this.editMode.form._id);
      if (this.editMode.form.newImages.length > 0) {
        this.editMode.form.newImages.forEach((image) => {
          formData.append("newImages", image);
        });
      }
      if (this.editMode.form.projectId) {
        this.editMode.form.projectId.forEach((id) => {
          formData.append("projectId", id);
        });
      }
      formData.append("images", this.editMode.form.images);
      this.editMode.form.societyId.forEach((id) => {
        formData.append("societyId", id);
      });
      this.$store
        .dispatch("propertytype/editPropertyType", formData)
        .then((response) => {
          if (response.data.success) {
            this.editDialog = false;
            this.snackbar.snackbar = true;
            this.snackbar.text = "Property Type Updated Successfully";
            this.snackbar.color = "success";
            this.getPropertyTypes();
          }
        });
    },
    deleteProjectType(id) {
      this.$store
        .dispatch("propertytype/deletePropertyType", id)
        .then((response) => {
          if (response.data.success) {
            this.snackbar.snackbar = true;
            this.snackbar.text = "PropertyType Deleted Successfully";
            this.snackbar.color = "error";
            this.getPropertyTypes();
          }
        });
    },
  },
  created() {
    this.getSocieties();
    this.getPropertyTypes();
    this.getProjects();
  },
  watch: {
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.selectedImagesUrl.length = 0;
          this.form.propertyType = null;
          this.form.images.length = 0;
          this.form.societyId.length = 0;
          this.$refs.form.reset();
        }
      },
      deep: true,
    },
    editDialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.editMode.selectedImagesUrl.length = 0;
          this.editMode.form.propertyType = null;
          this.editMode.form.images.length = 0;
          this.editMode.form.newImages.length = 0;
          this.editMode.form.societyId.length = 0;
          this.$refs.editForm.reset();
        }
      },
      deep: true,
    },
  },
};
</script>

