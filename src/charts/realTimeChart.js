let options = {
    chart: {
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },

      title: {
        text: "Dynamic Updating Chart",
        align: "left"
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        range: 7776000
      },
      yaxis: {
        max: 60
      },
      legend: {
        show: false
      }
    }
export default options;