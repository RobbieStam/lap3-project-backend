const db = require('../database/connect')

class Task {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.completed_at = data.completed_at
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM tasks');
    if (response.rows.length === 0) {
        throw new Error("No tasks available.")
    }
    return response.rows.map(t => new Task(t));
  }
  
}

module.exports = Task
