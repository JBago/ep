<template>
  <div class="history">
      <v-card>
        <v-overlay
          :absolute="true"
          :value="loading"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-overlay>
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
      loading: false
    }
  },
  mounted() {
      this.fetchData();
  },
  methods: {
    fetchData(){
      this.loading = true;
      this.data=[];
      this.axios.get('/readings/' + this.$route.params.id + '?page=0&size=' + 1000)
                .then((response) => {
                    this.loading = false;
                    response.data.forEach(element => {
                        this.data.unshift([element.timestamp,element.value])
                    });
                    this.$refs.temp1.updateSeries([{
                        name: 'Value',
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
                })
                .finally(()=>{
                  this.loading=false;
                })
    },
  },
}
</script>

<style scoped>

</style>