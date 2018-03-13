import { Mongo } from 'meteor/mongo'

export const TypesCollection = new Mongo.Collection('types')

if (Meteor.isServer) {
  Meteor.publish('types', function() {
    return TypesCollection.find()
  })
}

Meteor.methods({
  'types.insert' (type) {
    if (type.name.length < 3) {
      throw new Meteor.Error('short-name', "Короткое название! Должно быть больше 3х символов!");
    }
    type.createdAt = new Date()
    type.createdBy = this.userId
    type.counter = 0
    TypesCollection.insert(type)
  }
})