"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/models/ChatModel.ts
var ChatModel_exports = {};
__export(ChatModel_exports, {
  default: () => ChatModel_default
});
module.exports = __toCommonJS(ChatModel_exports);

// src/app.ts
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_dotenv = __toESM(require("dotenv"));

// src/routes.ts
var import_express = require("express");

// src/models/UserModel.ts
var import_validator = __toESM(require("validator"));
var import_bcrypt = __toESM(require("bcrypt"));

// src/models/FriendRequestModel.ts
var FriendRequest = class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.response = null;
    this.prisma = app_default.prisma;
  }
  sendFriendRequest() {
    return __async(this, null, function* () {
      if (!this.body.senderId || !this.body.receiverId)
        return this.errors.push("Informa\xE7\xF5es n\xE3o recebidas");
      this.response = yield this.prisma.friendRequest.create({
        data: {
          senderId: this.body.senderId,
          receiverId: this.body.receiverId
        }
      }).catch(() => {
        this.errors.push("solicita\xE7\xE3o de amizade j\xE1 enviada");
        return null;
      });
    });
  }
  getFriendRequests() {
    return __async(this, null, function* () {
      if (!this.body.receiverId)
        return this.errors.push("ID do usuario n\xE3o recebida");
      const findRequests = yield this.prisma.friendRequest.findMany({ where: {
        receiverId: this.body.receiverId
      } }).catch(() => {
        this.errors.push("erro ao tentar encontrar solicita\xE7\xE3o de amizade");
        return [];
      });
      this.response = yield this.prisma.user.findMany({
        where: {
          id: {
            in: findRequests.map((request) => request.senderId)
          }
        },
        select: {
          id: true,
          email: true,
          profilePic: true,
          name: true,
          friendRequestSent: {
            where: {
              id: { in: findRequests.map((request) => request.id) }
            },
            select: {
              id: true
            }
          }
        }
      });
      if (this.errors.length > 0)
        return;
      if (!this.response)
        return this.errors.push("Usuario n\xE3o existe");
    });
  }
  getSentFriendRequests() {
    return __async(this, null, function* () {
      if (!this.body.receiverId)
        return this.errors.push("ID do usuario n\xE3o recebida");
      this.response = yield this.prisma.friendRequest.findMany({ where: {
        senderId: this.body.receiverId
      } }).catch(() => this.errors.push("erro ao tentar encontrar solicita\xE7\xE3o de amizade"));
      if (this.errors.length > 0)
        return;
      if (!this.response)
        return this.errors.push("Usuario n\xE3o existe");
    });
  }
  handleRequestResponse() {
    return __async(this, null, function* () {
      if (!this.body.receiverId || !this.body.senderId)
        return this.errors.push("Alguma informa\xE7\xE3o est\xE1 faltando");
      if (this.body.isAccept) {
        const friendship = yield this.prisma.friendship.create({
          data: {
            user_id: this.body.receiverId,
            friend_id: this.body.senderId
          }
        }).catch((err) => {
          return this.errors.push("solicita\xE7\xE3o de amizade n\xE3o encontrada");
        });
        yield this.removeFriendRequest();
        return this.response = friendship;
      }
      if (this.errors.length > 0)
        return;
      return this.response = yield this.removeFriendRequest();
    });
  }
  removeFriendRequest() {
    return __async(this, null, function* () {
      return this.prisma.friendRequest.delete({
        where: {
          id: this.body.friendRequestId
        }
      }).catch(() => this.errors.push("Erro ao remover solicita\xE7\xE3o de amizade"));
    });
  }
};
var FriendRequestModel_default = FriendRequest;

// src/models/FriendshipModel.ts
var Friendship = class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.response = null;
    this.prisma = app_default.prisma;
  }
  getFriendships() {
    return __async(this, null, function* () {
      if (!this.body.userId)
        return this.errors.push("Id do usu\xE1rio n\xE3o recebido");
      let friendShipIds = yield this.prisma.friendship.findMany({
        where: {
          OR: [
            {
              friend_id: this.body.userId
            },
            {
              user_id: this.body.userId
            }
          ]
        }
      }).catch(() => {
        this.errors.push("problema tentando achar amigos do usuario");
        return [];
      }).then((resp) => {
        return resp.map((user) => {
          return user.user_id !== this.body.userId ? user.user_id : user.friend_id;
        });
      });
      if (this.errors.length > 0)
        return;
      const friendsInfo = yield this.prisma.user.findMany({
        where: {
          id: {
            in: friendShipIds
          }
        },
        select: {
          id: true,
          email: true,
          profilePic: true,
          name: true
        }
      }).catch(() => {
        this.errors.push("problema ao tentar coletar informa\xE7\xF5es do amigos");
        return [];
      });
      if (this.errors.length > 0)
        return;
      if (friendsInfo.length < 1)
        return this.errors.push("Voc\xEA n\xE3o tem amigos");
      this.response = friendsInfo;
    });
  }
  addFriendship() {
    return __async(this, null, function* () {
      if (!this.body.friendId || !this.body.userId)
        this.errors.push("informa\xE7\xF5es dos usu\xE1rios n\xE3o recebidas");
      this.response = this.prisma.friendship.create({
        data: {
          friend_id: this.body.friendId || "",
          user_id: this.body.userId
        }
      }).catch(() => {
        this.errors.push("Erro ao gerar amizade");
      });
    });
  }
  getSingleFriendship() {
    return __async(this, null, function* () {
      if (!this.body.friendshipId)
        return this.errors.push("friendship id n\xE3o foi recebido.");
      const friendShip = yield this.friendshipExists();
      if (this.errors.length > 0)
        return;
      if (!friendShip)
        return this.errors.push("amizade n\xE3o existe.");
      this.response = friendShip;
    });
  }
  removeFriendship() {
    return __async(this, null, function* () {
      if (!this.body.friendshipId)
        return this.errors.push("id da amizade n\xE3o recebido");
      if (!this.body.friendshipId)
        return this.errors.push("friendship id n\xE3o foi recebido.");
      const friendshipExists = yield this.friendshipExists();
      if (this.errors.length > 0)
        return;
      if (!friendshipExists)
        return this.errors.push("amizade n\xE3o existe.");
      this.prisma.friendship.delete({ where: {
        id: this.body.friendshipId
      } }).catch(() => {
        this.errors.push("n\xE3o foi possivel deletar a amizade");
      });
      if (this.errors.length > 0)
        return;
      this.response = friendshipExists;
    });
  }
  friendshipExists() {
    return __async(this, null, function* () {
      return yield this.prisma.friendship.findFirst({ where: {
        id: this.body.friendshipId
      } }).catch(() => this.errors.push("erro ao procurar amizade"));
    });
  }
};
var FriendshipModel_default = Friendship;

// src/models/UserModel.ts
var userSelect = {
  select: {
    id: true,
    name: true,
    profilePic: true,
    createdAt: true,
    updatedAt: true,
    email: true
  }
};
var User = class {
  constructor(body, query) {
    this.body = body;
    this.errors = [];
    this.response = null;
    this.prisma = app_default.prisma;
    this.query = query || { limit: 1, skip: 1, user: null };
  }
  createUser() {
    return __async(this, null, function* () {
      this.validateUser(true);
      if (this.errors.length > 0)
        return;
      const user = yield this.prisma.user.create(__spreadValues({
        data: {
          email: this.body.email,
          name: this.body.name,
          password: import_bcrypt.default.hashSync(this.body.password, 6),
          profilePic: this.body.profilePic || ""
        }
      }, userSelect)).catch((error) => {
        this.errors.push("Usu\xE1rio j\xE1 existe");
        return null;
      });
      this.response = user;
    });
  }
  getUsers() {
    return __async(this, null, function* () {
      const friendRequest = new FriendRequestModel_default({ receiverId: this.query.user || "" });
      yield friendRequest.getFriendRequests();
      const userFriendRequests = [];
      friendRequest.response.map((res) => {
        return userFriendRequests.push(res.id);
      });
      yield friendRequest.getSentFriendRequests();
      friendRequest.response.map((res) => {
        return userFriendRequests.push(res.receiverId);
      });
      const friendShip = yield new FriendshipModel_default({ userId: this.query.user || "" });
      yield friendShip.getFriendships();
      friendShip.response.map((res) => {
        return userFriendRequests.push(res.id);
      });
      const getUsersTemplate = __spreadProps(__spreadValues({}, userSelect), {
        where: {
          NOT: {
            id: { in: [this.query.user || "", ...userFriendRequests] }
          }
        },
        take: this.query.limit,
        skip: this.query.skip
      });
      this.response = {
        usersSelected: yield this.prisma.user.findMany(getUsersTemplate).catch((err) => {
          this.errors.push("N\xE3o encontramos nenhum Usuario");
          return [];
        }),
        usersCount: yield this.prisma.user.count({ where: __spreadValues({}, getUsersTemplate.where) }).catch((err) => {
          this.errors.push("N\xE3o foi possivel encontrar o total de usu\xE1rios");
          return 0;
        })
      };
    });
  }
  getUser() {
    return __async(this, arguments, function* (select = {}) {
      const user = yield this.prisma.user.findUnique(__spreadValues({
        where: {
          email: this.body.email,
          id: this.body.id
        }
      }, select)).catch(() => {
        this.errors.push("Erro ao tentar encontrar usu\xE1rio");
        return null;
      });
      return user;
    });
  }
  loginUser() {
    return __async(this, null, function* () {
      if (!this.body.email && !this.body.id)
        return this.errors.push("dados do usu\xE1rio n\xE3o recebidos");
      this.validateUser();
      if (this.errors.length > 0)
        return;
      const user = yield this.getUser();
      if (!user)
        return this.errors.push("usuario n\xE3o existe");
      if (this.errors.length > 0)
        return;
      if (!import_bcrypt.default.compareSync(this.body.password, String(user.password)))
        this.errors.push("Credenciais incorretas");
      this.response = user;
    });
  }
  removeUser() {
    return __async(this, null, function* () {
      if (!this.body.id)
        return this.errors.push("ID do usu\xE1rio n\xE3o recebido");
      const isUser = yield this.getUser(userSelect);
      if (!isUser)
        this.errors.push("usu\xE1rio n\xE3o existe");
      const user = yield this.prisma.user.delete(__spreadValues({
        where: {
          id: this.body.id
        }
      }, userSelect)).catch(() => {
        this.errors.push("Erro ao deletar usu\xE1rio");
        return null;
      });
      if (this.errors.length > 0)
        return;
      this.response = user;
    });
  }
  //validate body that represents user
  validateUser(needsName = false) {
    return __async(this, null, function* () {
      var _a, _b;
      try {
        if (!this.body.email || !this.body.password)
          return this.errors.push("campos vazios");
        if (needsName && !this.body.name)
          this.errors.push("campos vazios");
        if (needsName && this.body.name.length > 40)
          return this.errors.push("nome n pode conter mais de 40 caracteres");
        if (needsName && /![^a-zA-Z ]/g.test(this.body.name))
          return this.errors.push("Nome n\xE3o pode conter n\xFAmeros e caract\xE9res especiais");
        if (!import_validator.default.isEmail(this.body.email))
          return this.errors.push("Email Invalido");
        if (this.body.password.length < 6)
          return this.errors.push("senha deve conter no minimo 6 caracteres");
        if (this.body.password.length > 30)
          return this.errors.push("senha n\xE3o pode conter mais de 30 digitos");
        const UppercaseInPassword = ((_a = this.body.password.match(/[A-Z]/g)) == null ? void 0 : _a.length) || 0;
        const LowercaseInPassword = ((_b = this.body.password.match(/[a-z]/g)) == null ? void 0 : _b.length) || 0;
        if (UppercaseInPassword < 1)
          return this.errors.push("senha deve ter no minimo 1 letra mai\xFAscula");
        if (LowercaseInPassword < 1)
          return this.errors.push("senha deve ter no minimo 1 letra minuscula");
      } catch (error) {
        this.errors.push("Algum dado invalido foi recebido");
      }
    });
  }
};
var UserModel_default = User;

// src/controllers/userController.ts
var UserController = class {
  createUser(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body || Object.keys(req.body).length < 1)
          return res.status(404).send({ errors: ["Usu\xE1rio n\xE3o recebido"] });
        const user = new UserModel_default(req.body);
        yield user.createUser();
        if (user.errors.length > 0)
          return res.status(400).send({ errors: [...user.errors] });
        res.status(202).send({ response: user.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
  getUser(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body)
          return res.status(404).send({ errors: ["Usu\xE1rio n\xE3o recebido"] });
        const user = new UserModel_default(req.body);
        yield user.getUser();
        if (user.errors.length > 0)
          return res.status(400).send({ errors: [...user.errors] });
        res.status(202).send({ response: user.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
  getUsers(req, res) {
    return __async(this, null, function* () {
      var _a;
      try {
        const users = new UserModel_default({ email: "", name: "", password: "", id: "" }, { limit: Number(req.query.limit) || 3, skip: (_a = Number(req.query.skip)) != null ? _a : 0, user: req.query.user });
        yield users.getUsers();
        return res.send({ response: users.response });
      } catch (error) {
        return res.send({ error: "Erro ao tentar encontrar usu\xE1rios" });
      }
    });
  }
  loginUser(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body || Object.keys(req.body).length < 1)
          return res.status(404).send({ errors: ["Usu\xE1rio n\xE3o recebido"] });
        const user = new UserModel_default(req.body);
        yield user.loginUser();
        if (user.errors.length > 0)
          return res.status(400).send({ errors: [...user.errors] });
        res.status(202).send({ response: user.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
  removeUser(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body)
          return res.status(404).send({ errors: ["Usu\xE1rio n\xE3o recebido"] });
        const user = new UserModel_default(req.body);
        yield user.removeUser();
        if (user.errors.length > 0)
          return res.status(400).send({ errors: [...user.errors] });
        res.status(202).send({ response: user.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
};
var userController_default = new UserController();

// src/controllers/friendController.ts
var FriendController = class {
  getFriends(req, res) {
    return __async(this, null, function* () {
      try {
        req.body = req.query;
        if (!req.body)
          return res.status(404).send({ errors: ["dados do amigo n\xE3o recebido"] });
        const friendship = new FriendshipModel_default(req.body);
        yield friendship.getFriendships();
        if (friendship.errors.length > 0)
          return res.status(400).send({ errors: [...friendship.errors] });
        res.status(202).send({ response: friendship.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
  addFriend(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body)
          return res.status(404).send({ errors: ["dados do amigo n\xE3o recebido"] });
        const friendship = new FriendshipModel_default(req.body);
        yield friendship.addFriendship();
        if (friendship.errors.length > 0)
          return res.status(400).send({ errors: [...friendship.errors] });
        res.status(202).send({ response: friendship.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
  getSingleFriend(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body)
          return res.status(404).send({ errors: ["dados do amigo n\xE3o recebido"] });
        const friendship = new FriendshipModel_default(req.body);
        yield friendship.getSingleFriendship();
        if (friendship.errors.length > 0)
          return res.status(400).send({ errors: [...friendship.errors] });
        res.status(202).send({ response: friendship.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
  removeFriend(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body)
          return res.status(404).send({ errors: ["dados do amigo n\xE3o recebido"] });
        const friendship = new FriendshipModel_default(req.body);
        yield friendship.removeFriendship();
        if (friendship.errors.length > 0)
          return res.status(400).send({ errors: [...friendship.errors] });
        res.status(202).send({ response: friendship.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
};
var friendController_default = new FriendController();

// src/controllers/friendRequestController.ts
var FriendRequestController = class {
  sendFriendRequest(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body)
          return res.status(404).send({ errors: ["solicita\xE7\xE3o de amizade n\xE3o recebida"] });
        const friendRequest = new FriendRequestModel_default(req.body);
        yield friendRequest.sendFriendRequest();
        if (friendRequest.errors.length > 0)
          return res.status(400).send({ errors: [...friendRequest.errors] });
        app_default.io.emit("friendRequest", { receiverId: req.body.receiverId });
        res.status(202).send({ response: friendRequest.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
  getFriendRequests(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body && !req.query.receiverId)
          return res.status(404).send({ errors: ["solicita\xE7\xE3o de amizade n\xE3o recebida"] });
        const friendRequest = new FriendRequestModel_default(Object.keys(req.body).length > 0 ? req.body : { receiverId: req.query.receiverId });
        yield friendRequest.getFriendRequests();
        if (friendRequest.errors.length > 0)
          return res.status(400).send({ errors: [...friendRequest.errors] });
        res.status(202).send({ response: friendRequest.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
  handleFriendRequestResponse(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.body)
          return res.status(404).send({ errors: ["solicita\xE7\xE3o de amizade n\xE3o recebida"] });
        const friendRequest = new FriendRequestModel_default(req.body);
        yield friendRequest.handleRequestResponse();
        if (friendRequest.errors.length > 0)
          return res.status(400).send({ errors: [...friendRequest.errors] });
        res.status(202).send({ response: friendRequest.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
};
var friendRequestController_default = new FriendRequestController();

// src/controllers/chatController.ts
var ChatController = class {
  getSingleChat(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.query)
          return res.status(404).send({ errors: ["Informa\xE7\xF5es do usu\xE1rio nao recebidas"] });
        const chat = new ChatModel_default(req.query);
        yield chat.getSingleChat();
        if (chat.errors.length > 0)
          return res.status(400).send({ errors: chat.errors });
        res.status(202).send({ response: chat.response });
      } catch (error) {
        res.status(500).send({ errors: ["server error"] });
      }
    });
  }
  createChat() {
  }
};
var chatController_default = new ChatController();

// src/models/MessageModel.ts
var Message = class {
  constructor(body, query) {
    this.body = body;
    this.errors = [];
    this.response = null;
    this.prisma = app_default.prisma;
    this.query = query;
  }
  sendMessage() {
    return __async(this, null, function* () {
      if (!this.body.chatId)
        return this.errors.push("ID do chat n\xE3o recebido");
      if (!this.body.message)
        return this.errors.push("mensagem n\xE3o recebida");
      const message = yield this.prisma.message.create({
        data: {
          chatId: this.body.chatId,
          senderId: this.body.senderId,
          message: this.body.message,
          receiverId: this.body.receiverId
        }
      }).catch(() => this.errors.push("Erro no servidor"));
      if (this.errors.length > 0)
        return;
      this.response = message;
    });
  }
  getMessages() {
    return __async(this, null, function* () {
      var _a;
      if (!((_a = this.query) == null ? void 0 : _a.id))
        return this.errors.push("ID do chat n\xE3o recebido");
      this.response = yield this.prisma.message.findMany({ where: {
        chatId: this.query.id
      }, orderBy: {
        createdAt: "asc"
      } }).catch(() => {
        this.errors.push("Erro ao encontrar mensagens");
        return [];
      });
      if (this.errors.length > 0)
        return;
      if (this.response.length < 1)
        return this.errors.push("Nenhuma mensagem encontrada");
    });
  }
  removeMessage() {
    return __async(this, null, function* () {
      if (!this.body.messageId)
        return this.errors.push("id da mensagem n\xE3o recebido");
      this.response = this.prisma.message.delete({
        where: {
          id: this.body.messageId
        }
      }).catch(() => this.errors.push("erro ao deletar mensagem"));
    });
  }
  updateMessage() {
    return __async(this, null, function* () {
      if (!this.body.messageId)
        this.errors.push("mensagem n\xE3o recebida");
      if (!this.body.message)
        this.errors.push("Nova mensagem n\xE3o recebida");
      this.response = this.prisma.message.update({
        data: {
          message: this.body.message
        },
        where: {
          id: this.body.messageId
        }
      }).catch(() => this.errors.push("Erro ao modificar mensagem"));
    });
  }
};
var MessageModel_default = Message;

// src/controllers/messageController.ts
var MessageController = class {
  sendMessage(req, res) {
    return __async(this, null, function* () {
      try {
        const message = new MessageModel_default(req.body);
        yield message.sendMessage();
        if (message.errors.length > 0)
          return res.status(400).send({ errors: message.errors });
        app_default.io.emit("message", message.response);
        res.status(200).send({ response: message.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
  getMessages(req, res) {
    return __async(this, null, function* () {
      try {
        if (!req.query)
          return res.status(400).send({ errors: ["n\xE3o recebi o bglh"] });
        const message = new MessageModel_default(req.body, { id: String(req.query.id) });
        yield message.getMessages();
        if (message.errors.length > 0)
          return res.status(400).send({ errors: message.errors });
        res.status(200).send({ response: message.response });
      } catch (error) {
        res.status(501).send({ errors: ["Erro no servidor"] });
      }
    });
  }
};
var messageController_default = new MessageController();

// src/routes.ts
var routes = (0, import_express.Router)();
routes.get("/test", (req, res) => {
  return res.send("ok");
});
routes.get("/getUser", userController_default.getUser);
routes.get("/getUsers", userController_default.getUsers);
routes.get("/getFriendRequests", friendRequestController_default.getFriendRequests);
routes.get("/getSingleFriendship", friendController_default.getSingleFriend);
routes.get("/getFriendships", friendController_default.getFriends);
routes.get("/getSingleChat", chatController_default.getSingleChat);
routes.get("/getMessages", messageController_default.getMessages);
routes.post("/loginUser", userController_default.loginUser);
routes.post("/createUser", userController_default.createUser);
routes.post("/sendFriendRequest", friendRequestController_default.sendFriendRequest);
routes.post("/sendMessage", messageController_default.sendMessage);
routes.post("/addFriendship", friendController_default.addFriend);
routes.put("/friendRequestResponse", friendRequestController_default.handleFriendRequestResponse);
routes.delete("/removeUser", userController_default.removeUser);
routes.delete("/removeFriendship", friendController_default.removeFriend);
var routes_default = routes;

// src/app.ts
var import_client = require("@prisma/client");
var import_http = require("http");
var import_socket = require("socket.io");
import_dotenv.default.config();
var App = class {
  constructor() {
    this.express = (0, import_express2.default)();
    this.middlewares();
    this.routes();
    this.prisma = new import_client.PrismaClient();
    this.server = (0, import_http.createServer)(this.express);
    this.io = new import_socket.Server(this.server, { cors: { origin: "http://localhost:3000" } });
    this.io.on("connection", (user) => {
      user.on("userCredentials", (userId) => {
        user.on("userTyping", (chatInfo) => {
          console.log(chatInfo, userId);
          user.broadcast.emit("isFriendTyping", { chatId: chatInfo.chatId, friendId: chatInfo.friendId, isTyping: true });
        });
        user.on("stopedTyping", (value) => user.broadcast.emit("stopedTyping", { id: value.friendId }));
      });
    });
    this.server.listen(process.env.PORT, () => console.log(process.env.PORT));
  }
  middlewares() {
    this.express.use((0, import_cors.default)({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "https://vue-chat-w-node-git-main-chatapps-projects.vercel.app",
        "https://vue-chat-w-node-qan42btev-chatapps-projects.vercel.app/",
        "vue-chat-w-node.vercel.app",
        "vue-chat-w-node-q0vnsguuy-chatapps-projects.vercel.app"
      ]
    }));
    this.express.use(import_express2.default.urlencoded({ extended: true }));
    this.express.use(import_express2.default.json());
  }
  routes() {
    this.express.use(routes_default);
  }
};
var app_default = new App();

// src/models/ChatModel.ts
var Chat = class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.response = null;
    this.prisma = app_default.prisma;
  }
  newChat() {
    return __async(this, null, function* () {
      if (!this.body.id && !this.body.friendId)
        return this.errors.push("informa\xE7\xF5es faltando");
      const isChat = yield this.isChat();
      if (this.errors.length > 0)
        return;
      if (!isChat) {
        const chat = yield this.prisma.chat.create({ data: {
          chatParticipants: {
            create: {
              UserId: this.body.userId,
              FriendId: this.body.friendId
            }
          }
        } }).catch((err) => console.log(err, "a"));
        return this.errors.length > 0 ? this.errors : this.response = chat;
      } else {
        this.errors.push("chat j\xE1 existe.");
      }
    });
  }
  getSingleChat() {
    return __async(this, null, function* () {
      if (!(this.body.userId && this.body.friendId))
        return this.errors.push("informa\xE7\xF5es faltando");
      const chat = yield this.isChat();
      if (this.errors.length > 0)
        return this.errors;
      !chat && (yield this.newChat());
      if (this.errors.length > 0)
        return this.errors;
      this.response = chat || this.response;
    });
  }
  removeChat() {
    return __async(this, null, function* () {
      if (!this.body.chatId)
        return this.errors.push("\xE9 preciso do id do chat para elimina-lo!!");
      const isChat = yield this.isChat();
      if (this.errors.length > 0)
        return;
      if (!isChat)
        return this.errors.push("Chat n\xE3o existe.");
      const deletedChat = this.prisma.chat.delete({
        where: {
          id: this.body.chatId
        }
      }).catch(() => this.errors.push("nao foi possivel deletar o chat"));
      if (this.errors.length > 0)
        return;
      this.response = deletedChat;
    });
  }
  isChat() {
    return __async(this, null, function* () {
      return (yield this.prisma.chat.findFirst({
        where: {
          OR: [
            {
              chatParticipants: {
                FriendId: this.body.friendId,
                UserId: this.body.userId
              }
            },
            {
              chatParticipants: {
                FriendId: this.body.userId,
                UserId: this.body.friendId
              }
            }
          ]
        }
      }).catch(() => {
        this.errors.push("Nao foi possivel encontrar a conversa");
        return false;
      })) || false;
    });
  }
};
var ChatModel_default = Chat;
