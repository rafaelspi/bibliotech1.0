const router = require('express').Router();
const prisma = require('../prisma');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res, next) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.user.sub },
      orderBy: { createdAt: 'desc' },
    });
    res.json(books);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const book = await prisma.book.create({ data: { ...req.body, userId: req.user.sub } });
    res.status(201).json(book);
  } catch (e) { next(e); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const book = await prisma.book.updateMany({
      where: { id: req.params.id, userId: req.user.sub },
      data: req.body,
    });
    if (!book.count) return res.status(404).json({ error: 'Não encontrado' });
    res.json(await prisma.book.findUnique({ where: { id: req.params.id } }));
  } catch (e) { next(e); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const r = await prisma.book.deleteMany({ where: { id: req.params.id, userId: req.user.sub } });
    if (!r.count) return res.status(404).json({ error: 'Não encontrado' });
    res.status(204).send();
  } catch (e) { next(e); }
});

module.exports = router;
