let options = {
    chart: {
        id: 'basic',
        width: "100%",
        type: 'line',
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 500
            },
            animateGradually: {
                enabled: true,
                delay: 150
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
    stroke: {
        curve: 'smooth',
        lineCap: 'square',
        width: 4.5
    },

}
export default options;