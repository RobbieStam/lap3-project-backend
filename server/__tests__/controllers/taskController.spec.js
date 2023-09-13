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
  afterAll(() => jest.resetAllMocks());

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

  it('returns status 500 when things go wrong', async () => {
    const errorMessage = 'Could not retrieve tasks'

    Task.getAll = mockSend.mockRejectedValue(new Error(errorMessage))

      await taskController.index(null, mockRes)
      expect(mockStatus).toHaveBeenCalledWith(500)
  })
  
  it('calls Task.create', async () => {
    const taskData = { id: 1, name: 'Wash Dishes', description: 'wash dishes after dinner', completed_at:'11:05PM-9/11/2023' }

    jest.spyOn(Task, 'create')
      .mockResolvedValue(new Task(taskData))

    const mockReq = { body: taskData}
    await taskController.create(mockReq, mockRes)
    expect(Task.create).toHaveBeenCalledTimes(1)
  })

  it('create returns a new task with a 201 status code', async () => {
    const taskData = { id: 1, name: 'Wash Dishes', description: 'wash dishes after dinner', completed_at:'11:05PM-9/11/2023' }

    jest.spyOn(Task, 'create')
      .mockResolvedValue(new Task(taskData))


    const mockReq = { body: taskData}
    await taskController.create(mockReq, mockRes)
    expect(mockStatus).toHaveBeenCalledWith(201)
    expect(mockJson).toHaveBeenCalledWith(new Task(taskData))
  })

})
