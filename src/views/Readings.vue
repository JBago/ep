<template>
  <layout>
  <div class="readings">
    <v-container>
      <v-card id="chart" align="center">
        <v-container style="padding: 20px">
          <apexchart ref="temp" :options="options" :series="series"  height=350></apexchart>
        </v-container>
      </v-card>
    </v-container>
  </div>
  </layout>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import Layout from './Layout.vue';
import basicChart from '../charts/basicChart.js'
export default {
  components:{
    apexchart: VueApexCharts,
    layout: Layout
  },
  data: function() {
    return {
      options: basicChart,
      data: [],
      lastTimestamp: 0,
      scroll: false,
      series: [{data:this.data}],
    }
  },
  mounted() {
      this.loading = true;
      this.fetchData();
      setInterval(() => {
          this.getLatestReading();
      },6000);
  },
  methods: {
    fetchData(){
      this.loading = true;
      this.data=[];
      this.axios.get('http://www.ivanmarincic.com/ep/readings/' + this.$route.params.id + '?page=0&size=2000')
                .then((response) => {
                    this.loading = false;
                    response.data.forEach(element => {
                        this.data.unshift([element.timestamp,element.value])
                    });
                    this.$refs.temp.updateSeries([{
                        data: this.data
                    }])
                    console.log(this.data);
                    this.lastTimestamp=this.data[19].timestamp;
                })
    },
    getLatestReading(){
      this.axios.get('http://www.ivanmarincic.com/ep/readings/' + this.$route.params.id + '/latest')
          .then((response) => {
              if(this.lastTimestamp!=response.data.timestamp&&this.scroll==false){
                this.data.push([response.data.timestamp,response.data.value]);
                this.data.shift();
                this.$refs.temp.updateSeries([{
                        data: this.data
                }])
                this.lastTimestamp=response.data.timestamp;
                console.log(this.data);
              }
          })
    },
  },
}
</script>

<style scoped>
#chart {
  max-width: 640px;
  margin: 35px auto;
  padding: 10px auto;
}
</style>