import { Mongo } from 'meteor/mongo'
import { CategoriesCollection } from './CategoriesCollection'
import { TypesCollection } from './TypesCollection'

export const ToastsCollection = new Mongo.Collection('toasts')

if (Meteor.isServer) {
  Meteor.publish('toasts', function() {
    return ToastsCollection.find()
  })
}

Meteor.methods({
  'toasts.insert' (toast) {
    toast.createdAt = new Date()
    toast.createdBy = this.userId
    ToastsCollection.insert(toast)
    CategoriesCollection.update(
      {_id: toast.catId},
      { $inc: { counter: 1 }},
      { upsert: true }
    )
    TypesCollection.update(
      {_id: toast.typeId},
      { $inc: { counter: 1 }},
      { upsert: true }
    )
  },
  'toasts.remove' (toastId) {
    let toast = ToastsCollection.findOne({_id: toastId})
    CategoriesCollection.update(
      {_id: toast.catId},
      { $inc: { counter: -1 }},
      { upsert: true }
    )
    TypesCollection.update(
      {_id: toast.typeId},
      { $inc: { counter: -1 }},
      { upsert: true }
    )
    ToastsCollection.remove(toast._id)
  }
})