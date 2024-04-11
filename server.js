const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const Chef = require('./models/chef');
const Cdata = require('./models/chefSchema');
const Userdata = require('./models/userData');

mongoose.connect('mongodb://localhost:27017/Chef_Booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();
const port = 4000;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/chefs', async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.status(200).json(chefs);
  } catch (err) {
    console.error('Error fetching chefs:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/chefs', async (req, res) => {
  try {
    const newChef = new Chef(req.body);
    const savedChef = await newChef.save();
    res.status(201).json({ status: true, chef: savedChef });
  } catch (err) {
    console.error('Error saving chef:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});

app.get('/chefdata', async (req, res) => {
  try {
    const chef = await Cdata.find();
    res.status(200).json(chef);
  } catch (err) {
    console.error('Error fetching chef data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/chefdata', async (req, res) => {
  try {
    const newCdata = new Cdata(req.body);
    const savedCdata = await newCdata.save();
    res.status(201).json({ status: true, chefdata: savedCdata });
  } catch (err) {
    console.error('Error saving chef data:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});

app.get('/userdata', async (req, res) => {
  try {
    const user = await Userdata.find();
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/userdata', async (req, res) => {
  try {
    const newUserdata = new Userdata(req.body);
    const savedUserdata = await newUserdata.save();
    res.status(201).json({ status: true, Userdata: savedUserdata });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(400).json({ error: 'Bad Request', status: false });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
