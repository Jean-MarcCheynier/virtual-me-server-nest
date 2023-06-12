import { utilities } from 'nest-winston';
import { format, transports } from 'winston';

export const winstonDefaultConfig = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        utilities.format.nestLike('AddressBook', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
};
