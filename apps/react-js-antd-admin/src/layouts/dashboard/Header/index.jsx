// components
import SearchBar from '../../components/SearchBar';

const Header = () => {
  return (
    <>
      <header className='chuxin-header'>
        <div>
          <div className='flex items-baseline'>
            <div className='ml-4 hidden md:block'></div>
          </div>

          <div className='flex'>
            <SearchBar />
          </div>
        </div>
      </header>

     
    </>
  );
};


export default Header;