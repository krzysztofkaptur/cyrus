"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tailwindcss_1 = __importDefault(require("tailwindcss"));
const autoprefixer_1 = __importDefault(require("autoprefixer"));
module.exports = {
    plugins: [tailwindcss_1.default, autoprefixer_1.default],
};
