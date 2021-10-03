<template>
  <layout>
  <div class="readings">
    <v-container>
      <v-card id="chart" align="center" :loading="loading">
        <v-container style="padding: 20px">
          <apexchart ref="temp" :options="options" :series="series"  height=350></apexchart>
          <v-select
          :items="size"
          filled
          v-model="select"
          label="Number of ticks"
          @change="fetchData()"
          ></v-select>
          <v-btn
            elevation="1"
            @click="history=true"
          >Show History</v-btn>
        </v-container>
      </v-card>
    </v-container>
    <v-dialog v-model="history">
        <historychart></historychart>
       <v-btn
            elevation="1"
            @click="history=false"
          >Close</v-btn>
    </v-dialog>
  </div>
  </layout>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import Layout from './Layout.vue';
import historyChart from '../components/HistoryChartComp.vue'
import basicChart from '../charts/basicChart.js'
export default {
  components:{
    apexchart: VueApexCharts,
    historychart: historyChart,
    layout: Layout
  },
  data: function() {
    return {
      options: basicChart,
      data: [],
      select:[10],
      size: [10,20,30],
      lastTimestamp: 0,
      series: [{
        name: '',
        data: []
      }],
      history: false,
      loading: false,
    }
  },
  mounted() {
      this.fetchData();
      setInterval(() => {
          this.getLatestReading();
      },6000);
  },
  methods: {
    fetchData(){
      this.loading = true;
      this.data=[];
      this.axios.get('/readings/' + this.$route.params.id + '?page=0&size=' + this.select)
                .then((response) => {
                    this.loading = false;
                    response.data.forEach(element => {
                        this.data.unshift([element.timestamp,element.value])
                    });
                    this.$refs.temp.updateSeries([{
                        data: this.data
                    }])
                    this.lastTimestamp=this.data[this.select-1].timestamp;
                })
      this.axios.get('/sensor/' + this.$route.params.id)
                .then((response) => {
                  this.$refs.temp.updateSeries([{
                        name: response.data.name
                    }])
                    this.unit=response.data.unit;
                    this.$refs.temp.updateOptions({
                        yaxis: [{
                        labels: {
                          formatter: function (value) {
                            return value + response.data.unit;
                              }
                            }
                      }],
                    });
                })
                .finally(()=>{
                  this.loading=false;
                })
    },
    getLatestReading(){
      this.axios.get('/readings/' + this.$route.params.id + '/latest')
          .then((response) => {
              if(this.lastTimestamp!=response.data.timestamp){
                this.data.push([response.data.timestamp,response.data.value]);
                this.data.shift();
                this.$refs.temp.updateSeries([{
                        data: this.data
                }])
                this.lastTimestamp=response.data.timestamp;
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