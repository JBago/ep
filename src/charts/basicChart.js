let options = {
    chart: {
      id: 'chart2',
      width: "100%",
      type: 'line',
      events: {
        scrolled: function(chartContext, { xaxis }) {
          this.scroll=true;
          console.log(this.scroll)
        }
      },
      animations: {
        enabled: true,
        speed: 300,
        easing: "easeinout",
        animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 300
      }
      },
      toolbar: {
        show: true,
        autoSelected: 'pan',
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: false | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        }
      }
    },
    colors:['#008FFB', '#00E39690', '#9C27B0'],
    xaxis: {
      range: 300000,
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