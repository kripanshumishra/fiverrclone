const createError = require("../utils/createError");
const Conversation = require("../models/conversation.model");

const createConversation = async (req, res, next) => {
  const isSeller = req.isSeller;
  let buyerId, sellerId;
  if (isSeller) {
    sellerId = req.userId;
    buyerId = req.body.to;
  } else {
    buyerId = req.userId;
    sellerId = req.body.to;
  }
  // seller id will be prefix always
  const conversationId = sellerId + buyerId;

  const newconversation = new Conversation({
    id: conversationId,
    seller: sellerId,
    buyer: buyerId,
    readBySeller: isSeller,
    readByBuyer: !isSeller,
  });

  try {
    const savedconvo = await newconversation.save();
    res.status(201).send(savedconvo);
  } catch (error) {
    console.log("createConversation()", error);
    next(error);
  }
};

const updateConversation = async (req, res, next) => {
  try {
    const convoId = req.params.id;
    const updatedConvo = await Conversation.findOneAndUpdate(
      { id: convoId },
      {
        $set: {
          readByBuyer: true,
          readBySeller: true,
        },
      }
    );

    res.status(200).send(updatedConvo);
  } catch (error) {
    console.log("updateConversation()", error);
    next(error);
  }
};

const getOneConversation = async (req, res, next) => {
  const conversationId = req.params.id;
  try {
    const conversation = await Conversation.findOne({
      id: conversationId,
    });
    console.log(conversation);
    if (!conversation || !Object.keys(conversation).length)
      next(createError(404, "conversation not found!"));

    res.status(200).send(conversation);
  } catch (error) {
    console.log("getOneConversation()", error);
    next(error);
  }
};

const getConversations = async (req, res, next) => {
  try {
    const convos = await Conversation.find({
      ...(req.isSeller ? { seller: req.userId } : { buyer: req.userId }),
    }).sort({ updatedAt: -1 });
    res.status(200).send(convos);
  } catch (error) {
    console.log("getConversations() ", error);
    next(error);
  }
};

module.exports = {
  createConversation,
  updateConversation,
  getOneConversation,
  getConversations,
};
