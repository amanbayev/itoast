import { Meteor } from 'meteor/meteor';
import { ToastsCollection } from '/imports/api/ToastsCollection'
import { CategoriesCollection } from '/imports/api/CategoriesCollection'
import { TypesCollection } from '/imports/api/TypesCollection'

Meteor.startup(() => {
  // code to run on server at startup
  if ( Meteor.users.find().count() === 0 ) {
    let cUser = Accounts.createUser({
        username: 'admin',
        email: 'admin@test.kz',
        password: 'password',
        profile: {
            first_name: 'Admin',
            last_name: 'Forever',
            company: 'iToast',
        }
    });
    Roles.addUsersToRoles(cUser, 'admin')
    
    let testUser = Accounts.createUser({
      username: 'test',
      email: 'test@test.kz',
      password: '123',
      profile: {
        first_name: 'Test',
        last_name: 'User',
        company: 'iToast'
      }
    })
    Roles.addUsersToRoles(testUser, 'admin')
  }
});

var Api = new Restivus({
  useDefaultAuth: false,
  prettyJson: true
})

// remove everything in db
ToastsCollection.remove({})
TypesCollection.remove({})
CategoriesCollection.remove({})

Api.addCollection(ToastsCollection, {
  excludedEndpoints: ['put', 'delete', 'patch', 'update'],
  routeOptions: {
    authRequired: false
  },
  path: 'toasts',
  endpoints: {
    getAll: {
      authRequired: false
    },
    get: {
      authRequired: false
    }
  }
})

Api.addCollection(TypesCollection, {
  excludedEndpoints: ['put', 'delete', 'patch', 'update'],
  routeOptions: {
    authRequired: false
  },
  path: 'types',
  endpoints: {
    getAll: {
      authRequired: false
    },
    get: {
      authRequired: false
    }
  }
})

Api.addCollection(CategoriesCollection, {
  excludedEndpoints: ['put', 'delete', 'patch', 'update'],
  routeOptions: {
    authRequired: false
  },
  path: 'categories',
  endpoints: {
    getAll: {
      authRequired: false
    },
    get: {
      authRequired: false
    }
  }
})