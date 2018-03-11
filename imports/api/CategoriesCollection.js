import { Mongo } from 'meteor/mongo'

export const CategoriesCollection = new Mongo.Collection('categories')

if (Meteor.isServer) {
  Meteor.publish('categories', function() {
    return CategoriesCollection.find()
  })
}

Meteor.methods({
  'category.insert' (category) {
    if (category.name.length < 3) {
      throw new Meteor.Error('short-name', "Короткое название! Должно быть больше 3х символов!");
    }
    category.createdAt = new Date()
    category.createdBy = this.userId
    category.counter = 0
    CategoriesCollection.insert(category)
  }
})