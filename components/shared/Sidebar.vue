<template>
  <v-navigation-drawer v-model="drawerValue" app dark width="270">
    <v-img height="140" class="pa-4" src="">
      <div class="text-center">
        <v-avatar class="mb-4" color="grey darken-1" size="64" v-if="user">
          <v-img aspect-ratio="30" :src="imageUrl + user.image" />
        </v-avatar>
        <h2 class="white--text">Zameen Market App</h2>
      </div>
    </v-img>
    <v-divider></v-divider>
    <v-list>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item to="/admin/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item to="/admin/sliders">
          <v-list-item-icon>
            <v-icon>mdi-billboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sliders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item to="/admin/socities">
          <v-list-item-icon>
            <v-icon>mdi-home-search</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Societies</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item to="/admin/projects">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Projects</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item to="/admin/bankdetails">
          <v-list-item-icon>
            <v-icon>mdi-bank</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Bank Details</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item to="/admin/property_types">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Property Types</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        no-action
        :prepend-icon="item.action"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          link
          :to="child.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item to="/admin/adminusers">
          <v-list-item-icon>
            <v-icon>mdi-badge-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Admin Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      selectedItem: null,
      drawerValue: null,
      imageUrl: process.env.IMG_URL,
      items: [
        {
          action: "mdi-home-search",
          items: [
            { title: "All Ads", to: "/admin/ads/allads" },
            { title: "Active Ads", to: "/admin/ads/activeads" },
            { title: "Disable Ads", to: "/admin/ads/disableads" },
            { title: "Empty Quantity Ads", to: "/admin/ads/emptyquantityads" },
          ],
          title: "Property Ads",
        },
        {
          action: "mdi-home-account",
          items: [
            { title: "All Purchases", to: "/admin/purchases/allpurchases" },
            { title: "Awaiting Payments", to: "/admin/purchases/awaiting" },
            { title: "Pending Verifications", to: "/admin/purchases/pending" },
            { title: "Completed Files", to: "/admin/purchases/completed" },
          ],
          title: "Purchases",
        },
        {
          action: "mdi-account",
          items: [
            {
              title: "Unverified Users",
              to: "/admin/users/signupusers/unverifiedusers",
            },
            {
              title: "Verified Users",
              to: "/admin/users/signupusers/verifiedusers",
            },
          ],
          title: "Signup Users",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/getLoginUser",
    }),
  },
  watch: {
    drawer: function (value) {
      this.drawerValue = !this.drawerValue;
    },
    deep: true,
  },
};
</script>
