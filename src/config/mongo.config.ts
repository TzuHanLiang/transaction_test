import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => {
  const protocol = process.env.MONGO_PROTOCOL;
  const resource = process.env.MONGO_RESOURCE;
  const port = process.env.MONGO_PORT;
  const database = process.env.MONGO_DATABASE;
  const replicaSet = process.env.MONGO_REPLICA_SET;
  const uri = `${protocol}://${resource}:${port}/${database}?replicaSet=${replicaSet}&retryWrites=true&w=majority`;
  return {
    uri,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
});
