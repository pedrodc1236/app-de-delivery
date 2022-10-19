import React, { useContext, useEffect } from 'react';
import { getUser } from '../services/localStorage';
import MyContext from '../context/MyContext';
import { removeUserById } from '../services/axios';

function UsersList() {
  const {
    usersNotAdmin,
    getUsersNotAdmin,
  } = useContext(MyContext);

  useEffect(() => {
    const { token } = getUser();
    getUsersNotAdmin(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersNotAdmin]);

  const removeUser = async (id) => {
    const { token } = getUser();
    await removeUserById(token, id);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        { usersNotAdmin.map((user, index) => (
          <tbody key={ index }>
            <tr>
              <td>
                { user.name }
              </td>
              <td>
                { user.email }
              </td>
              <td>
                { user.role === 'seller' ? 'P.Vendedora' : 'Cliente' }
              </td>
              <td>
                <button
                  type="button"
                  onClick={ () => removeUser(user.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
export default UsersList;
