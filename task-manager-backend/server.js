/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importer le module cors
const db = require('./config/firebaseAdmin');

const app = express();

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost:5000',
  'http://192.168.1.104:5000', 
  'http://localhost:8100',
  'http://192.168.1.104:8100',
 'https://9348-105-154-160-140.ngrok-free.app'

];

// Options CORS
const corsOptions = {
  origin: (origin, callback) => {
    // Vérifie si l'origine est dans la liste des origines autorisées
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes autorisées
  credentials: true, // Autoriser les cookies et les en-têtes d'autorisation
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// POST /tasks - Create a new task
app.post('/tasks', async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  if (!title || !description) {
    return res.status(400).send('Title and description are required');
  }
  
  const newTask = {
    title,
    description,
    dueDate: dueDate || null,
    priority: priority || 'normal',
    createdAt: new Date(),
  };

  try {
    const taskRef = await db.collection('tasks').add(newTask);
    res.status(201).send({ id: taskRef.id, ...newTask });
  } catch (error) {
    res.status(500).send('Error creating task');
  }
});

// GET /tasks - Retrieve all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasksSnapshot = await db.collection('tasks').get();
    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send('Error retrieving tasks');
  }
});

// GET /tasks/:id - Retrieve a specific task by id
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const taskRef = db.collection('tasks').doc(id);
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      return res.status(404).send('Task not found');
    }

    res.status(200).send({ id: taskSnapshot.id, ...taskSnapshot.data() });
  } catch (error) {
    res.status(500).send('Error retrieving task');
  }
});

// PUT /tasks/:id - Update a specific task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, } = req.body;

  if (!title || !description) {
    return res.status(400).send('Title and description are required');
  }

  const updatedTask = { title, description };

  try {
    const taskRef = db.collection('tasks').doc(id);
    const taskSnapshot = await taskRef.get();

    if (!taskSnapshot.exists) {
      return res.status(404).send('Task not found');
    }

    await taskRef.update(updatedTask);
    res.status(200).send({ id, ...updatedTask });
  } catch (error) {
    res.status(500).send('Error updating task');
  }
});

// DELETE /tasks/:id - Delete a specific task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await db.collection('tasks').doc(id).delete();
    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



*/


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://192.168.1.104:5000', 
  'http://localhost:8100',
  'http://192.168.1.104:8100'
];

// Options CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
