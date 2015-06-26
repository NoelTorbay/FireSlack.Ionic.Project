'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular.module('angularFireSlack', ['ionic', 'firebase', 'angular-md5', 'ui.router'])

    .run(function ($ionicPlatform) {

      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'home/home.html',
            resolve: {
                requireNoAuth: function ($state, Auth) {
                    return Auth.$requireAuth().then(function (auth) {
                        $state.go('tabs.channels');
                    }, function (error) {
                        return;
                    });
                }
            }
        })

        .state('login', {
            url: '/login',
            controller: 'AuthCtrl as authCtrl',
            templateUrl: 'auth/login.html',
            resolve: {
                requireNoAuth: function ($state, Auth) {
                    return Auth.$requireAuth().then(function (auth) {
                        $state.go('home');
                    }, function (error) {
                        return;
                    });
                }
            }
        })

        .state('register', {
            url: '/register',
            controller: 'AuthCtrl as authCtrl',
            templateUrl: 'auth/register.html',
            resolve: {
                requireNoAuth: function ($state, Auth) {
                    return Auth.$requireAuth().then(function (auth) {
                        $state.go('home');
                    }, function (error) {
                        return;
                    });
                }
            }
        })

        .state('tabs', {
            url: '/tabs',
            templateUrl: 'layout/tabs.html',
            abstract: true
        })

        .state('profile', {
            url: '/profile',
            controller: 'ProfileCtrl as profileCtrl',
            templateUrl: 'users/profile.html',
            resolve: {
                auth: function ($state, Users, Auth) {
                    return Auth.$requireAuth().catch(function () {
                        $state.go('home');
                    });
                },
                profile: function (Users, Auth) {
                    return Auth.$requireAuth().then(function (auth) {
                        return Users.getProfile(auth.uid).$loaded();
                    });
                }
            }
        })

        .state('tabs.channels', {
            url: '/channels',
            views:{
                'tabs-channels': {
                    controller: 'ChannelsCtrl as channelsCtrl',
                    templateUrl: 'channels/index.html',
                    resolve: {
                        channels: function (Channels) {
                            return Channels.$loaded;
                        },
                        profile: function ($state, Auth, Users) {
                            return Auth.$requireAuth().then(function (auth) {
                                return Users.getProfile(auth.uid).$loaded().then(function (profile) {
                                    if (profile.displayName) {
                                        return profile;
                                    } else {
                                        $state.go('profile');
                                    }
                                })
                            }, function (error) {
                                $state.go('home');
                            })
                        }   
                    }                   
                }
            }
        })

      //.state('channels.create', {
      //    url: '/create',
      //    controller: 'ChannelsCtrl as channelsCtrl',
      //    templateUrl: 'channels/create.html'
      //})

      //.state('tabs.channels.messages', {
      //    url: '/{channelId}/messages',
      //    views: {
      //        'tabs-channels-messages': {
      //            controller: 'MessagesCtrl as messagesCtrl',
      //            templateUrl: 'channels/messages.html',
      //            resolve: {
      //                messages: function ($stateParams, Messages) {
      //                    return Messages.forChannel($stateParams.channelId).$loaded();
      //                },
      //                channelName: function ($stateParams, Channels) {
      //                    return '#' + Channels.$getRecord($stateParams.channelId).name;
      //                }
      //            }
      //        }
      //    }
      //})

      //.state('channels.direct', {
      //    url: '/{uid}/messages/direct',
      //    controller: 'MessagesCtrl as messagesCtrl',
      //    templateUrl: 'channels/messages.html',
      //    resolve: {
      //        messages: function ($stateParams, Messages, profile) {
      //            return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
      //        },
      //        channelName: function ($stateParams, Users) {
      //            return Users.all.$loaded().then(function () {
      //                return '@' + Users.getDisplayName($stateParams.uid);
      //            });
      //        }
      //    }
      //});

      $urlRouterProvider.otherwise('/');
    })
    .constant('FirebaseUrl', 'https://glowing-fire-7745.firebaseio.com/');
