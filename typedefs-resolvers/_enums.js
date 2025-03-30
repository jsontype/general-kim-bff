const { gql } = require("apollo-server")

const typeDefs = gql`
  enum Sex {
    male
    female
  }
  enum BloodType {
    A
    B
    O
    AB
  }
  enum Role {
    developer
    designer
    planner
  }
  enum NewOrUsed {
    new
    used
  }
`

module.exports = typeDefs
