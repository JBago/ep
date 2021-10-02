<template>
  <layout>
    <div class="sensors">
        <v-list
            subheader
            two-line
            max-width="1000"
        >
        <v-subheader inset>Sensors</v-subheader>
            <v-list-item
                v-for="sensor in sensors"
                :key="sensor.id"
            
            ><v-list-item :to="'/readings/'+sensor.id">
                <v-list-item-avatar>
                    <v-icon
                        class="grey lighten-1"
                        dark
                    >
                        mdi-antenna
                    </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-text="sensor.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="sensor.manufacturer"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
                <v-list-item-action>
                    <v-btn @click="showInfo(sensor)" icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-dialog
        v-model="show"
        transition="dialog-bottom-transition"
        width="500"
      >
        <v-card
  elevation="2"
>
            <v-card-title class="text-h5 grey lighten-2">
                Information
            </v-card-title>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Name</v-list-item-title>
                        <v-list-item-subtitle>{{selected.name}}</v-list-item-subtitle>
                    </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Manufacturer</v-list-item-title>
                        <v-list-item-subtitle>{{selected.manufacturer}}</v-list-item-subtitle>
                    </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Model</v-list-item-title>
                        <v-list-item-subtitle>{{selected.model}}</v-list-item-subtitle>
                    </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Unit</v-list-item-title>
                        <v-list-item-subtitle>{{selected.unit}}</v-list-item-subtitle>
                    </v-list-item-content>
            </v-list-item>
            </v-card>
      </v-dialog>
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
        selected: {},
        loading: false,
        show: false
    }
  },
  methods: {
      showInfo(sensor){
          this.selected=sensor;
          this.show=true;
      }
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