const { gql } = require("apollo-server")
const dbWorks = require("../dbWorks")

const typeDefs = gql`
  type People {
    id: ID!
    first_name: String!
    last_name: String!
    sex: Sex!
    blood_type: BloodType!
    serve_years: Int!
    role: Role!
    team: ID!
    from: String!
    tools: [Tool]
    givens: [Given]
  }
  input PostPersonInput {
    first_name: String!
    last_name: String!
    sex: Sex!
    blood_type: BloodType!
    serve_years: Int!
    role: Role!
    team: ID!
    from: String!
  }
`

const resolvers = {
  Query: {
    people: (parent, args) => dbWorks.getPeople(args),
    person: (parent, args) => dbWorks.getPeople(args)[0],
    peopleFiltered: (parent, args) => dbWorks.getPeople(args),
    peoplePaginated: (parent, args) => dbWorks.getPeople(args),
    peopleFilteredPaginated: (parent, args) => dbWorks.getPeople(args),
  },
  Mutation: {
    postPerson: (parent, args) => dbWorks.postPerson(args),
    editPerson: (parent, args) => dbWorks.editPerson(args),
    deletePerson: (parent, args) => dbWorks.deleteItem("people", args),
  },
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
}
