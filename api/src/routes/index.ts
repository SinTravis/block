import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { Database } from '@blocklet/sdk';

const db = new Database('demo.db');

const router = Router();

router.use('/user', middleware.user(), (req, res) => {
  return res.json(req.user || {});
});

router.use('/users', async (_req, res) => {
  try {
    let users = await db.find({});
    if (!users.length) {
      await db.insert({
        email: 're_return_0@proton.me',
        username: 'T',
        tel: '12112131475',
        something:
          "I want to write something here, but I don't know what to write, so I'm writing this nonsense to fill the space. Next is still some nonsense, to fill in more content.",
      });
    }
    users = await db.find({});
    return res.json(users);
  } catch (error) {
    return error;
  }
});

router.put('/update', async (req, res) => {
  try {
    const data = req.body;
    await db.update({ _id: data._id }, data);
    return res.json({ message: 'Data updated successfully!', data });
  } catch (error) {
    return error;
  }
});

export default router;
