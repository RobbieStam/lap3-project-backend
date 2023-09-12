const db = require('../database/connect')

class Task {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.mood = data.mood
    this.completed_at = data.completed_at
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM tasks');
    if (response.rows.length === 0) {
        throw new Error("No tasks available.")
    }
    return response.rows.map(t => new Task(t));
  }

  static async create(data) {
    const{name, description, mood, completed_at} = data;   
    const response = await db.query('INSERT INTO tasks (name, description, mood, completed_at) VALUES ($1, $2, $3, $4) RETURNING *;', [name, description, mood, completed_at]);

    return response.rows.map(t => new Task(t))
  }
}

module.exports = Task
