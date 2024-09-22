const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));


const getHighestLowercaseAlphabet = (alphabets) => {
  const lowercaseAlphabets = alphabets.filter(char => /[a-z]/.test(char));
  return lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];
};

app.post('/bfhl', (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = getHighestLowercaseAlphabet(alphabets);


    let fileInfo = { file_valid: false };
    if (file_b64) {

      fileInfo = {
        file_valid: true,
        file_mime_type: 'application/octet-stream', 
        file_size_kb: (file_b64.length * 3/4 / 1024).toFixed(2)
      };
    }

    const response = {
      is_success: true,
      user_id: "prasham17",
      email: "pv6994@srmist.edu.in",
      roll_number: "RA2111026010396", 
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
      ...fileInfo
    };

    res.json(response);
  } catch (error) {
    res.status(400).json({ is_success: false, error: error.message });
  }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});