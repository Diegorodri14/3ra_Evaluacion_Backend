import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import modelCliente from "../models/Cliente.js";

import { config } from "../../config.js";