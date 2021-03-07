const {ApolloServer} = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const resolvers = require("./resolvers");
const typeDefs = require("./schemas");

const setGraphQLMiddleware = (app) => {
    const checkActualUser = async req => {
        const token = req.headers["x-token"];
        // const token = tokenHeader?
        if (token) {
            console.log(token);
            return await jwt.verify(token, "jl57GEMmzVZDovefHHdU")
        };
        // console.log("The user couldnt be identified");
        return null;
    }

    const server = new ApolloServer(
        {
            typeDefs,
            resolvers, 
            context: async ({req}) => {
                if (req){
                    const identifiedUser = await checkActualUser(req);
                    return { identifiedUser };
                }
            }
        }
    );

    server.applyMiddleware({ app });
};

module.exports = {setGraphQLMiddleware}; 
