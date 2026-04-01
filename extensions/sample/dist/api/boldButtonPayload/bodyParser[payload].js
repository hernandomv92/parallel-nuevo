import bodyParser from 'body-parser';
export default function boldButtonPayloadBodyParser(request, response, next) {
    bodyParser.json({ inflate: false })(request, response, () => {
        bodyParser.urlencoded({ extended: true })(request, response, next);
    });
}
//# sourceMappingURL=bodyParser%5Bpayload%5D.js.map