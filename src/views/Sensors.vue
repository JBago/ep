<template>
  <layout>
    <div class="sensors">
        <v-list
            subheader
            two-line
        >
        <v-subheader inset>Sensors</v-subheader>
            <v-list-item
                v-for="sensor in sensors"
                :key="sensor.id"
            >
                <v-list-item-avatar>
                    <v-icon
                        class="grey lighten-1"
                        dark
                    >
                        mdi-folder
                    </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-text="sensor.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="sensor.manufacturer"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </div>
  </layout>
</template>

<script>
import Layout from './Layout.vue';
export default {
  components:{
      Layout: Layout,
    },
  data: function() {
    return {
        sensors: {},
        loading: false,
    }
  },
  methods: {
  },
  mounted() {
       this.loading = true;
            this.axios.get('http://www.ivanmarincic.com/ep/sensor/all')
                .then((response) => {
                    this.sensors = response.data;
                    this.loading = false;
                    console.log(this.sensors);
                })
  }
}
</script>

<style scoped>

</style>