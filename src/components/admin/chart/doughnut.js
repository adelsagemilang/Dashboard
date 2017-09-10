import React, { Component, PropTypes } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Parser as HtmlToReactParser } from 'html-to-react';

const htmlToReactParser = new HtmlToReactParser();


const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
        data: [
        	300, 
        	20, 
        	50
        	],
		backgroundColor: [
		'#27A1C3',
		'#79BE75',
		'#DDDDDD'
		],
            label: 'Dataset 1',
            borderWidth: 1,
            hoverBorderWidth: 4,
            hoverBorderColor: [
                'rgba(26, 188, 156, 0.15)',
                'rgba(253, 210, 76, 0.15)',
                'rgba(238, 96, 85, 0.15)'
            ],
        }],
        labels: [
            "Disetujui: ",
            "Menunggu Persetujuan: ",
            "Ditolak: ",
        ]
};

const options = {
	cutoutPercentage: 80,
	segmentShowStroke: false,
	elements: {
		arc: {
		  borderWidth: 0,
          borderColor: 'transparent'
		}
	},
	responsive: true,
    legend: {
        display: false
    },
    title: {
        display: false
    },
    animation: {
        animateScale: true,
        animateRotate: true
    }
}

export default React.createClass({

  componentDidMount() {
    this.forceUpdate();
  },
  
  displayName: 'Doughnut',
  render() {
    return (
      <div>
        <p className="strong">Tiket Program</p>
        <div className="chart-wrapper">
	        {this.refs.chart && htmlToReactParser.parse(this.refs.chart.chart_instance.generateLegend())}
	        <Doughnut data={data} options={ options } ref="chart" height={ 100 }/>
	    </div>
      </div>
    );
  }
});
