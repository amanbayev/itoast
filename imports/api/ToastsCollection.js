import { Mongo } from 'meteor/mongo'
import { CategoriesCollection } from './CategoriesCollection'

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
  }
})