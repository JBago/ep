let options = {
    chart: {
      id: 'history',
      width: "100%",
      type: 'line',
      toolbar: {
        show: false,
        autoSelected: 'pan'
      }
    },
    colors:['#008FFB', '#00E39690', '#9C27B0'],
    xaxis: {
      type: 'datetime'
    },
    yaxis: [{
      labels: {
        formatter: function (value) {
          return value + "°C";
        }
      }
    }],
    legend: {
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: true
      },
    },
    markers: {
      colors: ["#008FFB"]
    },
    stroke: {
      curve: 'smooth',
    },
    
  }
export default options;