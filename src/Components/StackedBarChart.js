// with help from https://bl.ocks.org/reinson/166bae46dd106b45cf2d77c7802768ca

// zero data converted to 0.001 to avoid messing up the order of the colours if bars are added/removed
import React, { PureComponent } from 'react';
import {
  Bar
} from 'react-chartjs-2';

import stacked100 from "chartjs-plugin-stacked100"

export default class StackedBarChart extends PureComponent {
  m_colors = {
    "Coal": "#91908d",
    "Solar": "#ffc83e",
    "Solar2": "#ffa93e", 
    "Hydro": "#43cfef",
    "Wind": "#66e326",
    "Waste": "#ea545c", 
    "Gas": "#6b4b06"
  }

  /*
     "Coal", "##91908d", = grey
      "Storage", "#4e80e5", = purple
      "Solar", "#ffc83e", = yellow
      "Solar2", #ffa93e", = orange
      "Hydro", "#43cfef", = blue
      "Wind", "#66e326", = green
      "Gas", "#6b4b06", = brown
      "Waste", "#ea545c", = red 
      */

  state = {
    data: {
      labels: ["%"],
      datasets: [{
        label: 'Employee',
        backgroundColor: "#caf270",
        data: [12, 59, 5, 56, 58, 12, 59, 87, 45],
      }]
    },
    percentages: null
  }
  componentDidUpdate() {

    if(this.props.percentages!== this.state.percentages){
    console.log(this.props.percentages)
    var datasets = []
    for (var i = 0; i < this.props.percentages.length; i++) {
      var newObj = {}
      newObj.label = this.props.percentages[i].type
      newObj.backgroundColor = this.m_colors[newObj.label]
      newObj.data = []
      newObj.data[0] = this.props.percentages[i].percentage
      datasets.push(newObj)
    }

    this.setState({
      data: {
        labels: ["capacity"],
        datasets: datasets
      },
      percentages: this.props.percentages
    })
  }
  }

  componentDidMount(){

    var datasets = []
    for (var i = 0; i < this.props.percentages.length; i++) {
      var newObj = {}
      newObj.label = this.props.percentages[i].type
      newObj.backgroundColor = this.m_colors[newObj.label]
      newObj.data = []
      newObj.data[0] = this.props.percentages[i].percentage
      datasets.push(newObj)
    }

    this.setState({
      data: {
        
        datasets: datasets
      },
      percentages: this.props.percentages
    })
  }
  render() {
    return (
    
       
        <Bar
          data={this.state.data}
          width={this.props.width}
          height={this.props.height}
          options={{
            tooltips: {
              
              displayColors: false,
              callbacks: {
                title: function() {},
                
                label: function(tooltipItem, data) {
                  var label = data.datasets[tooltipItem.datasetIndex].label || '';
                 
                  label +=": " + tooltipItem.yLabel;
                  return  label + "%";
              }
             }
            },
            scales: {
              xAxes: [{
                stacked: true,
                gridLines: {
                  display: false,
                }
              }],
              yAxes: [{
                stacked: true,
                gridLines: {
                  display: true,
                },
                
                position: 'right',
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  stepSize: 20
                }
               
              }]
            },
            layout: {
              padding: {
                  left: 20
              }
          },
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false }
          }}
        />
     
    );
  }
}
