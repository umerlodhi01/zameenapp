<template>
  <div>
    <v-flex
      class="
        text-caption text-center
        primary--text
        text-uppercase text-decoration-underline
      "
      mt-3
    >
      <h1>Admin Users</h1>
    </v-flex>
    <v-btn
      @click="dialog = !dialog"
      v-if="loggedUser"
      color="green"
      class="ma-2 white--text"
      :disabled="loggedUser.role === 'subadmin'"
    >
      Add Admin Users
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
                    <v-text-field
                      label="Name"
                      :rules="[
                        () => $v.form.name.required || 'Please add name',
                      ]"
                      required
                      v-model="form.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      type="number"
                      label="Phone Number"
                      :rules="[
                        () =>
                          $v.form.phone.required || 'Please add a phone number',
                      ]"
                      required
                      v-model="form.phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      show-size
                      counter
                      multiple
                      :rules="[
                        () =>
                          $v.form.image.required || 'Profile Image is Required',
                      ]"
                      accept="image/*"
                      @change="onImageSelected"
                      label="Upload Profile Picture"
                    ></v-file-input>
                    <v-img
                      v-if="selectedImageUrl"
                      max-height="120"
                      max-width="160"
                      :src="selectedImageUrl"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      :rules="[
                        () =>
                          $v.form.role.required ||
                          'Please Select the role of user',
                      ]"
                      v-model="form.role"
                      :items="roles"
                      item-text="name"
                      item-value="id"
                      label="Select User Role"
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Email Address"
                      :rules="[
                        () =>
                          $v.form.email.required || 'Please add Email Address',
                        () =>
                          $v.form.email.email ||
                          'Please add valid Email Address',
                      ]"
                      required
                      v-model="form.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                      :rules="[
                        () =>
                          $v.form.password.required || 'Please add password',
                        () =>
                          $v.form.password.minLength ||
                          'Please add password which have more then 6 characters',
                        () =>
                          $v.form.password.containsUppercase ||
                          'Password Should have atleast one upper case letter',
                        () =>
                          $v.form.password.containsLowercase ||
                          'Password Should have atleast one lower case letter',
                        () =>
                          $v.form.password.containsNumber ||
                          'Password Should have atleast one integer number',
                      ]"
                      v-model="form.password"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <v-text-field
                      :append-icon="
                        showConfPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="showConfPassword ? 'text' : 'password'"
                      label="Confirm Password"
                      :rules="[
                        () =>
                          $v.form.cnfPassword.required ||
                          'Password add password confirmation',
                        () =>
                          $v.form.cnfPassword.sameAsPassword ||
                          'Password confirmation failed',
                      ]"
                      v-model="form.cnfPassword"
                      @click:append="showConfPassword = !showConfPassword"
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
                @click.prevent="addUser"
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
            <span class="headline">Edit User</span>
          </v-card-title>
          <v-form ref="editForm" lazy-validation>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Name"
                      :rules="[
                        () =>
                          $v.editMode.form.name.required || 'Please add name',
                      ]"
                      required
                      v-model="editMode.form.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      type="number"
                      label="Phone Number"
                      :rules="[
                        () =>
                          $v.editMode.form.phone.required ||
                          'Please add a phone number',
                      ]"
                      required
                      v-model="editMode.form.phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-file-input
                      show-size
                      counter
                      multiple
                      accept="image/*"
                      @change="onImageSelectedForEdit"
                      label="Upload Profile Picture"
                    ></v-file-input>
                    <v-img
                      v-if="editMode.selectedImageUrl"
                      max-height="120"
                      max-width="160"
                      :src="editMode.selectedImageUrl"
                    ></v-img>
                    <v-img
                      v-if="editMode.form.image && !editMode.form.newImage"
                      max-height="120"
                      max-width="160"
                      :src="imageUrl + editMode.form.image"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      :rules="[
                        () =>
                          $v.editMode.form.role.required ||
                          'Please Select the role of user',
                      ]"
                      v-model="editMode.form.role"
                      :items="roles"
                      item-text="name"
                      item-value="id"
                      label="Select User Role"
                      persistent-hint
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Email Address"
                      :rules="[
                        () =>
                          $v.editMode.form.email.required ||
                          'Please add Email Address',
                        () =>
                          $v.editMode.form.email.email ||
                          'Please add valid Email Address',
                      ]"
                      required
                      v-model="editMode.form.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-switch
                      v-model="buttonConfirmation"
                      inset
                      :label="`Do you want to change the password`"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" v-if="buttonConfirmation">
                    <v-text-field
                      :rules="[
                        $v.editMode.form.newPassword.required ||
                          'Please add Password',
                        $v.editMode.form.newPassword.upperCase ||
                          'Please add atleast one uppercase',
                        $v.editMode.form.newPassword.lowerCase ||
                          'Please add atleast one lowercase',
                        $v.editMode.form.newPassword.numberCheck ||
                          'Please add atleast one number',
                        $v.editMode.form.newPassword.length ||
                          'Password length should be greater then 6',
                      ]"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                      v-model="editMode.form.newPassword"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <v-text-field
                      :rules="[
                        $v.editMode.form.cnfNewPassword.required ||
                          'Please add confirm Password',
                        $v.editMode.form.cnfNewPassword.matchPassword ||
                          'Password Confirmation Failed',
                      ]"
                      :append-icon="
                        showConfPassword ? 'mdi-eye' : 'mdi-eye-off'
                      "
                      :type="showConfPassword ? 'text' : 'password'"
                      label="Confirm Password"
                      v-model="editMode.form.cnfNewPassword"
                      @click:append="showConfPassword = !showConfPassword"
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
                @click.prevent="updateUser"
                :disabled="isEditFormValid"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <v-simple-table class="mt-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Profile Picture</th>
            <th class="text-left">Role</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody v-if="users">
          <tr v-for="(user, i) in users" :key="i">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <v-img
                style="cursor: pointer"
                height="50"
                width="100"
                :src="imageUrl + user.image"
              ></v-img>
            </td>
            <td>
              <v-chip
                class="ma-2"
                :color="user.role === 'admin' ? 'success' : 'primary'"
              >
                {{ user.role }}
              </v-chip>
            </td>
            <td class="text-center" v-if="loggedUser">
              <v-icon
                color="error"
                @click.prevent="deleteUser(user._id)"
                :disabled="loggedUser.role === 'subadmin'"
              >
                mdi-delete
              </v-icon>
              <v-icon
                color="primary"
                @click.prevent="editUser(user._id)"
                :disabled="loggedUser.role === 'subadmin'"
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      imageUrl: process.env.IMG_URL,
      dialog: false,
      editDialog: false,
      snackbar: {
        snackbar: false,
        text: null,
        color: "primary",
      },
      form: {
        name: null,
        email: null,
        phone: null,
        image: null,
        password: null,
        cnfPassword: null,
        role: null,
      },
      roles: [
        { name: "Admin", id: "admin" },
        { name: "SubAdmin", id: "subadmin" },
      ],
      selectedImageUrl: null,
      showPassword: false,
      showConfPassword: false,
      editMode: {
        form: {
          name: null,
          email: null,
          phone: null,
          image: null,
          password: null,
          cnfPassword: null,
          newPassword: null,
          cnfNewPassword: null,
          role: null,
          newImage: null,
        },
        selectedImageUrl: null,
      },
      buttonConfirmation: false,
    };
  },
  methods: {
    ...mapActions({
      getAdminUsers: "adminusers/getAdminUsers",
    }),
    onImageSelected(e) {
      if (this.dialog) {
        if (e[0]) {
          this.form.image = e[0];
          this.selectedImageUrl = URL.createObjectURL(this.form.image);
        } else {
          this.form.image = null;
          this.selectedImageUrl = null;
        }
      }
    },
    addUser() {
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("phone", this.form.phone);
      formData.append("image", this.form.image);
      formData.append("password", this.form.password);
      formData.append("role", this.form.role);
      this.$store
        .dispatch("adminusers/addUsers", formData)
        .then((response) => {
          if (response.data.success) {
            this.dialog = false;
            this.snackbar.snackbar = true;
            this.snackbar.text = "User Added Successfully";
            this.snackbar.color = "success";
            this.getAdminUsers();
          }
        })
        .catch((err) => {
          this.snackbar.snackbar = true;
          this.snackbar.text = err;
          this.snackbar.color = "red";
        });
    },
    deleteUser(id) {
      this.$store.dispatch("adminusers/deleteUser", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "User Deleted Successfully";
          this.snackbar.color = "success";
          this.getAdminUsers();
        }
        if (response.data.lastUser) {
          this.snackbar.snackbar = true;
          this.snackbar.text =
            "You cannot delete the last admin user of portal";
          this.snackbar.color = "error";
          this.getAdminUsers();
        }
        if (response.data.onlineUser) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "You cannot delete yourself";
          this.snackbar.color = "error";
          this.getAdminUsers();
        }
      });
    },
    editUser(id) {
      this.$store
        .dispatch("adminusers/getAdminUserById", id)
        .then((response) => {
          Object.assign(this.editMode.form, response);
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
    updateUser() {
      const formData = new FormData();
      formData.append("name", this.editMode.form.name);
      formData.append("email", this.editMode.form.email);
      formData.append("phone", this.editMode.form.phone);
      formData.append("image", this.editMode.form.image);
      formData.append("newImage", this.editMode.form.newImage);
      formData.append("role", this.editMode.form.role);
      formData.append("_id", this.editMode.form._id);
      if (this.editMode.form.newPassword) {
        formData.append("newPassword", this.editMode.form.newPassword);
      }
      this.$store
        .dispatch("adminusers/updateUsers", formData)
        .then((response) => {
          if (response.data.success) {
            this.editDialog = false;
            this.snackbar.snackbar = true;
            this.snackbar.text = "User Updated Successfully";
            this.snackbar.color = "success";
            this.getAdminUsers();
          }
        })
        .catch((err) => {
          this.snackbar.snackbar = true;
          this.snackbar.text = err;
          this.snackbar.color = "red";
        });
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      image: {
        required,
      },
      role: {
        required,
      },
      password: {
        required,
        minLength: minLength(6),
        containsUppercase: function (value) {
          return /[A-Z]/.test(value);
        },
        containsLowercase: function (value) {
          return /[a-z]/.test(value);
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value);
        },
      },
      cnfPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
    editMode: {
      form: {
        name: {
          required,
        },
        email: {
          required,
          email,
        },
        phone: {
          required,
        },
        image: {
          required,
        },
        role: {
          required,
        },
        newPassword: {
          required() {
            if (this.buttonConfirmation) {
              if (this.editMode.form.newPassword) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          },
          upperCase: function (value) {
            if (this.buttonConfirmation) {
              return /[A-Z]/.test(value);
            } else {
              return true;
            }
          },
          lowerCase: function (value) {
            if (this.buttonConfirmation) {
              return /[a-z]/.test(value);
            } else {
              return true;
            }
          },
          numberCheck: function (value) {
            if (this.buttonConfirmation) {
              return /[0-9]/.test(value);
            } else {
              return true;
            }
          },
          length: function (value) {
            if (this.buttonConfirmation) {
              if (value) {
                return value.length > 6;
              } else {
                return false;
              }
            } else {
              return true;
            }
          },
        },
        cnfNewPassword: {
          required() {
            if (this.buttonConfirmation) {
              if (this.editMode.form.cnfNewPassword) {
                return true;
              } else {
                return false;
              }
            } else {
              return true;
            }
          },
          matchPassword: function (value) {
            if (this.buttonConfirmation) {
              if (value) {
                return this.editMode.form.newPassword === value;
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
  created() {
    this.getAdminUsers();
  },
  computed: {
    ...mapGetters({
      users: "adminusers/getAdminUsers",
      loggedUser: "auth/getLoginUser",
    }),
    isFormValid() {
      return this.$v.form.$invalid;
    },
    isEditFormValid() {
      return this.$v.editMode.form.$invalid;
    },
  },
  watch: {
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.selectedImageUrl = null;
          this.form.phone = null;
          this.form.email = null;
          this.form.name = null;
          this.form.image = null;
          this.form.password = null;
          this.form.cnfPassword = null;
          this.form.role = null;
          this.$refs.form.reset();
        }
      },
      deep: true,
    },
    editDialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.editMode.form.phone = null;
          this.editMode.form.email = null;
          this.editMode.form.name = null;
          this.editMode.form.image = null;
          this.editMode.form.newImage = null;
          this.editMode.form.password = null;
          this.editMode.form.cnfPassword = null;
          this.editMode.form.newPassword = null;
          this.editMode.form.cnfNewPassword = null;
          this.editMode.form.role = null;
          this.editMode.selectedImageUrl = null;
          this.$refs.editForm.reset();
        }
      },
      deep: true,
    },
    buttonConfirmation: {
      handler: function () {
        this.editMode.form.newPassword = null;
        this.editMode.form.cnfNewPassword = null;
      },
      deep: true,
    },
  },
};
</script>