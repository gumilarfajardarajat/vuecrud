data = [
    {
      id: 1,
      token: '123',
      name: 'name',
      contact: 'lorem ipsum',
    },
    {
        id: 1,
      token: '123',
      name: 'name',
      contact: 'lorem ipsum',
    },
    {
        id: 1,
      token: '123',
      name: 'name',
      contact: 'lorem ipsum',
    },
];



data[0].identity = {};
data[0].identity.name = data[0].name;
data[0].identity.contact = data[0].contact;

data[1].identity = {};
data[1].identity.name = data[1].name;
data[1].identity.contact = data[1].contact;

data[2].identity = {};
data[2].identity.name = data[2].name;
data[2].identity.contact = data[2].contact;


console.log(data[2]);



