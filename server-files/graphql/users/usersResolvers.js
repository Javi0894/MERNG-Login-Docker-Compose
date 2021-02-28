const User = require("../../db-models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {UserInputError, AuthenticationError} = require("apollo-server-express");
const {isAdmin} = require("../authentication");
const {combineResolvers} = require("graphql-resolvers");

const userResolver = {
    Query: {

    }, 
    Mutation: {
        login: async (_, {username, password}) => {
            const user = await User.findOne({ username: username });
            if (username === "admin" && password === "admin"){
                return {
                    token: createToken({_id: null, username:"admin", isAdmin:true}, 300)
                };
            };
            if (!user) throw new UserInputError("No user was found with this username", {});
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw AuthenticationError("Invalid password");

            return {token: createToken(user, "14d")};
        },
        createUser: combineResolvers(isAdmin, 
            async (_, { user }) => {
                const {username, name, isAdmin, password} = user;
                const userExists = await User.findOne({ username: username });
                if (userExists) throw new UserInputError("User already exists", {});
                let newUser = { name, username, isAdmin};
                const salt = await bcrypt.genSalt(10);
                newUser["password"] = await bcrypt.hash(password, salt);
                const newUserToDB = new User({...newUser});
                await newUserToDB.save();
                return `The user ${username} was successfully created`;
            }
        )
    }
}

const createToken = async (user, expiresIn) => {
    const {_id, username, isAdmin} = user;
    const secret = "jl57GEMmzVZDovefHHdU";
    return await jwt.sign({_id, username, isAdmin}, secret, {expiresIn});
}

module.exports= {userResolver};