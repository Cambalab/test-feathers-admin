module.exports = {
  services: [
    {
      delete: true,
      randomize: false,
      path: 'users',
      template: {
        email: 'test@test.com',
        password: 'password'
      }
    },
    {
      delete: true,
      count: 100,
      path: 'provincias',
      template: {
        nombre: '{{address.state}}',
      }
    }
  ]
};

