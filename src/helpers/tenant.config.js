const devConfig = {
  host: 'localhost',
  //host: '127.0.0.1',
  user: 'tentant1',
  port: '3306',
  password: 'aaa',
  database: 'thesystem_db',
  //database: 'thesystem_dev',
  socketPath: '/tmp/mysql.sock',
};

const prodConfig = {
  host: 'localhost',
  user: 'thesyste_prodsqluser',
  port: '3306',
  password: '',
  database: '',
};

const sitConfig = {
  host: 'localhost',
  user: 'thesyste_sitsqluser',
  port: '3306',
  password: 'G2x8Dqg58r3eM@wE7W%@GNSwZHaNCZQ!%W9Q#TtU',
  database: 'thesyste_sit',
};

const uatConfig = {
  host: 'localhost',
  user: 'thesyste_uatsqluser',
  port: '3306',
  password: '',
  database: 'thesyste_uat',
};

const reportConfig = {
  host: 'localhost',
  user: 'thesyste_reportuser',
  port: '3306',
  password: '6e5!PNN!7v$3w&&ERs2aeQfp2y&exLzbxry6@yEQ$4dCH9s3HFBxDxXua9Ew',
  database: 'thesyste_reports',
};

const emailConfig = {
  emailFrom: 'robot@thesystem.co.za',
  smtpOptions: {
    host: 'mail.thesystem.co.za',
    port: 465,
    secure: true,
    auth: {
      user: 'robot@thesystem.co.za',
      pass: '^?;iMVP+8Nxd',
    },
  },
};

const secret = '3eWfoYt957mPoSUuoYXH77V!SoHqHG09iCqQomZ7jU5ozhAWl#6phnRYka&r';

module.exports = {
  devConfig,
  prodConfig,
  sitConfig,
  uatConfig,
  reportConfig,
  emailConfig,
  secret,
};
