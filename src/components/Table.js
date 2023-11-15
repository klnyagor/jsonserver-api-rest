import React from 'react';
import Form from './Form';

/**
 * componente Table: responsável por renderizar a tabela da aplicação com os usuarios cadastrados
 * 	recebe como props:
 * 		users: json contendo as informações de usuarios
 * 		postUser: função definida no CrudUser.js
 * 		updateUser: função definida no CrudUser.js
 * 		deleteUser: função definida no CrudUser.js
 */
const Table = ({ users, postUser, updateUser, deleteUser }) => {
  /**
   * função responsável por alterar o className do elemento pelo id utilizando DOM,
   *  (de acordo com o que foi definido na estilização da classe)
   *  	mostra(show-form-) ou esconde(hide-form)
   * 		o formulário que atualiza os dados de um usuário na tabela
   */
  const showUpdateUser = (id) => {
    const form = document.getElementsByClassName(`show-form-${id}`);
    form[0].classList.toggle('hide-form');
  };

  /**
   * componente responsável por renderizar uma linha
   * 	contendo as informações do usuário recebido no parâmetro{ user } do componente
   */
  const Row = ({ user }) => {
    return (
      <>
        <div className="row">
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.phone}</div>
          <div>{user.companies.name}</div>
          <div className="buttons">
            <button onClick={() => showUpdateUser(user.id)}>Update</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        </div>
        <div className={`hide-form show-form-${user.id}`}>
          <Form userData={user} postUser={postUser} updateUser={updateUser} />
        </div>
      </>
    );
  };

  /**
   * retorna o trecho HTML responsável por renderizar a tabela da aplicação
   * onde para renderizar as linhas da tabela utiliza um map com o componente Row como callback
   * 	para cada usuario recebido do endepoint '/users' definido e recebido pelo CrudUser.js
   */
  return (
    <div className="table">
      <div className="titles">
        <div>Name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Company</div>
        <div>Actions</div>
      </div>
      <div className="rows">
        {users && users.map((u) => <Row user={u} key={u.id} />)}
      </div>
    </div>
  );
};

export default Table;
