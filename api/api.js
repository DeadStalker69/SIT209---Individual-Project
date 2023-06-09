const mongoose = require('mongoose');
const fs = require('fs')
const helmet = require("helmet");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const https = require('https')
var sslOptions = {
key: fs.readFileSync('key.pem'),
cert: fs.readFileSync('cert.pem'),
passphrase: 'qwerty'
};
mongoose.connect('mongodb+srv://vishal4855be21:g8Syw62NPqqVS5p2@cluster0.bvvimlw.mongodb.net/myFirstDatabase', {useNewUrlParser: true, useUnifiedTopology: true });
const Device = require('./models/device'); 
const Lighting = require('./models/lighting');
const Security = require('./models/security'); 
const AirC = require('./models/acond');
const FloorPlan = require('./models/froomplan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.port || 5000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Building',
      version: '1.0.0',
      description: 'API documentation generated using Swagger',
    },
  },
  apis: ['./api.js'], // Path to your API route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://code.highcharts.com/highcharts.js","https://maps.googleapis.com", "https://code.jquery.com", "https://cdnjs.cloudflare.com", "https://stackpath.bootstrapcdn.com", "https://fonts.googleapis.com"],
      connectSrc: ["'self'", "https://localhost:3000", "mongodb+srv://your-mongodb-url"],
      frameAncestors: ["'none'"],
      "Cross-Origin-Embedder-Policy": "require-corp",
      imgSrc: ["'self'", "data:"],
      styleSrc: ["'self'","https://maxcdn.bootstrapcdn.com", "https://stackpath.bootstrapcdn.com", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://maxcdn.bootstrapcdn.com","https://stackpath.bootstrapcdn.com","https://fonts.gstatic.com", "https://fonts.googleapis.com", "data:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    },
    reportOnly: false
  }
}));
var server = https.createServer(sslOptions, app).listen(port, function(){
  console.log("Express server listening on port " + port);
  });
app.use(cors({
  origin: 'https://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get('/test', (req, res) => {
  res.send('The API is working!');
});



/**
 * @swagger
 * /api/getFloorR:
 *   get:
 *     summary: Get Rooms from a floor
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.get('/api/getFloorR', async (req, res) => {

  try {
    const floor = req.query.floor;
    const floorRoom = await FloorPlan.findOne({ floor: floor }).exec();
    const rooms = floorRoom.rooms;
    res.json(rooms);
  } catch (err) {
    console.error(err);
  }
});

/**
 * @swagger
 * /api/delete:
 *   get:
 *     summary: remove a device
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.delete('/api/removeDevice', async (req, res) => {
  try {
    const type = req.body.type;
    const floor = req.body.floor;
    const room = req.body.room;
    const device = req.body.device;

    if (type === '1') {
      await Lighting.findOneAndRemove({ floor: floor, room: room, name: device });
      console.log('Device removed successfully');
    } else if (type === '2') {
      await AirC.findOneAndRemove({ floor: floor, room: room, name: device });
    } else if (type === '3') {
      await Security.findOneAndRemove({ floor: floor, room: room, name: device });
    }
    console.log("Removal successful");
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

/**
 * @swagger
 * /api/getLighting:
 *   get:
 *     summary: Get light state
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.get('/api/lighting', async (req, res) => {
  try {
    const lightingData = await Lighting.find({});
    res.json(lightingData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/getSecurity:
 *   get:
 *     summary: Get data from security devices
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.get('/api/security', async (req, res) => {
  try {
    const lightingData = await Security.find({});
    res.json(lightingData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/getTemp:
 *   get:
 *     summary: Get Temperature reading of a room
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */


app.get('/api/aircon', async (req, res) => {
  try {
    const lightingData = await AirC.find({});
    res.json(lightingData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

/**
 * @swagger
 * /api/retrive devices:
 *   get:
 *     summary: Get information about all devices in a room
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.get('/api/retrieveDevices', async (req, res) => {
  try {
    const type = req.query.type;
    const floor = req.query.floor;
    const room = req.query.room;

    let devices = [];

    if (type === '1') {
      devices = await Lighting.find({ floor: floor, room: room });
    } else if (type === '2') {
      devices = await AirC.find({floor: floor, room: room });
    } else if (type === '3') {
      devices = await Security.find({floor: floor, room: room });
    }

    console.log('Devices (floor, room, type:)', devices);

    //a json object with all the retrieved devices is sent
    res.json(devices);

  } catch (err) {
    console.error(err);
  }

});

/**
 * @swagger
 * /api/getSensorData:
 *   get:
 *     summary: Get data from a requested sensor
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.get('/api/sensor_data', async (req, res) => {
  try {
    const type = req.query.type;
    const floor = req.query.floor;
    const room = req.query.room;
    const name = req.query.name;

    let data = [];

    if (type === '1') {
      data = await Lighting.find({ floor: floor, room: room, name: name});
    } else if (type === '2') {
      data = await AirC.find({floor: floor, room: room, name: name });
    } else if (type === '3') {
      data = await Security.find({floor: floor, room: room, name: name });
    }
    const sensorData = data.map((item) => item.sensorData).flat();

    res.json(sensorData);

  } catch (err) {
    console.error(err);
  }
});

/**
 * @swagger
 * /api/postLighting:
 *   post:
 *     summary: Update lighting state
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.post('/api/lighting', async (req, res) => {
  const { name, floor, room } = req.body;

  console.log('name:', name);
  console.log('floor:', floor);
  console.log('room:', room);
  const device = await Lighting.findOne({ name: name, floor:floor, room: room });
  if(!device){
    const newDevice = new Lighting({
    name,
    floor,
    room,
    status: false,
    sensorData: [1,10, 8, 90] //default sensor data added at the time of new device obj creation
  });

  try {
    await newDevice.save();
    res.send('successfully added device and data');
  } catch (err) {
    res.send(err);
  }
  }
});

/**
 * @swagger
 * /api/postSecurity:
 *   post:
 *     summary: Update security
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.post('/api/security', async (req, res) => {
  const { name, floor, room } = req.body;
  
  console.log('name:', name);
  console.log('floor:', floor);
  console.log('room:', room);

  const device = await Security.findOne({ name: name, floor:floor, room: room });
  if(!device){
    const newDevice = new Security({
    name,
    floor,
    room,
    status: false,
    sensorData: [34, 5, 0, 8] //default sensor data
  });

  try {
    await newDevice.save();
    res.send('successfully added device and data');
  } catch (err) {
    res.send(err);
  }
  }
  
});

/**
 * @swagger
 * /api/postTemp:
 *   post:
 *     summary: Update temperature of room
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.post('/api/aircon', async (req, res) => {
  const { name, floor, room } = req.body;
  
  console.log('name:', name);
  console.log('floor:', floor);
  console.log('room:', room);

  const device = await AirC.findOne({ name: name, floor:floor, room: room });
  if (!device) {
    const newDevice = new AirC({
    name,
    floor,
    room,
    status: false,
    sensorData: [5,6,7,8,0] //defualt sensor data
  });

  try {
    await newDevice.save();
    res.send('successfully added device and data');
  } catch (err) {
    res.send(err);
  }
  }

});




//TO ADD FLOOR SAMPLE DATA, RUNS once

// const floors = [
//   {
//     floor: '1',
//     rooms: [1,2,3,4]
//   },
//   {
//     floor: '2',
//     rooms: [5,6,7,8]
//   },
//   {
//     floor: '3',
//     rooms: [9,10,11,12]
//   }
// ];

// FloorPlan.insertMany(floors).then(() => {
//   console.log('Inserted floors successfully');
// }).catch((err) => {
//   console.error('Failed to insert floors', err);
// }).finally(() => {
//   mongoose.connection.close();
// });


//deivces get and post requests for,, reference

/**
 * @swagger
 * /api/getDevices:
 *   get:
 *     summary: Get information of all the devices connected
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.get('/devices', (req, res) => {
  Device.find({})
    .then(devices => {
      res.send(devices);
    })
    .catch(err => {
      res.send(err);
    });
});

/**
 * @swagger
 * /api/postDevices:
 *   post:
 *     summary: Update information about a device
 *     tags: [Rooms]
 *     parameters:
 *       - floor: String
 *         schema:
 *           floor: string
 *           rooms: Array
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: User not found
 */

app.post('/devices', (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});
