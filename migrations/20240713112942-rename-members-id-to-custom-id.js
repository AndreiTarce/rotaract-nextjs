module.exports = {
    async up(db, client) {
        await db.collection('members').updateMany({}, { $rename: { id: 'custom_id' } });
    },

    async down(db, client) {
        await db.collection('members').updateMany({}, { $rename: { custom_id: 'id' } });
    },
};
