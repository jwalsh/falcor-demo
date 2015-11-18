var log = console.log.bind(console);

var $ref = falcor.ref;

var model = new falcor.Model(
  {
    cache: {
   'genreLists': {
        '0': $ref('genresById[123]'),
        '1': $ref('genresById[522]'),
        'length': 2
    },
    // map of all genres, organized by ID
    'genresById': {
        // genre list modeled as map with ordinal keys
        '123': {
            'name': 'Drama',
            '0': $ref('titlesById[23]'),
            '1': $ref('titlesById[99]'),
            'length': 2
        },
        // genre list modeled as map with ordinal keys
        '522': {
            'name': 'Comedy',
            '0': $ref('titlesById[23]'),
            '1': $ref('titlesById[44]'),
            'length': 2
        }
    },
    // map of all titles, organized by ID
    'titlesById': {
       '99': {
            'name': 'House of Cards',
            'rating': 5
        },
        '23': {
            'name': 'Orange is the New Black',
            'rating': 5
        },
        '44': {
            'name': 'Arrested Development',
            'rating': 5
        },
        '1': {
          name: 'Die Hard',
          subtitles: { $type: 'atom', value: ['en', 'fr'] }
        }
      },
      todos: [
        {
          name: 'get milk from corner store',
          done: false
        }
      ]
  },

    source: new falcor.HttpDataSource('/model.json')
  });

// retrieve the "greeting" key from the root of the Virtual JSON resource
model.
  get('greeting').
  then(function(response) {
    document
      .getElementById('greeting')
      .innerHTML = response.json.greeting;
  });

model
  .get('food')
  .then(log);

var renderMovie = function(a, b, c, d) {
  console.log(a, b, c, d);
  document
    .getElementById('movies')
    .innerHTML = JSON.stringify(a);
};

model
  .getValue(['titlesById'])
  .then(renderMovie)
  .then(log);

model.set({
  paths: [
    ['todos', [12, 15], ['name', 'done']]
  ],
  jsonGraph: {
    todos: [
      $ref('todosById[12]'),
      $ref('todosById[15]')
    ],
    todosById: {
      12: {
        name: 'go to the ATM',
        done: false
      },
      15: {
        name: 'buy milk',
        done: false
      }
    }
  }
}).then(function(jsonEnvelope) {
  console.log(JSON.stringify(jsonEnvelope, null, 4));
});
