const bbCodeParser = require('js-bbcode-parser').default;

const parseBBCode = (bbCode: string) => {
  return {
    __html: bbCodeParser.parse(bbCode),
  };
};

export default parseBBCode;
