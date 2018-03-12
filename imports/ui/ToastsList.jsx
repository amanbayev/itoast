import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { ToastsCollection } from '/imports/api/ToastsCollection'
import { CategoriesCollection } from '/imports/api/CategoriesCollection'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class ToastsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      selectedOption: '',
    }
  }

  handleSubmit(e){
    e.preventDefault()
    let toast = {
      text: this.state.text,
      catId: this.state.selectedOption._id,
      catName: this.state.selectedOption.name
    }
    Meteor.call('toasts.insert', toast, (err)=>{
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
          title: 'Тост создан',
          message: 'Тост создан!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
      }
    })
    this.setState({
      text: '',
      selectedOption: '',
    })
  }
  
  handleCatSelect(selectedOption) {
    this.setState({selectedOption})
  }

  renderToastsTable() {
    return this.props.toasts.map((toast, index)=>(
      <tr key={index}>
        <td valign="middle" align="center">
          {index+1}
        </td>
        <td valign="middle" align="center">
          <h4>
            <span className="badge badge-light">
              {toast.catName}
            </span>
          </h4>
        </td>
        <td valign="middle" align="center">
          <Link to={'/admin/toasts/'+toast._id}>
            <button className="btn btn-primary">
              <i className="fa fa-search"></i> Просмотреть
            </button>
          </Link>
        </td>
      </tr>
    ))
  }

  render() {
    let { selectedOption } = this.state;
    let value = selectedOption._id;
    
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Тосты</h1>
        </div>
        <div className="card" style={{width: '100%'}}>
          <div className="card-body">
            <h5 className="card-title">Добавить тост</h5>
            <p className="card-text">
              Форма для быстрого создания тоста. 
              Введите текст, выберите категорию и нажмите кнопку Сохранить.
            </p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <Select
                  options={this.props.categories}
                  labelKey='name'
                  valueKey='_id'
                  clearable={false}
                  placeholder='Выберите категорию'
                  value={value}
                  onChange={this.handleCatSelect.bind(this)}
                  searchable
                  />
              </div>
              <div className="form-group">
                <textarea className="form-control"
                  value={this.state.text}
                  onChange={(e)=>{
                    this.setState({text: e.target.value})
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary">Сохранить</button>
            </form>
          </div>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th><center>#</center></th>
              <th><center>Категория</center></th>
              <th><center>Тост</center></th>
            </tr>
          </thead>
          <tbody>
            {this.renderToastsTable()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default withTracker(props => {
  Meteor.subscribe('toasts')
  Meteor.subscribe('categories')
  return {
    toasts: ToastsCollection.find({}).fetch(),
    categories: CategoriesCollection.find({}).fetch()
  }
})(ToastsList)