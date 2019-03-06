require('seneca')()
  .use('math')
  .act('role:math,cmd:sum,left:1,right:2', console.log)