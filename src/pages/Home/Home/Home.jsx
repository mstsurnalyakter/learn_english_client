import Banner from "../Banner/Banner";
import StudySession from "../StudySession/StudySession";
import Tutor from "../Tutor/Tutor";


const Home = () => {
  return (
    <div className="space-y-20 dark:text-gray-100">
      <Banner/>
      <StudySession/>
      <Tutor/>
    </div>
  );
}

export default Home