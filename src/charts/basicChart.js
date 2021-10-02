let options = {
    chart: {
        id: 'basic',
        width: "100%",
        type: 'line',
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
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false | '<img src="/static/icons/reset.png" width="20">',
                customIcons: []
            }
        }
    },
    colors: ['#008FFB', '#00E39690', '#9C27B0'],
    xaxis: {
        type: 'datetime'
    },
    yaxis: [{
        labels: {
            formatter: function (value) {
                return value;
            }
        }
    }],
    legend: {
        onItemClick: {
            toggleDataSeries: true
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