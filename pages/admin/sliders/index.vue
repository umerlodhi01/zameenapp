<template>
  <div class="pa-5">
    <v-btn @click="dialog = !dialog" color="green" class="ma-2 white--text">
      Add Sliders
      <v-icon right> mdi-playlist-plus </v-icon>
    </v-btn>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Project Type</span>
          </v-card-title>
          <v-form ref="form" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      show-size
                      counter
                      multiple
                      :rules="[
                        () =>
                          $v.form.sliderImage.required || 'Image is Required',
                      ]"
                      accept="image/*"
                      @change="onImageSelected"
                      label="Upload Main Society Logo"
                    ></v-file-input>
                    <v-img
                      v-if="selectedImageUrl"
                      max-height="120"
                      max-width="160"
                      :src="selectedImageUrl"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      v-model="buttonConfirmation"
                      inset
                      :label="`Does it have a button`"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="buttonConfirmation">
                    <v-text-field
                      :rules="[
                        $v.form.buttonText.ifButtonText ||
                          'Please add Button Text',
                      ]"
                      label="Button Text"
                      required
                      v-model="form.buttonText"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="buttonConfirmation">
                    <v-text-field
                      :rules="[
                        $v.form.buttonLink.ifButtonText ||
                          'Please add Button Link',
                      ]"
                      label="Button Url"
                      required
                      v-model="form.buttonLink"
                    ></v-text-field>
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
                @click.prevent="addSlider"
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
            <span class="headline">Add Project Type</span>
          </v-card-title>
          <v-form ref="editForm" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      show-size
                      counter
                      multiple
                      accept="image/*"
                      @change="onImageSelectedForEdit"
                      label="Upload Main Society Logo"
                    ></v-file-input>
                    <v-img
                      v-if="editMode.selectedImageUrl"
                      max-height="120"
                      max-width="160"
                      :src="editMode.selectedImageUrl"
                    ></v-img>
                    <v-img
                      v-if="
                        editMode.form.sliderImage && !editMode.form.newImage
                      "
                      max-height="120"
                      max-width="160"
                      :src="imageUrl + editMode.form.sliderImage"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      v-model="buttonConfirmation"
                      inset
                      :label="`Does it have a button`"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="buttonConfirmation">
                    <v-text-field
                      :rules="[
                        $v.editMode.form.buttonText.ifButtonText ||
                          'Please add Button Text',
                      ]"
                      label="Button Text"
                      required
                      v-model="editMode.form.buttonText"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="buttonConfirmation">
                    <v-text-field
                      :rules="[
                        $v.editMode.form.buttonLink.ifButtonText ||
                          'Please add Button Link',
                      ]"
                      label="Button Url"
                      required
                      v-model="editMode.form.buttonLink"
                    ></v-text-field>
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
                @click.prevent="updateSlider"
                :disabled="isEditFormValid"
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
            <th class="text-left">Slider Image</th>
            <th class="text-left">Button Text</th>
            <th class="text-left">Button Link</th>
            <th class="text-left">Created At</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody v-if="sliders">
          <tr v-for="slider in sliders" :key="slider._id">
            <td>
              <v-img
                style="cursor: pointer"
                @click.prevent="viewImage(society.main_logo)"
                height="50"
                width="100"
                :src="imageUrl + slider.sliderImage"
              ></v-img>
            </td>
            <td>
              {{ slider.buttonText ? slider.buttonText : "" }}
              <v-chip class="ma-2" v-if="!slider.buttonText" color="primary">
                No Button Found
              </v-chip>
            </td>
            <td>
              {{ slider.buttonLink ? slider.buttonLink : "" }}
              <v-chip class="ma-2" v-if="!slider.buttonLink" color="primary">
                No Button Found
              </v-chip>
            </td>
            <td>{{ slider.createdAt | formatDate }}</td>
            <td>
              <v-icon color="error" @click.prevent="deleteSlider(slider._id)">
                mdi-delete
              </v-icon>
              <v-icon color="primary" @click.prevent="editSlider(slider._id)">
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
        sliderImage: null,
        buttonText: null,
        buttonLink: null,
      },
      editDialog: false,
      editMode: {
        form: {
          sliderImage: null,
          buttonText: null,
          buttonLink: null,
          newImage: null,
        },
        selectedImageUrl: null,
      },
      selectedImageUrl: null,
      dialog: false,
      buttonConfirmation: false,
    };
  },
  methods: {
    ...mapActions({
      getSliders: "sliders/getSliders",
    }),
    onImageSelected(e) {
      if (this.dialog) {
        if (e[0]) {
          this.form.sliderImage = e[0];
          this.editMode.selectedImageUrl = URL.createObjectURL(
            this.form.sliderImage
          );
        } else {
          this.form.sliderImage = null;
          this.editMode.selectedImageUrl = null;
        }
      }
    },
    addSlider() {
      const formData = new FormData();
      formData.append("sliderImage", this.form.sliderImage);
      if (this.form.buttonText) {
        formData.append("buttonText", this.form.buttonText);
      }
      if (this.form.buttonLink) {
        formData.append("buttonLink", this.form.buttonLink);
      }
      this.$store
        .dispatch("sliders/addSlider", formData)
        .then((response) => {
          if (response.data.success) {
            this.dialog = false;
            this.snackbar.snackbar = true;
            this.snackbar.text = "Slider Added Successfully";
            this.snackbar.color = "success";
            this.getSliders();
          }
        })
        .catch(err => {
          this.snackbar.snackbar = true;
          this.snackbar.text = err;
          this.snackbar.color = "red";
        });
    },
    deleteSlider(id) {
      this.$store.dispatch("sliders/deleteSlider", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "Slider Deleted Successfully";
          this.snackbar.color = "error";
          this.getSliders();
        }
      });
    },
    editSlider(id) {
      this.$store
        .dispatch("sliders/getSliderById", id)
        .then((response) => {
          Object.assign(this.editMode.form, response);
          if (response.buttonText) {
            this.buttonConfirmation = true;
          }
        })
        .then(() => {
          this.editDialog = true;
        });
    },
    onImageSelectedForEdit(e) {
      if (this.editDialog) {
        if (e[0]) {
          this.editMode.form.newImage = e[0];
          this.editMode.selectedImageUrl = URL.createObjectURL(
            this.editMode.form.newImage
          );
        } else {
          this.editMode.form.newImage = null;
          this.editMode.selectedImageUrl = null;
        }
      }
    },
    updateSlider() {
      if (!this.buttonConfirmation) {
        this.editMode.form.buttonText = null;
        this.editMode.form.buttonLink = null;
      }
      const formData = new FormData();
      formData.append("sliderImage", this.editMode.form.sliderImage);
      formData.append("id", this.editMode.form._id);
      if (this.editMode.form.buttonText) {
        formData.append("buttonText", this.editMode.form.buttonText);
      }
      if (this.editMode.form.buttonLink) {
        formData.append("buttonLink", this.editMode.form.buttonLink);
      }
      formData.append("newImage", this.editMode.form.newImage);
      this.$store
        .dispatch("sliders/updateSlider", formData)
        .then((response) => {
          if (response.data.success) {
            this.editDialog = false;
            this.snackbar.snackbar = true;
            this.snackbar.text = "Slider Updated Successfully";
            this.snackbar.color = "success";
            this.getSliders();
          }
        });
    },
  },
  validations: {
    form: {
      sliderImage: {
        required,
      },
      buttonText: {
        ifButtonText() {
          if (this.buttonConfirmation) {
            if (this.form.buttonText) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        },
      },
      buttonLink: {
        ifButtonText() {
          if (this.buttonConfirmation) {
            if (this.form.buttonLink) {
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
    editMode: {
      form: {
        sliderImage: {
          required,
        },
        buttonText: {
          ifButtonText() {
            if (this.buttonConfirmation) {
              if (this.editMode.form.buttonText) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          },
        },
        buttonLink: {
          ifButtonText() {
            if (this.buttonConfirmation) {
              if (this.editMode.form.buttonLink) {
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
  },
  computed: {
    ...mapGetters({
      sliders: "sliders/getSliders",
    }),
    isFormValid() {
      return this.$v.form.$invalid;
    },
    isEditFormValid() {
      return this.$v.editMode.form.$invalid;
    },
  },
  created() {
    this.getSliders();
  },
  watch: {
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.selectedImageUrl = null;
          this.form.sliderImage = null;
          this.form.buttonText = null;
          this.form.buttonLink = null;
          this.$refs.form.reset();
        }
      },
      deep: true,
    },
    editDialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.editMode.selectedImageUrl = null;
          this.editMode.form.sliderImage = null;
          this.editMode.form.buttonText = null;
          this.editMode.form.buttonLink = null;
          this.$refs.editForm.reset();
        }
      },
      deep: true,
    },
    buttonConfirmation: {
      handler: function () {
        this.form.buttonText = null;
        this.form.buttonLink = null;
        if (this.editMode.form._id) {
          this.$store
            .dispatch("sliders/getSliderById", this.editMode.form._id)
            .then((response) => {
              if (response.buttonText) {
                this.editMode.form.buttonText = response.buttonText;
                this.editMode.form.buttonLink = response.buttonLink;
              }
            });
        }
      },
      deep: true,
    },
  },
};
</script>

