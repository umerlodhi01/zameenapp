<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="4" md="6">
            <v-card class="elevation-12">
              <v-row class="mx-4">
                <v-col cols="12" md="12">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-1 primary--text">
                      Zameen Market Admin Portal
                    </h1>

                    <v-form>
                      <v-text-field
                        :rules="[
                          () => $v.form.email.required || 'Email is required',
                          () => $v.form.email.email || 'Email is not valid',
                        ]"
                        label="Email"
                        name="Email"
                        prepend-icon="mdi-email"
                        type="text"
                        v-model="form.email"
                      />

                      <v-text-field
                        :rules="[
                          () =>
                            $v.form.password.required || 'Password is required',
                        ]"
                        v-model="form.password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                      />
                    </v-form>
                    <h3
                      class="text-center mt-4 red--text"
                      style="cursor: pointer"
                    >
                      Forgot your password ?
                    </h3>
                  </v-card-text>
                  <div class="text-center mt-3">
                    <v-btn
                      rounded
                      color="primary"
                      :disabled="checkValidity"
                      @click.prevent="signIn"
                      >SIGN IN</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      showPassword: false,
      form: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("auth/adminSignin", this.form).then((response) => {
          if (response.token) {
              this.$cookies.set('token', response.token)
          }
        if (response.success) {
          this.$router.push("/admin/dashboard");
        }
      });
    },
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  computed: {
    checkValidity() {
      return this.$v.form.$invalid;
    },
  },
};
</script>