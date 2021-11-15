<template>

</template>

<script>

  export default {
    middleware: ['auth'],
    created() {
      let subDomain = this.$cookies.get('subdomain');
        if (subDomain === 'admin' || subDomain === 'vm-admin')
            this.$router.push('/admin/auth/login');
        else
            this.$router.push('/' + subDomain + '/auth/login');
    }
  }
</script>

<style>

</style>
