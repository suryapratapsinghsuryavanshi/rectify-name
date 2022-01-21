/**

@exmaple
```javascript
const rectifyName = require('rectify-name');

rectifyName("./", "camelCase");
// All the file name convert to the camelCase.
```
*/
type CaseType = "camelCase" | "snakeCase" | "kebabCase" | "pascalCase";
export function getAllFileName(path: string, caseType: CaseType): void;
