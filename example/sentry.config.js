module.exports = {
  config: {
    project: 'spa-sentry-demo',
    organization: 'leishu',
    apiKey: '968bc65cb7964d9f985812e19cc174175e46dd17f39742ec9affaa600f9a49c2',
    baseSentryURL: 'http://192.168.0.201:29177/api/0',
    release: `release-${require('./package.json').version}`,
  },
  dsn:
    'http://433b0c0776644172822097fdbb9fc7c9:5d2ae9e5568e44a8920fdb76e3fdb04f@192.168.0.201:29177/2',
};
