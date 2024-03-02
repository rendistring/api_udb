const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const client = require('../services/platformClientAPI.js');

const SignIn = async (req, res) => {
  const auth = req.body.authResult;

  try {
    await client.get(`v2/me`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    
  let currentUser = await prisma.users.findFirst({
    where: {
      uid: auth.user.uid,
    },
  });

  if (currentUser) {
    await prisma.users.update(
      {
        where: {
          id: currentUser.id,
        },
        data: {
          accessToken: auth.accessToken,
        }
      }
    );
  } else {
    const insertResult = await prisma.users.create({
      username: auth.user.username,
      uid: auth.user.uid,
      roles: auth.user.roles,
      accessToken: auth.accessToken,
    });

    currentUser = await prisma.users.findUnique(insertResult.insertedId);
  }

  req.session.currentUser = currentUser;

  return res.status(200).json({ message: 'User signed in' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'sign in failed Invalid access token',
    });
  }

};

const SignOut = async (req, res) => {
  req.session.currentUser = null;
  res.status(200).json({
    message: 'user sign out success',
  });
};

const getAllUser = async (req, res) => {
  const users = await prisma.users.findMany({
    orderBy: {
      id: 'asc'
    }
  })
  res.status(200).json(users);
}

module.exports = {
  SignIn,
  SignOut,
  getAllUser
};
