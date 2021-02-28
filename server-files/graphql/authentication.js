const {skip, combineResolvers} = require("graphql-resolvers");
const {ForbiddenError} = require("apollo-server-express");
const identificationSuccessful = (_, args, { identifiedUser }) => 
    identifiedUser? skip:new Error("User couldnt be authenticated");
const isAdmin = combineResolvers(
    identificationSuccessful, 
    (_, args, {identifiedUser}) => 
    identifiedUser.isAdmin?skip:new ForbiddenError("The user doesnt possess admin rights")
);

module.exports = {identificationSuccessful, isAdmin}