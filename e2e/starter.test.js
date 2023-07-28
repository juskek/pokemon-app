import { by, device, element } from "detox";

describe("Example", () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it("AAUser given that I am on the Pokedex screen and bulbasaur item is visible, when I tap on bulbasaur I can see details", async () => {
        await expect(element(by.text("Pokedex"))).toBeVisible();
        await expect(element(by.text("bulbasaur"))).toBeVisible();
        await element(by.text("bulbasaur")).tap();
        await expect(element(by.text("Height: 7"))).toBeVisible();
        await expect(element(by.text("Weight: 69"))).toBeVisible();
    });
});
