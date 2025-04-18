const database = require("./database")

const dataFiltered = (which, args) => {
  let result = database[which].filter((item) => {
    return (
      !args ||
      Object.keys(args).reduce((a, b) => {
        return a && (["page", "per_page"].includes(b) || item[b] == args[b])
      }, true)
    )
  })

  // 페이징
  if (args.page && args.per_page) {
    result = result.slice(
      (args.page - 1) * args.per_page,
      args.page * args.per_page
    )
  }

  return result
}

const dbWorks = {
  deleteItem: (which, args) => {
    const deleted = database[which].filter((item) => {
      return item.id == args.id
    })[0]
    database[which] = database[which].filter((item) => {
      return item.id != args.id
    })
    return deleted
  },

  // Teams
  getTeams: (args) =>
    dataFiltered("teams", args).map((team) => {
      team.members = dbWorks.getPeople({ team: team.id })
      return team
    }),

  postTeam: (args) => {
    const newTeam = {
      id:
        database.teams
          .map((team) => {
            return Number(team.id)
          })
          .reduce((a, b) => {
            return Math.max(a, b)
          }, 0) + 1,
      ...args.input,
    }
    database.teams.push(newTeam)
    return newTeam
  },

  editTeam: (args) => {
    return database.teams
      .filter((team) => {
        return team.id == args.id
      })
      .map((team) => {
        Object.assign(team, args.input)
        return team
      })[0]
  },

  // People
  getPeople: (args) =>
    dataFiltered("people", args).map((person) => {
      person.tools = [
        ...dbWorks.getEquipments({ used_by: person.role }),
        ...dbWorks.getSoftwares({ used_by: person.role }),
      ]
      person.givens = [
        ...dbWorks.getEquipments({ used_by: person.role }),
        ...dbWorks.getSupplies({ team: person.team }),
      ]
      return person
    }),

  postPerson: (args) => {
    const newPerson = {
      id:
        database.people
          .map((person) => {
            return Number(person.id)
          })
          .reduce((a, b) => {
            return Math.max(a, b)
          }, 0) + 1,
      ...args.input,
    }
    database.people.push(newPerson)
    return newPerson
  },

  editPerson: (args) => {
    return database.people
      .filter((person) => {
        return person.id == args.id
      })
      .map((person) => {
        Object.assign(person, args.input)
        return person
      })[0]
  },

  // Roles
  getRoles: (args) =>
    dataFiltered("roles", args).map((role) => {
      role.members = dbWorks.getPeople({ role: role.id })
      role.equipments = dbWorks.getEquipments({ used_by: role.id })
      role.softwares = dbWorks.getSoftwares({ used_by: role.id })
      return role
    }),

  // Equipment
  getEquipments: (args) => dataFiltered("equipments", args),

  postEquipment: (args) => {
    database.equipments.push(args)
    return args
  },

  increaseEquipment: (args) => {
    return database.equipments
      .filter((equipment) => {
        equipment.id === args.id
      })
      .map((equipment) => {
        equipment.count += 1
        return equipment
      })[0]
  },

  // Softwares
  getSoftwares: (args) => dataFiltered("softwares", args),

  // Supplies
  getSupplies: (args) => dataFiltered("supplies", args),
}

module.exports = dbWorks
