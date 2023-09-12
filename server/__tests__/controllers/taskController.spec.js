const taskController = require('../../controllers/taskController')
const Task = require('../../models/Task')

const mockSend = jest.fn()
const mockJson = jest.fn()

const mockStatus = jest.fn(code => ({
  send: mockSend, json: mockJson, end: jest.fn()
}))

const mockRes = { status: mockStatus }

describe('task controller', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns tasks with status 200', async () => {
    const taskData = { id: 1, name: 'Wash Dishes', description: 'wash dishes after dinner', completed_at:'11:05PM-9/11/2023' }

    jest.spyOn(Task, 'getAll')
      .mockResolvedValue(taskData)

      await taskController.index(null, mockRes)
      expect(mockStatus).toHaveBeenCalledWith(200)
  })

  it('calls Task.getAll', async () => {
    const taskData = { id: 1, name: 'Wash Dishes', description: 'wash dishes after dinner', completed_at:'11:05PM-9/11/2023' }

    jest.spyOn(Task, 'getAll')
      .mockResolvedValue(taskData)
    
    await taskController.index(null, mockRes)
    expect(Task.getAll).toHaveBeenCalledTimes(1)
  })

})
