# docforus-backend

To install dependencies:

```bash
bun install
```

Set tsoa

```bash
bun run build:tsoa

or

tsoa spec-and-routes -c tsoaConfig.json
```

To run:

```bash
bun run dev
```

## Tsoa

[Document](https://tsoa-community.github.io/docs/)

### Information

#### Bun IO 관련 이슈

tsoa.json 으로 이름을 지정하면 bun 에서는 에러가 발생한다.

```typescript
// 아래와 같이 사용하면 tsoa 모듈을 불러오는 것이 아니라, tsoa.json 파일을 불러온다.
// bun 편의상 tsoa.json 파일을 불러오는 것으로 간주한다.
// 따라서, tsoa.json 파일을 불러오는 것이 아니라 tsoa 모듈을 불러오기 위해서는, tsoa.json 파일의 이름을 수정하여야 한다.
import { something } from "tsoa";
```

#### Bun ESM Module 관련 이슈

최신버전에서는 해결: [bun#2858](https://github.com/oven-sh/bun/issues/2858)

아래와 같이 package.json 파일에 "type": "module" 을 추가하여도 bun이 빌드를 할때는 cjs 파일로 빌드한다.
build 후 cjs 관련 코드를 수정하여야 한다.
bun version: 1.0.25 이하 버전에서는 에러가 발생하며, 1.0.26 버전에서는 해결되었다.

```json
{
  "type": "module"
}
```
