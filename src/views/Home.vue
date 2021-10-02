<template>
  <layout>
  <div class="home">
    <v-container>
      <v-card id="chart" align="center">
        <v-container style="padding: 20px">
          <apexchart ref="temp" :options="options" :series="series"  height=350></apexchart>
          <v-select
          :items="size"
          filled
          v-model="select"
          label="Number of ticks"
          @change="fetchData()"
          ></v-select>
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
      select:[10],
      size: [10,20,30],
      lastTimestamp: 0,
      series: [],
      history: false,
      unit: '',
      name: 'temperatura',
    }
  },
  mounted() {
      this.loading = true;
      this.fetchData();
      // setInterval(() => {
      //     this.getLatestReading();
      // },6000);
  },
  methods: {
    fetchData(){
      this.loading = true;
      this.data=[];
      this.series=[];
      let i=0;
      this.axios.get('https://ivanmarincic.com/ep/sensor/all')
                .then((response) => {
                  response.data.forEach(element => {
                    this.axios.get('https://ivanmarincic.com/ep/readings/' + element.id + '?page=0&size=' + this.select)
                      .then((response) => {
                        const prom = new Promise((resolve, reject) => {
                        this.data[i]=[];
                        response.data.forEach(el => {
                        this.data[i].unshift([el.timestamp,el.value])
                    });
                    this.series.push({
                      name: element.name,
                      data: this.data[i]
                    });
                    this.lastTimestamp=this.data[i][this.select-1].timestamp;
                     }).then(()=>{
                     i++;
                     console.log(i);
                  }
                  );
                    let j = i;
                    // setInterval(() => {
                    //  this.getLatestReading(element.id, element.name, j);
                    // },6000);
                    })
                  });

                })
    },
    getLatestReading(id, name, num){
      this.axios.get('https://ivanmarincic.com/ep/readings/' + id + '/latest')
          .then((response) => {
              if(this.lastTimestamp!=response.data.timestamp){
                this.data[num].push([response.data.timestamp,response.data.value]);
                this.data[num].shift();
                this.series[num]={
                        name: name,
                        data: this.data[num]
                }
                this.$refs.temp.updateSeries(this.series);
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