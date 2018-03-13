import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import { ToastsCollection } from '/imports/api/ToastsCollection'
import { CategoriesCollection } from '/imports/api/CategoriesCollection'
import { TypesCollection } from '/imports/api/TypesCollection'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class ToastsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      selectedOption: '',
      selectedType: '',
    }
  }

  handleSubmit(e){
    e.preventDefault()
    let toast = {
      text: this.state.text,
      catId: this.state.selectedOption._id,
      catName: this.state.selectedOption.name,
      typeId: this.state.selectedType._id,
      typeName: this.state.selectedType.name,
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
      selectedType: ''
    })
  }
  
  handleCatSelect(selectedOption) {
    this.setState({selectedOption})
  }

  handleTypeSelect(selectedType) {
    this.setState({selectedType})
  }

  renderToastsTable() {
    return this.props.toasts.map((toast, index)=>(
      <tr key={index}>
        <td valign="middle" align="center">
          {index+1}
        </td>
        <td valign="middle" align="center">
          {toast.typeName}
        </td>
        <td valign="middle" align="center">
          <h6>
            <span className="badge badge-light">
              {toast.catName}
            </span>
          </h6>
        </td>
        <td valign="middle" align="center">
          <Link to={'/admin/toasts/'+toast._id}>
            <button className="btn btn-primary">
              <i className="fa fa-search"></i> Просмотреть
            </button>
          </Link>
        </td>
        <td valign="middle" align="center">
          <button onClick={(e)=>{
            let id = e.target.dataset.id
            Meteor.call('toasts.remove', id, (err)=> {
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
                  title: 'Запись удалена',
                  message: 'Запись успешно удалена из базы данных!',
                  type: 'info',
                  style: 'growl-top-right',
                  icon: 'fa-check'
                });
              }
            })
          }} className="btn btn-danger" data-id={toast._id}>
            <i className="fa fa-trash" data-id={toast._id}></i>
          </button>
        </td>
      </tr>
    ))
  }

  render() {
    let { selectedOption, selectedType } = this.state;
    let value = selectedOption._id;
    let shmalue = selectedType._id;
    
    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">Записи</h1>
        </div>
        <div className="card" style={{width: '100%'}}>
          <div className="card-body">
            <h5 className="card-title">Добавить запись</h5>
            <p className="card-text">
              Форма для быстрого создания записи. 
              Введите текст, выберите категорию и нажмите кнопку Сохранить.
            </p>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="row">
                <div className="col-sm">
                  <div className="form-group">
                    <Select
                      options={this.props.types}
                      labelKey='name'
                      valueKey='_id'
                      clearable={false}
                      placeholder='Выберите тип записи'
                      value={shmalue}
                      onChange={this.handleTypeSelect.bind(this)}
                      searchable
                      />
                  </div>
                </div>
                <div className="col-sm">
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
                </div>
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
              <th><center>Тип</center></th>
              <th><center>Категория</center></th>
              <th><center>Запись</center></th>
              <th><center>Удалить</center></th>
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
  Meteor.subscribe('types')
  return {
    types: TypesCollection.find({}).fetch(),
    toasts: ToastsCollection.find({}).fetch(),
    categories: CategoriesCollection.find({}).fetch()
  }
})(ToastsList)