-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendRequest" (
    "id" SERIAL NOT NULL,
    "receiverId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "chatParticipantsId" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatParticipants" (
    "id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "FriendId" TEXT NOT NULL,

    CONSTRAINT "ChatParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_friend_id_user_id_key" ON "Friendship"("friend_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_user_id_friend_id_key" ON "Friendship"("user_id", "friend_id");

-- CreateIndex
CREATE INDEX "friendRequest_id_idx" ON "friendRequest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "friendRequest_senderId_receiverId_key" ON "friendRequest"("senderId", "receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "friendRequest_receiverId_senderId_key" ON "friendRequest"("receiverId", "senderId");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_chatParticipantsId_key" ON "Chat"("chatParticipantsId");

-- CreateIndex
CREATE INDEX "Chat_id_idx" ON "Chat"("id");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendRequest" ADD CONSTRAINT "friendRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendRequest" ADD CONSTRAINT "friendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_chatParticipantsId_fkey" FOREIGN KEY ("chatParticipantsId") REFERENCES "ChatParticipants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipants" ADD CONSTRAINT "ChatParticipants_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipants" ADD CONSTRAINT "ChatParticipants_FriendId_fkey" FOREIGN KEY ("FriendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
