const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../services/emailService");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now().toString()}_${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limit: {
    fileSize: 1000000 * 100,
  },
}).single("myFile");

// '/api/files/'
router.post("/", upload, async (req, res) => {
  if (!req.file) {
    res.status(500).send({
      error: "Please upload the file",
    });
  }

  //console.log(req.file);

  //Saving to Database

  const file = new File({
    fileName: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    uuid: uuidv4(),
  });

  const savedFile = await file.save();

  //console.log(savedFile);

  res.status(201).send({
    file: `${process.env.APP_BASE_URL}/files/${savedFile.uuid}`,
  });
});

// '/api/files/send'
router.post("/send", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  if ((!uuid, !emailTo, !emailFrom)) {
    return res.status(422).send({
      error: "All fields are required",
    });
  }

  try {
    const file = await File.findOne({ uuid });

    if (file.sender) {
      return res.status(422).send({
        error: "Email already sent!",
      });
    }

    file.sender = emailFrom;
    file.receiver = emailTo;

    await file.save();

    //Send File Service Call

    const response = await sendMail({
      from: emailFrom,
      to: emailTo,
      subject: "inShare File Sharing",
      text: `${emailFrom} has sent you a file.`,
      html: require("../services/emailTemplate")({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
        size: `${parseInt(file.size / 1000)} KB`,
        expires: "24 Hrs",
      }),
    });

    res.send(response);
  } catch(e) {
    res.status(500).send({error: 'Something went wrong!'});
  }
});

module.exports = router;
