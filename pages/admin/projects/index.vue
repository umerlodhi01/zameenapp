<template>
  <div class="pa-5">
    <v-btn
      @click="dialog = !dialog"
      color="green"
      dark
      class="ma-2 white--text"
    >
      Add Projects
      <v-icon right> mdi-message-draw </v-icon>
    </v-btn>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Projects</span>
          </v-card-title>
          <v-form ref="form" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :rules="[
                        () =>
                          $v.form.projectName.required ||
                          'Project Title is Required',
                      ]"
                      label="Project Title"
                      required
                      v-model="form.projectName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      @blur="$v.form.image.$touch"
                      ref="fileField"
                      show-size
                      counter
                      multiple
                      :rules="[
                        () => $v.form.image.required || 'Image is Required',
                      ]"
                      accept="image/*"
                      @change="onImageSelected"
                      label="Upload Main Society Logo"
                    ></v-file-input>
                    <v-tooltip right v-if="selectedImageUrl">
                      <template v-slot:activator="{ on, attrs }">
                        <v-img height="120" width="160" :src="selectedImageUrl">
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            class="mt-1"
                            style="float: right; cursor: pointer"
                            @click="deleteSelectedImage()"
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
                    <v-switch
                      v-model="buttonConfirmation"
                      inset
                      :label="`Does this project is related to some specific society?`"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="buttonConfirmation">
                    <v-select
                      v-if="societies"
                      v-model="form.societyId"
                      :items="societies"
                      item-text="society_name"
                      item-value="_id"
                      label="Select Society"
                      multiple
                      chips
                      hint="Select societies which will have this project."
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
                @click.prevent="addProject"
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
            <span class="headline">Add Projects</span>
          </v-card-title>
          <v-form ref="editForm" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :rules="[
                        () =>
                          $v.editMode.form.projectName.required ||
                          'Project Title is Required',
                      ]"
                      label="Project Title"
                      required
                      v-model="editMode.form.projectName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      ref="fileField"
                      show-size
                      counter
                      multiple
                      accept="image/*"
                      @change="onImageSelectedForEdit"
                      label="Do you want to change existing image?"
                    ></v-file-input>
                    <v-tooltip right v-if="editMode.selectedImageUrl">
                      <template v-slot:activator="{ on, attrs }">
                        <v-img
                          height="120"
                          width="160"
                          :src="editMode.selectedImageUrl"
                        >
                          <v-icon
                            v-bind="attrs"
                            v-on="on"
                            class="mt-1"
                            style="float: right; cursor: pointer"
                            @click="deleteSelectedImage()"
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
                      v-if="editMode.form.image && !editMode.form.newImage"
                      max-height="120"
                      max-width="160"
                      :src="imageUrl + editMode.form.image"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      v-model="editMode.buttonConfirmation"
                      inset
                      :label="`Does this project is related to some specific society?`"
                    ></v-switch>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    v-if="editMode.buttonConfirmation"
                  >
                    <v-select
                      v-if="societies"
                      v-model="editMode.form.societyId"
                      :items="societies"
                      item-text="society_name"
                      item-value="_id"
                      label="Select Society"
                      multiple
                      chips
                      hint="Select societies which will have this project."
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
                @click.prevent="updateProject"
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
            <th class="text-left">Project Name</th>
            <th class="text-left">Project Image</th>
            <th class="text-left">Related to Society</th>
            <th class="text-left">Created At</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody v-if="projects">
          <tr v-for="project in projects" :key="project._id">
            <td>{{ project.projectName }}</td>
            <td>
              <v-row :no-gutters="true">
                <v-col cols="auto" hide-details>
                  <v-img
                    class="ma-2"
                    style="cursor: pointer"
                    height="50"
                    width="100"
                    :src="imageUrl + project.image"
                  ></v-img>
                </v-col>
              </v-row>
            </td>
            <td>
              <v-row :no-gutters="true">
                <v-col cols="auto">
                  <v-chip class="ma-2" color="primary">
                    {{ project.societyId.society_name }}
                  </v-chip>
                </v-col>
              </v-row>
            </td>
            <td>{{ project.createdAt | formatDate }}</td>

            <td>
              <v-icon color="error" @click.prevent="deleteProject(project._id)">
                mdi-delete
              </v-icon>
              <v-icon color="primary" @click.prevent="editProject(project._id)">
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
        projectName: null,
        image: null,
        societyId: [],
      },
      selectedImageUrl: null,
      dialog: false,
      buttonConfirmation: false,
      editDialog: false,
      editMode: {
        form: {
          projectName: null,
          image: null,
          societyId: [],
          newImage: null,
        },
        selectedImageUrl: null,
        buttonConfirmation: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      societies: "society/getSocieties",
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
      image: {
        required,
      },
      projectName: {
        required,
      },
    },
    editMode: {
      form: {
        projectName: {
          required,
        },
      },
    },
  },
  methods: {
    ...mapActions({
      getSocieties: "society/getSocieties",
      getProjects: "project/getProjects",
    }),
    onImageSelected(e) {
      if (this.dialog) {
        if (e) {
          if (e[0]) {
            this.form.image = e[0];
            this.selectedImageUrl = URL.createObjectURL(this.form.image);
          } else {
            this.form.image = null;
            this.selectedImageUrl = null;
          }
        }
      }
    },
    deleteSelectedImage() {
      if (this.dialog) {
        this.form.image = null;
        this.selectedImageUrl = null;
        this.$refs["fileField"].reset();
      }
      if (this.editDialog) {
        this.editMode.form.newImage = null;
        this.editMode.selectedImageUrl = null;
        // this.$refs["fileField"].reset();
      }
    },
    addProject() {
      const formData = new FormData();
      formData.append("projectName", this.form.projectName);
      formData.append("image", this.form.image);
      this.form.societyId.forEach((id) => {
        formData.append("societyId", id);
      });
      this.$store.dispatch("project/addProject", formData).then((response) => {
        if (response.data.success) {
          this.dialog = false;
          this.snackbar.snackbar = true;
          this.snackbar.text = "Project Added Successfully";
          this.snackbar.color = "success";
          this.getProjects();
        }
      });
    },
    editProject(id) {
      this.$store
        .dispatch("project/getProjectById", id)
        .then((response) => {
          Object.assign(this.editMode.form, response);
          if (Object.entries(response.societyId).length > 0) {
            this.editMode.buttonConfirmation = true;
          }
        })
        .then(() => {
          this.editDialog = true;
        });
    },
    onImageSelectedForEdit(e) {
      if (this.editDialog) {
        if (e) {
          if (e[0]) {
            this.editMode.form.newImage = e[0];
            this.editMode.selectedImageUrl = URL.createObjectURL(
              this.editMode.form.newImage
            );
          } else {
            this.editMode.form.image = null;
            this.editMode.selectedImageUrl = null;
          }
        }
      }
    },
    updateProject() {
      if (!this.editMode.buttonConfirmation) {
        this.editMode.form.societyId = null;
      }
      const formData = new FormData();
      formData.append("projectName", this.editMode.form.projectName);
      formData.append("id", this.editMode.form._id);
      if (this.editMode.form.societyId) {
        this.editMode.form.societyId.forEach((id) => {
          formData.append("societyId", id);
        });
      }
      formData.append("image", this.editMode.form.image);
      formData.append("newImage", this.editMode.form.newImage);
      this.$store
        .dispatch("project/updateProject", formData)
        .then((response) => {
          if (response.data.success) {
            this.editDialog = false;
            this.snackbar.snackbar = true;
            this.snackbar.text = "Project Updated Successfully";
            this.snackbar.color = "success";
            this.getProjects();
          }
        });
    },
  },
  created() {
    this.getSocieties();
    this.getProjects();
  },
  watch: {
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.selectedImageUrl = null;
          this.form.projectName = null;
          this.buttonConfirmation = false;
          this.form.image = null;
          this.form.societyId = null;
          this.$refs.form.reset();
        }
      },
      deep: true,
    },
    editDialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.editMode.selectedImageUrl = null;
          this.editMode.form.projectName = null;
          this.editMode.form.image = null;
          this.editMode.form.newImage = null;
          this.editMode.buttonConfirmation = false;
          this.editMode.form.societyId = null;
          this.$refs.editForm.reset();
        }
      },
      deep: true,
    },
  },
};
</script>

