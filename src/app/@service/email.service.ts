import { Injectable } from '@angular/core';
import { sendGrid } from '@environment/sendGrid';

declare let require: any;

let _ = require('lodash');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGrid.apiKey);

@Injectable()
export class EmailService {

  appURL: string = 'localhost:4200'

  constructor() { }

  onAfterPublishing(document){
    let signers = _.flatMap(document.signers, signer => {
      return signer.ETHAddress;
    });

    const msg = {
      to: signers,
      from: 'gustavo@canya.com',
      subject:  'Document Signature Request',
      // text: `Hey ${toName}. You have a new follower!!! `,
      // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

      // custom templates
      templateId: '6ee38deb-0c3a-4c7c-a4ce-252929978275',
      substitutionWrappers: ['{{', '}}'],
      substitutions: {
        creatorEmail: document.creator.email,
        creatorAddress: document.creator.ETHAddress,
        documentLink: `<a href="${this.appURL}/${document.hash}/sign"></a>`,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }

    sgMail.send(msg);
  }

}
