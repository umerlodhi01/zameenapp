<template></template>

<script>
export default {
  middleware: ["auth"],
  created() {
    this.$router.push("/admin/auth/login");
  },
};
</script>

<style>
</style>
