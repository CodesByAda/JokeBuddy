const { Events, ActivityType, PresenceUpdateStatus } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        client.user.setActivity('your buddy!', {type: ActivityType.Watching})
        client.user.setStatus(PresenceUpdateStatus.Idle);
        console.log(`Logged in as ${client.user.tag}`);
    },
}