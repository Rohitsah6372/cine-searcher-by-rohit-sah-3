import Header from "./commons/Header";
import MovieList from "./MovieList";

const Home = () => (
  <div>
    <div className="flex h-auto items-center bg-white p-1 shadow-md">
      <Header />
    </div>
    <div className="flex w-full flex-1 overflow-hidden">
      <div className="flex-1 overflow-hidden  shadow-xl">
        <MovieList />
      </div>
    </div>
  </div>
);

export default Home;
