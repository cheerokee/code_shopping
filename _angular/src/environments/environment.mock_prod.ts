export const environment = {
  production: true,
  api: {
    protocolo: 'http',
    host: 'localhost:8000',
    get url(){
      return `${this.protocolo}://${this.host}/api`
    }
  }
};
