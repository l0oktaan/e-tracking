<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="CGD Logo"
          class="shrink mr-2 pa-2"
          contain
          src="@/assets/cgd.png"
          transition="scale-transition"
          width="50"
          @click="$router.push({name:'home'})"
        />

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <h3 class="shrink mt-1 hidden-sm-and-down">ระบบมอบหมายและติดตามงาน (e-Tracking)</h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        @click="$router.push('/work-list')"
        text
      >
        <span class="mr-2">Work List</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
