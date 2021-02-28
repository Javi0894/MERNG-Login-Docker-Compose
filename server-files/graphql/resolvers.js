const {userResolver} = require("./users/usersResolvers");

const resolvers = {
    Query:{...userResolver.Query}, 
    Mutation:{...userResolver.Mutation}
};

module.exports = resolvers;