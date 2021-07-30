import { useFormikContext } from 'formik';

import Button from './Button';

export default function SubmitButton({
  children,
  invert = false,
  ...otherProps
}) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      invert={invert}
      {...otherProps}
    >
      {children}
    </Button>
  );
}
