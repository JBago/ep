<template>
  <layout>
    <div class="home">
      <v-container>
        <v-card id="chart" align="center" :loading="loading">
          <v-container style="padding: 20px">
            <apexchart ref="temp" :options="options" :series="series" height=350></apexchart>
            <v-select
                v-model="interval"
                :items="intervalItems"
                :disabled="loading"
                filled
                label="Refresh interval"
                @change="startReadingsCycle()"
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
  name: 'Home',
  components: {
    apexchart: VueApexCharts,
    layout: Layout
  },
  data: function () {
    return {
      options: basicChart,
      interval: 5,
      intervalItems: [1, 5, 10, 15],
      sensors: [],
      series: [],
      loading: false,
      timeout: null,
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.axios.get('/sensor/all')
          .then((sensors) => {
            this.sensors = sensors.data;
            return Promise.all(this.sensors.map(e => this.axios.get(`/readings/${e.id}?page=0&size=20`)))
          })
          .then((readings) => {
            this.series = this.sensors.map((sensor, index) => ({
              id: sensor.id,
              name: `${sensor.name} (${sensor.unit})`,
              data: readings[index].data.reverse().map(e => [e.timestamp, e.value]),
            }))
            this.$refs.temp.updateOptions({
                        xaxis: {
                          range:  this.series[0].data[19][0] - this.series[0].data[0][0]
                      },
            })
            this.startReadingsCycle();
          })
          .finally(() => {
            this.loading = false;
          });
    },
    startReadingsCycle() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.axios.get(`/readings/latest`)
            .then((response) => {
              const readings = response.data;
              const timestamp = new Date().getTime();
              this.series = this.series.map(sensor => {
                const reading = readings.find(e => e.sensorID === sensor.id)
                {
                  sensor.data.push([timestamp, reading.value]);
                  return {
                    id: sensor.id,
                    data: sensor.data,
                    name: sensor.name,
                }
                }
              });
            })
            .finally(() => this.startReadingsCycle())
      }, this.interval * 1000
      )
      ; // Number of seconds times milliseconds
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