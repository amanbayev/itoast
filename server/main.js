import { Meteor } from 'meteor/meteor';

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
  }
});
