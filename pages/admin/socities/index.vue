<template>
  <div class="pa-5">
    <v-btn
      @click="dialog = !dialog"
      color="green"
      dark
      class="ma-2 white--text"
    >
      Add New Socities
      <v-icon right> mdi-bank-plus </v-icon>
    </v-btn>
    <v-row justify="center">
      <v-dialog v-model="deleteDialog" max-width="500">
        <v-card>
          <v-card-title class="text-h5">
            Do you want to remove this society?
          </v-card-title>

          <v-card-text> It will also removed from Property Types </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="deleteSociety(deleteId)">
              Confirm
            </v-btn>

            <v-btn color="green darken-1" text @click="deleteDialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              editMode.edit ? "Edit Society" : "Add New Society"
            }}</span>
          </v-card-title>
          <v-form ref="form" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Society Name"
                      required
                      v-model="form.society_name"
                      :rules="[
                        () =>
                          $v.form.society_name.required ||
                          'Society is Required',
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      v-if="!editMode.edit"
                      show-size
                      counter
                      multiple
                      :rules="[
                        () => $v.form.main_logo.required || 'Image is Required',
                      ]"
                      accept="image/*"
                      @change="onMainLogoSelected"
                      label="Upload Main Society Logo"
                    ></v-file-input>
                    <v-file-input
                      v-if="editMode.edit"
                      show-size
                      counter
                      multiple
                      accept="image/*"
                      @change="onMainLogoSelectedForEdit"
                      label="Upload Main Society Logo"
                    ></v-file-input>
                    <v-img
                      v-if="selectedMainImageUrl"
                      max-height="120"
                      max-width="160"
                      :src="selectedMainImageUrl"
                    ></v-img>
                    <v-img
                      v-if="editMode.oldImageMain"
                      max-height="120"
                      max-width="160"
                      :src="imageUrl + form.main_logo"
                    ></v-img>
                  </v-col>
                  <v-col>
                    <v-file-input
                      v-if="!editMode.edit"
                      show-size
                      counter
                      multiple
                      :rules="[
                        () => $v.form.ad_logo.required || 'Image is Required',
                      ]"
                      accept="image/*"
                      @change="onAdLogoSelected"
                      label="Upload Society Ad Logo"
                    ></v-file-input>
                    <v-file-input
                      v-if="editMode.edit"
                      show-size
                      counter
                      multiple
                      accept="image/*"
                      @change="onAdLogoSelectedForEdit"
                      label="Upload Society Ad Logo"
                    ></v-file-input>
                    <v-img
                      v-if="selectedAdImageUrl"
                      max-height="120"
                      max-width="160"
                      :src="selectedAdImageUrl"
                    ></v-img>
                    <v-img
                      v-if="editMode.oldImageAd"
                      max-height="120"
                      max-width="160"
                      :src="imageUrl + form.ad_logo"
                    ></v-img>
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
                @click.prevent="addSociety"
                :disabled="isFormValid"
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
            <th class="text-left">Society Name</th>
            <th class="text-left">Society Main Logo</th>
            <th class="text-left">Society Ad Logo</th>
            <th class="text-left">Created At</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody v-if="societies">
          <tr v-for="society in societies" :key="society._id">
            <td>{{ society.society_name }}</td>
            <td>
              <v-img
                style="cursor: pointer"
                @click.prevent="viewImage(society.main_logo)"
                height="50"
                width="100"
                :src="imageUrl + society.main_logo"
              ></v-img>
            </td>
            <td>
              <v-img
                style="cursor: pointer"
                @click.prevent="viewImage(society.ad_logo)"
                height="50"
                width="100"
                :src="imageUrl + society.ad_logo"
              ></v-img>
            </td>
            <td>{{ society.createdAt | formatDate }}</td>
            <td>
              <v-icon
                color="error"
                @click.prevent="deleteSocietyDialog(society._id)"
              >
                mdi-delete
              </v-icon>
              <v-icon color="primary" @click.prevent="editSociety(society._id)">
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
    <v-snackbar rounded="pill" timeout="8000" v-model="snackbarOrder.snackbar">
      {{ snackbarOrder.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbarOrder.color"
          text
          v-bind="attrs"
          @click="snackbarOrder.snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="viewPicture"
      transition="dialog-bottom-transition"
      width="800"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>View Full Image</v-toolbar>
          <v-card-text>
            <v-img
              v-if="viewImageUrl"
              class="mt-4"
              contain
              height="350"
              width="900"
              :src="imageUrl + viewImageUrl"
              style="cursor: pointer"
            ></v-img>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
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
      snackbarOrder: {
        snackbar: false,
        text: null,
        color: "dark",
      },
      form: {
        society_name: null,
        main_logo: null,
        ad_logo: null,
      },
      dialog: false,
      deleteDialog: false,
      deleteId: null,
      editMode: {
        edit: false,
        oldImageMain: false,
        oldImageAd: false,
      },
      selectedMainImageUrl: null,
      selectedAdImageUrl: null,
      viewPicture: false,
      viewImageUrl: null,
    };
  },
  methods: {
    ...mapActions({
      getSocieties: "society/getSocieties",
    }),
    onMainLogoSelected(e) {
      if (e) {
        if (e[0]) {
          this.form.main_logo = e[0];
          this.selectedMainImageUrl = URL.createObjectURL(this.form.main_logo);
        } else {
          this.form.main_logo = null;
          this.selectedMainImageUrl = null;
        }
      }
    },
    onAdLogoSelected(e) {
      if (e) {
        if (e[0]) {
          this.form.ad_logo = e[0];
          this.selectedAdImageUrl = URL.createObjectURL(this.form.ad_logo);
        } else {
          this.form.ad_logo = null;
          this.selectedAdImageUrl = null;
        }
      }
    },
    addSociety() {
      const formData = new FormData();
      formData.append("society_name", this.form.society_name);
      formData.append("main_logo", this.form.main_logo);
      formData.append("ad_logo", this.form.ad_logo);
      if (!this.editMode.edit) {
        this.$store
          .dispatch("society/addSociety", formData)
          .then((response) => {
            if (response.data.success) {
              this.dialog = false;
              this.snackbar.snackbar = true;
              this.snackbar.text = "Society Added Successfully";
              this.snackbar.color = "success";
              this.getSocieties();
            }
          });
      } else {
        formData.append("_id", this.form._id);
        this.$store
          .dispatch("society/editSociety", formData)
          .then((response) => {
            if (response.data.success) {
              this.dialog = false;
              this.snackbar.snackbar = true;
              this.snackbar.text = "Society Updated Successfully";
              this.snackbar.color = "success";
              this.getSocieties();
            }
          });
      }
    },
    editSociety(id) {
      this.$store
        .dispatch("society/getSocietyById", id)
        .then((response) => {
          Object.assign(this.form, response);
        })
        .then(() => {
          this.editMode.edit = true;
          this.editMode.oldImageAd = true;
          this.editMode.oldImageMain = true;
          this.dialog = true;
        });
    },
    onAdLogoSelectedForEdit(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.editMode.oldImageAd = false;
            this.form.ad_logo = e[0];
            this.selectedAdImageUrl = URL.createObjectURL(this.form.ad_logo);
            this.editMode.oldImageAd = false;
          } else {
            this.selectedAdImageUrl = null;
            this.$store
              .dispatch("society/getSocietyById", this.form._id)
              .then((response) => {
                this.form.ad_logo = response.ad_logo;
              })
              .then(() => {
                this.editMode.oldImageAd = true;
              });
          }
        }
      }
    },
    onMainLogoSelectedForEdit(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.editMode.oldImageMain = false;
            this.form.main_logo = e[0];
            this.selectedMainImageUrl = URL.createObjectURL(
              this.form.main_logo
            );
            this.editMode.oldImageMain = false;
          } else {
            this.selectedMainImageUrl = null;
            this.$store
              .dispatch("society/getSocietyById", this.form._id)
              .then((response) => {
                this.form.main_logo = response.main_logo;
              })
              .then(() => {
                this.editMode.oldImageMain = true;
              });
          }
        }
      }
    },
    viewImage(image) {
      this.viewPicture = true;
      this.viewImageUrl = image;
    },
    deleteSocietyDialog(id) {
      this.deleteDialog = true;
      this.deleteId = id;
    },
    deleteSociety(id) {
      this.$store.dispatch("society/deleteSociety", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "Society Deleted Successfully";
          this.snackbar.color = "error";
          this.deleteDialog = false;
          this.getSocieties();
        }
        if (response.data.order) {
          this.snackbarOrder.snackbar = true;
          this.snackbarOrder.text =
            "This society have some purchased orders. You cant delete it";
          this.snackbarOrder.color = "error";
          this.deleteDialog = false;
          this.getSocieties();
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      societies: "society/getSocieties",
    }),
    isFormValid() {
      return this.$v.form.$invalid;
    },
  },
  validations: {
    form: {
      society_name: {
        required,
      },
      main_logo: {
        required,
      },
      ad_logo: {
        required,
      },
    },
  },
  created() {
    this.getSocieties();
  },
  watch: {
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.selectedMainImageUrl = null;
          this.selectedAdImageUrl = null;
          this.form.main_logo = null;
          this.form.ad_logo = null;
          this.$refs.form.reset();
          this.editMode.edit = false;
          this.editMode.oldImageMain = false;
          this.editMode.oldImageAd = false;
        }
      },
      deep: true,
    },
    viewPicture: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.viewImageUrl = null;
        }
      },
      deep: true,
    },
    deleteDialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.deleteId = null;
        }
      },
      deep: true,
    },
  },
};
</script>

