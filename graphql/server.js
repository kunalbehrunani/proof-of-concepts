const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP
const { GraphQLSchema, GraphQLObjectType , GraphQLString , GraphQLList, GraphQLInt , GraphQLNonNull} = require('graphql');

const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const booksDB = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

const app = express();

const BookType = new GraphQLObjectType({
    name : 'book' , 
    description : 'This represents a book written by author', 
    fields : ()=>({
        id : {type : GraphQLNonNull(GraphQLInt) } , 
        name : {type : GraphQLNonNull (GraphQLString)} ,
        authodId : {type : GraphQLNonNull(GraphQLInt)}
    })
})

const RootQueryType = new GraphQLObjectType({
    name : 'Query', 
    description : 'Root Query' , 
    fields : ()=>({
        books : {
            type : new GraphQLList(BookType),
            description : 'List of books' , 
            resolve : ()=> booksDB
        }
    })
});

const schema = new GraphQLSchema({
    query : RootQueryType
})


/*
const schema = new GraphQLSchema({
    //query section determines just how many use cases we can use for querying
    query : new GraphQLObjectType({
        name: 'helloWorld' , 
        fields : ()=>({
            message : { 
                type : GraphQLString,
                resolve : ()=>'HelloKunal' 
            }
        })
    })
})
*/

app.use('/graphql' , expressGraphQL({
    schema : schema,
    graphiql : true
}) )

app.listen(5000 , ()=>{
    console.log('server message : server listening on port 5000');
});