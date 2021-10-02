<template>
  <layout>
  <div class="home">
    <v-container>
      <v-card id="chart" align="center">
        <v-container style="padding: 20px">
          <apexchart ref="temp" :options="options" :series="series"  height=350></apexchart>
        </v-container>
        <v-card-text>
          <v-row>
            <v-checkbox
              label="Temperature"
              @click="toggle('temperature')"
              input-value="true"
              value
            ></v-checkbox>
            <v-checkbox
              label="Humidity"
              @click="toggle('humidity')"
              value
            ></v-checkbox>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
  </layout>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import Layout from './Layout.vue';
import basicChart from '../charts/realTimeChart.js'
export default {
  components:{
    apexchart: VueApexCharts,
    layout: Layout
  },
  data: function() {
    return {
      lastDate: 0,
      TICKINTERVAL: 864000,
      XAXISRANGE: 7776000,
      options: basicChart,
      data: [],
      series: [{data:this.data},   
        /* {
          name: 'temperature',
          type: 'line',
          data: [32, 33, 28, 25, 29, 30, 33]
        },
        {
          name: 'humidity',
          type: 'bar',
          data: [25, 30, 10, 80, 75, 30, 35]
      } */],
    }
  },
  methods: {
    toggle: function (what) {
      this.$refs.temp.toggleSeries(what);
    },
    getNewSeries: function (baseval, yrange) {
        var newDate = baseval + this.TICKINTERVAL;
        this.lastDate = newDate;

        for(var i = 0; i< this.data.length - 10; i++) {
            // IMPORTANT
            // we reset the x and y of the data which is out of drawing area
            // to prevent memory leaks
            this.data[i].x = newDate - this.XAXISRANGE - this.TICKINTERVAL;
            this.data[i].y = 0
        }
        this.data.push({
            x: newDate,
            y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
        })
    },

    mockData(){
      const d = new Date();
      setInterval(() => {
        this.getNewSeries(this.lastDate, {
            min: 20,
            max: 40
        });
        this.$refs.temp.updateSeries([{
            data: this.data
        }])
      }, 1000);
    }
  },
  mounted() {
    //this.$refs.temp.hideSeries('humidity');
    this.mockData();
  }
}
</script>

<style scoped>
#chart {
  max-width: 640px;
  margin: 35px auto;
  padding: 10px auto;
}
</style>