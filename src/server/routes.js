import express from "express";
import post_signup, {
  post_login,
  logout,
  get_profile,
  get_search_profile,
  post_send_friend_request,
  put_remove_friend_request,
  put_accept_friend_request,
  put_remove_friend,
  put_edit_username,
  post_change_picture,
  put_change_picture,
  put_user_bio
} from "./controllers/userController.js";
import post_send_message, { get_messages } from "./controllers/messageController.js";

const router = express.Router();

// Signup form
router.post("/signup", post_signup);

// Login & logout
router.post("/login", post_login);
router.get("/logout", logout);

// If user is not logged in cannot access a user profile
router.post("/:id/profile", post_login);

// Get user's profile information
router.get("/api/:id/profile/messages", get_profile);

// Search other user's info
router.get("/api/search/:username", get_search_profile);

// Send friend requests
router.post("/api/friendrequest/send/:sender/:receiver", post_send_friend_request);

// Remove friend request
router.put("/api/friendrequest/remove/:sender/:receiver", put_remove_friend_request);

// Accept friend request
router.put("/api/friendrequest/accept/:sender/:receiver", put_accept_friend_request);

// Remove friend
router.put("/api/friend/:id/:friend", put_remove_friend);

// Send message
router.post("/api/message/:sender/:receiver", post_send_message);

// Get messages
router.get("/api/message/:sender/:receiver", get_messages);

// Update user.username
router.put("/api/:id/profile/account/username", put_edit_username);

// Change user.picture
router.post("/api/:id/profile/account/picture", post_change_picture);

// Change user.picture to default
router.put("/api/:id/profile/account/picture", put_change_picture);

// Change user.bio
router.put("/api/:id/profile/account/bio", put_user_bio);

export default router;
