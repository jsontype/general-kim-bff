const { ApolloServer } = require("apollo-server")

const queries = require("./typedefs-resolvers/_queries")
const mutations = require("./typedefs-resolvers/_mutations")
const enums = require("./typedefs-resolvers/_enums")
const teams = require("./typedefs-resolvers/teams")
const people = require("./typedefs-resolvers/people")
const equipments = require("./typedefs-resolvers/equipments")
const supplies = require("./typedefs-resolvers/supplies")
const softwares = require("./typedefs-resolvers/softwares")
const givens = require("./typedefs-resolvers/givens")
const tools = require("./typedefs-resolvers/tools")
const roles = require("./typedefs-resolvers/roles")

const typeDefs = [
  queries,
  mutations,
  enums,
  teams.typeDefs,
  people.typeDefs,
  equipments.typeDefs,
  supplies.typeDefs,
  softwares.typeDefs,
  givens.typeDefs,
  tools.typeDefs,
  roles.typeDefs,
]

const resolvers = [
  teams.resolvers,
  people.resolvers,
  equipments.resolvers,
  supplies.resolvers,
  softwares.resolvers,
  givens.resolvers,
  tools.resolvers,
  roles.resolvers,
]

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
