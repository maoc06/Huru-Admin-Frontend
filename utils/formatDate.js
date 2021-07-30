import { DateTime } from 'luxon';

const formatSimple = ({ date, type = 'SQL', withHour = false }) => {
  if (type === 'SQL') {
    return DateTime.fromSQL(date)
      .setLocale('co')
      .toFormat("dd 'de' LLLL 'de' yyyy");
  } else if ('ISO') {
    if (!withHour)
      return DateTime.fromISO(date)
        .setLocale('co')
        .toFormat("dd 'de' LLLL 'de' yyyy");
    else
      return DateTime.fromISO(date)
        .setLocale('co')
        .toFormat("dd 'de' LLLL 'de' yyyy 'a las' hh':'mm a ");
  }
};

export default formatSimple;
