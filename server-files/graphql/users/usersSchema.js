const {gql} = require('apollo-server-express');

const usersTypeDefs = gql `
    type Query {
        checkQuery: String
    }

    type Mutation {
        login(username: String!, password: String!): Token
        createUser(user: NewUser!): String
    }

    input NewUser {
        username: String!
        password: String!
        name: String!
        isAdmin: Boolean!
    }

    type User {
        _id: ID!
        username: String!
        password: String!
        name: String!
        isAdmin: Boolean!
    }

    type Token{
        token:String!
    }
`;

module.exports = usersTypeDefs;