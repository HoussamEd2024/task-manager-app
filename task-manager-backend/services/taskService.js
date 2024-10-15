const db = require('../config/firebaseAdmin');

exports.createTask = async (taskData) => {
  const newTask = {
    ...taskData,
    createdAt: new Date(),
    priority: taskData.priority || 'normal'
  };

  const taskRef = await db.collection('tasks').add(newTask);
  return { id: taskRef.id, ...newTask };
};

exports.getAllTasks = async () => {
  const tasksSnapshot = await db.collection('tasks').get();
  return tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

exports.getTaskById = async (id) => {
  const taskRef = db.collection('tasks').doc(id);
  const taskSnapshot = await taskRef.get();

  if (!taskSnapshot.exists) {
    return null;
  }

  return { id: taskSnapshot.id, ...taskSnapshot.data() };
};

exports.updateTask = async (id, updatedData) => {
  const taskRef = db.collection('tasks').doc(id);
  await taskRef.update(updatedData);
  return { id, ...updatedData };
};

exports.deleteTask = async (id) => {
  const taskRef = db.collection('tasks').doc(id);
  await taskRef.delete();
};
