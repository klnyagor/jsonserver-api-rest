// httpHelper: responsável por definir e retornar as funções e metodos de requisição HTTP
export const httpHelper = () => {
  /**
   * customFetch() é a função responsável por fazer as resquisições HTTP de forma assíncrona
   * 	recebe como parâmetro:
   *      url = URL da requisição, endpoints definidos pelo database/ './api/db.json'
   *      e options = opções da requisição {method: 'metodo', headers: 'cabeçalho', body: 'conteúdo'}
   */
  const customFetch = async (url, options = {}) => {
    /*
     * possui options padrão(default) caso nao seja definido na chamada da função
     *	metodo/method: get ; cabeçalho/headers: conteúdo do tipo json que aceita json ; conteúdo/body: deletado caso seja vazio/false
     */
    const defaultMethod = 'GET';
    const defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    /* recebe um objeto AbortController() para definir um sinal/signal que permite cancelar a requisição a qualquer momento */
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || defaultMethod;
    options.headers = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    /* cancela a requisição caso o tempo limite(3 segundos) seja excedido */
    setTimeout(() => {
      controller.abort();
    }, 3000);

    /*
     * trecho que tenta fazer a requisição
     * se bem sucedida retorna o JSON requisitado, se não retona o tipo de erro/err que ocorreu
     */
    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (err) {
      return err;
    }
  };

  /**
   * funções que definem o método da requisição e retornam o tipo da requisição utilizando o customFetch:
   * 	get = 'GET' definido como padrão na customFecth, responsável por obter um dado/recurso do servidor
   * 	post = define o method como 'POST', responsável por adicionar/enviar dados para o servidor
   *  put = metodo como 'PUT', responsável por alterar o conteúdo do servidor
   *  del = 'DELETE', responsável por deletar um conteúdo do servidor
   */
  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options) => {
    options.method = 'POST';
    return customFetch(url, options);
  };

  const put = (url, options) => {
    options.method = 'PUT';
    return customFetch(url, options);
  };

  const del = (url, options) => {
    options.method = 'DELETE';
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
