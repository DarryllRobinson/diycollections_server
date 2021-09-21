const devConfig = {
  host: 'localhost',
  //user: 'tentant1',
  port: '3306',
  //password: 'aaa',
  database: 'thesystem_db',
  //database: 'thesystem_dev',
};

const prodConfig = {
  host: 'localhost',
  user: 'thesyste_prodsqluser',
  port: '3306',
  password: '7W3#R$zu^$nbxF',
  database: 'thesyste_cws_admin',
};

const sitConfig = {
  host: 'localhost',
  user: 'thesyste_sitsqluser',
  port: '3306',
  password: 'FfhZzp3Sz6*W$Z',
  database: 'thesyste_sit',
};

const uatConfig = {
  host: 'localhost',
  user: 'thesyste_uatsqluser',
  port: '3306',
  password: 'fzVJSa1k64b@Rr',
  database: 'thesyste_uat',
};

const reportConfig = {
  host: 'localhost',
  user: 'thesyste_reportuser',
  port: '3306',
  password: '92#A&4tBCXMfJ3',
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
      pass: '%IT[Gn+d_.we',
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
