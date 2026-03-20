const generateCertificateId = () => {
  const seed = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ELX-${Date.now()}-${seed}`;
};

module.exports = { generateCertificateId };
