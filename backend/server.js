const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dataSIMRoutes = require('./routes/dataSIMRoutes');

require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,    
}).then(() => console.log("Database Connected"))
.catch((err) => console.error("Database Not Connected", err));

app.use('/data/sim', dataSIMRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

