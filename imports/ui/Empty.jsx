import React, { Component } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { withTracker } from 'meteor/react-meteor-data'
import randomMC from 'random-material-color'
import { TypesCollection } from '/imports/api/TypesCollection'


function getFields(input, field) {
  let output = [];
  for (let i=0; i < input.length ; ++i)
      output.push(input[i][field]);
  return output;
}

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

class Empty extends Component {
  constructor(props) {
    super(props)
  }
  getColorsList(){
    let limit = this.props.labels.length
    let colors = []
    for (let i=0; i< limit; i++){
      colors.push(randomMC.getColor())
    }
    // console.log('i got called')
    // console.log(colors)
    return colors
  }
  render() {
    if (this.props.loading) {
      return (
      <div>Loading</div>
      )
    } else {
      // console.log(this.props.labels)
      // console.log(this.props.counters) 
      return (
        <div>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h2">Админка</h1>
          </div>
          <div className="row">
            <div className="col-sm">
              <h4>Количество записей в разрезе типов</h4>
              <Doughnut data={{
                'labels': this.props.labels,
                'datasets': [{
                  data: this.props.counters,
                  backgroundColor: this.getColorsList(),
                  hoverBackgroundColor: this.getColorsList()
                }]
              }} />
            </div>
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
    }
  }
} 

export default withTracker(props=>{
  let typesSub = Meteor.subscribe('types')
  let typesArray = TypesCollection.find({}).fetch();
  let ready = typesSub.ready()
  return {
    loading: !ready,
    types: TypesCollection.find({}).fetch(),
    labels: getFields(TypesCollection.find({}).fetch(), 'name'),
    counters: getFields(TypesCollection.find({}).fetch(), 'counter')
  }
})(Empty)