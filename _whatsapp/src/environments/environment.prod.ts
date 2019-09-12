export const environment = {
  production: true,
    api: {
        protocolo: 'http',
        host: '192.168.0.100:8000',
        get url(){
            return `${this.protocolo}://${this.host}/api`
        }
    },
    baseFilesUrl: 'http://192.168.0.100:8000/storage'
};