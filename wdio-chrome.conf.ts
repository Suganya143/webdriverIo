import { config } from './wdio-base.conf'


const webDriverManagerConfigFile = require("./node_modules/@royallondon/webdriver-manager/selenium/update-config.json");
//Update chrome driver version to pick latest one from node modules folder config file
var driverPath = './node_modules/@royallondon/webdriver-manager/selenium/'+webDriverManagerConfigFile.chrome.last.split("\\")[6];
config.baseUrl = 'https://tsa.soda.testroyallondongroup.com/';
config.cucumberOpts.tagExpression = '@requests_vmautobuildrequest and not @ignore';
config.services = [['chromedriver', {
    chromedriverCustomPath: driverPath
}]];
config.maxInstances = 10;
config.capabilities = [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 5,
    browserName: 'chrome',
    "goog:chromeOptions": {
        args: ["--headless", "--disable-gpu --disable-new-profile-management --disable-extensions --ignore-certificate-errors --no-sandbox --auth-server-whitelist=*.testroyallondon.com,*.testroyallondongroup.com"]
    },
    acceptInsecureCerts: true
}];
process.env.node = 'SODA-AutomationReport-WebdriverIO-Chrome';

exports.config = config;
