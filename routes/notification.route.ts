import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";
import { updateAccessToken } from "../controllers/user.controller";
const notificationRoute = express.Router();

notificationRoute.get(
  "/get-all-notifications",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  getNotifications
);
notificationRoute.put(
  "/update-notification/:id",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRoute;
