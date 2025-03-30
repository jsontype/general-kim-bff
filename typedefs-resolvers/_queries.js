const { gql } = require("apollo-server")

const typeDefs = gql`
  type Query {
    teams(manager: String, cleaning_duty: String): [Team]
    team(id: ID!): Team

    equipments(used_by: Role, new_or_used: NewOrUsed): [Equipment]
    equipment(id: ID!): Equipment
    equipmentAdvs: [EquipmentAdv]

    supply(id: ID!): Supply
    supplies(team: ID): [Supply]

    software(id: ID!): Software
    softwares(used_by: Role, developed_by: String): [Software]

    givens: [Given]

    people(
      page: Int
      per_page: Int
      team: Int
      sex: Sex
      blood_type: BloodType
      from: String
    ): [People]
    person(id: ID!): People
    peopleFiltered(
      team: Int
      sex: Sex
      blood_type: BloodType
      from: String
    ): [People]
    peoplePaginated(page: Int!, per_page: Int!): [People]
    peopleFilteredPaginated(
      team: Int
      sex: Sex
      blood_type: BloodType
      from: String
      page: Int!
      per_page: Int!
    ): [People]

    roles: [RoleInfo]
    role(id: ID!): RoleInfo
  }
`

module.exports = typeDefs
