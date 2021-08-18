import { DateTime } from 'luxon';

const formatSeconds = (seconds) => DateTime.fromSeconds(seconds).toISO();

export default formatSeconds;
