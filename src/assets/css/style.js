// Dans votre fichier CSS global ou dans un style JSX
export const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: '42px',
    borderColor: '#d1d5db', // gray-300
    '&:hover': {
      borderColor: '#d1d5db',
    },
    boxShadow: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#3b82f6' : 'white', // blue-500 when selected
    color: state.isSelected ? 'white' : '#374151', // gray-700
    '&:hover': {
      backgroundColor: '#e5e7eb', // gray-200
    },
  }),
};
