<template>
  <div class="pa-5">
    <v-dialog
      v-if="ad"
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
                    AD Title
                  </td>
                  <td>{{ ad.title }}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Down Price
                  </td>
                  <td>{{ ad.downPrice }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Total Amount
                  </td>
                  <td>{{ ad.totalAmount }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Commision Percentage
                  </td>
                  <td>{{ ad.commision + '%' }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Commision Amount
                  </td>
                  <td>{{ ad.commisionAmount }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Remaining Quantity
                  </td>
                  <td>{{ ad.remainingQty }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Ad Category
                  </td>
                  <td>{{ findCurrentCategory(ad.category) }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Batch Status
                  </td>
                  <td>
                    {{ ad.priority === true ? "With Batch" : "Without Batch" }}
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Description
                  </td>
                  <td>{{ ad.description }}</td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    {{ ad.societyId ? "Society" : "Project" }}
                  </td>
                  <td>
                    <v-chip color="primary" text-color="white">
                      {{
                        ad.societyId
                          ? ad.societyId.society_name
                          : ad.projectId.projectName
                      }}
                    </v-chip>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Property Type
                  </td>
                  <td>
                    <v-chip color="primary" text-color="white">
                      {{ ad.propertyTypeId.propertyType }}
                    </v-chip>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Main Image
                  </td>
                  <td>
                    <v-container class="mt-8">
                      <v-row>
                        <v-col cols="auto">
                          <v-img
                            align="stretch"
                            style="cursor: pointer"
                            height="120"
                            width="200"
                            :src="imageUrl + ad.mainImage"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Slider Images
                  </td>
                  <td>
                    <v-container class="mt-8">
                      <v-row>
                        <v-col
                          cols="auto"
                          v-for="(sliderImage, i) in ad.sliderImages"
                          :key="i"
                        >
                          <v-img
                            align="stretch"
                            style="cursor: pointer"
                            height="120"
                            width="200"
                            :src="imageUrl + sliderImage"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </tr>
                <tr v-if="ad.installementDet.length > 0">
                  <td class="font-weight-bold text-uppercase primary--text">
                    Installement Details Images
                  </td>
                  <td>
                    <v-container class="mt-8">
                      <v-row>
                        <v-col
                          cols="auto"
                          v-for="(image, i) in ad.installementDet"
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
                </tr>
                <tr v-else>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Installement Details Images
                  </td>
                  <td>
                    <v-chip color="red" text-color="white">
                      No Images Found
                    </v-chip>
                  </td>
                </tr>
                <tr v-if="ad.nocDoc.length > 0">
                  <td class="font-weight-bold text-uppercase primary--text">
                    NOC Documents Images
                  </td>
                  <td>
                    <v-container class="mt-8">
                      <v-row>
                        <v-col
                          cols="auto"
                          v-for="(image, i) in ad.nocDoc"
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
                </tr>
                <tr v-else>
                  <td class="font-weight-bold text-uppercase primary--text">
                    NOC Documents Images
                  </td>
                  <td>
                    <v-chip color="red" text-color="white">
                      No Images Found
                    </v-chip>
                  </td>
                </tr>
                <tr v-if="ad.sliderVideo">
                  <td class="font-weight-bold text-uppercase primary--text">
                    Slider Video
                  </td>
                  <td>
                    <v-container class="mt-8">
                      <v-row>
                        <v-col cols="auto">
                          <div class="videoWidth">
                            <vue-core-video-player
                              :src="imageUrl + ad.sliderVideo"
                            ></vue-core-video-player>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </td>
                </tr>
                <tr v-else>
                  <td class="font-weight-bold text-uppercase primary--text">
                    Slider Video
                  </td>
                  <td>
                    <v-chip color="red" text-color="white">
                      No Videos Found
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
      imageUrl: process.env.IMG_URL,
    };
  },
  methods: {
    findCurrentCategory(id) {
      if (id === 1) {
        return "Top Selling";
      }
      if (id === 2) {
        return "Hot Famous";
      }
      if (id === 3) {
        return "Recently Added";
      }
    },
  },
  computed: {
    ...mapGetters({
      ad: "ads/getSingleAd",
    }),
  },
  created() {
    this.$store.dispatch("ads/getSingleAD", this.id).then(() => {
      this.dialog = true;
    });
  },
  watch: {
    dialog: {
      handler: function (newValue, oldValue) {
        if (newValue === false && oldValue === true) {
          this.$emit("dialogClosed");
        }
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.videoWidth {
  width: 400px;
}
</style>