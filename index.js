const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const socketIO = require('socket.io');

const { typeDefs, resolvers } = require('./graphql/schema');
const { authenticate } = require('./config/passport');
const { connectToDatabase } = require('./config/database');
const { setupSocket } = require('./services/socketService');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Connect to MongoDB
connectToDatabase();

// GraphQL Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
  }),
});

server.applyMiddleware({ app });
const router = express.Router();

// Use separate route files
router.use('/auth', authRoutes);
router.use('/videos', videoRoutes)

// Socket.io setup
const httpServer = http.createServer(app);
const io = socketIO(httpServer);
setupSocket(io);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
