export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  try {
    const query = await model.findOne({ _id: id, createdBy: userId }).exec()

    if (!query) return res.status(400).end()

    res.status(200).json({ data: query })
  } catch (err) {
    res.status(400).end()
  }
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id

  try {
    const query = await model.find({ createdBy: userId }).exec()

    res.status(200).json({ data: query })
  } catch (err) {
    res.status(400).end()
  }
}

export const createOne = model => async (req, res) => {
  const userId = req.user._id
  const body = req.body

  try {
    const query = await model.create({ ...body, createdBy: userId })
    res.status(201).json({ data: query })
  } catch (err) {
    res.status(400).end()
  }
}

export const updateOne = model => async (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  const body = req.body

  const query = await model.findOneAndUpdate(
    { _id: id, createdBy: userId },
    body,
    { new: true }
  )

  if (!query) return res.status(400).end()

  res.status(200).json({ data: query })
}

export const removeOne = model => async (req, res) => {}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
