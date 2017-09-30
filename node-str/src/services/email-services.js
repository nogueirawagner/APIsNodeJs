'use strict';

var config = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (para, assunto, corpo) => {
    sendgrid.send({
        to: para,
        from: 'nodestr@hello.com',
        subject: assunto,
        html: corpo
    });
}