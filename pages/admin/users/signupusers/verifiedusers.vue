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
      <h1>Verified Users</h1>
    </v-flex>
    <v-simple-table class="mt-5">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Created At</th>
            <th class="text-center">View User</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody v-if="verifiedUsers">
          <tr v-for="(user, i) in verifiedUsers" :key="i">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.createdAt | formatDate }}</td>
            <td class="text-center">
              <v-icon color="primary" @click.prevent="viewUser(user._id)">
                mdi-account-eye
              </v-icon>
            </td>
            <td class="text-center">
              <v-icon color="error" @click.prevent="deleteUser(user._id)">
                mdi-delete
              </v-icon>
              <v-icon color="success" @click.prevent="unVerifyUser(user._id)">
                mdi-account-remove
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
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
export default {
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      snackbar: {
        snackbar: false,
        text: null,
        color: "primary",
      },
      page: 1,
    };
  },
  methods: {
    ...mapActions({
      getVerifiedUsers: "users/getVerifiedUsers",
      countTotalUsers: "users/countVerifiedUsers",
    }),
    unVerifyUser(id) {
      this.$store.dispatch("users/unVerifyUser", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "User UnVerified Successfully";
          this.snackbar.color = "primary";
          this.countTotalUsers();
          this.getVerifiedUsers(this.page);
        }
      });
    },
    viewUser(id) {
      this.$router.push(`/admin/users/signupusers/${id}`);
    },
    deleteUser(id) {
      this.$store.dispatch("users/deleteUser", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "User Deleted Successfully";
          this.snackbar.color = "error";
          this.countTotalUsers();
          this.getVerifiedUsers(this.page);
        }
      });
    },
  },
  created() {
    this.getVerifiedUsers(this.page);
    this.countTotalUsers();
  },
  computed: {
    ...mapGetters({
      verifiedUsers: "users/getverifiedUsers",
      pages: "users/getTotalPages",
    }),
  },
  watch: {
    page: {
      handler: function () {
        this.getVerifiedUsers(this.page);
      },
      deep: true,
    },
  },
};
</script>