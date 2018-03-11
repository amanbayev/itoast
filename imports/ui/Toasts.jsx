import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import {ToastsCollection} from '/imports/api/ToastsCollection'

class Toasts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  handleSubmit(e){
    e.preventDefault()
    let name = this.state.name
    Meteor.call('category.insert', this.state, (err)=>{
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
          title: 'Категория создана',
          message: 'Категория ' + name + ' создана!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
      }
    })
  }
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Тосты</h1>
        </div>
        <div className="card" style={{width: '24rem'}}>
          <div className="card-body">
            <h5 className="card-title">Создать категорию</h5>
            <p className="card-text">
              Форма для быстрого создания категории. Введите название и нажмите кнопку.
            </p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <input 
                  value={this.state.name}
                  onChange={(e)=>{
                    this.setState({name: e.target.value})
                  }}
                  autoFocus
                  type="text" className="form-control" placeholder="Название категории" 
                />
              </div>
              <button type="submit" className="btn btn-primary">Создать</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker(props=> {
  Meteor.subscribe('toasts')
  return {
    toasts: ToastsCollection.find({}).fetch()
  }
})(Toasts)