const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();


exports.getAllCategories = async (req, res) => {

  try {
    const category = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    if (!category) {
      return res.status(404).json({ msg: 'Category tidak ditemukan!' });
    }

    res.status(200).json({
      category
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saat mencari kategori');
  }
}


exports.getCategoryByid = async (req, res) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: req.params.id
      },
      include: {
        products: true
      }
    })
    if (!category) return res.status(404).json({ msg: 'Category tidak ditemukan!' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

exports.createCategory = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({message: 'Tidak ada file yang diunggah!'});
  }

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = Date.now() + ext;
  const url = `${req.protocol}://${req.get('host')}/category/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) {
    res.status(422).json({ msg: 'Invalid Images' });
  }

  if (fileSize > 2000000) {
    res.status(422).json({ msg: 'Image harus kurang dari 2mb' });
  }

  file.mv(`./public/category/${fileName}`, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }
    
    try {
      await prisma.category.create({
        data: {
          img: fileName,
          img_url: url,
          ...req.body
        }
      });
      res.status(201).json({ msg: 'Categories berhasil ditambahkan!' });
    } catch (error) {
      console.log(error.message);
    }
  });
}

exports.updateCategory = async (req, res) => {
  const category = await prisma.category.findFirst({
    where: {
      id: req.params.id,
    },
  });
  if (!category) return res.sendStatus(404).json({ msg: 'Category tidak ditemukan!' });
  let fileName = '';
  if (req.files === null) {
    fileName = product.img;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + Date.now() + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) {
      res.status(422).json({ msg: 'Invalid Images' });
    }

    if (fileSize > 2000000)
      res.status(422).json({ msg: 'Image harus kurang dari 2mb' });

      const filePath = `./public/category/${category.img}`;
      fs.unlinkSync(filePath);

      file.mv(`./public/category/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }
    const url = `${req.protocol}://${req.get('host')}/category/${fileName}`;
    try {
      await prisma.category.update(
        {
          where: {
            id: req.params.id,
          },
          data: {
            img: fileName,
            img_url: url,
            ...req.body
          }
        }
      );
      res.status(200).json({ msg: 'Category berhasil diupdate!' });
    }
    catch (error) {
      res.status(400).json({ msg: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
  const category = await prisma.category.findFirst({
    where: {
      id: req.params.id,
    },
  });
  if (!category) return res.sendStatus(404).json({ msg: 'Category tidak ditemukan!' });
  try {
    const filePath = `./public/category/${category.img}`;
    fs.unlinkSync(filePath);
    await prisma.category.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Category berhasil dihapus!' });
  } catch (error) {
    res.status(400).json({ msg: "Gagal delete product" });
  }
}