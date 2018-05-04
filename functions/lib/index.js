"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
const sgMail = require('@sendgrid/mail');
const _ = require('lodash');
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);
exports.onAfterPublishing = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let document = req.body;
        let signers = _.flatMap(document.signers, signer => {
            return signer.ETHAddress;
        });
        let emails = _.flatMap(document.signers, signer => {
            return signer.email;
        });
        let msg = {
            to: emails,
            from: 'gustavo@canya.com',
            subject: 'Document Signature Request',
            html: `<h3>Hello</h3><br>
            <p>${document.creator.email} with ETH address:</p>
            <p>${document.creator.ETHAddress} requested a digital signature from you via <a href="cansign.io">CanSign</a>.</p><br>
            ${document.routes.sign}
            <br><br><br><p>The CanYa Team</p>`,
            templateId: '6ee38deb-0c3a-4c7c-a4ce-252929978275',
        };
        sgMail.send(msg);
        res.status(200).json({
            document: document,
            signers: signers,
            msg: msg,
        });
    });
    // res.status(200).json({ success: true });
});
//# sourceMappingURL=index.js.map