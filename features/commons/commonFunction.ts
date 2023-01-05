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