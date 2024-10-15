const taskService = require('../services/taskService');

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  
  if (!title || !description) {
    return res.status(400).send('Title and description are required');
  }

  try {
    const newTask = await taskService.createTask({ title, description, dueDate, priority });
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send('Error creating task');
  }
};

// Obtenir toutes les tâches
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send('Error retrieving tasks');
  }
};

// Obtenir une tâche par ID
exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskService.getTaskById(id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send('Error retrieving task');
  }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description ,dueDate, priority} = req.body;

  if (!title || !description) {
    return res.status(400).send('Title and description are required');
  }

  try {
    const updatedTask = await taskService.updateTask(id, { title, description,dueDate, priority });
    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(500).send('Error updating task');
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await taskService.deleteTask(id);
    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
};
