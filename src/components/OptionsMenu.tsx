import { useAppContext } from '@/context/AppContext'
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import { MdMoreVert } from 'react-icons/md'

interface Props {
  items: [string, () => void][];
};

const OptionsMenu = ({items}: Props) => {
  const { theme } = useAppContext();
  const menuBtn = (
    <button>
      <MdMoreVert className='text-xl md:text-2xl' />
    </button>
  );

  return (
    <Menu
      menuButton={menuBtn}
      theming={theme === 'dark' ? theme : undefined}
    >
      {items.map(([name, handleClick]) => (
        <MenuItem key={name} onClick={handleClick}>
          {name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default OptionsMenu;