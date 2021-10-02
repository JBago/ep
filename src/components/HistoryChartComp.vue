<template>
  <div class="history">
      <v-card>
          <apexchart ref="temp1" :options="history" :series="series"  height=300></apexchart>
          <apexchart ref="temp2" :options="options" :series="series"  height=300></apexchart>
      </v-card>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import historyChart from '../charts/historyChart.js'
import optionsChart from '../charts/optionsChart.js'
export default {
  components:{
    apexchart: VueApexCharts,
  },
  data: function() {
    return {
      options: optionsChart,
      history: historyChart,
      data: [],
      series: [{data:this.data}],
    }
  },
  mounted() {
      this.loading = true;
      this.fetchData();
  },
  methods: {
    fetchData(){
      this.loading = true;
      this.data=[];
      this.axios.get('https://ivanmarincic.com/ep/readings/' + this.$route.params.id + '?page=0&size=' + 1000)
                .then((response) => {
                    this.loading = false;
                    response.data.forEach(element => {
                        this.data.unshift([element.timestamp,element.value])
                    });
                    this.$refs.temp1.updateSeries([{
                        data: this.data
                    }]);
                    this.$refs.temp2.updateSeries([{
                        data: this.data
                    }]);
                    this.$refs.temp2.updateOptions({
                        chart:{
                          selection:{
                            xaxis:{
                              min:this.data[949][0],
                              max:this.data[999][0]
                            }
                          }
                        }
                    });
                    console.log(this.data[999][0])
                })
    },
  },
}
</script>

<style scoped>

</style>