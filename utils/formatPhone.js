const formatPhone = (phone) => {
  const countryCode = phone.toString().slice(0, 3);
  const operator = phone.toString().slice(3, 6);
  const line = phone.toString().slice(6);

  return `${countryCode} ${operator}-${line}`;
};

export default formatPhone;
