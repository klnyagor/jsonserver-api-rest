import React, { useState } from 'react';
import DropComapies from './DropCompanies';

/**
 * Componente Form reponsável por renderizar o formulário da aplicação, utilizado pelo Table.js e CrudUser.js
 * 	recebe como parâmetro
 * 		userData: objeto que contém os dados do user, se existir, inicia vazio/{} como padrao
 * 		postUser: função definida no CrudUser.js
 * 		updateUser: função definida no CrudUser.js
 */
const Form = ({ userData = {}, postUser, updateUser }) => {
  /**
   * declaração das variáveis de estado
   * user recebe um json com valores padrão para cada chave, caso userData seja vazio
   */
  const [user, setUser] = useState({
    name: userData.name ?? '',
    username: userData.username ?? '',
    email: userData.email ?? '',
    phone: userData.phone ?? '',
    companiesId: userData.companiesId ?? '0',
  });

  /**
   * 	handleValue atualiza a variável user quando esse valor for alterado
   * 		e: contém as informações que serão alteradas
   * 		setUser: cria uma copia da variável user e atualiza os novos valores
   */
  const handleValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /**
   * 	submitUser verifica se o usuario selecionou uma companie
   * 		caso for uma atualização realiza a função updateUser
   * 		caso uma adição realiza a função postUser
   */
  const submitUser = (e) => {
    e.preventDefault();

    if (user.companiesId === '0') return;

    if (userData.id) {
      updateUser(userData.id, user);
    } else {
      postUser(user);
    }
  };

  /**
   * 	retorna o trecho html responsável por renderizar o formulário utilizando a tag <form></form>
   * 		além de utilizar o componente <DropComapies /> para renderizar o seletor de companies
   */
  return (
    <form onSubmit={submitUser} className="row">
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Name"
        onChange={(e) => handleValue(e)} //ativa o handleValue para atualizar o campo e.name
      />
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Email"
        onChange={(e) => handleValue(e)} //ativa o handleValue para atualizar o campo e.email
      />
      <input
        type="tel"
        name="phone"
        value={user.phone}
        placeholder="Phone (10)"
        pattern="[0-9]{10}"
        onChange={(e) => handleValue(e)} //ativa o handleValue para atualizar o campo e.phone
      />
      <DropComapies companiesId={user.companiesId} handleValue={handleValue} />
      <input
        className="btn-submit"
        type="submit"
        value={`${!userData.id ? 'Add new user' : 'Save user'}`}
      />
    </form>
  );
};

export default Form;
