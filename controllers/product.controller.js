const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {

  try {
    const product = await prisma.products.findMany();

    if (!product) {
      return res.status(404).json({ msg: 'Product tidak ditemukan!' });
    }
    res.status(200).json({
      data:product
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saat mencari produk');
  }
}

exports.getProductByCategory = async (req, res) => {
  try {
    const product = await prisma.products.findMany({
      where: {
        category: {
          name: req.params.category
        }
      }
    })
    if (!product) return res.status(404).json({ msg: 'Product tidak ditemukan!' });
    res.status(200).json(product);
  }catch (error) {
    res.status(500).json({error: error.message});
  }
}

exports.getProductByid = async (req, res) => {
  try {
    const product = await prisma.products.findFirst({
      where: {
        id: req.params.id
      }
    })
    if (!product) return res.status(404).json({ msg: 'Product tidak ditemukan!' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

exports.createProduct = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({message: 'Tidak ada file yang diunggah!'});
  }

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = Date.now() + ext;
  const url = `${req.protocol}://${req.get('host')}/products/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) {
    res.status(422).json({ msg: 'Invalid Images' });
  }

  if (fileSize > 2000000) {
    res.status(422).json({ msg: 'Image harus kurang dari 2mb' });
  }

  file.mv(`./public/products/${fileName}`, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }
    // const { Category } = req.body
    // const categoryExists = await prisma.category.findUnique({
    //   where: {
    //     name: Category
    //   }
    // })

    // if (!categoryExists) {
    //   return res.status(404).json({ msg: 'Kategori tidak ditemukan!' });
    // }
    
    try {
      await prisma.products.create({
        data: {
          img: fileName,
          imgUrl: url,
          ...req.body
        }
      });
      res.status(201).json({ msg: 'Product berhasil ditambahkan!' });
    } catch (error) {
      console.log(error.message);
    }
  });
}

exports.updateProduct = async (req, res) => {
  const product = await prisma.products.findFirst({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.sendStatus(404).json({ msg: 'Product tidak ditemukan!' });
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

      const filePath = `./public/products/${product.img}`;
      fs.unlinkSync(filePath);

      file.mv(`./public/products/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }
    const url = `${req.protocol}://${req.get('host')}/products/${fileName}`;
    try {
      await prisma.products.update(
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
      res.status(200).json({ msg: 'Product berhasil diupdate!' });
    }
    catch (error) {
      res.status(400).json({ msg: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
  const product = await prisma.products.findFirst({
    where: {
      id: req.params.id,
    },
  });
  if (!product) return res.sendStatus(404).json({ msg: 'Product tidak ditemukan!' });
  try {
    const filePath = `./public/products/${product.image}`;
    fs.unlinkSync(filePath);
    await prisma.products.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Product berhasil dihapus!' });
  } catch (error) {
    res.status(400).json({ msg: "Gagal delete product" });
  }
}