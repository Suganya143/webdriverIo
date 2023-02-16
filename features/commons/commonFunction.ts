import { assert } from "chai";

export async function clickElement(element, waitTime?){
    const time = waitTime === undefined ? 2000 : waitTime;
    try {
        let ele = await $(element);
        await ele.click();
        
    } catch (err) {
        return assert.ok(false,`--> Error Description: Unable to enter the Value${err}`);
    }
}
    export async function deleteCookies() {
        await browser.deleteAllCookies();
    }

    export async function open(path: string): Promise<void> {
        browser.maximizeWindow();
        await browser.url(path);
    }

    export async function launch(path: string): Promise<void> {
        await browser.navigateTo(path);
    }

    export async function isElementDisplayed(element) {
        let ele = await $(element);
        return await element.isDisplayed();
    }

    export async function isElementEnabled(element) {
        let ele = await $(element);
        return await element.isEnabled();
    }

    export async function clickElement(element) {
        try {
            let ele = await $(element);
            await ele.click();
        } catch (err) {
            return assert.ok(false, `--> Error Description: Unable to click the Value\n${err}`);
        }
    }

   export async function enterValue(element, value) {
        try {
            let ele = await $(element);
            await ele.addValue(value);
        } catch (err) {
            return assert.ok(false, `--> Error Description: Unable to find webelement\n${err}`);
        }
    }

    export async function clickElementOnlyIfDisplayed(element) {
        try {
            let ele = await $(element);
            return (ele.isDisplayed())
                .then((val) => {
                    if (val == true) {
                        if (this.isElementDisplayed(ele)) {
                            return ele.click();
                        }
                    }
                });
        } catch (err) {
            return assert.ok(false, `--> Error Description: Unable to click webelement\n${err}`);
        }
    }

    export async function waitElementToDisplay(element, options?: { waitTime?, intervals?, isReverse?}) {
        const time = options.waitTime === undefined ? 2000 : options.waitTime;
        const frequency = options.intervals === undefined ? 100 : options.intervals;
        const flag = options.isReverse === undefined ? false : options.isReverse;
        const message = flag === false ? "Waited for element to display but element is invisibile" : "Waited for element to disappear but element is still visible";
        try {
            let ele = await $(element);
            return await ele.waitForDisplayed({ timeout: time, interval: frequency, reverse: flag, timeoutMsg: message });
        } catch (err) {
            return assert.ok(false, `--> Error Description: ${message} \n ${err}`);
        }
    }

    export async function waitElementToClick(element : string, options?: { waitTime?: number, intervals?: number, isReverse?: boolean}) {
        console.log(element)
        console.log(options.waitTime)
        const time = options.waitTime === undefined ? 2000 : options.waitTime;
        const frequency = options.intervals === undefined ? 100 : options.intervals;
        const flag = options.isReverse === undefined ? false : options.isReverse;
        const message = flag === false ? "Waited for element to be clickable but its not" : "Waited for element to not clickable but its not";
        try {
            let ele = await $(element);
            return await ele.waitForClickable({ timeout: time, interval: frequency, reverse: flag, timeoutMsg: message });
        } catch (err) {
            return assert.ok(false, `--> Error Description: ${message} \n ${err}`);
        }
    }

    export async function getTextOfElement(element): Promise<string> {
        try {
            let ele = await $(element);
            return (await ele.getText()).toString();
        } catch (err) {
            return assert.ok(false, `--> Error Description: Unable to retrieve text\n${err}`);
        }
    }

    export async function waitExplicitTime(time: number = 2000): Promise<unknown> {
        return await browser.pause(time);
    }

    export async function generateRandomNumber(maximumRange?: number): Promise<number> {
        const max = maximumRange === undefined ? 11 : maximumRange;
        const randomnumber = Math.round(Math.random() * max);
        console.log(randomnumber);
        return randomnumber;
    }

    export async function getElementsListCount(element): Promise<number> {
        try {
            let ele = await $$(element);
            return ele.length;
        } catch (err) {
            return assert.ok(false, `--> Error Description: Unable to get the size\n${err}`);
        }
    }

    export async function getOneElementFromListOfElement(element, indexPosition?): Promise<number> {
        try {
            const index = indexPosition === undefined ? 0 : indexPosition;
            const ele = browser.execute(() => document.querySelectorAll(element));
            return ele[index];
        } catch (err) {
            return assert.ok(false, `--> Error Description: Unable to get the element from list\n${err}`);
        }
    }

    export async function scrollToTop(): Promise<any> {
        //this.debug("Scrolling to the top of the page...");
        return await browser.execute("window.scrollTo(0,0);");
    }

    export async function scrollIntoElementView(element, options?: { block?, inline?}) {
        const blockView = options.block === undefined ? 'start' : options.block;
        const inlineView = options.inline === undefined ? 'nearest' : options.inline;
        try {
            let ele = await $(element);
            return await ele.scrollIntoView({ block: blockView, inline: inlineView });
        } catch (err) {
            return assert.ok(false, `--> Not scrolled to particular element view, Error Description: \n ${err}`);
        }
    }
}
