const logger = {
  success: (...args) => console.log(`\x1b[32m✅ `, ...args, `\x1b[0m`),
  warn: (...args) => console.log(`\x1b[33m⚠️  `, ...args, `\x1b[0m`),
  error: (...args) => console.log(`\x1b[31m❌ `, ...args, `\x1b[0m`),
  info: (...args) => console.log(`\x1b[34mℹ️  `, ...args, `\x1b[0m`),
  enter: (name) =>
    console.log(`\x1b[35m============== ${name} ==============\x1b[0m`),
};

export default logger;
