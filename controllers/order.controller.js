const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllOrder = async (req, res) => {
  try {
    const order = await prisma.order.findMany({
      orderBy: {
        id: 'asc'
      }
    })
    res.status(200).json(order);
  }catch (error) {
    res.status(500).json({error: error.message});
  }
}

exports.getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        userId: req.params.id
      },
      include: {
        user: true,
        product: true
      }
    })
    if (!order) return res.status(404).json({ msg: 'Order tidak ditemukan!' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

exports.createOrder = async (req, res) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId: req.body.userId,
        productId: req.body.productId
      }
    })
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const order = await prisma.order.delete({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}