import { core, intArg, makeSchema, nonNull, objectType, stringArg, inputObjectType, arg, list,
    asNexusMethod, enumType,} from 'nexus'
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
        artefact_name: stringArg(),
        artefact_type: stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.artefacts.findMany({
          where: { 
            artefact_name: _args.artefact_name || undefined,
            artefact_type: _args.artefact_type || undefined 
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('candidate', {
      type: Candidate,
      args: {
        candidate_id: intArg(),
        candidate_name: stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.candidates.findMany({
          where: { 
            candidate_id: _args.candidate_id || undefined,
            candidate_name: _args.candidate_name || undefined 
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('candidates_elections', {
      type: CandidatesElection,
      args: {
        candidate_id: intArg(),
        election_id:  stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.candidates_elections.findMany({
          where: {  
            candidate_id: _args.candidate_id || undefined,
            election_id: _args.election_id || undefined 
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('election_dates', {
      type: ElectionDates,
      args: {
        election_year: stringArg(),
        orderBy: arg({
          type: 'OrderByDate',
        }),
      },
      resolve: (_parent, args, context: Context) => {
        return context.prisma.election_dates.findMany({
          orderBy: args.orderBy || undefined,
        })
      },
    })

    t.nonNull.list.nonNull.field('election', {
      type: Election,
      args: {
        election_start_year: stringArg({default:"0000"}),
        election_end_year: stringArg({default:"9999"}),
        contested: stringArg(),
        // election_id:  stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.elections.findMany({
          where: {  
            election_date: {
              gte: new Date(_args.election_start_year+'-01-01T00:00:00'),
              lte: new Date(_args.election_end_year+'-12-31T00:00:00') 
             } || undefined,
            contested: _args.contested || undefined 
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('election_group_by', {
      type: ElectionGroupBy,
      args: {
        groupBy: list( GroupCategory),
      },
      resolve: (_parent, args, context: Context) => {
        const election_count = context.prisma.elections.groupBy({
          by: args.groupBy,
          count: {
            election_year: true,
          },
          
          // orderBy: {
          //   election_year: 'asc',
          // },
        })
        return election_count;
      },
    })

    t.nonNull.list.nonNull.field('location', {
      type: Locations,
      args: {
        searchString: stringArg(),
        location_type: arg({
          type: 'LocationType',
        }),
      },
      resolve: (_parent, args, context: Context) => {
        const or = args.searchString
        ? {
          OR: [
            { name_short: { contains: args.searchString } },
            { name_long: { contains: args.searchString } },
          ],
        }
        : {}

        return context.prisma.locations.findMany({
          where: {
            location_type: args.location_type || undefined,
            ...or,
          },
        })
      },
    })

    t.nonNull.list.nonNull.field('poll_book', {
      type: PollBooks,
      args: {
        election_year: stringArg(),
        contested: stringArg(),
        // election_id:  stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.poll_books.findMany({})
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
      resolve: (_parent, args, context: Context) => {
        return context.prisma.voters.findMany({})
      },
    })
    
  },
})

const Artefact = objectType({
  name: 'artefact',
  definition(t) {
    t.string('election_id')
    t.string('artefact_name')
    t.string('artefact_type')
    t.string('artefact_link')
    t.list.field('elections', {
      type: Election,
      resolve: (parent, _, context: Context) => {
        return context.prisma.elections.findMany({
          where: { election_id: parent.election_id || undefined }})
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
    t.string('short_name')
    t.list.field('candidates_elections', {
      type: CandidatesElection,
      resolve: (parent, _, context: Context) => {
        return context.prisma.candidates_elections.findMany({
          where: { candidate_id: parent.candidate_id || undefined }})
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
    t.int('voteCount', {
      type: 'Int',
      resolve: (parent, _, context: Context) => {
        return context.prisma.votes.count({
          where: { candidate_id: parent.candidate_id || undefined }})
        },
    })
  },
})

const CandidatesElection = objectType({
  name: 'candidatesElection',
  definition(t) {
    t.nonNull.string('election_id')
    t.nonNull.int('candidate_id')
    t.string('running_as')
    t.boolean('is_winner')
    t.string('overturned_by')
    t.boolean('ultimate_winner')
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
    t.string('election_year')
    t.string('election_month')
    t.date('election_date')
    t.string('constituency')
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
  },
})

const ElectionGroupBy = objectType({
  name: 'election_group_by',
  definition(t) {
    t.int('id')
    t.int('election_year')
    t.string('election_month')
    t.string('constituency')
    t.string('countyboroughuniv')
    t.string('franchise_type')
    t.string('by_election_general')
    t.string('by_election_cause')
    t.string('contested')
    t.field('value',{
      type: Aggregate,
      resolve: (parent, _, context: Context) => {
        return {
          count:parent.count.election_year
        };
        },
    })
  }
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
    t.string('name_short')
    t.string('name_long')
    t.string('location_type')
    t.float('lat')
    t.float('lng')
  },
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

const Voter = objectType({
  name: 'voter',
  definition(t) {
    t.string('forename')
    t.string('surname')
    t.string('suffix')
    t.string('title')
    t.string('class')
    t.string('occupation')
    t.string('guild')
    t.string('street')
    t.string('city')
    t.string('county')
    t.string('parish')
    t.string('abode')
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
    t.string('page')
    t.string('line')
    t.list.field('candidate', {
      type: Candidate,
      resolve: (parent, _, context: Context) => {
        return context.prisma.candidates.findMany({
          where: { candidate_id: parent.candidate_id || undefined }})
        },
    })
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
    ElectionGroupBy,
    // tables
    Artefact,
    Candidate,
    CandidatesElection,
    ElectionDates,
    Election,
    Locations,
    LocationType,
    PollBooks,
    Voter,
    Vote,
    
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