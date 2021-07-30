import Avatar from '@material-ui/core/Avatar';

export default function AppAvatar({
  src = '/default-profile-picture.jpg',
  alt = 'Avatar',
}) {
  return <Avatar alt={alt} src={src} />;
}
