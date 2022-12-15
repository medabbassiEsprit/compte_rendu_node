var express = require('express');
var router = express.Router();
var productModel =require('../model/produit');
/* GET users listing. */
router.get('/addProduct', function(req, res, next) {
  res.render('Adduser');
});
router.get('/listProduct',  async function(req, res, next) {
    const product =await productModel.find();
    res.render('products',{product : product});
  });
router.post("/addUserandroute", async function (req, res, next) {
    try {
      const { libelle, prix,description,quantite } = req.body;
      const checkIfUserExists = await productModel.findOne({ libelle });
      if (checkIfUserExists) {
        throw new Error("Product already exists");
      }
      const user = new productModel({
     libelle :libelle,
     prix :prix,
     description :description,
     quantite :quantite,
      });
      await user.save();
      res.redirect("/product/listProduct");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
  router.get("/delete/:id", async function (req, res, next) {
    const {id} = req.params;
    await productModel.deleteOne({_id: id});
    res.redirect("/product/listProduct");
  });
router.get("/modifier/:id", async function(req,res,next){
    
    const {id}= req.params;
    const product =  await productModel.findById(id)
    res.render('modifier',{product : product});
});
router.post("/modPandrout/:id", async function (req, res, next) {
    try {
      const { id } = req.params;
      const { libelle, prix, description, quantite } = req.body;
      productModel.findByIdAndUpdate(
        id,
        {
          libelle: libelle,
          prix: prix,
          description: description,
          quantite: quantite,
        },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated product : ", docs);
          }
        }
      );
      res.redirect("/product/listProduct");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });


module.exports = router;
