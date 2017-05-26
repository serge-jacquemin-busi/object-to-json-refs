"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const casual_util_1 = require("./util/casual-util");
const casual = require("casual");
describe(`[Integration Test]
ConvertToJsonRefsReady`, () => {
    it('should properly convert an object', () => {
        // Arrange
        const firstProperty = casual.word;
        const obj = {
            [firstProperty]: casual_util_1.GetRandomPrimitive()
        };
    });
});
//# sourceMappingURL=index.spec.js.map