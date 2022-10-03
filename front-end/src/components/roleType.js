import React from 'react';

function RoleType() {
  return (
    <label htmlFor="role">
      Tipo
      <select
        data-testid="admin_manage__select-role"
      >
        <option value="customer">Cliente</option>
        <option value="seller">Vendedor</option>
      </select>
    </label>
  );
}
export default RoleType;
