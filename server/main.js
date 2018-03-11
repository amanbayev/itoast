import { Meteor } from 'meteor/meteor';
import '/imports/api/ToastsCollection'
import '/imports/api/CategoriesCollection'

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
