import * as mongoose from 'mongoose';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://ArvindNath:pass$40123@cluster0.9tist.mongodb.net/?retryWrites=true&w=majority'),
  },
];