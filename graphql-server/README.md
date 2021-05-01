## Getting started

Install npm dependencies:

```
cd graphgl-server
npm install
```


### Check Prisma install

You can now invoke the Prisma CLI by prefixing it with npx:

```
npx prisma
```

### Connect your database

The DB url is set via an environment variable which is defined in .env:  

```
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```
As an example, for a MySQL database hosted on AWS RDS, the connection URL might look similar to this:

```
DATABASE_URL = 'mysql://johndoe:XXX@mysql–instance1.123456789012.us-east-1.rds.amazonaws.com:3306/mydb'
```

See [https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-typescript-mysql](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-typescript-mysql)

### Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).


### Introspect your database with Prisma

Run the following command to introspect your database:

```
npx prisma introspect
```

This commands reads the DATABASE_URL environment variable that's defined in .env and connects to your database. Once the connection is established, it introspects the database (i.e. it reads the database schema). It then translates the database schema from SQL into a Prisma data model.  

After the introspection is complete, your Prisma schema file was updated: (prisma/schema.prisma)


### Install and generate Prisma Client

The .prisma\client folder contains your generated Prisma client, and is modified each time you change the schema and run the following command:

```
npx prisma generate
```
