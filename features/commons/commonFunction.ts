import { assert } from "chai";
import cucumberJson from 'wdio-cucumberjs-json-reporter';

export async function deleteCookies() {
    await browser.deleteAllCookies();
}

export async function open(path: string) {
    await browser.url(path);
}

export async function launch(path: string) {
    await browser.navigateTo(path);
}

export async function acceptAlert() {
    await browser.acceptAlert();
}

export async function refreshBrowser() {
    await browser.refresh();
}

export async function getBrowserTitle(): Promise<string> {
    return await browser.getTitle();
}

export async function injectJSAcceptAlertToByPassPopUp() {
    await browser.execute("window.confirm = function() { return true;}");
}

export async function isElementExistsInDOM(element: string) {
    let ele = await $(element);
    console.log("Checking element is exist in DOM");
    cucumberJson.attach("Checking element is exist in DOM");
    return await ele.isExisting();
}

export async function isElementDisplayed(element: string) {
    let ele = await $(element);
    console.log("Checking element is displayed");
    cucumberJson.attach("Checking element is displayed");
    return await ele.isDisplayed();
}

export async function isElementEnabled(element: string) {
    let ele = await $(element);
    console.log("Checking element is enabled");
    cucumberJson.attach("Checking element is enabled");
    return await ele.isEnabled();
}

export async function isElementSelected(element: string) {
    let ele = await $(element);
    console.log("Checking element is selected");
    cucumberJson.attach("Checking element is selected");
    return await ele.isSelected();
}

export async function clickElement(element: string) {
    try {
        let ele = await $(element);
        await ele.click();
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to click the webelement\n${err}`);
    }
}

export async function enterValue(options: { element: string, value: any, clear?: boolean, logReport?: boolean }) {
    try {
        let ele = await $(options.element);
        let clearFlag = options.clear === undefined ? false : options.clear;
        let reportFlag = options.logReport === undefined ? true : options.logReport;
        clearFlag == true ? ele.clearValue() : clearFlag;
        clearFlag == true ? await waitExplicitTime(500) : clearFlag;
        await ele.addValue(options.value);
        reportFlag == true ? cucumberJson.attach("Entered value : " + options.value) : reportFlag;
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to find webelement\n${err}`);
    }
}

export async function getCurrentDateInDDMMYYYYFormat(addDayCount?: number) {
    try {
        const currentDate = new Date();
        addDayCount === undefined ? null : currentDate.setDate(addDayCount);           //This is to change the date forward or backward from the current date. Default 1 will bring today's date
        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const dateString =
            await roundOffTo2Digit(currentDayOfMonth) + "/" + await roundOffTo2Digit(currentMonth + 1) + "/" + currentYear;
        return await dateString;
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to get the current Date\n${err}`);
    }
}

export async function getCurrentDateInYYYYDDMMFormat(addDayCount?: number) {
    try {
        const currentDate = new Date();
        addDayCount === undefined ? null : currentDate.setDate(addDayCount);           //This is to change the date forward or backward from the current date. Default 1 will bring today's date
        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const dateString =
        await currentYear + "-" + await roundOffTo2Digit(currentMonth + 1) + "-" + await roundOffTo2Digit(currentDayOfMonth);
        return await dateString;
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to get the current Date\n${err}`);
    }
}

export async function getCurrentTimeInHHMMFormat(addMinuteCount?: number) {
    try {
        const currentDate = new Date();
        addMinuteCount === undefined ? null : currentDate.setMinutes(currentDate.getMinutes() + addMinuteCount);           //This is to change the date forward or backward from the current date. Default 1 will bring today's date
        const currentHours = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const timeString =
            await roundOffTo2Digit(currentHours) + ":" + await roundOffTo2Digit(currentMinutes);
        return await timeString;
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to get the current Time\n${err}`);
    }
}

export async function clickElementOnlyIfDisplayed(element: string) {
    try {
        let ele = await $(element);
        (ele.isDisplayed()).then((val) => {
            if (val == true) {
                ele.click();
            }
        });
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to click webelement\n${err}`);
    }
}

export async function waitElementToLoadInDOM(options: { element: string, waitTime?: number, intervals?: number, isReverse?: boolean }) {
    var time = options.waitTime === undefined ? 180000 : 180000;
    var frequency = options.intervals === undefined ? 1000 : options.intervals;
    const flag = options.isReverse === undefined ? false : options.isReverse;
    const message = flag === false ? "Waited for element to load in DOM but element not exist" : "Waited for element to appear but element is still exist in DOM";
    try {
        let ele = await $(options.element);
        while (time > 0) {
            if ((await ele.isExisting()) != flag) { break; }
            await browser.pause(frequency);
            time -= frequency;
        }
        let timeLog = "Time taken for element to be loaded in DOM :" + (180000 - time) + "ms, Is Reverse: " + flag + " and element is " + options.element;
        console.log(timeLog);
        cucumberJson.attach(timeLog);
        assert.isTrue((await ele.isExisting()) != flag);
        // await ele.waitForExist({ timeout: time, interval: frequency, reverse: flag, timeoutMsg: message });
    } catch (err) {
        assert.ok(false, `--> Error Description: ${message} \n ${err}`);
    }
}

export async function waitElementToDisplay(options: { element: string, waitTime?: number, intervals?: number, isReverse?: boolean }) {
    var time = options.waitTime === undefined ? 180000 : 180000;
    var frequency = options.intervals === undefined ? 1000 : options.intervals;
    const flag = options.isReverse === undefined ? false : options.isReverse;
    const message = flag === false ? "Waited for element to display but element is invisibile" : "Waited for element to disappear but element is still visible";
    try {
        let ele = await $(options.element);
        while (time > 0) {
            if ((await ele.isDisplayed()) != flag) { break; }
            await browser.pause(frequency);
            time -= frequency;
        }
        let timeLog = "Time taken for element to be displayed:" + (180000 - time) + "ms, Is Reverse: " + flag + " and element is " + options.element;
        console.log(timeLog);
        cucumberJson.attach(timeLog);
        assert.isTrue((await ele.isDisplayed()) != flag);
        // await ele.waitForDisplayed({ timeout: time, interval: frequency, reverse: flag, timeoutMsg: message });
    } catch (err) {
        assert.ok(false, `--> Error Description: ${message} \n ${err}`);
    }
}

export async function waitElementToClick(options: { element: string, waitTime?: number, intervals?: number, isReverse?: boolean }) {
    var time = options.waitTime === undefined ? 180000 : 180000;
    var frequency = options.intervals === undefined ? 1000 : options.intervals;
    const flag = options.isReverse === undefined ? false : options.isReverse;
    const message = flag === false ? "Waited for element to be clickable but its not" : "Waited for element to not clickable but its not";
    try {
        let ele = await $(options.element);
        while (time > 0) {
            if ((await ele.isClickable()) != flag) { break; }
            await browser.pause(frequency);
            time -= frequency;
        }
        let timeLog = "Time taken for element to be clickable:" + (180000 - time) + "ms, Is Reverse: " + flag + " and element is " + options.element;
        console.log(timeLog);
        cucumberJson.attach(timeLog);
        assert.isTrue((await ele.isClickable()) != flag);
        // await ele.waitForClickable({ timeout: time, interval: frequency, reverse: flag, timeoutMsg: message });
    } catch (err) {
        assert.ok(false, `--> Error Description: ${message} \n ${err}`);
    }
}

export async function waitElementToEnable(options: { element: string, waitTime?: number, intervals?: number, isReverse?: boolean }) {
    var time = options.waitTime === undefined ? 180000 : 180000;
    var frequency = options.intervals === undefined ? 1000 : options.intervals;
    const flag = options.isReverse === undefined ? false : options.isReverse;
    const message = flag === false ? "Waited for element to be enabled but its not" : "Waited for element to not enabled but its not";
    try {
        let ele = await $(options.element);
        while (time > 0) {
            if ((await ele.isEnabled()) != flag) { break; }
            await browser.pause(frequency);
            time -= frequency;
        }
        let timeLog = "Time taken for element to be enabled:" + (180000 - time) + "ms, Is Reverse: " + flag + " and element is " + options.element;
        console.log(timeLog);
        cucumberJson.attach(timeLog);
        assert.isTrue((await ele.isEnabled()) != flag);
        // await ele.waitForEnabled({ timeout: time, interval: frequency, reverse: flag, timeoutMsg: message });
    } catch (err) {
        assert.ok(false, `--> Error Description: ${message} \n ${err}`);
    }
}

export async function getTextOfElement(element: string) {
    try {
        let ele = await $(element);
        return await ele.getText();
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to retrieve text\n${err}`);
    }
}

export async function getAttributeValueOfElement(element: string, attributeName: string) {
    try {
        let ele = await $(element);
        return await ele.getAttribute(attributeName);
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to retrieve text\n${err}`);
    }
}

export async function waitExplicitTime(time: number = 2000) {
    await browser.pause(time);
}

export async function generateRandomNumber(maximumRange?: number) {
    const max = maximumRange === undefined ? 100 : maximumRange;
    const randomnumber = Math.round(Math.random() * max);
    console.log("Generated Random number : " + randomnumber);
    return randomnumber;
}

export async function getElementsListCount(elements: string) {
    try {
        let ele = await $$(elements);
        return ele.length;
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to get the size\n${err}`);
    }
}

export async function scrollToTop() {
    console.log("Scrolling to the top of the page...");
    await browser.execute("window.scrollTo(0,0);");
}

export async function scrollIntoElementView(element: string, options?: { block?: ScrollLogicalPosition, inline?: ScrollLogicalPosition }) {
    const blockView = options === undefined ? 'start' : options.block === undefined ? 'start' : options.block;
    const inlineView = options === undefined ? 'start' : options.inline === undefined ? 'nearest' : options.inline;
    try {
        let ele = await $(element);
        await ele.scrollIntoView({ block: blockView, inline: inlineView });
    } catch (err) {
        assert.ok(false, `--> Not scrolled to particular element view, Error Description: \n ${err}`);
    }
}

export async function getPositionCountFromListByText(elements: string, elementText: string) {
    var position: number = 0;
    try {
        let array = await $$(elements);
        let index: number = 0;
        for await (let element of array) {
            if ((await element.getText()).trim() == elementText.trim()) {
                position = index + 1;
                return position;
            }
            index++;
        }
        return position;
    }
    catch (err) {
        assert.ok(false, `--> Element position not found, Error Description: \n ${err}`);
    }
}

export async function getOneElementFromListByPosition(array: string, indexPosition?: number): Promise<any> {
    try {
        let index = indexPosition === undefined ? 0 : indexPosition;
        let ele = await $$(array);
        return ele[index];
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to get one element from list\n ${err}`);
    }
}

export async function getPositionCountFromListByAttributeValue(elements: string, attributeName: string, attributeValue: string) {
    var position: number = 0;
    try {
        let array = await $$(elements);
        let index: number = 0;
        for await (let element of array) {
            if ((await element.getAttribute(attributeName)).trim() == attributeValue.trim()) {
                position = index + 1;
                return position;
            }
            index++;
        }
        return position;
    }
    catch (err) {
        assert.ok(false, `--> Element position not found, Error Description: \n ${err}`);
    }
}

export async function load_NewDetailsPage_window_Handle() {
    try {
        return await browser.getWindowHandles().then((handles) => {
            browser.switchToWindow(handles[handles.length - 1]);
        });
    }
    catch (err) {
        assert.ok(false, `--> New Window/Tab is not Loaded, Error Description: \n ${err}`);
    }
}

export async function moveBackToParentWindow(page: string, headerTitle: string) {
    try {
        await browser.switchWindow(headerTitle);
        cucumberJson.attach("Title of the closing window: " + await browser.getTitle());
        await browser.closeWindow();
        await browser.switchWindow(page);
        cucumberJson.attach("Title of the switched parent window: " + await browser.getTitle());
    }
    catch (err) {
        assert.ok(false, `--> Parent Window/Tab is not Loaded, Error Description: \n ${err}`);
    }
}

export async function clickEnterKey() {
    cucumberJson.attach("Hitting enter");
    await browser.keys('Enter');
}

export async function selectByAttributeFromDropdown(element: string, attributeName: string, attributeValue: string) {
    try {
        let ele = await $(element);
        await ele.selectByAttribute(attributeName, attributeValue);
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to select the element\n${err}`);
    }
}

export async function selectByPartialVisibleTextFromDropdown(optionElements: string, text: string) {
    try {
        let ele = await $$(optionElements);
        for (let i = 0; i < ele.length; i++) {
            if ((await ele[i].getText()).includes(text)) {
                await ele[i].click();
                break;
            }
        }
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to select the element\n${err}`);
    }
}

export async function selectByVisibleTextFromDropdown(element: string, text: string) {
    try {
        let ele = await $(element);
        await ele.selectByVisibleText(text);
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to select the element\n${err}`);
    }
}

export async function selectByIndexFromDropdown(element: string, index: number) {
    try {
        let ele = await $(element);
        cucumberJson.attach("Selecting value: " + await ele.getValue());
        await ele.selectByIndex(index);
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to select the element\n${err}`);
    }
}

export async function roundOffTo2Digit(value: number) {
    try {
        return await value.toString().padStart(2, '0');
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to do the padding\n${err}`);
    }
}

export async function roundOffTo2Decimal(value: number) {
    try {
        return await Math.round(100 * value) / 100;
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to do the rounding off\n${err}`);
    }
}

export async function getColorNameByColorCode(code: string) {
    switch (code) {
        case "rgba(0,166,90,1)":
        case "rgb(40,167,69)":
        case "rgba(40,167,69,1)":
            return "Green";
        case "rgba(255,133,27,1)":
            return "Orange";
        case "rgba(221,75,57,1)":
        case "rgb(204,0,0)":
        case "rgba(204,0,0,1)":
            return "Red";
    }
}

export async function getCSSValue(element: string, cssProperty: string) {
    try {
        let ele = await $(element);
        return (await ele.getCSSProperty(cssProperty)).value;
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to fetch the element css value\n${err}`);
    }
}

export async function getValueOfElement(element: string) {
    try {
        let ele = await $(element);
        return await ele.getValue();
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to get element value\n${err}`);
    }
}

export async function clearFieldByKeyboardAction(element: string) {
    try {
        let ele = await $(element);
        await ele.click();
        await browser.keys(['Control', 'a']);
        await browser.keys('Delete');
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to get element value\n${err}`);
    }
}
export async function verifyAllElementInListContainsParticularText(elements: string, text: string) {
    try {
        let array = await $$(elements);
        for await (let element of array) {
            expect((await element.getText()).toLowerCase()).toContain(text.toLowerCase());
        }
    }
    catch (err) {
        assert.ok(false, `--> Element not found/contains text as expected, Error Description: \n ${err}`);
    }
}

export async function getArrayOfTextFromList(elements: string): Promise<string[]> {
    var unsorted: string[] = [];
    try {
        let array = await $$(elements);
        let index: number = 0;
        for await (let element of array) {
            unsorted[index] = await element.getText();
            console.log(`Text : ${unsorted[index]} in row ${index}`);
            index++;
        }
        return unsorted;
    }
    catch (err) {
        assert.ok(false, `--> Element not found in the list to iterate, Error Description: \n ${err}`);
    }
}

export async function verifyParticularAlphaColumnSortedByOrder(array: string, order: string) {
    var sorted: string[] = [], unsorted: string[] = [];
    console.log("Get array of text from column list");
    sorted = await getArrayOfTextFromList(array);
    unsorted = sorted.slice();
    sorted.sort((a, b) => { return a.localeCompare(b, undefined, { sensitivity: 'base' }); });
    if (order == "Ascending") {
        await waitExplicitTime(300);
        expect(unsorted.join()).toEqual(sorted.join());
    }
    else if (order == "Descending") {
        sorted.reverse();
        await waitExplicitTime(300);
        expect(unsorted.join()).toEqual(sorted.join());
    }
}

export async function checkFirstLetterInAlphaTextToCheckSorting(text: string, order: string) {
    if (order == "Ascending") {
        if (text == "") {
            await assert.isTrue(true);
        }
        else {
            var regex = new RegExp(/^(A|_|\\W|\\d|\$)/i);
            expect(regex.test(text)).toEqual(true);
        }
    }
    else if (order == "Descending") {
        var regex = new RegExp(/^Z/i);
        expect(regex.test(text)).toEqual(true);
    }
}

export async function checkFirstLetterInNumericTextToCheckSorting(text: string, order: string) {
    if (order == "Ascending") {
        var regex = new RegExp(/^[0]/i);
        expect(regex.test(text)).toEqual(true);
    }
    else if (order == "Descending") {
        var regex = new RegExp(/^[9]/i);
        expect(regex.test(text)).toEqual(true);
    }
}

export async function clickOneElementFromListByPosition(elements: string, indexPosition: number) {
    cucumberJson.attach(`User clicking on element in position ${indexPosition} from list: `);
    try {
        let ele = await $$(elements);
        return ele[indexPosition].click();
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to click that particular element from list\n ${err}`);
    }
}

export async function clickCSSSelectorElementUsingJS(element: string) {
    await browser.execute(`document.querySelector("${element}").click()`);
}

export async function clickXPathSelectorElementUsingJS(element: string) {
    await browser.execute("document.evaluate (\"" + element + "\", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()");
}

export async function convertStringToDate(dateString: string): Promise<Date> {
    if (!dateString) return null;
    //dateString contains string in dd/mm/yyyy format and it is converted into date instance in this function
    let dateParts: any = dateString.split("/");
    if (!dateParts[2].split(" ")[1]) {
        var timeParts = [0, 0, 0];
    }
    else {
        timeParts = dateParts[2].split(" ")[1].split(":")
    }
    dateParts[2] = dateParts[2].split(" ")[0];
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2]);
}

export async function convertArrayOfStringToDate(array: string[], date?: any): Promise<Date[]> {
    await waitExplicitTime(300);
    var unsorted: Date[] = [];
    array.forEach(async (value, index) => {
        var newData = await convertStringToDate(value);
        unsorted[index] = newData;
    });
    await waitExplicitTime(300);
    return unsorted;
}

export async function sortByDateAscending(dateList: Date[]): Promise<Date[]> {
    return dateList.sort((a, b) => {
        return a.getTime() - b.getTime();
    });
}

export async function sortByDateDescending(dateList: Date[]): Promise<Date[]> {
    return dateList.sort((a, b) => {
        return b.getTime() - a.getTime();
    });
}

export async function verifyParticularDateColumnSortedByOrder(array: string, order: string) {
    var sorted: Date[] = [], unsorted: Date[] = [];
    console.log("Get array of text from column list");
    sorted = await convertArrayOfStringToDate(await getArrayOfTextFromList(array));
    unsorted = sorted.slice();
    if (order == "Ascending") {
        sorted = await this.sortByDateAscending(sorted);
        await waitExplicitTime(300);
        expect(unsorted.join()).toEqual(sorted.join());
    }
    else if (order == "Descending") {
        sorted = await this.sortByDateDescending(sorted);
        await waitExplicitTime(300);
        expect(unsorted.join()).toEqual(sorted.join());
    }
}

export async function verifyAllElementInListToBeEqualToParticularText(elements: string, text: string) {
    try {
        let array = await $$(elements);
        for await (let element of array) {
            expect((await element.getText()).toLowerCase()).toEqual(text.toLowerCase());
        }
    }
    catch (err) {
        assert.ok(false, `--> Element not found/not equals to the text as expected, Error Description: \n ${err}`);
    }
}

export async function getArrayOfColorNameByColorCodeFromList(elements: string, cssProperty: string): Promise<string[]> {
    var unsorted: string[] = [];
    try {
        let array = await $$(elements);
        let index: number = 0;
        for await (let element of array) {
            unsorted[index] = await getColorNameByColorCode((await element.getCSSProperty(cssProperty)).value);
            console.log(`${cssProperty} color : ${unsorted[index]} in row ${index}`);
            index++;
        }
        return unsorted;
    }
    catch (err) {
        assert.ok(false, `--> Element/CSS value not found in the list to fetch, Error Description: \n ${err}`);
    }
}
export async function waitForAnimation(element: string): Promise<void> {
    let ele = await $(element);
    await browser.waitUntil(async function () {
        await ele.waitForExist({ timeout: 180000 });
        let animating = true;
        let previousLocation = await ele.getLocation();
        while (animating) {
            browser.pause(100);
            const currentLocation = await ele.getLocation();
            if (previousLocation.x == currentLocation.x && previousLocation.y == currentLocation.y) {
                animating = false;
            }
            // const spread = [currentLocation.x - previousLocation.x, currentLocation.y - previousLocation.y]
            // console.log(`WaitForAnimation: Spread x: ${spread[0]}; Spread y: ${spread[1]}`)
            previousLocation = currentLocation;
        }
        // console.log('waitForAnimation: Done')
        return true;
    }, {
        timeout: 180000,
        timeoutMsg: 'timed out waiting for animation'
    });
}

export async function waitForDOMToLoad() {
    return browser.waitUntil(() => browser.execute(() => document.readyState === 'complete'),
        {
            timeout: 60000,
            timeoutMsg: 'Timed out waiting for document readyState to be complete'
        });
}

export async function clearField(element: string) {
    try {
        let ele = await $(element);
        await ele.clearValue();
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to clear the field\n${err}`);
    }
}

export async function setValue(options: { element: string, value: any, logReport?: boolean }) {
    try {
        let ele = await $(options.element);
        let reportFlag = options.logReport === undefined ? true : options.logReport;
        await ele.setValue(options.value);
        reportFlag == true ? cucumberJson.attach("Entered value : " + options.value) : reportFlag;
    } catch (err) {
        assert.ok(false, `--> Error Description: Unable to find webelement\n${err}`);
    }
}
