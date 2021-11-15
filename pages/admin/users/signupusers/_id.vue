<template>
  <div v-if="user">
    <v-dialog
      v-model="cnicFront"
      transition="dialog-bottom-transition"
      width="800"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>CNIC FRONT</v-toolbar>
          <v-card-text>
            <v-img
              class="mt-4"
              contain
              height="350"
              width="900"
              :src="imageUrl + user.cnic_front"
              style="cursor: pointer"
              @click="viewServerCNICFront(user.cnic_front)"
            ></v-img>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-dialog
      v-model="cnicBack"
      transition="dialog-bottom-transition"
      width="800"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>CNIC BACK</v-toolbar>
          <v-card-text>
            <v-img
              class="mt-4"
              contain
              height="350"
              width="900"
              :src="imageUrl + user.cnic_back"
              style="cursor: pointer"
              @click="viewServerCNICBack(user.cnic_back)"
            ></v-img>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
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
    <v-card elevation="2" class="pa-3">
      <v-card-title
        class="font-weight-bold text-uppercase primary--text justify-center"
        >{{
          user.status === true
            ? `Verified User "${user.name}" Detail`
            : `UnVerified User "${user.name}" Detail`
        }}</v-card-title
      >
      <v-card-text>
        <v-container class="mt-8">
          <v-row>
            <v-col cols="auto">
              <v-img
                align="stretch"
                @click="cnicFront = !cnicFront"
                style="cursor: pointer"
                height="150"
                width="300"
                :src="imageUrl + user.cnic_front"
              ></v-img>
            </v-col>
            <v-col cols="auto">
              <v-img
                align="stretch"
                @click="cnicBack = !cnicBack"
                style="cursor: pointer"
                height="150"
                width="300"
                :src="imageUrl + user.cnic_back"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
        <v-simple-table class="mt-5">
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="font-weight-bold text-uppercase primary--text">
                  Name
                </td>
                <td>{{ user.name }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold text-uppercase primary--text">
                  Email
                </td>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold text-uppercase primary--text">
                  Phone
                </td>
                <td>{{ user.phone }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold text-uppercase primary--text">
                  NTN
                </td>
                <td>{{ user.ntn }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold text-uppercase primary--text">
                  CNIC
                </td>
                <td>{{ user.cnic }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold text-uppercase primary--text">
                  Address
                </td>
                <td>{{ user.address }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold text-uppercase primary--text">
                  Created At
                </td>
                <td>{{ user.createdAt | formatDate }}</td>
              </tr>
              <tr>
                <td class="font-weight-bold text-uppercase primary--text">
                  Status
                </td>
                <td>
                  <v-chip
                    :color="user.status === true ? 'success' : 'error'"
                    text-color="white"
                  >
                    {{ user.status === true ? "Verified" : "Not Verified" }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          @click="
            user.status === true ? unVerifyUser(user._id) : verifyUser(user._id)
          "
          :color="user.status === true ? 'error' : 'success'"
          class="ma-2 white--text"
        >
          {{ user.status === true ? "UnVerify User" : "Verify User" }}
          <v-icon right dark>
            {{
              user.status === true ? "mdi-account-remove" : "mdi-account-check"
            }}
          </v-icon>
        </v-btn>
        <v-btn
          @click="deleteUser(user._id)"
          color="error"
          class="ma-2 white--text"
        >
          Delete User
          <v-icon right dark> mdi-delete </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "admin",
  middleware: ["auth"],
  async asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  data() {
    return {
      snackbar: {
        snackbar: false,
        text: null,
        color: "dark",
      },
      cnicBack: false,
      cnicFront: false,
      imageUrl: process.env.IMG_URL,
    };
  },
  methods: {
    ...mapActions({
      getUser: "users/getSingleUser",
    }),
    verifyUser(id) {
      this.$store.dispatch("users/verifyUser", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "User Verified Successfully";
          this.snackbar.color = "primary";
        }
        if (this.snackbar.snackbar) {
          setTimeout(() => {
            this.$router.push("/admin/users/signupusers/verifiedusers");
          }, 2000);
        }
      });
    },
    unVerifyUser(id) {
      this.$store.dispatch("users/unVerifyUser", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "User UnVerified Successfully";
          this.snackbar.color = "primary";
        }
        if (this.snackbar.snackbar) {
          setTimeout(() => {
            this.$router.push("/admin/users/signupusers/unverifiedusers");
          }, 2000);
        }
      });
    },
    viewServerCNICFront(image) {
      window.open(`${this.imageUrl}${image}`);
    },
    viewServerCNICBack(image) {
      window.open(`${this.imageUrl}${image}`);
    },
    deleteUser(id) {
      this.$store.dispatch("users/deleteUser", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "User Deleted Successfully";
          this.snackbar.color = "error";
          setTimeout(() => {
            if (this.user.status) {
              this.$router.push("/admin/users/signupusers/verifiedusers");
            } else {
              this.$router.push("/admin/users/signupusers/unverifiedusers");
            }
          }, 2000);
        }
      });
    },
  },
  created() {
    this.getUser(this.id);
  },
  computed: {
    ...mapGetters({
      user: "users/getSingleUser",
    }),
  },
};
</script>

<style>
</style>