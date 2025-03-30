const { gql } = require("apollo-server")
const dbWorks = require("../dbWorks")

const typeDefs = gql`
  """
  장비 데이터
  """
  type Equipment implements Tool {
    id: ID!
    used_by: Role!
    count: Int
    new_or_used: NewOrUsed!
  }
  type EquipmentAdv {
    id: ID!
    used_by: String!
    count: Int!
    use_rate: Float
    is_new: Boolean!
    users: [String!]
  }
`

const resolvers = {
  // data를 반환하는 액션함수들을 보존하는 객체(조회기능)
  Query: {
    equipments: (parent, args) => dbWorks.getEquipments(args),
    equipment: (parent, args) => dbWorks.getEquipments(args)[0],
    equipmentAdvs: (parent, args) =>
      dbWorks.getEquipments(args).map((equipment) => {
        if (equipment.used_by === "developer") {
          equipment.use_rate = Math.random().toFixed(2)
        }
        equipment.is_new = equipment.new_or_used === "new"
        if (Math.random() > 0.5) {
          equipment.users = []
          dbWorks.getPeople(args).forEach((person) => {
            if (person.role === equipment.used_by && Math.random() < 0.2) {
              equipment.users.push(person.last_name)
            }
          })
        }
        return equipment
      }),
  },

  // data를 편집하는 객체(입력, 수정, 삭제)
  Mutation: {
    increaseEquipment: (parents, args) => dbWorks.increaseEquipment(args),
    deleteEquipment: (parent, args) => dbWorks.deleteItem("equipments", args),
  },
}

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
}
