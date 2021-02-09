# ip-changed-notify
A tool which detect network public ip and notify via email when initialized or changed.

## Usage

Copy file `config.example.json` to `config.json`.

Modify config fields.

To see below links for email fields detail:
- https://nodemailer.com/message/
- https://nodemailer.com/smtp/

```shell
npm i
node ./index.js
```