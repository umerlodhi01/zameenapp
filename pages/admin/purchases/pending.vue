<template>
  <div class="pa-5">
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">
          Do you want to remove this order?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="deleteOrder()">
            Remove
          </v-btn>

          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="viewDialog" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">View Payment Details Filled By Customers</span>
        </v-card-title>
        <v-card-text>
          <v-simple-table class="mt-5">
            <template v-slot:default>
              <tbody v-if="paymentDetail">
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Transaction Image
                  </td>
                  <v-img
                    align="stretch"
                    style="cursor: pointer"
                    height="120"
                    width="200"
                    :src="imageUrl + paymentDetail.paymentPicture"
                  ></v-img>
                </tr>
                <tr>
                  <td
                    class="
                      font-weight-bold
                      text-left text-uppercase
                      primary--text
                    "
                  >
                    Payment Amount
                  </td>
                  <td>{{ paymentDetail.paymentAmount }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Payment Date
                  </td>
                  <td>{{ paymentDetail.paymentDate | formatDate }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Bank Name
                  </td>
                  <td>{{ paymentDetail.bankName }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Bank Account Number
                  </td>
                  <td>{{ paymentDetail.bankAccountNumber }}</td>
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
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="data"
      v-model="dialog"
      max-width="700px"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card elevation="2" class="pa-3">
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Ad Details</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> back </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-flex
            class="text-caption text-center text-uppercase text-no-wrap primary"
            mt-5
          >
            <h2 class="white--text">Owner Details</h2>
          </v-flex>
          <v-simple-table class="mt-5">
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    CNIC Images
                  </td>
                  <td>
                    <v-container class="mt-8">
                      <v-row>
                        <v-col cols="auto">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-img
                                align="stretch"
                                style="cursor: pointer"
                                height="120"
                                width="200"
                                v-bind="attrs"
                                v-on="on"
                                :src="imageUrl + data.cnic_front"
                              ></v-img>
                            </template>
                            <span>CNIC Front</span>
                          </v-tooltip>
                        </v-col>
                        <v-col cols="auto">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-img
                                align="stretch"
                                style="cursor: pointer"
                                height="120"
                                width="200"
                                v-bind="attrs"
                                v-on="on"
                                :src="imageUrl + data.cnic_back"
                              ></v-img>
                            </template>
                            <span>CNIC Back</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </tr>
                <tr>
                  <td
                    class="
                      font-weight-bold
                      text-left text-uppercase
                      primary--text
                    "
                  >
                    Name
                  </td>
                  <td>{{ data.name }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Phone Number
                  </td>
                  <td>{{ data.phone }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    CNIC
                  </td>
                  <td>{{ data.cnic }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Address
                  </td>
                  <td>{{ data.address }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-flex
            class="text-caption text-center text-uppercase text-no-wrap primary"
            mt-5
          >
            <h2 class="white--text">Next of kin Details</h2>
          </v-flex>
          <v-simple-table class="mt-5">
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    CNIC Images
                  </td>
                  <td>
                    <v-container class="mt-8">
                      <v-row>
                        <v-col cols="auto">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-img
                                align="stretch"
                                style="cursor: pointer"
                                height="120"
                                width="200"
                                v-bind="attrs"
                                v-on="on"
                                :src="imageUrl + data.kin_cnic_front"
                              ></v-img>
                            </template>
                            <span>CNIC Front</span>
                          </v-tooltip>
                        </v-col>
                        <v-col cols="auto">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-img
                                align="stretch"
                                style="cursor: pointer"
                                height="120"
                                width="200"
                                v-bind="attrs"
                                v-on="on"
                                :src="imageUrl + data.kin_cnic_back"
                              ></v-img>
                            </template>
                            <span>CNIC Back</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </tr>
                <tr>
                  <td
                    class="
                      font-weight-bold
                      text-left text-uppercase
                      primary--text
                    "
                  >
                    Name
                  </td>
                  <td>{{ data.kin_name }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Phone Number
                  </td>
                  <td>{{ data.kin_phone }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    CNIC
                  </td>
                  <td>{{ data.kin_cnic }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Address
                  </td>
                  <td>{{ data.kin_address }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-flex
            class="text-caption text-center text-uppercase text-no-wrap primary"
            mt-5
          >
            <h2 class="white--text">Dealer Details</h2>
          </v-flex>
          <v-simple-table class="mt-5">
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    CNIC Images
                  </td>
                  <td>
                    <v-container class="mt-8">
                      <v-row>
                        <v-col cols="auto">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-img
                                align="stretch"
                                style="cursor: pointer"
                                height="120"
                                width="200"
                                v-bind="attrs"
                                v-on="on"
                                :src="imageUrl + data.userId.cnic_front"
                              ></v-img>
                            </template>
                            <span>CNIC Front</span>
                          </v-tooltip>
                        </v-col>
                        <v-col cols="auto">
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-img
                                align="stretch"
                                style="cursor: pointer"
                                height="120"
                                width="200"
                                v-bind="attrs"
                                v-on="on"
                                :src="imageUrl + data.userId.cnic_back"
                              ></v-img>
                            </template>
                            <span>CNIC Back</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </tr>
                <tr>
                  <td
                    class="
                      font-weight-bold
                      text-left text-uppercase
                      primary--text
                    "
                  >
                    Name
                  </td>
                  <td>{{ data.userId.name }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Phone Number
                  </td>
                  <td>{{ data.userId.phone }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Email
                  </td>
                  <td>{{ data.userId.email }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    CNIC
                  </td>
                  <td>{{ data.userId.cnic }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Address
                  </td>
                  <td>{{ data.userId.address }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Dealer Account Status
                  </td>
                  <td>
                    <v-chip
                      :color="data.userId.status ? 'success' : 'red'"
                      text-color="white"
                    >
                      {{ data.userId.status ? "Active" : "Not Active" }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-flex
            class="text-caption text-center text-uppercase text-no-wrap primary"
            mt-5
          >
            <h2 class="white--text">Property Details</h2>
          </v-flex>
          <v-simple-table class="mt-5">
            <template v-slot:default>
              <tbody>
                <tr>
                  <td
                    class="
                      font-weight-bold
                      text-left text-uppercase
                      primary--text
                    "
                  >
                    Property Title
                  </td>
                  <td>{{ data.adId.title }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Down Price
                  </td>
                  <td>{{ data.adId.downPrice }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Total Amount
                  </td>
                  <td>{{ data.adId.totalAmount }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Commission
                  </td>
                  <td>
                    {{ data.adId.commision + "%" }}
                    {{ " (" + data.adId.commisionAmount + " RS" + ")" }}
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Installement Details
                  </td>
                  <td v-if="data.adId.installementDet.length > 0">
                    <v-container class="mt-8">
                      <v-row>
                        <v-col
                          cols="auto"
                          v-for="(image, i) in data.adId.installementDet"
                          :key="i"
                        >
                          <v-img
                            align="stretch"
                            style="cursor: pointer"
                            height="120"
                            width="200"
                            :src="imageUrl + image"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                  <td v-else>
                    <v-chip color="red" text-color="white">
                      No Installement Details Found
                    </v-chip>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    NOC Documents
                  </td>
                  <td v-if="data.adId.nocDoc.length > 0">
                    <v-container class="mt-8">
                      <v-row>
                        <v-col
                          cols="auto"
                          v-for="(image, i) in data.adId.nocDoc"
                          :key="i"
                        >
                          <v-img
                            align="stretch"
                            style="cursor: pointer"
                            height="120"
                            width="200"
                            :src="imageUrl + image"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                  <td v-else>
                    <v-chip color="red" text-color="white">
                      No NOC Documents Found
                    </v-chip>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Property Type
                  </td>
                  <td>
                    <v-chip color="primary" text-color="white">
                      {{ data.adId.propertyTypeId.propertyType }}
                    </v-chip>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Society | Project
                  </td>
                  <td>
                    <v-chip color="primary" text-color="white">
                      {{
                        data.adId.societyId
                          ? data.adId.societyId.society_name
                          : data.adId.projectId.projectName
                      }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-flex
            class="text-caption text-center text-uppercase text-no-wrap primary"
            mt-5
          >
            <h2 class="white--text">Order Details</h2>
          </v-flex>
          <v-simple-table class="mt-5">
            <template v-slot:default>
              <tbody>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Order Date
                  </td>
                  <td>{{ data.purchasedAt | formatDate }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Purchased Quantity
                  </td>
                  <td>{{ data.quantity }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Order Status
                  </td>
                  <td v-if="data.status === 1">
                    <v-chip color="red" text-color="white">
                      Awaiting Payment
                    </v-chip>
                  </td>
                  <td v-if="data.status === 2">
                    <v-chip color="primary" text-color="white">
                      Pending Verification
                    </v-chip>
                  </td>
                  <td v-if="data.status === 3">
                    <v-chip color="success" text-color="white">
                      Completed File
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-simple-table class="mt-12">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Owner Name</th>
            <th class="text-left">Owner Phone</th>
            <th class="text-left">Owner CNIC</th>
            <th class="text-left">Property Name</th>
            <th class="text-left">Property Type</th>
            <th class="text-left">Project | Society Name</th>
            <th class="text-left">Status</th>
            <th class="text-left">Change Status</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody v-if="purchases">
          <tr v-for="purchase in purchases" :key="purchase._id">
            <td>{{ purchase.name }}</td>
            <td>{{ purchase.phone }}</td>
            <td>{{ purchase.cnic }}</td>
            <td>{{ purchase.adId.title }}</td>
            <td>
              <v-chip :small="true" class="ma-2" color="primary">
                {{ purchase.adId.propertyTypeId.propertyType }}
              </v-chip>
            </td>
            <td>
              <v-chip :small="true" class="ma-2" color="primary">
                {{
                  purchase.adId.projectId
                    ? purchase.adId.projectId.projectName
                    : purchase.adId.societyId.society_name
                }}
              </v-chip>
            </td>
            <td v-if="purchase.status === 1">
              <v-chip :small="true" class="ma-2" color="red" dark>
                Awaiting Payment
              </v-chip>
            </td>
            <td v-if="purchase.status === 2">
              <v-chip :small="true" class="ma-2" color="primary" dark>
                Pending Verification
              </v-chip>
            </td>
            <td v-if="purchase.status === 3">
              <v-chip :small="true" class="ma-2" color="success" dark>
                Completed Files
              </v-chip>
            </td>
            <td>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-on="on"
                    v-bind="attrs"
                    color="primary"
                    @click.prevent="viewOrder(purchase._id)"
                  >
                    mdi-briefcase-eye
                  </v-icon>
                </template>
                <span>View Order</span>
              </v-tooltip>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    :disabled="purchase.paymentId.length < 1"
                    v-on="on"
                    v-bind="attrs"
                    color="purple"
                    right
                    @click.prevent="viewPayment(purchase._id)"
                  >
                    mdi-account-cash
                  </v-icon>
                </template>
                <span>View Payment Details</span>
              </v-tooltip>
            </td>
            <td>
              <v-tooltip
                left
                v-if="purchase.status === 2 || purchase.status === 1"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    :disabled="purchase.paymentId.length < 1"
                    right
                    v-on="on"
                    v-bind="attrs"
                    color="success"
                    @click.prevent="verifyPayment(purchase._id)"
                  >
                    mdi-cash-check
                  </v-icon>
                </template>
                <span>Verify Payment</span>
              </v-tooltip>
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
      imageUrl: process.env.IMG_URL,
      dialog: false,
      snackbar: {
        snackbar: false,
        text: null,
        color: "dark",
      },
      data: null,
      deleteDialog: false,
      deleteId: null,
      page: 1,
      viewDialog: false,
    };
  },
  methods: {
    ...mapActions({
      getPendingPurchases: "purchases/getPendingPurchases",
      countTotalPurchases: "purchases/countTotalPendingPurchases",
    }),
    viewOrder(id) {
      this.$store
        .dispatch("purchases/getOrderById", id)
        .then((response) => {
          this.data = response
        })
        .then(() => {
          this.dialog = true;
        });
    },
    verifyPayment(id) {
      this.$store.dispatch("purchases/verifyPayment", id).then((response) => {
        if (response.data.success) {
          this.snackbar.snackbar = true;
          this.snackbar.text = "Payment Verified Successfully";
          this.snackbar.color = "error";
          this.deleteDialog = false;
          this.getPendingPurchases(this.page);
          this.countTotalPurchases();
        }
      });
    },
    viewPayment(id) {
      this.$store
        .dispatch("purchases/paymentDetails", id)
        .then(() => {
          this.viewDialog = true;
        })
    },
  },
  computed: {
    ...mapGetters({
      purchases: "purchases/getPurchases",
      pages: "purchases/getTotalPages",
      paymentDetail: "purchases/getPaymentDetails",
    }),
  },
  created() {
    this.getPendingPurchases(this.page);
    this.countTotalPurchases();
  },
  watch: {
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.data = null;
        }
      },
      deep: true,
    },
    page: {
      handler: function () {
        this.getPendingPurchases(this.page);
      },
      deep: true,
    },
  },
};
</script>

