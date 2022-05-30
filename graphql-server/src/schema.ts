import { core, intArg, makeSchema, nonNull, objectType, stringArg, floatArg, inputObjectType, arg, list,
    asNexusMethod, enumType, booleanArg,} from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'
import { Prisma } from '.prisma/client'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {

    t.nonNull.list.nonNull.field('artefact', {
      type: Artefact,
      args: {
        filename: stringArg(),
        display_name: stringArg(),
        description: stringArg(),
        artefact_type: list(stringArg()),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.artefacts.findMany({
          where: { 
            filename:{
              contains:  _args.filename
             } || undefined,
            display_name: {
              contains: _args.display_name
             } || undefined,
            description: {
              contains: _args.description 
            }|| undefined,
            artefact_type: {
              in: _args.artefact_type 
            } || undefined
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('artefact_attributes', {
      type: ArtefactAttributes,
      args: {
        attribute_name: stringArg(),
        artefact_id: intArg()
      },
      resolve:(_parent, _args, context: Context) => {
        return context.prisma.artefact_attributes.findMany({
          where: { 
            attribute_name: _args.attribute_name || undefined,
            artefact_id: _args.artefact_id || undefined
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('candidate', {
      type: Candidate,
      args: {
        candidate_id: intArg(),
        candidate_name: stringArg(),
        title: list(stringArg()),
        suffix: stringArg(),
        short_name: stringArg(),
        born: intArg(),
        born_gte: intArg(),
        born_lte: intArg(),
        died: intArg(),
        died_gte: intArg(),
        died_lte: intArg()
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.candidates.findMany({
          where: { 
            AND: [
              {
                candidate_id: _args.candidate_id || undefined,
              },
              {
                candidate_name: {
                  contains:  _args.candidate_name 
                } || undefined,
              },
              {
                title:  {
                  in:  _args.title 
                } || undefined,
              },
              {
                suffix:  {
                  contains:  _args.suffix 
                } || undefined,
              },
              {
                short_name: {
                  contains:  _args.short_name 
                } || undefined,
              },
              {
                OR: [
                  {
                    born: _args.born || undefined,
                  },
                  {
                    AND: [
                      {
                        born: {
                          gte: _args.born_gte
                        } || undefined,
                      },
                      {
                        born: {
                          lte: _args.born_lte
                        } || undefined,
                      }
                    ],
                  },
                ],
              },
              {
                OR: [
                  {
                    died: _args.died || undefined,
                  },
                  {
                    AND: [
                      {
                        died: {
                          gte: _args.died_gte
                        } || undefined,
                      },
                      {
                        died: {
                          lte: _args.died_lte
                        } || undefined,
                      }
                    ]
                  }
                ]
              }
            ]
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('candidates_elections', {
      type: CandidatesElection,
      args: {
        candidate_id: intArg(),
        election_id:  stringArg(),
        running_as: stringArg(),
        returned: intArg(),
        overturned_by: stringArg(),
        seated: intArg()
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.candidates_elections.findMany({
          where: {  
            candidate_id: _args.candidate_id || undefined,
            election_id: _args.election_id || undefined,
            returned: {
              equals: _args.returned
            } || undefined,
            seated: {
              equals: _args.seated
            } || undefined
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('constituencies', {
      type: Constituencies,
      args: {
        constituency_id: intArg(),
        constituency: stringArg(),
        has_polling_data: booleanArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.constituencies.findMany({
          where: { 
            constituency:{
              contains:  _args.constituency
             } || undefined,
            constituency_id:  _args.constituency_id || undefined,
            has_polling_data: _args.has_polling_data || undefined,
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('election_dates', {
      type: ElectionDates,
      args: {
        election_year: intArg({default:0}),
        election_year_gte: intArg({default:0}),
        election_year_lte: intArg({default:9999}),
        orderBy: arg({
          type: 'OrderByDate',
        }),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.election_dates.findMany({
          where: {
            OR: [
              {
                AND: [
                  {
                    election_date: {
                      gte: new Date(_args.election_year,1,1)
                    } || undefined,
                  },
                  {
                    election_date: {
                      lte: new Date(_args.election_year,12,31)
                    } || undefined,
                  }
                ],
              },
              {
                AND: [
                  {
                    election_date: {
                      gte: new Date(_args.election_year_gte,1,1)
                    } || undefined,
                  },
                  {
                    election_date: {
                      lte: new Date(_args.election_year_lte,12,31)
                    } || undefined,
                  }
                ],
              },
            ]
          },
          orderBy: _args.orderBy || undefined,
        })
      },
    })

    t.nonNull.list.nonNull.field('election', {
      type: Election,
      args: {
        election_year_gte: intArg({default:1500}),
        election_year_lte: intArg({default:2020}),
        election_month: stringArg(),
        constituency: stringArg(),
        constituency_id: intArg(),
        office: stringArg(),
        electorate_size_est_lte: intArg(),
        electorate_size_est_gte: intArg(),
        countyboroughuniv: stringArg(),
        franchise_type: list(stringArg()),
        by_election_general: stringArg(),
        by_election_cause: stringArg(),
        contested: stringArg()
        // election_id:  stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.elections.findMany({
          where: {  
            election_date: {
              gte: new Date(_args.election_year_gte,1,1),
              lte: new Date(_args.election_year_lte,12,31) 
             } || undefined,
            election_month: _args.election_month || undefined,
            constituency: _args.constituency || undefined,
            office: _args.office || undefined,
            electorate_size_est: {
              gte: _args.electorate_size_est_gte,
              lte: _args.electorate_size_est_lte 
             } || undefined,
            countyboroughuniv: _args.countyboroughuniv || undefined,
            franchise_type: {
              in:_args.franchise_type 
            } || undefined,
            by_election_general: _args.by_election_general || undefined,
            by_election_cause:  _args.by_election_cause || undefined,
            contested: _args.contested || undefined,
          },
        })
      },
    })

    // t.nonNull.list.nonNull.field('election_group_by', {
    //   type: ElectionGroupBy,
    //   args: {
    //     groupBy: list( GroupCategory),
    //   },
    //   resolve: (_parent, args, context: Context) => {
    //     const election_count = context.prisma.elections.groupBy({
    //       by: args.groupBy,
    //       count: {
    //         election_year: true,
    //       },
          
    //       // orderBy: {
    //       //   election_year: 'asc',
    //       // },
    //     })
    //     return election_count;
    //   },
    // })

    t.nonNull.list.nonNull.field('location', {
      type: Locations,
      args: {
        constituency: stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.locations.findMany({
          where: {
            constituency: _args.constituency || undefined,
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('location_from', {
      type: LocationsFrom,
      args: {
        lat: floatArg(),
        lng: floatArg(),
        distance: floatArg({default:1000})

      },
      resolve: (_parent, _args, context: Context) => {
        //3959 is the Earth radius in miles. Earth radius in kilometres (km): 6371
        return context.prisma.$queryRaw(Prisma.sql`SELECT locations.constituency, lat, lng, floor(3959 * acos( cos( radians(${_args.lat}) ) * cos( radians( locations.lat ) ) * cos( radians(locations.lng ) - radians(${_args.lng}) ) + sin( radians(${_args.lat}) ) * sin(radians(locations.lat)))) AS distance FROM ECPPEC.locations HAVING distance<${_args.distance} ORDER BY distance`)
      },
    })

    t.nonNull.list.nonNull.field('poll_book', {
      type: PollBooks,
      args: {
        // election_year: stringArg(),
        // contested: stringArg(),
        // election_id:  stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.poll_books.findMany({

        })
      },
    })

    t.nonNull.list.nonNull.field('stats', {
      type: Stats,
      args: {
        constituency: stringArg(),
        num_elections_all_lte: intArg(),
        num_contested_all_lte: intArg(),
        percent_contested_all_lte : floatArg(),
        num_uncontested_all_lte : intArg(),
        percent_uncontested_all_lte: floatArg(),
        num_elections_by_lte : intArg(),
        num_contested_by_lte: intArg(),
        percent_contested_by_lte : floatArg(),
        num_uncontested_by_lte : intArg(),
        percent_uncontested_by_lte : floatArg(),
        num_elections_general_lte: intArg(),
        num_contested_general_lte : intArg(),
        percent_contested_general_lte: floatArg(),
        num_uncontested_general_lte : intArg(),
        percent_uncontested_general_lte: floatArg(),
        num_elections_all_gte: intArg(),
        num_contested_all_gte: intArg(),
        percent_contested_all_gte : floatArg(),
        num_uncontested_all_gte : intArg(),
        percent_uncontested_all_gte: floatArg(),
        num_elections_by_gte : intArg(),
        num_contested_by_gte: intArg(),
        percent_contested_by_gte : floatArg(),
        num_uncontested_by_gte : intArg(),
        percent_uncontested_by_gte : floatArg(),
        num_elections_general_gte: intArg(),
        num_contested_general_gte : intArg(),
        percent_contested_general_gte: floatArg(),
        num_uncontested_general_gte : intArg(),
        percent_uncontested_general_gte: floatArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.stats.findMany({
          where: {  
            constituency: _args.constituency || undefined,
            num_elections_all: {
              gte: _args.num_elections_all_gte,
              lte: _args.num_elections_all_lte 
            } || undefined,
            num_contested_all: {
              gte: _args.num_contested_all_gte,
              lte: _args.num_contested_all_lte 
            } || undefined,
            percent_contested_all: {
              gte: _args.percent_contested_all_gte,
              lte: _args.percent_contested_all_lte 
            } || undefined,
            num_uncontested_all: {
              gte: _args.num_uncontested_all_gte,
              lte: _args.num_uncontested_all_lte 
            } || undefined,
            percent_uncontested_all: {
              gte: _args.percent_uncontested_all_gte,
              lte: _args.percent_uncontested_all_lte 
            } || undefined,
            num_elections_by: {
              gte: _args.num_elections_by_gte,
              lte: _args.num_elections_by_lte 
            } || undefined,
            num_contested_by: {
              gte: _args.num_contested_by_gte,
              lte: _args.num_contested_by_lte 
            } || undefined,
            percent_contested_by: {
              gte: _args.percent_contested_by_gte,
              lte: _args.percent_contested_by_lte 
            } || undefined,
            num_uncontested_by: {
              gte: _args.num_uncontested_by_gte,
              lte: _args.num_uncontested_by_lte 
            } || undefined,
            percent_uncontested_by: {
              gte: _args.percent_uncontested_by_gte,
              lte: _args.percent_uncontested_by_lte 
            } || undefined,
            num_elections_general: {
              gte: _args.num_elections_general_gte,
              lte: _args.num_elections_general_lte 
            } || undefined,
            num_contested_general: {
              gte: _args.num_contested_general_gte,
              lte: _args.num_contested_general_lte 
            } || undefined,
            percent_contested_general: {
              gte: _args.percent_contested_general_gte,
              lte: _args.percent_contested_general_lte 
            } || undefined,
            num_uncontested_general: {
              gte: _args.num_uncontested_general_gte,
              lte: _args.num_uncontested_general_lte 
            } || undefined,
            percent_uncontested_general: {
              gte: _args.percent_uncontested_general_gte,
              lte: _args.percent_uncontested_general_lte 
            } || undefined,
          }
        })
      },
    })

    t.nonNull.list.nonNull.field('voter', {
      type: Voter,
      args: {
        forename: stringArg(),
        surname: stringArg(),
        occupation: stringArg(),
        guild: stringArg(),
        // election_id:  stringArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.voters.findMany({
          where: {  
            forename: args.forename || undefined,
            surname: args.surname || undefined,
            occupation: args.occupation || undefined,
            guild: args.guild || undefined
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('vote', {
      type: Vote,
      args: {
        page: intArg(),
        line: intArg(),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.votes.findMany({
          where: {
            page: args.page || undefined,
            line: args.line || undefined
          }
        })
      },
    })

    t.nonNull.list.nonNull.field('voters_occupations', {
      type: VotersOccupations,
      args: {
        occupation: stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.voters_occupations.findMany({
          where: {
            occupation: {
              contains:  _args.occupation
             } || undefined,
          }
        })
      },
    })


    t.nonNull.list.nonNull.field('occupations_group', {
      type: OccupationsMap,
      args: {
        occupation: stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.occupations_map.findMany({
          where: {
            level_name: {
              contains:  _args.occupation
             } || undefined,
          }
        })
      },
    })

    
    
  },
})

const Artefact = objectType({
  name: 'artefact',
  definition(t) {
    t.nonNull.int('id')
    t.string('filename')
    t.string('display_name')
    t.string('description')
    t.string('artefact_type')
    t.list.field('artefact_attributes', {
      type: ArtefactAttributes,
      resolve: (parent, _, context: Context) => {
        return context.prisma.artefact_attributes.findMany({
          where: { artefact_id: parent.id || undefined }})
        },
    })
  },
})

const ArtefactAttributes = objectType({
  name: 'artefact_attributes',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.int('artefact_id')
    t.string('attribute_name')
    t.string('attribute_value')
    t.list.field('artefact', {
      type: Artefact,
      resolve: (parent, _, context: Context) => {
        return context.prisma.artefacts.findMany({
          where: { id: parent.artefact_id || undefined }})
        },
    })
  },
})

const Candidate = objectType({
  name: 'candidate',
  definition(t) {
    t.nonNull.int('candidate_id')
    t.string('candidate_name')
    t.string('title')
    t.string('suffix')
    t.string('short_name')
    t.int('born')
    t.int('died')
    t.list.field('candidates_elections', {
      type: CandidatesElection,
      args: {
        returned: intArg(),
        seated: intArg()
      },
      resolve: (parent, _args, context: Context) => {
        return context.prisma.candidates_elections.findMany({
          where: { 
            candidate_id: parent.candidate_id || undefined,
            returned: {
              equals: _args.returned
            } || undefined,
            seated: {
              equals: _args.seated
            } || undefined
           }})
        },
    })
    t.list.field('votes', {
      type: Vote,
      resolve: (parent, _, context: Context) => {
        return context.prisma.votes.findMany({
          where: { candidate_id: parent.candidate_id || undefined }
        })
      },
    })
    
    // t.int('voteCount', {
    //   type: 'Int',
    //   resolve: (parent, _, context: Context) => {
    //     return context.prisma.votes.count({
    //       where: { candidate_id: parent.candidate_id || undefined }})
    //     },
    // })
  },
})

const CandidatesElection = objectType({
  name: 'candidatesElection',
  definition(t) {
    t.nonNull.string('election_id')
    t.nonNull.int('candidate_id')
    t.string('running_as')
    t.boolean('returned')
    t.string('overturned_by')
    t.boolean('seated')
    t.list.field('election', {
      type: Election,
      resolve: (parent, _, context: Context) => {
        return context.prisma.elections.findMany({
          where: { election_id: parent.election_id || undefined }})
        },
    })
    t.list.field('candidate', {
      type: Candidate,
      resolve: (parent, _, context: Context) => {
        return context.prisma.candidates.findMany({
          where: { candidate_id: parent.candidate_id || undefined }})
        },
    })
  },
})

const Constituencies = objectType({
  // TO DO:  return ID
  name: 'constituencies',
  definition(t) {
    t.nonNull.int('constituency_id')
    t.string('constituency')
    t.boolean('has_polling_data')
    t.float('lat')
    t.float('lng')
    t.list.field('elections', {
      type: Election,
      resolve: (parent, _, context: Context) => {
        return context.prisma.elections.findMany({
          where: { constituency_id: parent.constituency_id || undefined }
        })
      },
    })
    t.int('electionsCount', {
      type: 'Int',
      resolve: (parent, _, context: Context) => {
        return context.prisma.elections.count({
          where: { constituency_id: parent.constituency_id }})
        },
    })
    t.list.field('stats', {
      type: Stats,
      resolve: (parent, _, context: Context) => {
        return context.prisma.stats.findMany({
          where: { constituency_id: parent.constituency_id || undefined }
        })
      },
    })
  }
})

const ElectionDates = objectType({
  name: 'electionDates',
  definition(t) {
    t.nonNull.string('election_id')
    t.field('election_date', { type: 'DateTime' })
    t.list.field('election', {
      type: Election,
      resolve: (parent, _, context: Context) => {
        return context.prisma.elections.findMany({
          where: { election_id: parent.election_id || undefined }
        })
      },
    })
  },
})

const Election = objectType({
  name: 'election',
  definition(t) {
    t.string('election_id')
    t.string('election_year')
    t.string('election_month')
    t.date('election_date')
    t.string('constituency')
    t.string('office')
    t.string('electorate_size_est')
    t.string('electorate_size_desc')
    t.string('countyboroughuniv')
    t.string('franchise_detail')
    t.string('franchise_type')
    t.string('by_election_general')
    t.string('by_election_cause')
    t.string('contested')
    t.string('notes')
    t.string('latitude')
    t.string('longitude')
    // t.nonNull.string('election_id')
    // t.nonNull.string('pollbook_id')  
    t.list.field('candidates_elections', {
      type: CandidatesElection,
      resolve: (parent, _, context: Context) => {
        return context.prisma.candidates_elections.findMany({
          where: { election_id: parent.election_id || undefined }
        })
      },
    })
    t.list.field('poll_books', {
      type: PollBooks,
      resolve: (parent, _, context: Context) => {
        return context.prisma.poll_books.findMany({
          where: { ElectionCode: parent.election_id || undefined }
        })
      },
    })
    t.boolean('has_data', {
      resolve: async (parent, _, context: Context) => {
        const result = await context.prisma.$queryRaw(`SELECT EXISTS(SELECT * from ECPPEC.votes WHERE  election_id = "`+parent.election_id+`") as has_data`);
        return result[0].has_data;
      }
    })
  },
})

const Aggregate = objectType({
  name: 'aggregate',
  definition(t){
    t.int('count')
  },
})

const Locations = objectType({
  name: 'locations',
  definition(t) {
    t.string('constituency_id')
    t.string('constituency')
    t.float('lat')
    t.float('lng')
    t.list.field('constituencies', {
      type: Constituencies,
      resolve: (parent, _, context: Context) => {
        return context.prisma.elections.findMany({
          where: { constituency_id: parent.constituency_id || undefined }
        })
      },
    })
  },
})

const LocationsFrom = objectType({
  name: 'locations_from',
  definition(t) {
    t.string('constituency_id')
    t.string('constituency_name')
    t.float('lat')
    t.float('lng')
    t.float('distance')
    // t.list.field('constituencies', {
    //   type: Constituencies,
    //   resolve: (parent, _, context: Context) => {
    //     return context.prisma.elections.findMany({
    //       where: { constituency_id: parent.constituency_id || undefined }
    //     })
    //   },
    // })
  }
})

const PollBooks = objectType({
  name: 'poll_books',
  definition(t) {
    t.string('PollBookCode')
    t.string('PrintMS')
    t.string('Citation')
    t.string('Holdings')
    t.string('Source')
    t.string('ElectionCode')
    t.string('Notes')
  },
})

const Stats = objectType({
  name: 'stats',
  definition(t) {
    t.string('constituency_id')
    t.string('constituency')
    t.string('num_elections_all')
    t.int('num_contested_all')
    t.float('percent_contested_all')
    t.int('num_uncontested_all')
    t.float('percent_uncontested_all')
    t.int('num_elections_by')
    t.int('num_contested_by')
    t.float('percent_contested_by')
    t.int('num_uncontested_by')
    t.float('percent_uncontested_by')
    t.int('num_elections_general')
    t.int('num_contested_general')
    t.float('percent_contested_general')
    t.int('num_uncontested_general')
    t.float('percent_uncontested_general')
    t.list.field('constituencies', {
      type: Constituencies,
      resolve: (parent, _, context: Context) => {
        return context.prisma.elections.findMany({
          where: { constituency_id: parent.constituency_id || undefined }
        })
      },
    })
  }
})


const Voter = objectType({
  name: 'voter',
  definition(t) {
    t.string('forename')
    t.string('surname')
    t.string('suffix')
    t.string('suffix_ideal')
    t.string('title')
    t.string('class')
    t.string('occupation')
    t.string('occupation_ideal')
    t.list.field('occupations_level1', {
      type: OccupationsMap,
      resolve: (parent, _, context: Context) => {
        if (parent.occupations_level1!=null){
          return context.prisma.occupations_map.findMany({
            where: { level_code: parent.occupations_level1  }})
        }else{
          return null
        }  
      }
    })
    t.list.field('occupations_level2', {
      type: OccupationsMap,
      resolve: (parent, _, context: Context) => {
        if (parent.occupations_level1!=null){
          return context.prisma.occupations_map.findMany({
            where: { level_code: parent.occupations_level2  }})
        }else{
          return null
        }  
      },
    })
    t.string('guild')
    t.string('street')
    t.string('city')
    t.string('county')
    t.string('parish')
    t.string('abode')
    t.string('abode_std')
    t.string('notes')
    t.list.field('vote', {
      type: Vote,
      resolve: (parent, _, context: Context) => {
        return context.prisma.votes.findMany({
          where: { voter_id: parent.voter_id || undefined }})
        },
    })
  },
})

const Vote = objectType({
  name: 'vote',
  definition(t) {

    t.list.field('voter', {
      type: Voter,
      args: {
        forename: stringArg(),
        surname: stringArg(),
        occupation: stringArg(),
        guild: stringArg(),
      },
      resolve: (parent, args, context: Context) => {
        return context.prisma.voters.findMany({
          where: {  
            forename: args.forename || undefined,
            surname: args.surname || undefined,
            occupation: args.occupation || undefined,
            guild: args.guild || undefined,
            voter_id: parent.voter_id 
          }
        })
      },
    })
    t.list.field('elections', {
      type: Election,
      resolve: (parent, args, context: Context) => {
        return context.prisma.elections.findMany({
          where: {  
            election_id: parent.election_id
          }
        })
      },
    })
    t.list.field('poll_books', {
      type: PollBooks,
      resolve: (parent, args, context: Context) => {
        return context.prisma.poll_books.findMany({
          where: {  
            pollbook_id: parent.pollbook_id
          }
        })
      }
    })
    t.list.field('constituencies', {
      type: Constituencies,
      args: {
      },
      resolve: (parent, args, context: Context) => {
        return context.prisma.constituencies.findMany({
          where: {  
            constituency_id: parent.constituency_id
          }
        })
      },
    })
    t.int('page')
    t.int('line')
    t.list.field('candidate', {
      type: Candidate,
      resolve: (parent, _, context: Context) => {
        return context.prisma.candidates.findMany({
          where: { candidate_id: parent.candidate_id || undefined }})
        },
    })
    t.string('poll_date')
  },
})

const OccupationsMap = objectType({
  name: 'occupations_map',
  definition(t) {
    t.int('level_num')
    t.string('level_code')
    t.string('level_name')
    t.list.field('voters', {
      type: Voter,
      resolve: (parent, _, context: Context) => {
        if (parent.level_num==1){
          return context.prisma.voters.findMany({
            where: { occupations_level1: parent.level_code || undefined }})
        }else{
          return context.prisma.voters.findMany({
            where: { occupations_level2: parent.level_code || undefined }})
        }
        },
    })
  },
})

const VotersOccupations = objectType({
  name: 'voters_occupations',
  definition(t) {
    t.string('voter_id')
    t.string('occupation')
    t.list.field('voters', {
      type: Voter,
      resolve: (parent, _, context: Context) => {
        return context.prisma.voters.findMany({
          where: { voter_id: parent.voter_id || undefined }})
        },
    })
    t.list.field('level1', {
      type: OccupationsMap,
      resolve: (parent, _, context: Context) => {
        return context.prisma.occupations_map.findMany({
          where: { level_code: parent.level1 || undefined }})
        },
    })
    t.list.field('level2', {
      type: OccupationsMap,
      resolve: (parent, _, context: Context) => {
        return context.prisma.occupations_map.findMany({
          where: { level_code: parent.level2 || undefined }})
        },
    })
    // t.string('level3')
    // t.string('level4')
    // t.list.field('level3_occupation', {
    //   type: OccupationsMap,
    //   resolve: (parent, _, context: Context) => {
    //     return context.prisma.occupations_map.findMany({
    //       where: { level_code: parent.level3 || undefined }})
    //     },
    // })
    // t.list.field('level4_occupation', {
    //   type: OccupationsMap,
    //   resolve: (parent, _, context: Context) => {
    //     return context.prisma.occupations_map.findMany({
    //       where: { level_code: parent.level4 || undefined }})
    //     },
    // })
  },
})

const LocationType = enumType({
  name: 'LocationType',
  members: ['borough', 'county'],
})

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

const OrderByDate = inputObjectType({
  name: 'OrderByDate',
  definition(t) {
    t.nonNull.field('election_date', { type: 'SortOrder' })
  },
})

const GroupCategory = enumType({
  name: 'GroupCategory',
  members: ['election_year', 'election_month','constituency','countyboroughuniv', 'franchise_type','by_election_general','by_election_cause','contested'],
})

export const schema = makeSchema({
  types: [
    Query,
    DateTime,
    SortOrder,
    OrderByDate,
    // groupings
    Aggregate,
    GroupCategory,
    // ElectionGroupBy,
    // tables
    Artefact,
    Candidate,
    CandidatesElection,
    Constituencies,
    ElectionDates,
    Election,
    Locations,
    LocationsFrom,
    LocationType,
    PollBooks,
    Stats,
    Voter,
    Vote, 
    VotersOccupations, 
    OccupationsMap
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})