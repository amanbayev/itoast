import React, { Component } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [getRandomInt(50, 200), getRandomInt(100, 150), getRandomInt(150, 250)],
    backgroundColor: [
    '#CCC',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
});

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Downloads from AppStore and Play Market',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [15, 29, 33, 41, 56, 65, 80]
    }
  ]
};

class Donut extends Component {
  constructor(props) {
    super(props)
    this.state = getState();
  }

  componentWillMount() {
    this.myInterval = setInterval(()=>{
      this.setState(getState());
    }, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.myInterval)
  }

  render() {
    return (
      <div className="col-sm">
        <h2>Tester</h2>
        <Doughnut data={this.state} />
      </div>
    )
  }
}

const Empty = () => (
  <div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 className="h2">Админка</h1>
    </div>
    <div className="row">
      <Donut />
      <Donut />
    </div>
    <br />
    <div className="row">
      <div className="col-sm">
        <h2>Line chart example</h2>
        <Line data={data} />
      </div>
    </div>
    <div className="row">
      <div className="col-sm">
        <div className="card">
          <div className="card-header">
            Записи
          </div>
          <div className="card-body">
            <h5>
              Количество записей в базе данных: #
            </h5>
            <p className="card-text">
              Сегодня добавлено: #<br/>
              Сегодня просмотрено: #<br/>
              Добавлено в избранное, всего: # <br/>
            </p>
            <a href="#" className="btn btn-primary">Просмотреть детали</a>
          </div>
        </div>
      </div>
      <div className="col-sm">
        <div className="card">
          <div className="card-header">
            Еще что-нибудь полезное
          </div>
          <div className="card-body">
            <h5>
              Количество записей в базе данных: #
            </h5>
            <p className="card-text">
              Сегодня добавлено: #<br/>
              Сегодня просмотрено: #<br/>
              Добавлено в избранное, всего: # <br/>
            </p>
            <a href="#" className="btn btn-primary">Просмотреть детали</a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Empty