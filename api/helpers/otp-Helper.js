module.exports={
    friendlyName:'Format welcome message',
    description: 'Return a personalized greeting based on the provided name.',
    inputs: {

        name: {
          type: 'number',
          example: 10,
          description: 'The name of the person to greet.',
          defaultsTo:1
          
        }
    
      },
    
    
      fn: async function (inputs, exits) {
        var result = `Hello, ${inputs.name}!`;
        return exits.success(result);
      }
}