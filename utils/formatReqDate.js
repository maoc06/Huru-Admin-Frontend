import { DateTime } from 'luxon';

const weekdays = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
];

const formatReqDate = (seconds) => {
  const curr = DateTime.now();
  const date = DateTime.fromSeconds(seconds);

  const diff = Math.round(curr.diff(date, 'days').toObject().days);
  const prefix = formatDate({ diff, date });

  return `${prefix} ${date.hour}:${date.minute}`;
};

const formatDate = ({ diff = 0, date }) => {
  if (diff === 0) {
    return 'Hoy';
  } else if (diff === 1) {
    return 'Ayer';
  } else if (diff > 1 && diff < 7) {
    return `${weekdays[date.weekday - 1]}`;
  } else {
    return `${date.month}/${date.day}`;
  }
};

export { formatReqDate };
