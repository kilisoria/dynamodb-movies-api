require('dotenv').config();

module.exports = {
  //aws_table_name: 'Movies',
  aws_table_name: 'Items',
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_remote_config: {
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: 'us-east-2'
  },
  apiVersion: '2012-08-10'
};
