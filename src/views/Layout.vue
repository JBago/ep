
<template>
    <v-app>
        <v-app-bar class="app-bar" app>
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>MeteoCharts</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="text--accent-4"
        >
          <v-list-item @click="$router.push({name: 'Home'})">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push({name: 'Sensors'})">
            <v-list-item-icon>
              <v-icon>mdi-antenna</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sensors</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
        <v-main>
            <v-container>
                <slot></slot>
            </v-container>
        </v-main>
        <v-footer app>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: "Layout",
        data: () => ({
            drawer: false,
             }),
        methods: {
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>