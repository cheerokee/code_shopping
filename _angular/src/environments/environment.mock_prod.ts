export const environment = {
  production: true,
  api: {
    protocolo: 'http',
    host: '192.168.100.20:8000',
    get url(){
      return `${this.protocolo}://${this.host}/api`
    }
  }
};
