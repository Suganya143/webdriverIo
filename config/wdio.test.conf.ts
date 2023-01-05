import { config as baseConfig } from "../wdio.conf.js";

export const config = Object.assign(baseConfig,{
    baseUrl:"https://www.saucedemo.com/"
})