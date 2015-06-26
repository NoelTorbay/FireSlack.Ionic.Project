angular.module('angularFireSlack')

.controller('ChannelsCtrl', function ($state, Auth, Users, profile, Channels) {

    var channelsCtrl = this;

    channelsCtrl.profile = profile;
    channelsCtrl.channels = Channels;
    channelsCtrl.getDisplayName = Users.getDisplayName;
    channelsCtrl.getGravatar = Users.getGravatar;
    channelsCtrl.newChannel = {
        name: ''
    };
    channelsCtrl.users = Users.all;

    Users.setOnline(profile.$id);

    channelsCtrl.logout = function () {
        channelsCtrl.profile.online = null;
        channelsCtrl.profile.$save().then(function () {
            Auth.$unauth();
            $state.go('home');
        });
    };

    channelsCtrl.createChannel = function () {
        channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function (ref) {
            $state.go('channels.messages', { channelId: ref.key() });
        });
    };
});
