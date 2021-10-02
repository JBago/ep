let options = {
        chart: {
        id: 'chart1',
        width: '100%',
        type: 'area',
        brush:{
          target: 'history',
          enabled: true
        },
        selection: {
          enabled: true,
          xaxis: {
            min:0,
            max:0
          }
        },
      },
      colors: ['#008FFB'],
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.91,
          opacityTo: 0.1,
        }
      },
      xaxis: {
        type: 'datetime',
        tooltip: {
          enabled: false
        }
      },
      yaxis: {
        tickAmount: 2
      }
}
export default options;