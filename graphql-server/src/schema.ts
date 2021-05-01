import { intArg, makeSchema, nonNull, objectType, stringArg, inputObjectType, arg, list,
    asNexusMethod, enumType, } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('candidates', {
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

    t.nonNull.list.nonNull.field('elections', {
      type: Election,
      args: {
        election_year: stringArg(),
        contested: stringArg(),
        // election_id:  stringArg(),
      },
      resolve: (_parent, _args, context: Context) => {
        return context.prisma.elections.findMany({
          where: {  
            election_year: _args.election_year || undefined ,
            contested: _args.contested || undefined 
          },
          // where: { election_id: _args.election_id || undefined },
        })
      },
    })
  },
})

const Candidate = objectType({
  name: 'Candidate',
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
  },
})

const CandidatesElection = objectType({
  name: 'candidates_elections',
  definition(t) {
    t.nonNull.string('election_id')
    t.nonNull.int('candidate_id')
    t.string('running_as')
    t.list.field('elections', {
      type: Election,
      resolve: (parent, _, context: Context) => {
        return context.prisma.elections.findMany({
          where: { election_id: parent.election_id || undefined }})
        },
    })
  },
})


const Election = objectType({
  name: 'elections',
  definition(t) {
    t.string('election_year')
    t.string('election_month')
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
    t.nonNull.string('election_id')
    t.nonNull.string('pollbook_id')  
    t.list.field('candidates_elections', {
      type: CandidatesElection,
      resolve: (parent, _, context: Context) => {
        return context.prisma.candidates_elections.findMany({
          where: { election_id: parent.election_id || undefined }})
        },
    })
  },
})

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})


export const schema = makeSchema({
  types: [
    Query,
    Candidate,
    CandidatesElection,
    Election,
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