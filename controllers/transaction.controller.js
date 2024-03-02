const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllTransaction = async (req, res) => {
  try {
    const transaction = await prisma.transaction.findMany();
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId: req.params.id
      },
      include: {
        user: true,
        product: true
      }
    })
    if (!transaction) return res.status(404).json({ msg: 'Transaction tidak ditemukan!' });
    res.status(200).json(transaction);
  }catch (error) {
    res.status(500).json({error: error.message});
  }
}

