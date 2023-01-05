import { config as baseConfig } from "../wdio.conf";

export const config = Object.assign(baseConfig,{
    baseUrl:"https://www.saucedemo.com/"
})