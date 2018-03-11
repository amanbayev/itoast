import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import {CategoriesCollection} from '/imports/api/CategoriesCollection'

class Categories extends Component {
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
    this.setState({name:''})
  }
  renderCategoriesTable() {
    return this.props.categories.map((category, index)=>(
      <tr key={index}>
        <td>
          {index+1}
        </td>
        <td>
          {category.name}
        </td>
      </tr>
    ))
  }
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Категории</h1>
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
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCategoriesTable()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default withTracker(props=> {
  Meteor.subscribe('categories')
  return {
    categories: CategoriesCollection.find({}).fetch()
  }
})(Categories)