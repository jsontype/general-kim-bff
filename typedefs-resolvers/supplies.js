const { gql } = require("apollo-server")
const dbWorks = require("../dbWorks")

const typeDefs = gql`
  """
  가구, 가전, 지급품 데이터
  """
  type Supply {
    id: ID!
    team: Int
  }
`

const resolvers = {
  Query: {
    supplies: (parent, args) => dbWorks.getSupplies(args),
    supply: (parent, args) => dbWorks.getSupplies(args)[0],
  },
  Mutation: {
    deleteSupply: (parent, args) => dbWorks.deleteItem("supplies", args),
  },
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
}
