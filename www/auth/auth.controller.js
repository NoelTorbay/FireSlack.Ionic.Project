angular.module('angularFireSlack')

.controller('AuthCtrl', function(Auth, $state) {
    
    var authCtrl = this;

    authCtrl.user = {
        email: '',
        password: ''
    };

    authCtrl.loginTitle='Log In';
    authCtrl.registerTitle = 'Register';

    authCtrl.login = function () {
        Auth.$authWithPassword(authCtrl.user).then(function (auth) {
            $state.go('home');
        }, function (error) {
            authCtrl.Error = error;
        });
    };

    authCtrl.register = function () {
        Auth.$createUser(authCtrl.user).then(function (user) {
            authCtrl.login();
        }, function (error) {
            authCtrl.Error = error;
        });
    };
});

