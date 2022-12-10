module.exports = async (client) => {
    console.log(`Ready!`);

    client.user.setActivity(client.config.activity);
};
