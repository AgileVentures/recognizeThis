var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()

var senecaWebConfig = {
      context: context,
      adapter: require('seneca-web-adapter-express'),
      options: { parseBody: false } // so we can use json body-parser
}

var app = Express()
      .use( require('body-parser').json() )
      .use( context )
      .listen(3000)

var seneca = require( 'seneca' )()
      .use('entity')
      .use(SenecaWeb, senecaWebConfig )
      .use( 'api-all' )
      .client( { type:'tcp', pin:'role:math' } )
      .client( { port:9002,  pin:'role:shop' } )

// create a dummy product
seneca.act(
  'role:shop,add:product',{data:{name:'Apple',price:1.99}},
  console.log
)