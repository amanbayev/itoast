import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import {TypesCollection} from '/imports/api/TypesCollection'

class Types extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let name = this.state.name
    Meteor.call('types.insert', this.state, (err)=>{
      if (err) {
        Bert.alert({
          title: 'Ошибка',
          message: err.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-cross'
        });
      } else {
        Bert.alert({
          title: 'Тип создан',
          message: 'Тип ' + name + ' создан!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
      }
    })
    this.setState({name:''})
  }
  renderTypesTable() {
    return this.props.types.map((type, index)=>(
      <tr key={index}>
        <td>
          {index+1}
        </td>
        <td>
          {type.name}
        </td>
        <td>
          {type.counter}
        </td>
      </tr>
    ))
  }
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Типы</h1>
        </div>
        <div className="card" style={{width: '24rem'}}>
          <div className="card-body">
            <h5 className="card-title">Создать тип</h5>
            <p className="card-text">
              Форма для быстрого создания типов. Введите название и нажмите кнопку.
            </p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <input 
                  value={this.state.name}
                  onChange={(e)=>{
                    this.setState({name: e.target.value})
                  }}
                  autoFocus
                  type="text" className="form-control" placeholder="Название типа" 
                />
              </div>
              <button type="submit" className="btn btn-primary">Создать</button>
            </form>
          </div>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>Количество постов</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTypesTable()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default withTracker(props=> {
  Meteor.subscribe('types')
  return {
    types: TypesCollection.find({}).fetch()
  }
})(Types)