export const formatCurrency = (n) => '₹' + Number(n).toLocaleString('en-IN');

export const today = new Date().toISOString().split('T')[0];

export const calcDays = (pickup, returnDate) => {
  if (!pickup || !returnDate) return 0;
  const start = new Date(pickup);
  const end = new Date(returnDate);
  if (isNaN(start) || isNaN(end) || end <= start) return 0;
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

export const classNames = (...classes) => classes.filter(Boolean).join(' ');