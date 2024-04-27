const product = require("../model/productSchema");
const fs = require('fs').promises; 
const getData = async (req, res) => {
  try {
    const newData = await product.find();
    return res.status(200).json({ status: true, data: newData, message: "Data get SucceFully" });
  } catch (error) {
    console.log(error);
  }
};

const getOneData = async (req, res) => {
  try {
    const newData = await product.findOne({ _id: req.params.id });
    return res.status(200).json({ status: true, data: newData, message: "Data get SucceFully" });
  } catch (error) {
    console.log(error);
  }
};

// const addData = async (req, res) => {
//   try {
//     const newData = await product.create(req.body);
//     return res.status(200).json({ status: true, data: newData, message: "Data Add SucceFully" });
//   } catch (error) {
//     console.log(error);
//   }
// };
const addData = async (req, res) => {
  try {
    const Alldata = await product.find();
    const newId = Alldata.length === 0?1:Number(Alldata[Alldata.length-1].productId.split("")[1])+1
    let newData;
    if(req.file){
       newData = await product.create({
        ...req.body,
        productId: `P${newId}`,
        image: req.file.filename 
      });
    }
    else{
     newData = await product.create({...req.body,productId:`P${newId}`})
    }

    return res.status(200).json({ status: true, data: newData, message: 'Data Add Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};

const updateData = async (req, res) => {
  try {

    const productImage = await product.findById(req.query.id);

    // remove the old image
    if (req.file && productImage.image) {
      const imagePath = `uploads/images/${productImage.image}`;
      await fs.unlink(imagePath);
    }
    let data;
    // let newData;
    if(req.file){
      data = await product.findByIdAndUpdate({ _id: req.query.id },{ $set: {...req.body, image: req.file.filename } },{ new: true });
    }
    else{
      data = await product.findByIdAndUpdate({ _id: req.query.id },{ $set:req.body },{ new: true } );
    }

    return res.status(200).json({ status: true, data: data, message: "data updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: 'Internal Server Error' });
  }
};

const deleteData = async (req, res) => {
  try {
    const productImage = await product.findById(req.params.id);

    // remove the old image
    if (productImage.image) {
      const imagePath = `uploads/images/${productImage.image}`;
      console.log(imagePath,"imagePath");
      await fs.unlink(imagePath);
    }
    const data = await product.deleteOne({ _id: req.params.id });
    return res.status(200).json({ status: true, data: data, message: "Data Delete SucceFully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getData,
  getOneData,
  addData,
  updateData,
  deleteData,
};
