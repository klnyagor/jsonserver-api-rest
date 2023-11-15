/**
 * utiliza os hooks 'useState' e 'useEffect' para gerenciar o estado do componente
 *	useState controla o acesso de uma variavel, definindo o que será armazenado
 * useEffect controla as alterações e renderização do estado do componente, realiza as alterações do componente e caso algo(state) dele mude atualizará o que será mostrado pelo componente
 */
import React, { useState, useEffect } from 'react';
import { httpHelper } from '../helpers/httpHelper';

/**
 * componente responsável por retornar o conteúdo do endpoint 'url/companies" em um dropdown(menu que permite que o usuário escolha um valor de uma lista de opções) utilizado no Form.js
 * recebe como parâmetro: variavel companiesId e a função handleValues, definidos no componente Form.js
 */
const DropCompanies = ({ companiesId, handleValue }) => {
  /**
   * 	declaração das variáveis de estado
   * companies: armazenará a lista de 'companies', retornando null caso ainda nao receba(setCompanies) os dados
   * company: armazenanará a 'company' selecionada da lista, retornando o companiesId selecionado(setCompany)
   */
  const [companies, setCompanies] = useState(null);
  const [company, setCompany] = useState(companiesId);

  /**
   * url: define o endpoint que será utilizando nas requisições
   * api: define os métodos/funções de requisições que serão utilizadas (httpHelper())
   */
  const url = 'http://localhost:5000/companies';
  const api = httpHelper();

  /**
   * 	useEffect realiza a requisição 'GET' a partir dos metodos da api
   * 		(.then)caso a requisição seja bem sucedida chama a função setCompanies() para atualizar a variável companies
   * 				setCompanies([{primeiro elemento do dropdown}, (...res)espalhamento do JSON recebido pela requisição]
   * 		(.catch)retorna o erro no console caso a requisição falhe
   */
  useEffect(() => {
    api
      .get(url)
      .then((res) => {
        setCompanies([{ id: 0, name: 'Select Company' }, ...res]);
      })
      .catch((err) => console.log(err));
  }, []);
  /**
   * useEffect( () => { ... }, [controla quando o efeito será executado])
   * [] -> efeito será executado sempre que o componente renderizar
   * [variavel] -> efeito será executado apenas quando a 'variável' for alterada
   */

  if (!companies) return null; //	caso companies não tiver conteúdo o componente retornará nulo e não irá renderizar o restante do componente

  /**
   * retorna o trecho html responsável por renderizar uma lista de opções utilizando a tag <select><select/>
   * possui a propriedade onChange que utiliza a função handleValue() quando o valor do componente é alterado
   */
  return (
    <select
      name="companiesId"
      value={company}
      onChange={(e) => {
        setCompany(e.target.value);
        handleValue(e);
      }}
    >
      {companies.map((c) => (
        <option value={c.id} key={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
};

export default DropCompanies;
