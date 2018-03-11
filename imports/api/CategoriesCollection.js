import { Mongo } from 'meteor/mongo'

export const CategoriesCollection = new Mongo.Collection('categories')

if (Meteor.isServer) {
  Meteor.publish('categories', function() {
    return CategoriesCollection.find()
  })
}

Meteor.methods({
  'category.insert' (category) {
    category.createdAt = new Date()
    category.createdBy = this.userId
    CategoriesCollection.insert(category)
  }
})