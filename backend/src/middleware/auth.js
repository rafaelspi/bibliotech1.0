const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

module.exports = async function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  
  // BYPASS TEMPORÁRIO PARA DESENVOLVIMENTO
  // Como o frontend ainda não tem tela de Login, vamos criar/usar um usuário padrão
  if (!token) {
    try {
      let user = await prisma.user.findFirst();
      if (!user) {
        user = await prisma.user.create({
          data: { email: 'dev@test.com', password: '123', name: 'Dev User' }
        });
      }
      req.user = { sub: user.id };
      return next();
    } catch (err) {
      console.error("Erro no bypass de auth:", err);
      return res.status(401).json({ error: 'Token ausente e falha no bypass' });
    }
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};
