

function fileUploadController(req, res) {
  const message = 'File uploaded successfully';
  res.status(200).json({ user: req.body, file: req.file, message });
}

module.exports = { fileUploadController };
