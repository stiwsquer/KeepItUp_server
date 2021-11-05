const {
  getAllExercises,
  saveExercise,
  getExercisesByName,
} = require('../service/exerciseService');

const { app, authenticateToken } = require('../loaders/loaders');

app.get('/exercise', authenticateToken, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const exercises = await getAllExercises();
    return res.send(exercises);
  } catch (err) {
    return res.sendStatus(404);
  }
});

app.get('/exercise/name/:name', authenticateToken, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { name } = req.params;
    const exercises = await getExercisesByName(name);
    return res.send(exercises);
  } catch (err) {
    return res.sendStatus(404);
  }
});

app.post('/exercise', authenticateToken, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  req.body.coachId = req.user.id;
  //   req.body.coachId = null;
  console.log(req.body);
  try {
    const response = await saveExercise(req.body);
    return res.send(response);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});
