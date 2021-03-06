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
    yaxis: {
    },
    markers: {
      colors: ["#008FFB"]
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'square',
      width: 4.5
  },
  }
export default options;