import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

<<<<<<< Updated upstream
// /api/item
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

||||||| merged common ancestors
=======
// router for /api/item
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne)

// router for /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .post()

>>>>>>> Stashed changes
export default router
