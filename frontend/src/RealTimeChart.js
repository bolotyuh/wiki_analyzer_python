import React, {Component} from 'react';
import $ from 'jquery'
import * as Chart from 'chart.js';

export class RealTimeChart extends Component {

    constructor(props) {
        super(props);

        this.el = React.createRef();

        this.state = {
            chart: null
        }
    }

    componentDidMount() {
        var ctx = this.el.current.getContext('2d');

        var chartjs = new Chart.Chart(ctx, {
            type: 'line',
            data: {
                datasets: []
                // datasets: [{
                //     // label: 'My Second dataset',
                //     // backgroundColor: 'yellow',
                //     // borderColor: 'black',
                //     // fill: false,
                //     data: [
                //         {"x": "2021-01-18T17:35:00", "y": 344},
                //         {"x": "2021-01-18T17:34:00", "y": 768},
                //     ],
                // }],
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Time Point Data'
                },
                scales: {
                    xAxes: [{
                        type: 'realtime',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        },
                        ticks: {
                            major: {
                                fontStyle: 'bold',
                                fontColor: '#FF0000'
                            }
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                    }]
                }
            }
        });
        var intervalId = setInterval(this.updateChart.bind(this), 5000);
        this.setState({chart: chartjs})
    }

    updateChart() {
        $.getJSON("http://0.0.0.0:8080/chart/user_contribution", function (json) {

            this.state.chart.data.datasets =[json]

            this.state.chart.update();
        }.bind(this));
    }

    render() {
        return (
            <div>
                <canvas width="1000px" height="800px" ref={this.el}></canvas>
            </div>
        );
    }

}





























