const express = require("express");
const multer = require("multer");

const Project =
require("../models/Project");

const auth =
require("../middleware/auth");

const router =
express.Router();

const storage =
multer.diskStorage({

destination:
(req,file,cb)=>{

cb(
null,
"public/uploads"
);

},

filename:
(req,file,cb)=>{

cb(
null,
Date.now()
+
"-"
+
file.originalname
);

}

});

const upload =
multer({
storage
});

router.get("/",
async(req,res)=>{

const projects =
await Project.find();

res.json(projects);

});

router.post(
"/",
auth,
upload.single("image"),

async(req,res)=>{

const project =
await Project.create({

title:
req.body.title,

description:
req.body.description,

githubLink:
req.body.githubLink,

liveLink:
req.body.liveLink,

image:
req.file
?
"/uploads/"
+
req.file.filename
:
""

});

res.json(project);

});

router.put(
"/:id",
auth,
async(req,res)=>{

const project =
await Project.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);

res.json(project);

});

router.delete(
"/:id",
auth,
async(req,res)=>{

await Project
.findByIdAndDelete(
req.params.id
);

res.json({
message:"Deleted"
});

});

module.exports =
router;