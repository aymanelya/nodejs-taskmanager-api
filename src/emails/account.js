var request = require("request");

var headers = {
  accept: "application/json",
  "api-key": process.env.SENDINBLUE_API_KEY,
  "content-type": "application/json",
};

const sendmail = (data) => {
  data = {
    sender: { name: "Aymanelya Inc.", email: "ayman@elyahmidi.com" },
    ...data,
  };

  var options = {
    url: "https://api.sendinblue.com/v3/smtp/email",
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  };
  request(options, (error, response, body) => {
    if (error) {
      return console.log("Error here");
    }
    console.log("Email sent");
  });
};

const sendWelcomeEmail = (email, name) => {
  sendmail({
    to: [{ email, name }],
    subject: "Thanks for joining in!",
    htmlContent: `<html><head></head><body><p>Hello ${name},</p>Thank you so much for joining us, let us know how you get along with the app.</p></body></html>`,
  });
};

const sendCancelEmail = (email, name) => {
  sendmail({
    to: [{ email, name }],
    subject: "We're sorry to see you leave!",
    htmlContent: `<html><head></head><body><p>Hello ${name},</p>Your account has been canceled, for us to improve our service, please reply to this email with the reason why you're leaving!</p></body></html>`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
