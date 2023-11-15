import React, { useState, useEffect } from 'react';
import Form from './Form';
import Table from './Table';

import { httpHelper } from '../helpers/httpHelper';

/**
 * componente CrudUser responsável por fazer as requisições CRUD e renderizar parte da interface do <main /> da aplicação definido no App.js
 */
const CrudUser = () => {
  // variáveis de estado "getters e setters"/get(recuperar) e set(definir)
  const [users, setUsers] = useState(null);

  // declaração do url q define o endpoint './users'
  const url = 'http://localhost:5000/users';
  // declaração dos métodos de requisição
  const api = httpHelper();

  //ativa a função getUsers() com a renderização do componente
  useEffect(() => {
    getUsers();
  }, []);

  /**
   * realiza a requisição 'POST' recebendo um user/conteúdo/body como parâmetro
   * 	define a url e as opções como argumento para o método .post definido na api
   * 		200-209: chama a função getUsers() para atualizar a lista de users
   * 		400-499/500-599: retorna o erro no console
   */
  const postUser = (user) => {
    api
      .post(`${url}`, { body: user })
      .then((res) => getUsers())
      .catch((err) => console.log(err));
  };

  // realiza a requisição 'PUT' utilizando o id como filtragem na url para atualizar os dados do user que possui o mesmo id
  const updateUser = (id, user) => {
    api
      .put(`${url}/${id}`, { body: user })
      .then((res) => getUsers())
      .catch((err) => console.log(err));
  };

  //realiza a requisição 'DELETE' para deletar os dados através da filtragem na url utilizando o id
  const deleteUser = (id) => {
    api
      .del(`${url}/${id}`, {})
      .then((res) => getUsers())
      .catch((err) => console.log(err));
  };

  //função responsável por buscar os dados do usuário da api atraves de uma requisição 'GET'
  const getUsers = () => {
    api
      // método .get utiliza uma url com o parâmetro de consulta '?_expand='
      // _expand= instrução para a api RESTful incluir informações sobre o valor repassado(companies)
      .get(`${url}?_expand=companies`)
      // se a requisição for bem sucedida atualiza a variavel de estado users com o valor recebido(res)
      .then((res) => {
        setUsers(res);
      })
      // retorna o erro no console
      .catch((err) => console.log(err));
  };

  if (!users) return null; // impede a renderização restante do componente caso users seja nulo/false

  /**
   * retorna o trecho HTML responsável por rendezirar o componente CrudUser na interface
   * retorna os componentes  <Form /> e <Table /> e define as props utilizadas
   */
  return (
    <>
      <h3>New user</h3>
      <Form postUser={postUser} />
      <div className="all-users">
        <h3>All users</h3>
        <Table
          users={users}
          setUsers={setUsers}
          postUser={postUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      </div>
    </>
  );
};

export default CrudUser;
