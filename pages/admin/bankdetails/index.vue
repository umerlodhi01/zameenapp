<template>
  <div class="pa-5">
    <v-row justify="center"> </v-row>
    <v-flex
      class="text-caption text-center text-uppercase text-no-wrap primary"
      mt-3
    >
      <h2 class="pa-1 white--text">Societies</h2>
    </v-flex>
    <v-dialog v-model="dialog" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">
            {{
              editMode
                ? "Edit Bank Account Details"
                : "Add Bank Account For Specific Society"
            }}
          </span>
        </v-card-title>
        <v-form ref="form" lazy-validation>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    :rules="[
                      () =>
                        $v.form.bankName.required || 'Bank Name is required',
                    ]"
                    label="Bank Name"
                    required
                    v-model="form.bankName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    :rules="[
                      () =>
                        $v.form.accountNum.required ||
                        'Account Number is required',
                    ]"
                    label="Bank Account Number"
                    required
                    v-model="form.accountNum"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    :rules="[
                      () =>
                        $v.form.accountTitle.required ||
                        'Account Title is required',
                    ]"
                    label="Bank Account Title"
                    required
                    v-model="form.accountTitle"
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
              :disabled="isFormValid"
              text
              @click.prevent="createBank"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="viewDialog" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Bank Account For Specific Society</span>
        </v-card-title>
        <v-form ref="form" lazy-validation>
          <v-card-text>
            <v-simple-table class="mt-5">
              <template v-slot:default>
                <tbody v-if="bank">
                  <tr>
                    <td
                      class="
                        font-weight-bold
                        text-left text-uppercase
                        primary--text
                      "
                    >
                      Bank Name
                    </td>
                    <td>{{ bank.bankName }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-uppercase primary--text">
                      Bank Account Number
                    </td>
                    <td>{{ bank.accountNum }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-uppercase primary--text">
                      Bank Account Title
                    </td>
                    <td>{{ bank.accountTitle }}</td>
                  </tr>
                  <tr v-if="bank.societyId">
                    <td class="font-weight-bold text-uppercase primary--text">
                      Society Name
                    </td>
                    <td>{{ bank.societyId.society_name }}</td>
                  </tr>
                  <tr v-if="bank.projectId">
                    <td class="font-weight-bold text-uppercase primary--text">
                      Project Name
                    </td>
                    <td>{{ bank.projectId.projectName }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="viewDialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              :disabled="isFormValid"
              text
              @click.prevent="createBank"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-simple-table class="mt-8">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Society Name</th>
            <th class="text-left">Bank Details Status</th>
            <th class="text-left">View Bank Details</th>
            <th class="text-left">Add Bank</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody v-if="societies">
          <tr v-for="society in societies" :key="society._id">
            <td>{{ society.society_name }}</td>
            <td>
              <v-chip class="ma-2" v-if="society.bankId" color="green" dark>
                Bank Details Added
              </v-chip>
              <v-chip class="ma-2" v-else color="red" dark>
                No Bank Details Found
              </v-chip>
            </td>
            <td>
              <v-btn
                color="green"
                class="white--text"
                :disabled="society.bankId ? false : true"
                @click.prevent="viewBank(society.bankId._id)"
                >View
                <v-icon right dark> mdi-archive-eye-outline </v-icon></v-btn
              >
            </td>
            <td>
              <v-btn
                color="primary"
                :disabled="society.bankId ? true : false"
                @click.prevent="addBank(society._id)"
                >Add Bank Details <v-icon right dark> mdi-bank </v-icon></v-btn
              >
            </td>
            <td>
              <v-icon
                :disabled="society.bankId ? false : true"
                color="error"
                @click.prevent="deleteBank(society.bankId._id)"
              >
                mdi-delete
              </v-icon>
              <v-icon
                :disabled="society.bankId ? false : true"
                color="primary"
                @click.prevent="editBank(society.bankId._id)"
              >
                mdi-pencil
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-flex
      class="text-caption text-center text-uppercase text-no-wrap primary"
      mt-12
    >
      <h2 class="pa-1 white--text">Projects</h2>
    </v-flex>
    <v-simple-table class="mt-6">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Project Name</th>
            <th class="text-left">Bank Details Status</th>
            <th class="text-left">View Bank Details</th>
            <th class="text-left">Add Bank</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody v-if="projects">
          <tr v-for="project in projects" :key="project._id">
            <td>{{ project.projectName }}</td>
            <td>
              <v-chip class="ma-2" v-if="project.bankId" color="green" dark>
                Bank Details Added
              </v-chip>
              <v-chip class="ma-2" v-else color="red" dark>
                No Bank Details Found
              </v-chip>
            </td>
            <td>
              <v-btn
                color="green"
                class="white--text"
                :disabled="project.bankId ? false : true"
                @click.prevent="viewBank(project.bankId._id)"
                >View
                <v-icon right dark> mdi-archive-eye-outline </v-icon></v-btn
              >
            </td>
            <td>
              <v-btn
                color="primary"
                :disabled="project.bankId ? true : false"
                @click.prevent="addBankForProject(project._id)"
                >Add Bank Details <v-icon right dark> mdi-bank </v-icon></v-btn
              >
            </td>
            <td>
              <v-icon
                :disabled="project.bankId ? false : true"
                color="error"
                @click.prevent="deleteBank(project.bankId._id)"
              >
                mdi-delete
              </v-icon>
              <v-icon
                :disabled="project.bankId ? false : true"
                color="primary"
                @click.prevent="editBank(project.bankId._id)"
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
        bankName: null,
        accountNum: null,
        accountTitle: null,
        societyId: null,
        projectId: null,
      },
      dialog: false,
      viewDialog: false,
      editMode: false,
    };
  },
  methods: {
    ...mapActions({
      getSocieties: "banks/getSocieties",
      getProjects: "banks/getProjects",
    }),

    addBank(id) {
      this.form.societyId = id;
      this.dialog = true;
    },
    addBankForProject(id) {
      this.form.projectId = id;
      this.dialog = true;
    },
    createBank() {
      const formData = new FormData();
      formData.append("bankName", this.form.bankName);
      formData.append("accountNum", this.form.accountNum);
      formData.append("accountTitle", this.form.accountTitle);
      if (this.form.societyId) {
        if (this.editMode) {
          formData.append("societyId", this.form.societyId._id);
        } else {
          formData.append("societyId", this.form.societyId);
        }
      }
      if (this.form.projectId) {
        if (this.editMode) {
          formData.append("projectId", this.form.projectId._id);
        } else {
          formData.append("projectId", this.form.projectId);
        }
      }
      if (this.editMode) {
        formData.append("id", this.form._id);
        this.$store
          .dispatch("banks/updateBank", formData)
          .then((response) => {
            if (response.data.success) {
              this.dialog = false;
              this.editMode = false;
              this.snackbar.snackbar = true;
              this.snackbar.text = "Bank Updated Successfully";
              this.snackbar.color = "success";
              this.getSocieties();
              this.getProjects();
            }
          })
          .catch((err) => {
            this.snackbar.snackbar = true;
            this.snackbar.text = err;
            this.snackbar.color = "red";
          });
      } else {
        this.$store
          .dispatch("banks/addBank", formData)
          .then((response) => {
            if (response.data.success) {
              this.dialog = false;
              this.snackbar.snackbar = true;
              this.snackbar.text = "Bank Added Successfully";
              this.snackbar.color = "success";
              this.getSocieties();
              this.getProjects();
            }
          })
          .catch((err) => {
            this.snackbar.snackbar = true;
            this.snackbar.text = err;
            this.snackbar.color = "red";
          });
      }
    },
    viewBank(id) {
      this.$store.dispatch("banks/bankById", id).then(() => {
        this.viewDialog = true;
      });
    },
    editBank(id) {
      this.editMode = true;
      this.$store
        .dispatch("banks/getBankForEdit", id)
        .then((response) => {
          Object.assign(this.form, response);
        })
        .then(() => {
          this.dialog = true;
        });
    },
    deleteBank(id) {
      this.$store.dispatch("banks/deleteBank", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "Bank Deleted Successfully";
          this.snackbar.color = "error";
          this.getSocieties();
          this.getProjects();
        }
      });
    },
  },
  validations: {
    form: {
      bankName: {
        required,
      },
      accountNum: {
        required,
      },
      accountTitle: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters({
      societies: "banks/getSocieties",
      bank: "banks/getBankById",
      projects: "banks/getProjects",
    }),
    isFormValid() {
      return this.$v.form.$invalid;
    },
    isEditFormValid() {
      return this.$v.editMode.form.$invalid;
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
          this.form.bankName = null;
          this.form.accountNum = null;
          this.form.accountTitle = null;
          this.form.societyId = null;
          this.form.projectId = null;
          this.editMode = false;
          this.$refs.form.reset();
        }
      },
      deep: true,
    },
  },
};
</script>

