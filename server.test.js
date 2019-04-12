const request = require("supertest");
const server = require("./server");

describe('test the seeded games server', () => {
  it('should respond with 200 and an array of games when we do GET /games', async () => {
    const res = await request(server).get('/games');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toEqual({
      id: 1,
      title: 'Morrowind', // required
      genre: 'RPG', // required
      releaseYear: 4567 // not required
    });
  });
});

describe('test getting by id with a valid id', () => {
  it('should respond with 200 and an one game when we do GET /games/valid', async () => {
    const res = await request(server).get('/games/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      title: 'Morrowind', // required
      genre: 'RPG', // required
      releaseYear: 4567 // not required
    });
  });
});

describe('test getting by id with an invalid id', () => {
  it('should respond with 404 when we do GET /games/invalid', async () => {
    const res = await request(server).get('/games/7');
    expect(res.status).toBe(404);
  });
});

describe('test deleting by id with an invalid id', () => {
  it('should respond with 404 when we do DELETE /games/invalid', async () => {
    const res = await request(server).delete('/games/7');
    expect(res.status).toBe(404);
  });
});

describe('test the empty games server', () => {
  it('should respond with 200 and an empty array when we do GET /games', async () => {
    const res = await request(server)
      .get('/emptygames');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});

describe('test adding a game without the required fields', () => {
  it('should respond with 422', async () => {
    const res = await request(server)
      .post('/games')
      .send(
        {
          title: 'Monopoly', // required
          genre: null, // required
          releaseYear: null // not required
        }
      );
    expect(res.status).toBe(422);
  });
});

describe('test adding a game without the required fields', () => {
  it('should respond with 422', async () => {
    const res = await request(server)
      .post('/games')
      .send(
        {
          title: null, // required
          genre: 'Board', // required
          releaseYear: null // not required
        }
      );
    expect(res.status).toBe(422);
  });
});

describe('test adding a game with the required fields', () => {
  it('should respond with 201 and the correct object', async () => {
    const res = await request(server)
      .post('/games')
      .send(
        {
          title: 'Monopoly', // required
          genre: 'Board', // required
          releaseYear: 1234 // not required
        }
      );
    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      {
        id: 4,
        title: 'Monopoly',
        genre: 'Board',
        releaseYear: 1234
      }
    );
  });
});

describe('trying a duplicate title', () => {
  it('should respond with 405', async () => {
    const res = await request(server)
      .post('/games')
      .send(
        {
          title: "Morrowind", // required
          genre: 'Board', // required
          releaseYear: null // not required
        }
      );
    expect(res.status).toBe(405);
  });
});

describe('test deleting by id with a valid id', () => {
  it('should respond with 200 and an one game when we do DELETE /games/valid', async () => {
    const res = await request(server).delete('/games/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      title: 'Morrowind', // required
      genre: 'RPG', // required
      releaseYear: 4567 // not required
    });
  });
});