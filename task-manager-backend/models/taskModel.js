class Task {
    constructor({ title, description, dueDate = null, priority = 'normal', createdAt = new Date() }) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.createdAt = createdAt;
    }
  
    // Méthode pour convertir l'objet Task en format compatible avec Firestore
    toFirestore() {
      return {
        title: this.title,
        description: this.description,
        dueDate: this.dueDate,
        priority: this.priority,
        createdAt: this.createdAt,
      };
    }
  
    // Méthode statique pour créer une instance de Task à partir d'un document Firestore
    static fromFirestore(doc) {
      const data = doc.data();
      return new Task({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        createdAt: data.createdAt.toDate() // Convertir Firestore Timestamp en Date
      });
    }
  }
  
  module.exports = Task;
  