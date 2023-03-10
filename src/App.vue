<template>
  <v-app id="inspire">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>

<style>
/*  修改toast插件的上边距 */
.v-toast {
  top: 26px !important;
}

/* 隐藏toast插件的icon图案 */
.v-toast .v-toast__icon {
  display: none !important;
}

/* 修改toast插件item的内边距 */
.v-toast .v-toast__text {
  padding: 5px !important;
}
</style>
