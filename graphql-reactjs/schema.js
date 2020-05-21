const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema  } = require('graphql');

const axios = require('axios');

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        desc: {type: GraphQLString},
        ids_device: {type: GraphQLInt},
        ids_organization: {type: GraphQLInt}
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return axios.get('http://127.0.0.1:8000/api/users')
                .then(res => res.data.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})