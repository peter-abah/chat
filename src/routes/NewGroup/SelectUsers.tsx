import React from 'react';

interface Props {
  participants: string[];
  onSelectUser: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const SelectUsers = ({participants, onSelectUser}: Props) => {
  return <p>SelectUsers</p>
};

export default SelectUsers;