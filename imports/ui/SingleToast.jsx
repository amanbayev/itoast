import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { ToastsCollection } from '/imports/api/ToastsCollection'

class SingleToast extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          Loading
        </div>
      )
    }
    return (
      <div>
        <div className="card" style={{width: '100%'}}>
          <div className="card-body">
            <h5 className="card-title">
              Тост из категории {this.props.toast.catName}
            </h5>
            <div className="card-text">
              <pre>
                {this.props.toast.text}
              </pre>  
            </div>
            <button className="btn btn-primary"
              onClick={(e)=>{this.props.history.goBack()}}>
              <i className="fa fa-arrow-left" ></i>&nbsp;
              Вернуться к списку
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withTracker(props => {
  let subscription = Meteor.subscribe('toasts')
  let toastId = props.match.params.id
  return {
    loading: !subscription.ready(),
    toast: ToastsCollection.findOne({_id: toastId})
  }
})(SingleToast)